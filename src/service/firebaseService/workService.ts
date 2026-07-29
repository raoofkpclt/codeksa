import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../config/firebase/firebase";

import type {
  Work,
  WorkStatus,
} from "../../utils/types";

const WORK_COLLECTION = "works";

const calculateActive = (
  postingDate: string,
  status: WorkStatus
) => {
  if (
    !postingDate ||
    status !== "approved"
  ) {
    return false;
  }

  const today = new Date();
  const postDate =
    new Date(postingDate);

  today.setHours(0, 0, 0, 0);
  postDate.setHours(0, 0, 0, 0);

  return postDate <= today;
};

const WorkService = {
  async getAllWorks(): Promise<Work[]> {
    const snapshot =
      await getDocs(
        collection(
          db,
          WORK_COLLECTION
        )
      );

    return snapshot.docs.map(
      (document) => ({
        id: document.id,
        ...document.data(),
      })
    ) as Work[];
  },

  async getWorkById(
    workId: string
  ): Promise<Work | null> {
    const workRef = doc(
      db,
      WORK_COLLECTION,
      workId
    );

    const snapshot =
      await getDoc(workRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Work;
  },

  async addWork(
    data: Omit<
      Work,
      "id" | "createdAt" | "updatedAt"
    >
  ) {
    const active =
      calculateActive(
        data.postingDate,
        data.status
      );

    const docRef =
      await addDoc(
        collection(
          db,
          WORK_COLLECTION
        ),
        {
          ...data,
          active,
          isDisplay:false,
          createdAt:
            serverTimestamp(),
          updatedAt:
            serverTimestamp(),
        }
      );

    return docRef.id;
  },

  async editWork(
    workId: string,
    data: Partial<Work>
  ) {
    const workRef = doc(
      db,
      WORK_COLLECTION,
      workId
    );

    const currentSnapshot =
      await getDoc(workRef);

    if (!currentSnapshot.exists()) {
      throw new Error(
        "Work item not found."
      );
    }

    const currentData =
      currentSnapshot.data() as Work;

    const finalPostingDate =
      data.postingDate ??
      currentData.postingDate;

    const finalStatus =
      data.status ??
      currentData.status;

    const active =
      calculateActive(
        finalPostingDate,
        finalStatus
      );

    await updateDoc(workRef, {
      ...data,
      active,
      updatedAt:
        serverTimestamp(),
    });
  },

  async updateDisplay(
  workId: string,
  isDisplay: boolean
) {
  const workRef = doc(
    db,
    WORK_COLLECTION,
    workId
  );

  await updateDoc(workRef, {
    isDisplay,
    updatedAt: serverTimestamp(),
  });
},

  async updateStatus(
    workId: string,
    status: WorkStatus
  ) {
    const workRef = doc(
      db,
      WORK_COLLECTION,
      workId
    );

    const snapshot =
      await getDoc(workRef);

    if (!snapshot.exists()) {
      throw new Error(
        "Work item not found."
      );
    }

    const work =
      snapshot.data() as Work;

    const active =
      calculateActive(
        work.postingDate,
        status
      );

    await updateDoc(workRef, {
      status,
      active,
      updatedAt:
        serverTimestamp(),
    });
  },

  async deleteWork(
    workId: string
  ) {
    await deleteDoc(
      doc(
        db,
        WORK_COLLECTION,
        workId
      )
    );
  },

  calculateActive,
};

export default WorkService;