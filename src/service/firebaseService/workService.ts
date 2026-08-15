import {
  addDoc,
  arrayUnion,
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
  DecisionEntry,
  Work,
  WorkStatus,
} from "../../utils/types";

const WORK_COLLECTION = "works";

const calculateActive = (
  postingDate: string,
  status: WorkStatus
) => {
  if (!postingDate || status !== "approved") {
    return false;
  }

  const today = new Date();
  const postDate = new Date(postingDate);

  today.setHours(0, 0, 0, 0);
  postDate.setHours(0, 0, 0, 0);

  return postDate <= today;
};

const WorkService = {
  async getAllWorks(): Promise<Work[]> {
    const snapshot = await getDocs(collection(db, WORK_COLLECTION));

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    })) as Work[];
  },

  async getWorkById(workId: string): Promise<Work | null> {
    const workRef = doc(db, WORK_COLLECTION, workId);
    const snapshot = await getDoc(workRef);

    if (!snapshot.exists()) return null;

    return { id: snapshot.id, ...snapshot.data() } as Work;
  },

  async addWork(
    data: Omit<Work, "id" | "createdAt" | "updatedAt">
  ) {
    const active = calculateActive(data.postingDate, data.status);

    // Seed history with the initial status so the record starts complete.
    const initialEntry: DecisionEntry = {
      status: data.status,
      actor: "Admin",
      date: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, WORK_COLLECTION), {
      ...data,
      active,
      isDisplay: false,
      decisionHistory: [initialEntry],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  },

  // Central write path for ALL work updates. If `data.status` differs from
  // the current stored status, a DecisionEntry is appended automatically —
  // covers admin edits, "send to client again", and any client-side
  // approve/reject/request-edit action, no matter which screen calls this.
  async editWork(
    workId: string,
    data: Partial<Work>,
    actor: string = "Admin"
  ) {
    const workRef = doc(db, WORK_COLLECTION, workId);
    const currentSnapshot = await getDoc(workRef);

    if (!currentSnapshot.exists()) {
      throw new Error("Work item not found.");
    }

    const currentData = currentSnapshot.data() as Work;

    const finalPostingDate = data.postingDate ?? currentData.postingDate;
    const finalStatus = data.status ?? currentData.status;

    const active = calculateActive(finalPostingDate, finalStatus);

    const statusChanged =
      data.status !== undefined && data.status !== currentData.status;

    const updatePayload: Record<string, unknown> = {
      ...data,
      active,
      updatedAt: serverTimestamp(),
    };

    if (statusChanged) {
      const entry: DecisionEntry = {
        status: data.status as WorkStatus,
        actor,
        date: new Date().toISOString(),
      };

      updatePayload.decisionHistory = arrayUnion(entry);
    }

    await updateDoc(workRef, updatePayload);
  },

  async updateDisplay(workId: string, isDisplay: boolean) {
    const workRef = doc(db, WORK_COLLECTION, workId);

    await updateDoc(workRef, {
      isDisplay,
      updatedAt: serverTimestamp(),
    });
  },

  // Thin wrapper kept for call sites that only ever change status.
  async updateStatus(
    workId: string,
    status: WorkStatus,
    actor: string = "Client"
  ) {
    return this.editWork(workId, { status }, actor);
  },

  async deleteWork(workId: string) {
    await deleteDoc(doc(db, WORK_COLLECTION, workId));
  },

  calculateActive,
};

export default WorkService;