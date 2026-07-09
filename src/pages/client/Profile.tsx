import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
} from "../../config/firebase/firebase";

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
  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const [profile, setProfile] =
    useState<ClientProfile | null>(
      null
    );

  const [form, setForm] =
    useState<ProfileForm>(
      defaultForm
    );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [
    uploadingImage,
    setUploadingImage,
  ] = useState(false);

  const [
    changingPassword,
    setChangingPassword,
  ] = useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =======================================
  // Password Form
  // =======================================

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showCurrentPassword,
    setShowCurrentPassword,
  ] = useState(false);

  const [
    showNewPassword,
    setShowNewPassword,
  ] = useState(false);

  // =======================================
  // Fetch Profile
  // =======================================

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {
          if (!user) {
            setLoading(false);
            return;
          }

          try {
            setLoading(true);
            setError("");

            const data =
              await ClientProfileService.getProfile();

            setProfile(data);

            setForm({
              name:
                data.name || "",

              companyName:
                data.companyName || "",

              email:
                data.email || "",

              phone:
                data.phone || "",

              address:
                data.address || "",

              website:
                data.website || "",
            });
          } catch (error) {
            console.error(
              "Profile fetch error:",
              error
            );

            setError(
              error instanceof Error
                ? error.message
                : "Failed to load profile"
            );
          } finally {
            setLoading(false);
          }
        }
      );

    return () => unsubscribe();
  }, []);

  // =======================================
  // Form Change
  // =======================================

  const handleChange = (
    event:
      React.ChangeEvent<
        HTMLInputElement |
        HTMLTextAreaElement
      >
  ) => {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =======================================
  // Save Profile
  // =======================================

  const handleSaveProfile =
    async (
      event:
        React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      try {
        setSaving(true);
        setError("");
        setSuccess("");

        await ClientProfileService.updateProfile(
          {
            name: form.name,
            companyName:
              form.companyName,
            phone: form.phone,
            address: form.address,
            website: form.website,
          }
        );

        setProfile((current) =>
          current
            ? {
                ...current,
                name: form.name,
                companyName:
                  form.companyName,
                phone: form.phone,
                address:
                  form.address,
                website:
                  form.website,
              }
            : current
        );

        setSuccess(
          "Profile updated successfully."
        );
      } catch (error) {
        console.error(
          "Profile update error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to update profile"
        );
      } finally {
        setSaving(false);
      }
    };

  // =======================================
  // Profile Image
  // =======================================

  const handleImageChange =
    async (
      event:
        React.ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        event.target.files?.[0];

      if (!file) return;

      try {
        setUploadingImage(true);
        setError("");
        setSuccess("");

        const uploaded =
          await ClientProfileService.uploadProfileImage(
            file
          );

        setProfile((current) =>
          current
            ? {
                ...current,
                profileImage:
                  uploaded.url,
                profileImageKey:
                  uploaded.key,
              }
            : current
        );

        setSuccess(
          "Profile image updated successfully."
        );
      } catch (error) {
        console.error(
          "Image upload error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to upload image"
        );
      } finally {
        setUploadingImage(false);

        if (
          fileInputRef.current
        ) {
          fileInputRef.current.value =
            "";
        }
      }
    };

  // =======================================
  // Change Password
  // =======================================

  const handleChangePassword =
    async (
      event:
        React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      setError("");
      setSuccess("");

      if (!currentPassword) {
        setError(
          "Please enter your current password."
        );
        return;
      }

      if (
        newPassword.length < 6
      ) {
        setError(
          "New password must contain at least 6 characters."
        );
        return;
      }

      if (
        newPassword !==
        confirmPassword
      ) {
        setError(
          "New passwords do not match."
        );
        return;
      }

      if (
        currentPassword ===
        newPassword
      ) {
        setError(
          "New password must be different from current password."
        );
        return;
      }

      try {
        setChangingPassword(true);

        await ClientProfileService.changePassword(
          currentPassword,
          newPassword
        );

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setSuccess(
          "Password changed successfully."
        );
      } catch (error: unknown) {
        console.error(
          "Password change error:",
          error
        );

        const firebaseError =
          error as {
            code?: string;
          };

        if (
          firebaseError.code ===
          "auth/invalid-credential"
        ) {
          setError(
            "Current password is incorrect."
          );
        } else if (
          firebaseError.code ===
          "auth/wrong-password"
        ) {
          setError(
            "Current password is incorrect."
          );
        } else if (
          firebaseError.code ===
          "auth/weak-password"
        ) {
          setError(
            "The new password is too weak."
          );
        } else if (
          firebaseError.code ===
          "auth/too-many-requests"
        ) {
          setError(
            "Too many attempts. Please try again later."
          );
        } else {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to change password."
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
    const value =
      profile?.name ||
      profile?.companyName ||
      "C";

    return value
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) =>
        word.charAt(0)
      )
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
          Manage your personal details,
          profile image and account security.
        </p>
      </div>

      {/* =================================
          Messages
      ================================== */}

      {error && (
        <div className="flex items-center justify-between border border-red-500/20 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-400">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
            className="text-xs text-red-300 hover:text-red-200"
          >
            Close
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-center justify-between border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
          <p className="text-sm text-emerald-400">
            {success}
          </p>

          <button
            type="button"
            onClick={() =>
              setSuccess("")
            }
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

        <aside className="h-fit border border-white/[0.08] bg-white/[0.03] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
            Profile Photo
          </p>

          <div className="mt-6 flex flex-col items-center">
            <div className="relative">
              {profile?.profileImage ? (
                <img
                  src={
                    profile.profileImage
                  }
                  alt="Client profile"
                  className="h-28 w-28 rounded-full border-2 border-[#8B5CF6]/30 object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-2xl font-black text-[#8B5CF6]">
                  {getInitials()}
                </div>
              )}

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                disabled={
                  uploadingImage
                }
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#111114] bg-[#8B5CF6] text-white transition hover:bg-[#7C3AED] disabled:opacity-50"
                aria-label="Change profile image"
              >
                <svg
                  width="15"
                  height="15"
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
              onChange={
                handleImageChange
              }
              className="hidden"
            />

            <h2 className="mt-4 text-center text-base font-bold text-white">
              {profile?.name ||
                "Client"}
            </h2>

            <p className="mt-1 text-center text-[11px] text-white/35">
              {profile?.companyName ||
                "Company"}
            </p>

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              disabled={
                uploadingImage
              }
              className="mt-5 w-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white/60 transition hover:border-[#8B5CF6]/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploadingImage
                ? "Uploading..."
                : "Change Photo"}
            </button>

            <p className="mt-3 text-center text-[9px] leading-4 text-white/25">
              JPG, PNG or WebP.
              Maximum 5 MB.
            </p>
          </div>
        </aside>

        {/* ===============================
            Edit Profile
        ================================ */}

        <section className="border border-white/[0.08] bg-white/[0.03]">
          <div className="border-b border-white/[0.08] px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
              Personal Information
            </p>

            <p className="mt-1 text-[11px] text-white/25">
              Update your client profile
              details.
            </p>
          </div>

          <form
            onSubmit={
              handleSaveProfile
            }
            className="p-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}

              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={
                    handleChange
                  }
                  placeholder="Your name"
                  className="w-full border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#8B5CF6]/50"
                />
              </div>

              {/* Company */}

              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  value={
                    form.companyName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Company name"
                  className="w-full border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#8B5CF6]/50"
                />
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  disabled
                  className="w-full cursor-not-allowed border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white/35 outline-none"
                />

                <p className="mt-1.5 text-[9px] text-white/20">
                  Email cannot be changed
                  here.
                </p>
              </div>

              {/* Phone */}

              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={
                    handleChange
                  }
                  placeholder="+91 98765 43210"
                  className="w-full border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#8B5CF6]/50"
                />
              </div>

              {/* Website */}

              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">
                  Website
                </label>

                <input
                  type="url"
                  name="website"
                  value={form.website}
                  onChange={
                    handleChange
                  }
                  placeholder="https://example.com"
                  className="w-full border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#8B5CF6]/50"
                />
              </div>

              {/* Address */}

              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={
                    handleChange
                  }
                  placeholder="Your address"
                  className="w-full border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#8B5CF6]/50"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t border-white/[0.06] pt-5">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#8B5CF6] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#7C3AED] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* =================================
          Password Section
      ================================== */}

      <section className="border border-white/[0.08] bg-white/[0.03]">
        <div className="border-b border-white/[0.08] px-5 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
            Account Security
          </p>

          <p className="mt-1 text-[11px] text-white/25">
            Verify your current password
            before setting a new password.
          </p>
        </div>

        <form
          onSubmit={
            handleChangePassword
          }
          className="p-5"
        >
          <div className="grid gap-5 md:grid-cols-3">
            {/* Current Password */}

            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">
                Current Password
              </label>

              <div className="relative">
                <input
                  type={
                    showCurrentPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    currentPassword
                  }
                  onChange={(event) =>
                    setCurrentPassword(
                      event.target.value
                    )
                  }
                  autoComplete="current-password"
                  placeholder="Current password"
                  className="w-full border border-white/[0.1] bg-white/[0.03] px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#8B5CF6]/50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(
                      (value) => !value
                    )
                  }
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-white/30 transition hover:text-white/70"
                >
                  {showCurrentPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </div>

            {/* New Password */}

            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">
                New Password
              </label>

              <div className="relative">
                <input
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(
                      event.target.value
                    )
                  }
                  autoComplete="new-password"
                  placeholder="New password"
                  className="w-full border border-white/[0.1] bg-white/[0.03] px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#8B5CF6]/50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      (value) => !value
                    )
                  }
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[9px] font-semibold uppercase text-white/30 transition hover:text-white/70"
                >
                  {showNewPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}

            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">
                Confirm Password
              </label>

              <input
                type="password"
                value={
                  confirmPassword
                }
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
                autoComplete="new-password"
                placeholder="Confirm password"
                className="w-full border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#8B5CF6]/50"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
            <p className="text-[10px] text-white/25">
              Use at least 6 characters.
              A longer unique password is
              recommended.
            </p>

            <button
              type="submit"
              disabled={
                changingPassword
              }
              className="shrink-0 border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#a78bfa] transition hover:bg-[#8B5CF6]/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {changingPassword
                ? "Updating..."
                : "Change Password"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Profile;