import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth, db } from "../../config/firebase/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

class ClientAuthService {
  async register(name: string, email: string, password: string) {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await setDoc(doc(db, "clients", credential.user.uid), {
      uid: credential.user.uid,
      name,
      email,
      role: "client",
      active: false,
      onboarding: false,
      createdAt: serverTimestamp(),
    });

    return credential;
  }

  async login(email: string, password: string) {
    const credential = await signInWithEmailAndPassword(auth, email, password);

    // Verify client document
    // (recommended: also check active status here)

    localStorage.setItem("clientToken", await credential.user.getIdToken());
    localStorage.setItem("role", "client");

    return credential;
  }

  async logout() {
    await signOut(auth);

    localStorage.removeItem("adminToken");
    localStorage.removeItem("clientToken");
    localStorage.removeItem("role");
  }
}

export default new ClientAuthService();
