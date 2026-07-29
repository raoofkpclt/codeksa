import { useEffect, useRef, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../config/firebase/firebase";

import ClientProfileService, {
  type ClientProfile,
} from "../../service/firebaseService/clientProfileService";

// =========================================
// Form Type
// =========================================

interface ProfileForm {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
}

// =========================================
// Default Form
// =========================================

const defaultForm: ProfileForm = {
  name: "",
  companyName: "",
  email: "",
  phone: "",
  address: "",
  website: "",
};

// =========================================
// Profile
// =========================================

const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [profile, setProfile] = useState<ClientProfile | null>(null);

  const [form, setForm] = useState<ProfileForm>(defaultForm);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);

  const [changingPassword, setChangingPassword] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // =======================================
  // Password Form
  // =======================================

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  // =======================================
  // Fetch Profile
  // =======================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await ClientProfileService.getProfile();

        setProfile(data);

        setForm({
          name: data.name || "",

          companyName: data.companyName || "",

          email: data.email || "",

          phone: data.phone || "",

          address: data.address || "",

          website: data.website || "",
        });
      } catch (error) {
        console.error("Profile fetch error:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load profile",
        );
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // =======================================
  // Form Change
  // =======================================

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
   
  };

  // =======================================
  // Save Profile
  // =======================================

  const handleSaveProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await ClientProfileService.updateProfile({
        name: form.name,
        companyName: form.companyName,
        phone: form.phone,
        address: form.address,
        website: form.website,
        
      });
      window.location.reload();

      setProfile((current) =>
        current
          ? {
              ...current,
              name: form.name,
              companyName: form.companyName,
              phone: form.phone,
              address: form.address,
              website: form.website,
            }
          : current,
      );

      setSuccess("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to update profile",
      );
    } finally {
      setSaving(false);
    }
  };

  // =======================================
  // Profile Image
  // =======================================

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploadingImage(true);
      setError("");
      setSuccess("");

      const uploaded = await ClientProfileService.uploadProfileImage(file);
window.location.reload();
      setProfile((current) =>
        current
          ? {
              ...current,
              profileImage: uploaded.url,
              profileImageKey: uploaded.key,
            }
          : current,
      );

      setSuccess("Profile image updated successfully.");
    } catch (error) {
      console.error("Image upload error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to upload image",
      );
    } finally {
      setUploadingImage(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // =======================================
  // Change Password
  // =======================================

  const handleChangePassword = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!currentPassword) {
      setError("Please enter your current password.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must contain at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password.");
      return;
    }

    try {
      setChangingPassword(true);

      await ClientProfileService.changePassword(currentPassword, newPassword);
window.location.reload();
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setSuccess("Password changed successfully.");
    } catch (error: unknown) {
      console.error("Password change error:", error);

      const firebaseError = error as {
        code?: string;
      };

      if (firebaseError.code === "auth/invalid-credential") {
        setError("Current password is incorrect.");
      } else if (firebaseError.code === "auth/wrong-password") {
        setError("Current password is incorrect.");
      } else if (firebaseError.code === "auth/weak-password") {
        setError("The new password is too weak.");
      } else if (firebaseError.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError(
          error instanceof Error ? error.message : "Failed to change password.",
        );
      }
    } finally {
      setChangingPassword(false);
    }
  };

  // =======================================
  // Initials
  // =======================================

  const getInitials = () => {
    const value = profile?.name || profile?.companyName || "C";

    return value
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  // =======================================
  // Loading
  // =======================================

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="animate-pulse space-y-6">
          <div className="h-40 border border-white/[0.08] bg-white/[0.03]" />

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <div className="h-80 border border-white/[0.08] bg-white/[0.03]" />

            <div className="h-[500px] border border-white/[0.08] bg-white/[0.03]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      {/* =================================
          Header
      ================================== */}

      <div className="relative overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[#8B5CF6]/10 via-white/[0.02] to-transparent p-6 sm:p-8">
        <span className="absolute -left-px -top-px h-3 w-3 border-l-[1.5px] border-t-[1.5px] border-[#8B5CF6]" />

        <span className="absolute -bottom-px -right-px h-3 w-3 border-b-[1.5px] border-r-[1.5px] border-[#8B5CF6]" />

        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
          Client Portal
        </p>

        <h1 className="mt-2 text-2xl font-black tracking-[-0.02em] sm:text-3xl">
          Profile Settings
        </h1>

        <p className="mt-2 max-w-xl text-sm text-white/40">
          Manage your personal details, profile image and account security.
        </p>
      </div>

      {/* =================================
          Messages
      ================================== */}

      {error && (
        <div className="flex items-center justify-between border border-red-500/20 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>

          <button
            type="button"
            onClick={() => setError("")}
            className="text-xs text-red-300 hover:text-red-200"
          >
            Close
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-center justify-between border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
          <p className="text-sm text-emerald-400">{success}</p>

          <button
            type="button"
            onClick={() => setSuccess("")}
            className="text-xs text-emerald-300 hover:text-emerald-200"
          >
            Close
          </button>
        </div>
      )}

      {/* =================================
          Main Profile Grid
      ================================== */}

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* ===============================
            Profile Image Card
        ================================ */}

        <aside className="h-fit border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.35)]">
  {/* Header */}
  <div className="border-b border-white/10 px-8 py-6">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B5CF6]">
      PROFILE PHOTO
    </p>

   

    
  </div>

  {/* Content */}
  <div className="p-8">
    <div className="flex flex-col items-center">
      <div className="relative">
        {profile?.logo ? (
          <img
            src={profile.logo}
            alt="Client profile"
            className="h-40 w-40 border-2 border-[#8B5CF6]/30 object-cover shadow-[0_0_30px_rgba(139,92,246,.15)]"
          />
        ) : (
          <div className="flex h-40 w-40 items-center justify-center border-2 border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-4xl font-black text-[#8B5CF6]">
            {getInitials()}
          </div>
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadingImage}
          className="absolute -bottom-3 -right-3 flex h-11 w-11 items-center justify-center border-2 border-[#111114] bg-[#8B5CF6] text-white transition-all duration-300 hover:bg-[#7C3AED] hover:shadow-[0_0_20px_rgba(139,92,246,.4)] disabled:opacity-50"
          aria-label="Change profile image"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImageChange}
        className="hidden"
      />

      <h3 className="mt-6 text-xl font-bold text-white">
        {profile?.name || "Client"}
      </h3>

      

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploadingImage}
        className="mt-8 h-12 w-full border border-[#8B5CF6] bg-[#8B5CF6] px-6 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#7C3AED] hover:shadow-[0_0_25px_rgba(139,92,246,.35)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploadingImage ? "Uploading..." : "Upload New Photo"}
      </button>

      <p className="mt-4 text-center text-xs leading-5 text-white/30">
        
        Maximum file size: <span className="text-white/60">5 MB</span>
      </p>
    </div>
  </div>
</aside>

        {/* ===============================
            Edit Profile
        ================================ */}

       <section className="border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.35)]">
  {/* Header */}
  <div className="border-b border-white/10 px-8 py-6">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B5CF6]">
      PERSONAL INFORMATION
    </p>

    <h2 className="mt-2 text-2xl font-bold text-white">
      Profile Details
    </h2>

    <p className="mt-2 text-sm text-white/40">
      Update your account information and keep your profile up to date.
    </p>
  </div>

  <form onSubmit={handleSaveProfile} className="p-8">
    <div className="grid gap-6 md:grid-cols-2">
      {/* Full Name */}
      <div>
        <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
          Full Name
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="h-12 w-full border border-white/10 bg-[#17171D] px-4 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-[#8B5CF6] focus:bg-[#1B1B24] focus:shadow-[0_0_20px_rgba(139,92,246,.15)]"
        />
      </div>

      {/* Email */}
      <div>
        <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          disabled
          className="h-12 w-full cursor-not-allowed border border-white/5 bg-[#141419] px-4 text-sm text-white/40 outline-none"
        />

        <p className="mt-2 text-xs text-white/25">
          Email address cannot be changed.
        </p>
      </div>
    </div>

    {/* Footer */}
    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
      <p className="text-sm text-white/35">
        Keep your profile information accurate for better communication.
      </p>

      <button
        type="submit"
        disabled={saving}
        className="h-12 border border-[#8B5CF6] bg-[#8B5CF6] px-8 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#7C3AED] hover:shadow-[0_0_25px_rgba(139,92,246,.35)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  </form>
</section>
      </div>

      {/* =================================
          Password Section
      ================================== */}

     <section className=" border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] backdrop-blur-xl shadow-xl">
  {/* Header */}
  <div className="border-b border-white/10 px-8 py-6">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B5CF6]">
      Account Security
    </p>

    <h2 className="mt-2 text-2xl font-bold text-white">
      Change Password
    </h2>

    <p className="mt-2 text-sm text-white/40">
      Keep your account secure by updating your password regularly.
    </p>
  </div>

  <form onSubmit={handleChangePassword} className="p-8">
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Current Password */}
      <div>
        <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
          Current Password
        </label>

        <div className="relative">
          <input
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            autoComplete="current-password"
            className="h-12 w-full  border border-white/10 bg-[#18181F] px-4 pr-14 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/10"
          />

          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#8B5CF6] transition hover:text-[#A78BFA]"
          >
            {showCurrentPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* New Password */}
      <div>
        <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
          New Password
        </label>

        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            autoComplete="new-password"
            className="h-12 w-full  border border-white/10 bg-[#18181F] px-4 pr-14 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/10"
          />

          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#8B5CF6] transition hover:text-[#A78BFA]"
          >
            {showNewPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
          Confirm Password
        </label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          autoComplete="new-password"
          className="h-12 w-full  border border-white/10 bg-[#18181F] px-4 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/10"
        />
      </div>
    </div>

    <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
      <p className="max-w-md text-sm text-white/40">
        Your password should be at least <span className="text-white">6 characters</span> long and contain a combination of letters, numbers, and symbols for better security.
      </p>

      <button
        type="submit"
        disabled={changingPassword}
        className="inline-flex h-10 items-center justify-center  bg-[#8B5CF6] px-8 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#7C3AED] hover:shadow-[0_0_25px_rgba(139,92,246,.35)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {changingPassword ? "Updating Password..." : "UPDATE PASSWORD"}
      </button>
    </div>
  </form>
</section>
    </div>
  );
};

export default Profile;
