import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../../config/firebase/firebase";
import type { ClientUpload } from "../../utils/types";

const COLLECTION = "client_uploads";

class ClientUploadService {
  /**
   * Create Upload
   */
  async createUpload(
    data: Omit<ClientUpload, "id" | "createdAt" | "updatedAt">
  ) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        success: true,
        id: docRef.id,
      };
    } catch (error) {
      console.error("Create Upload Error:", error);

      return {
        success: false,
        error,
      };
    }
  }

  /**
   * Get All Uploads
   */
  async getUploads() {
    try {
      const q = query(
        collection(db, COLLECTION),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const uploads: ClientUpload[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as ClientUpload),
      }));

      return uploads;
    } catch (error) {
      console.error(error);
      return [];
    }
  }



// async getClientUploads(clientId: string) {
//   const q = query(
//     collection(db, COLLECTION),
//     where("clientId", "==", clientId),
    
//   );

//   const snapshot = await getDocs(q);

//   return snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...(doc.data() as ClientUpload),
//   }));
// }

async getClientUploads(clientId: string) {
  const q = query(
    collection(db, COLLECTION),
    where("clientId", "==", clientId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...(doc.data() as ClientUpload),
    }))
    .sort((a, b) => {
      const aTime = a.createdAt?.seconds ?? 0;
      const bTime = b.createdAt?.seconds ?? 0;
      return bTime - aTime; // Latest first
    });
}

  /**
   * Get Single Upload
   */
  async getUpload(id: string) {
    try {
      const snap = await getDoc(doc(db, COLLECTION, id));

      if (!snap.exists()) return null;

      return {
        id: snap.id,
        ...(snap.data() as ClientUpload),
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Update Upload
   */
  async updateUpload(
    id: string,
    data: Partial<ClientUpload>
  ) {
    try {
      await updateDoc(doc(db, COLLECTION, id), {
        ...data,
        updatedAt: serverTimestamp(),
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Update Status
   */
  async updateStatus(
    id: string,
    status:
      | "pending"
      | "review"
      | "approved"
      | "completed"
      | "rejected"
  ) {
    try {
      await updateDoc(doc(db, COLLECTION, id), {
        status,
        updatedAt: serverTimestamp(),
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Delete Upload
   */
  async deleteUpload(id: string) {
    try {
      await deleteDoc(doc(db, COLLECTION, id));

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default new ClientUploadService();