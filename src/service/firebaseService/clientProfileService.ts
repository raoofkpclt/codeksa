import {
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

import { auth, db } from "../../config/firebase/firebase";

// Change this import to your existing S3 helper
import S3Service from "../s3Service/workMediaService";

// =========================================
// Types
// =========================================

export interface ClientProfile {
  id: string;

  name: string;
  companyName: string;
  email: string;
  phone: string;

  address?: string;
  website?: string;

  profileImage?: string;
  profileImageKey?: string;

  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface UpdateClientProfileData {
  name: string;
  companyName: string;
  phone: string;
  address?: string;
  website?: string;
}

// =========================================
// Client Profile Service
// =========================================

class ClientProfileService {
  private collectionName = "clients";

  // =======================================
  // Current User
  // =======================================

  private getCurrentUser() {
    const user = auth.currentUser;

    if (!user) {
      throw new Error(
        "Client is not authenticated"
      );
    }

    return user;
  }

  // =======================================
  // Get Profile
  // =======================================

  async getProfile(): Promise<ClientProfile> {
    const user = this.getCurrentUser();

    const clientRef = doc(
      db,
      this.collectionName,
      user.uid
    );

    const snapshot =
      await getDoc(clientRef);

    if (!snapshot.exists()) {
      throw new Error(
        "Client profile not found"
      );
    }

    const data = snapshot.data();

    return {
      id: snapshot.id,

      name:
        data.name ||
        data.clientName ||
        "",

      companyName:
        data.companyName ||
        "",

      email:
        data.email ||
        user.email ||
        "",

      phone:
        data.phone ||
        data.phoneNumber ||
        "",

      address:
        data.address || "",

      website:
        data.website || "",

      profileImage:
        data.profileImage ||
        data.profileImageUrl ||
        "",

      profileImageKey:
        data.profileImageKey ||
        "",

      createdAt:
        data.createdAt,

      updatedAt:
        data.updatedAt,
    };
  }

  // =======================================
  // Update Profile
  // =======================================

  async updateProfile(
    profileData: UpdateClientProfileData
  ): Promise<void> {
    const user = this.getCurrentUser();

    const clientRef = doc(
      db,
      this.collectionName,
      user.uid
    );

    await updateDoc(clientRef, {
      name:
        profileData.name.trim(),

      companyName:
        profileData.companyName.trim(),

      phone:
        profileData.phone.trim(),

      address:
        profileData.address?.trim() ||
        "",

      website:
        profileData.website?.trim() ||
        "",

      updatedAt:
        serverTimestamp(),
    });
  }

  // =======================================
  // Upload Profile Image
  // =======================================

  async uploadProfileImage(
    file: File
  ): Promise<{
    url: string;
    key: string;
  }> {
    const user = this.getCurrentUser();

    // Validate image
    if (
      !file.type.startsWith("image/")
    ) {
      throw new Error(
        "Please select a valid image"
      );
    }

    // 5 MB max
    if (
      file.size >
      5 * 1024 * 1024
    ) {
      throw new Error(
        "Image size must be below 5 MB"
      );
    }

    // =====================================
    // IMPORTANT:
    // Adapt this method call to your
    // existing S3 service.
    // =====================================

    const folder =
      `clients/profile/${user.uid}`;

    const uploaded =
      await S3Service.uploadFile(
        file,
        folder
      );

    /*
      Expected uploaded result:

      {
        url: "https://...",
        key: "clients/profile/uid/image.jpg"
      }
    */

    const clientRef = doc(
      db,
      this.collectionName,
      user.uid
    );

    await updateDoc(clientRef, {
      profileImage:
        uploaded.url,

      profileImageKey:
        uploaded.key,

      updatedAt:
        serverTimestamp(),
    });

    return {
      url: uploaded.url,
      key: uploaded.key,
    };
  }

  // =======================================
  // Change Password
  // =======================================

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = this.getCurrentUser();

    if (!user.email) {
      throw new Error(
        "No email is associated with this account"
      );
    }

    if (!currentPassword) {
      throw new Error(
        "Current password is required"
      );
    }

    if (
      newPassword.length < 6
    ) {
      throw new Error(
        "New password must contain at least 6 characters"
      );
    }

    // Create Firebase credential
    const credential =
      EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

    // Verify current password
    await reauthenticateWithCredential(
      user,
      credential
    );

    // Change password
    await updatePassword(
      user,
      newPassword
    );
  }
}

export default new ClientProfileService();