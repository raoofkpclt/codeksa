import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../config/firebase/firebase";
import type { WorkData } from "../../utils/types";

const COLLECTION = "works";

class UserWorkService {
  /**
   * Get All Works (active + displayable), across all clients
   */
  async getWorks() {
    try {
     const snapshot = await getDocs(collection(db, "works"));

console.log("Total Docs:", snapshot.size);

snapshot.forEach((doc) => {
  console.log(doc.id, doc.data());
});

      return snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...(doc.data() as WorkData),
        }))
        .filter((work) => work.active === true && work.isDisplay === true)
        .sort((a, b) => {
          const aTime = a.createdAt?.seconds ?? 0;
          const bTime = b.createdAt?.seconds ?? 0;
          return bTime - aTime;
        });
    } catch (error) {
      console.error("Get Works Error:", error);
      return [];
    }
  }

  /**
   * Get Single Work
   */
  async getWork(workId: string) {
    try {
      const snapshot = await getDoc(doc(db, COLLECTION, workId));

      if (!snapshot.exists()) return null;

      return {
        id: snapshot.id,
        ...(snapshot.data() as WorkData),
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Get Works By Client Id (active + displayable only)
   */
  async getWorksByClient(clientId: string) {
    try {
      const q = query(
        collection(db, COLLECTION),
        where("clientId", "==", clientId)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...(doc.data() as WorkData),
        }))
        .filter(
          (work) => work.active === true && work.isDisplay === true
        )
        .sort((a, b) => {
          const aTime = a.createdAt?.seconds ?? 0;
          const bTime = b.createdAt?.seconds ?? 0;
          return bTime - aTime;
        });
    } catch (error) {
      console.error("Get Works By Client Error:", error);
      return [];
    }
  }
}

export default new UserWorkService();