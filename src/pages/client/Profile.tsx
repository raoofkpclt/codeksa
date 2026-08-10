import { useEffect, useState } from "react";

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
  company: string;
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
  company: "",
  email: "",
  phone: "",
  address: "",
  website: "",
};

// =========================================
// Helpers
// =========================================

const formatMemberSince = (value: unknown) => {
  if (!value) return "—";

  try {
    if (
      typeof value === "object" &&
      value !== null &&
      "toDate" in value &&
      typeof (value as { toDate?: unknown }).toDate === "function"
    ) {
      return (value as { toDate: () => Date })
        .toDate()
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
    }

    return new Date(value as string).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
};

// =========================================
// Profile
// =========================================

const Profile = () => {
  const [profile, setProfile] = useState<ClientProfile | null>(null);

  const [form, setForm] = useState<ProfileForm>(defaultForm);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [changingPassword, setChangingPassword] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // =======================================
  // Password Form
  // =======================================

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

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

          company: data.company|| "",

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

  const handleSaveProfile = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await ClientProfileService.updateProfile({
        name: form.name,
        company: form.company,
        phone: form.phone,
        address: form.address,
        website: form.website,
      });

      setProfile((current) =>
        current
          ? {
              ...current,
              name: form.name,
              companyName: form.company,
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

    if (newPassword.length < 8) {
      setError("New password must contain at least 8 characters.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password.");
      return;
    }

    try {
      setChangingPassword(true);

      await ClientProfileService.changePassword(currentPassword, newPassword);

      setCurrentPassword("");
      setNewPassword("");

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
          error instanceof Error
            ? error.message
            : "Failed to change password.",
        );
      }
    } finally {
      setChangingPassword(false);
    }
  };

  // =======================================
  // Loading
  // =======================================

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="animate-pulse space-y-6">
          <div className="h-32 border border-white/[0.08] bg-white/[0.03]" />

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="h-96 border border-white/[0.08] bg-white/[0.03]" />
            <div className="h-96 border border-white/[0.08] bg-white/[0.03]" />
          </div>
        </div>
      </div>
    );
  }

  const passwordButtonEnabled =
    !!currentPassword && newPassword.length >= 8 && !changingPassword;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 font-['Space_Grotesk',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        :root {
          --charcoal: #151518;
          --graphite: #1E1F24;
          --steel: #2B2C31;
          --slate-muted: #7D7D86;
          --mist: #D8D8DE;
          --code-white: #FFFFFF;
          --code-purple: #6F4BFF;
          --code-electric: #8468FF;
          --violet-glow: #9B83FF;
        }

        body {
          font-family: 'Space Grotesk', sans-serif;
        }

        * { font-synthesis: none; }
      `}</style>

      {/* =================================
          Hero
      ================================== */}

      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8468FF]">
          your profile
        </p>

        <h1 className="mt-3 max-w-2xl text-4xl font-light leading-[1.15] tracking-[-0.02em] text-white sm:text-[42px]">
          How you appear{" "}
          <span className="font-bold">
            in CODE Hub<sup className="text-[0.5em]">™</sup>.
          </span>
        </h1>

        <p className="mt-4 text-sm text-white/40">{form.email}</p>
      </div>

      <div className="border-t border-white/[0.08]" />

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
          Details + Access
      ================================== */}

      <div className="grid gap-10 lg:grid-cols-2">
        {/* =============== Details =============== */}

        <div>
          <h2 className="text-3xl font-light text-white">Details</h2>
          <p className="mt-2 text-sm text-white/40">Name and organisation.</p>

          <form onSubmit={handleSaveProfile} className="mt-8 flex flex-col gap-6">
            <div>
              <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                Full Name <span className="text-[#8468FF]">*</span>
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-white/[0.1] bg-transparent px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#8468FF]/50"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                Company
              </label>

              <input
                type="text"
                name="companyName"
                value={form.company}
                onChange={handleChange}
                className="w-full border border-white/[0.1] bg-transparent px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#8468FF]/50"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-2 w-fit border border-[#8468FF] bg-[#8468FF] px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#6F4BFF] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* =============== Access =============== */}

        <div>
          <h2 className="text-3xl font-light text-white">Access</h2>
          <p className="mt-2 text-sm text-white/40">
            Change the password you use to sign in.
          </p>

          <form
            onSubmit={handleChangePassword}
            className="mt-8 flex flex-col gap-6"
          >
            <div>
              <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                Current Password <span className="text-[#8468FF]">*</span>
              </label>

              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full border border-white/[0.1] bg-transparent px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#8468FF]/50"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                New Password <span className="text-[#8468FF]">*</span>
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full border border-white/[0.1] bg-transparent px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#8468FF]/50"
              />

              <p className="mt-2 text-[11px] text-white/30">
                Minimum 8 characters.
              </p>
            </div>

            <button
              type="submit"
              disabled={!passwordButtonEnabled}
              className={`w-fit border px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] transition ${
                passwordButtonEnabled
                  ? "border-[#8468FF] text-white hover:bg-[#8468FF]/10"
                  : "border-white/10 text-white/25"
              }`}
            >
              {changingPassword ? "Updating..." : "Change Password"}
            </button>
          </form>

          <div className="mt-10 border-t border-white/[0.08] pt-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
              Member Since
            </p>
            <p className="mt-2 text-sm text-white/70">
              {formatMemberSince(
                (profile as unknown as { createdAt?: unknown })?.createdAt,
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
