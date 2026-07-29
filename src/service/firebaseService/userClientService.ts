import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";



import { db } from "../../config/firebase/firebase";
import type { Client } from "../../utils/types";

const COLLECTION = "clients";

class UserClientService {
  /**
   * Get All Active Clients
   */
  async getClients() {
    try {
      const q = query(
        collection(db, COLLECTION),
        where("active", "==", true)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...(doc.data() as Client),
        }))
        .sort((a, b) => {
          const aTime = a.createdAt?.seconds ?? 0;
          const bTime = b.createdAt?.seconds ?? 0;

          return bTime - aTime;
        });
    } catch (error) {
      console.error("Get Clients Error:", error);
      return [];
    }
  }

  /**
   * Get Client By Id
   */
  async getClient(clientId: string) {
    try {
      const snapshot = await getDoc(doc(db, COLLECTION, clientId));

      if (!snapshot.exists()) return null;

      return {
        id: snapshot.id,
        ...(snapshot.data() as Client),
      };
    } catch (error) {
      console.error("Get Client Error:", error);
      return null;
    }
  }

  /**
   * Get Client By Slug
   */
  async getClientBySlug(slug: string) {
    try {
      const q = query(
        collection(db, COLLECTION),
        where("slug", "==", slug)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) return null;

      const client = snapshot.docs[0];

      return {
        id: client.id,
        ...(client.data() as Client),
      };
    } catch (error) {
      console.error("Get Client By Slug Error:", error);
      return null;
    }
  }
}

export default new UserClientService();