import {
  collection,
  doc,
  getDoc,
  getDocs,

  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Timestamp,
} from "firebase/firestore";

import { auth, db } from "../../config/firebase/firebase";
// Change path above if your firebase config is elsewhere

// =========================================
// Types
// =========================================

export type WorkStatus =
  | "sent_to_client"
  | "requested_to_edit"
  | "approved"
  | "rejected";

export type PostType =
  | "poster"
  | "reel";

export interface WorkMedia {
  key: string;
  url: string;
  fileName: string;
  fileType?: string;
  size?: number;
}

export interface ClientWork {
  id: string;

  clientId: string;
  clientName?: string;

  postName: string;
  description: string;

  postType: PostType;

  media: WorkMedia[];

  postingDate: string;

  status: WorkStatus;

  active: boolean;
   editRequestNote?: string;

  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

// =========================================
// Dashboard Stats
// =========================================

export interface ClientWorkStats {
  totalWorks: number;
  activeWorks: number;
  approvedWorks: number;
  pendingApproval: number;
  editRequested: number;
  rejectedWorks: number;
  posters: number;
  reels: number;
}

// =========================================
// Firestore Mapper
// =========================================

const mapWorkDocument = (
  document:
    QueryDocumentSnapshot<DocumentData>
): ClientWork => {
  const data = document.data();

  return {
    id: document.id,

    clientId:
      data.clientId || "",

    clientName:
      data.clientName || "",

    postName:
      data.postName || "Untitled Work",

    description:
      data.description || "",

    postType:
      data.postType || "poster",

    media:
      Array.isArray(data.media)
        ? data.media
        : [],

    postingDate:
      data.postingDate || "",

    status:
      data.status ||
      "sent_to_client",

    active:
      data.active ?? false,

       editRequestNote:
      data.editRequestNote || "",

    createdAt:
      data.createdAt || null,

    updatedAt:
      data.updatedAt || null,
  };
};

// =========================================
// Client Work Service
// =========================================

class ClientWorkService {
  private collectionName = "works";

  // =======================================
  // Get Current Client UID
  // =======================================

  private getCurrentClientId(): string {
    const user = auth.currentUser;

    if (!user) {
      throw new Error(
        "Client is not authenticated"
      );
    }

    return user.uid;
  }

  // =======================================
  // Get All Client Works
  // =======================================

//   async getWorks(): Promise<ClientWork[]> {
//     const clientId =
//       this.getCurrentClientId();

//     try {
//       const worksRef = collection(
//         db,
//         this.collectionName
//       );

//       const worksQuery = query(
//         worksRef,
//         where(
//           "clientId",
//           "==",
//           clientId
//         ),
//         orderBy(
//           "createdAt",
//           "desc"
//         )
//       );

//       const snapshot =
//         await getDocs(worksQuery);

//       return snapshot.docs.map(
//         mapWorkDocument
//       );
//     } catch (error) {
//       console.error(
//         "Error fetching client works:",
//         error
//       );

//       throw error;
//     }
//   }

async getWorks(): Promise<ClientWork[]> {
  const clientId = this.getCurrentClientId();

  try {
    const worksRef = collection(
      db,
      this.collectionName
    );

    // IMPORTANT:
    // No orderBy here.
    // Only filter by clientId.
    const worksQuery = query(
      worksRef,
      where(
        "clientId",
        "==",
        clientId
      )
    );

    const snapshot = await getDocs(
      worksQuery
    );

    const works = snapshot.docs.map(
      mapWorkDocument
    );

    // Sort locally instead of Firestore
    return works.sort((a, b) => {
      const getTime = (
        value: unknown
      ): number => {
        if (!value) return 0;

        // Firestore Timestamp
        if (
          typeof value === "object" &&
          value !== null &&
          "toMillis" in value &&
          typeof (
            value as {
              toMillis?: unknown;
            }
          ).toMillis === "function"
        ) {
          return (
            value as {
              toMillis: () => number;
            }
          ).toMillis();
        }

        // JS Date
        if (value instanceof Date) {
          return value.getTime();
        }

        // String date
        if (
          typeof value === "string"
        ) {
          const time =
            new Date(value).getTime();

          return Number.isNaN(time)
            ? 0
            : time;
        }

        return 0;
      };

      return (
        getTime(b.createdAt) -
        getTime(a.createdAt)
      );
    });
  } catch (error) {
    console.error(
      "Error fetching client works:",
      error
    );

    throw error;
  }
}

  // =======================================
  // Get Recent Client Works
  // =======================================

//   async getRecentWorks(
//     count = 5
//   ): Promise<ClientWork[]> {
//     const clientId =
//       this.getCurrentClientId();

//     try {
//       const worksRef = collection(
//         db,
//         this.collectionName
//       );

//       const recentQuery = query(
//         worksRef,
//         where(
//           "clientId",
//           "==",
//           clientId
//         ),
//         orderBy(
//           "createdAt",
//           "desc"
//         ),
//         limit(count)
//       );

//       const snapshot =
//         await getDocs(recentQuery);

//       return snapshot.docs.map(
//         mapWorkDocument
//       );
//     } catch (error) {
//       console.error(
//         "Error fetching recent works:",
//         error
//       );

//       throw error;
//     }
//   }

async getRecentWorks(
  count = 5
): Promise<ClientWork[]> {
  try {
    const works =
      await this.getWorks();

    return works.slice(
      0,
      count
    );
  } catch (error) {
    console.error(
      "Error fetching recent works:",
      error
    );

    throw error;
  }
}

  // =======================================
  // Get Single Work
  // =======================================

  async getWorkById(
    workId: string
  ): Promise<ClientWork | null> {
    const clientId =
      this.getCurrentClientId();

    try {
      const workRef = doc(
        db,
        this.collectionName,
        workId
      );

      const snapshot =
        await getDoc(workRef);

      if (!snapshot.exists()) {
        return null;
      }

      const data = snapshot.data();

      // Extra client ownership check
      if (
        data.clientId !== clientId
      ) {
        throw new Error(
          "You do not have permission to access this work"
        );
      }

      return {
        id: snapshot.id,
        clientId:
          data.clientId || "",
        clientName:
          data.clientName || "",
        postName:
          data.postName ||
          "Untitled Work",
        description:
          data.description || "",
        postType:
          data.postType || "poster",
        media:
          Array.isArray(data.media)
            ? data.media
            : [],
        postingDate:
          data.postingDate || "",
        status:
          data.status ||
          "sent_to_client",
        active:
          data.active ?? false,
        createdAt:
          data.createdAt || null,
        updatedAt:
          data.updatedAt || null,
      };
    } catch (error) {
      console.error(
        "Error fetching work:",
        error
      );

      throw error;
    }
  }

  // =======================================
  // Get Work Stats
  // =======================================

  async getWorkStats(): Promise<ClientWorkStats> {
    const works =
      await this.getWorks();

    return {
      totalWorks:
        works.length,

      activeWorks:
        works.filter(
          (work) =>
            work.active === true
        ).length,

      approvedWorks:
        works.filter(
          (work) =>
            work.status === "approved"
        ).length,

      pendingApproval:
        works.filter(
          (work) =>
            work.status ===
            "sent_to_client"
        ).length,

      editRequested:
        works.filter(
          (work) =>
            work.status ===
            "requested_to_edit"
        ).length,

      rejectedWorks:
        works.filter(
          (work) =>
            work.status === "rejected"
        ).length,

      posters:
        works.filter(
          (work) =>
            work.postType === "poster"
        ).length,

      reels:
        works.filter(
          (work) =>
            work.postType === "reel"
        ).length,
    };
  }

  // =======================================
  // Private Status Update
  // =======================================

  private async updateWorkStatus(
    workId: string,
    status:
      | "approved"
      | "requested_to_edit"
      | "rejected"
  ): Promise<void> {
    const clientId =
      this.getCurrentClientId();

    try {
      const workRef = doc(
        db,
        this.collectionName,
        workId
      );

      // Verify work ownership first
      const snapshot =
        await getDoc(workRef);

      if (!snapshot.exists()) {
        throw new Error(
          "Work not found"
        );
      }

      const workData =
        snapshot.data();

      if (
        workData.clientId !== clientId
      ) {
        throw new Error(
          "You do not have permission to update this work"
        );
      }

      // Only status + updatedAt
      // Matches Firestore client rules
      await updateDoc(workRef, {
        status,
        updatedAt:
          serverTimestamp(),
      });
    } catch (error) {
      console.error(
        `Error updating work to ${status}:`,
        error
      );

      throw error;
    }
  }

  // =======================================
  // Approve Work
  // =======================================

  async approveWork(
    workId: string
  ): Promise<void> {
    return this.updateWorkStatus(
      workId,
      "approved"
    );
  }

  // =======================================
  // Request Edit
  // =======================================

  async requestEdit(
  workId: string,
  note: string
): Promise<void> {
  const user =
    auth.currentUser;

  if (!user) {
    throw new Error(
      "Client is not authenticated"
    );
  }

  const cleanNote =
    note.trim();

  if (!cleanNote) {
    throw new Error(
      "Please enter the changes you need"
    );
  }

  if (
    cleanNote.length > 1000
  ) {
    throw new Error(
      "Edit request note cannot exceed 1000 characters"
    );
  }

  const workRef = doc(
    db,
    "works",
    workId
  );

  const snapshot =
    await getDoc(workRef);

  if (!snapshot.exists()) {
    throw new Error(
      "Work not found"
    );
  }

  const workData =
    snapshot.data();

  if (
    workData.clientId !==
    user.uid
  ) {
    throw new Error(
      "You cannot edit this work"
    );
  }

  await updateDoc(
    workRef,
    {
      status:
        "requested_to_edit",

      editRequestNote:
        cleanNote,

      updatedAt:
        serverTimestamp(),
    }
  );
}

  // =======================================
  // Reject Work
  // =======================================

  async rejectWork(
    workId: string
  ): Promise<void> {
    return this.updateWorkStatus(
      workId,
      "rejected"
    );
  }
}

export default new ClientWorkService();