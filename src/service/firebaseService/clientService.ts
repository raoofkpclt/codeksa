import {
  collection,
  deleteDoc,
  doc,
    getDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  deleteUser,
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  deleteApp,
  initializeApp,
} from "firebase/app";

import { auth,db,firebaseConfig } from "../../config/firebase/firebase";
import type { Client } from "../../utils/types";

class ClientService {
  private collectionName = "clients";

  // Get all clients
  async getAllClients(): Promise<Client[]> {
      console.log("Current user:", auth.currentUser);
  console.log("Current UID:", auth.currentUser?.uid);
  console.log("Current email:", auth.currentUser?.email);
    const snapshot = await getDocs(
      collection(db, this.collectionName)
    );

    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    })) as Client[];
  }

//   async register(
//   name: string,
//   email: string,
//   password: string,
//   logo = ""
// ): Promise<void> {
//   const secondaryApp = initializeApp(
//     firebaseConfig,
//     `client-register-${Date.now()}`
//   );

//   const secondaryAuth = getAuth(secondaryApp);

//   try {
//     // Create client in temporary Auth instance
//     const credential =
//       await createUserWithEmailAndPassword(
//         secondaryAuth,
//         email.trim().toLowerCase(),
//         password
//       );

//     const uid = credential.user.uid;

//     // Main db remains authenticated as admin
//     await setDoc(
//       doc(db, this.collectionName, uid),
//       {
//         uid,
//         name: name.trim(),
//         email: email.trim().toLowerCase(),
//         logo: logo.trim(),
//         role: "client",
//         active: true,
//         onboarding: true,
//         createdAt: serverTimestamp(),
//         updatedAt: serverTimestamp(),
//       }
//     );

//     await signOut(secondaryAuth);
//   } catch (error) {
//     console.error(
//       "Failed to register client:",
//       error
//     );

//     throw error;
//   } finally {
//     await deleteApp(secondaryApp);
//   }
// }

async register(
  name: string,
  email: string,
  password: string,
  logo = ""
): Promise<void> {
  const secondaryApp = initializeApp(
    firebaseConfig,
    `client-register-${Date.now()}`
  );

  const secondaryAuth =
    getAuth(secondaryApp);

  try {
    const credential =
      await createUserWithEmailAndPassword(
        secondaryAuth,
        email.trim().toLowerCase(),
        password
      );

    const uid = credential.user.uid;

    await setDoc(
      doc(db, this.collectionName, uid),
      {
        uid,
        name: name.trim(),
        email: email
          .trim()
          .toLowerCase(),

        // S3 URL saved in Firestore
        logo: logo.trim(),

        role: "client",
        active: true,
        onboarding: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
    );

    await signOut(secondaryAuth);
  } catch (error) {
    console.error(
      "Failed to register client:",
      error
    );

    throw error;
  } finally {
    await deleteApp(secondaryApp);
  }
}

  // Complete onboarding / activate
  async completeOnboarding(id: string): Promise<void> {
    const clientRef = doc(
      db,
      this.collectionName,
      id
    );

    await updateDoc(clientRef, {
      onboarding: true,
      active: true,
      updatedAt: new Date(),
    });
  }

  // =========================
// GET SINGLE CLIENT
// =========================
async getClient(
  uid: string
): Promise<Client | null> {
  try {
    const clientRef = doc(
      db,
      this.collectionName,
      uid
    );

    const clientSnap = await getDoc(clientRef);

    if (!clientSnap.exists()) {
      return null;
    }

    return {
      id: clientSnap.id,
      ...clientSnap.data(),
    } as Client;
  } catch (error) {
    console.error(
      "Failed to get client:",
      error
    );

    throw error;
  }
}

  // Edit client
  // async editClient(
  //   id: string,
  //   data: Partial<Client>
  // ): Promise<void> {
  //   const clientRef = doc(
  //     db,
  //     this.collectionName,
  //     id
  //   );

  //   await updateDoc(clientRef, {
  //     ...data,
  //     updatedAt: new Date(),
  //   });
  // }

  async editClient(
  id: string,
  data: Partial<Client>
): Promise<void> {
  const clientRef = doc(
    db,
    this.collectionName,
    id
  );

  await updateDoc(clientRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

  // Block client
  async blockClient(id: string): Promise<void> {
    const clientRef = doc(
      db,
      this.collectionName,
      id
    );

    await updateDoc(clientRef, {
      active: false,
      updatedAt: new Date(),
    });
  }

  // Unblock client
  async unblockClient(id: string): Promise<void> {
    const clientRef = doc(
      db,
      this.collectionName,
      id
    );

    await updateDoc(clientRef, {
      active: true,
      updatedAt: new Date(),
    });
  }

  // Delete client
  // async deleteClient(id: string): Promise<void> {
  //   const clientRef = doc(
  //     db,
  //     this.collectionName,
  //     id
  //   );

  //   await deleteDoc(clientRef);
  // }

   // Delete client from both Auth and Firestore
  async deleteClient(id: string, email: string, password: string): Promise<void> {
    // 1. ALWAYS delete from Firestore first while admin Auth is still valid
    const clientRef = doc(db, this.collectionName, id);
    await deleteDoc(clientRef);

    // 2. Initialize secondary app to delete from Firebase Authentication
    const secondaryApp = initializeApp(
      firebaseConfig,
      `client-delete-${Date.now()}`
    );
    const secondaryAuth = getAuth(secondaryApp);

    try {
      // Sign into the secondary instance as the client to be deleted
      const credential = await signInWithEmailAndPassword(
        secondaryAuth,
        email.trim().toLowerCase(),
        password
      );

      // Safely delete the client's Auth account
      await deleteUser(credential.user);
    } catch (error) {
      console.error("Failed to delete client from Auth:", error);
      throw error;
    } finally {
      // Clean up the secondary app instance
      await deleteApp(secondaryApp);
    }
  }

}

export default new ClientService();