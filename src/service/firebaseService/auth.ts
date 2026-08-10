import {
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase/firebase";

class AuthService {
  async login(email: string, password: string) {
    const credential = await signInWithEmailAndPassword(auth, email, password);

    const adminDoc = await getDoc(doc(db, "admins", credential.user.uid));

    if (!adminDoc.exists()) {
      await signOut(auth);

      localStorage.removeItem("adminToken");
      localStorage.removeItem("role");

      throw new Error("You are not authorized to access the admin panel.");
    }

    localStorage.setItem("adminToken", await credential.user.getIdToken());
    localStorage.setItem("role", "admin");

    return credential;
  }

  async logout() {
    await signOut(auth);

    localStorage.removeItem("adminToken");
    localStorage.removeItem("clientToken");
    localStorage.removeItem("role");
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const user = auth.currentUser;

    if (!user || !user.email) {
      throw new Error("No authenticated user found.");
    }

    // Re-authenticate first — Firebase blocks updatePassword otherwise
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    await updatePassword(user, newPassword);
  }
}

export default new AuthService();
