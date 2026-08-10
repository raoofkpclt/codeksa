import { useState } from "react";
import AuthService from "../../service/firebaseService/auth"; // adjust path to match your project

export default function Profile() {
  const [fullName, setFullName] = useState("Dalia Saleh");
  const [company, setCompany] = useState("CODE");
  const [email] = useState("daliasaleh@codeksa.onmicrosoft.com");
  const [memberSince] = useState("31 Jul 2026");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savingDetails, setSavingDetails] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleSaveDetails = async () => {
    setSavingDetails(true);
    try {
      // wire up to your admin doc update call
      // await AuthService.updateDetails({ fullName, company });
    } finally {
      setSavingDetails(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }

    setChangingPassword(true);
    try {
      await AuthService.changePassword(currentPassword, newPassword);
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : "Could not change password."
      );
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* Sidebar */}

        {/* Main content */}
        <main className="flex-1 px-10 py-14 sm:px-14 lg:px-20">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8468FF]">
  Administrator Profile
</p>

          <h1 className="mt-5 text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl">
  <span className="font-light">How you appear </span>
  <span className="font-semibold">in CODE</span>
  <br />
  <span className="font-semibold">
    Hub<span className="align-super text-sm sm:text-base">™</span>
  </span>
  <span className="font-semibold">.</span>
</h1>

          <p className="mt-5 text-[15px] text-zinc-400">{email}</p>

          <div className="mt-12 border-t border-zinc-800" />

          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Details */}
            <section className="border border-zinc-800 p-9">
              <h2 className="text-[34px] font-semibold leading-none">
                Details
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Name and organisation.
              </p>

              <div className="mt-9 space-y-7">
                <Field label="Full name" required>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-zinc-700 bg-transparent px-4 py-3.5 text-[15px] text-white outline-none transition-colors focus:border-violet-500"
                  />
                </Field>

                <Field label="Company">
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full border border-zinc-700 bg-transparent px-4 py-3.5 text-[15px] text-white outline-none transition-colors focus:border-violet-500"
                  />
                </Field>
              </div>

              <button
                type="button"
                onClick={handleSaveDetails}
                disabled={savingDetails}
                className="mt-9 bg-violet-600 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-violet-500 disabled:opacity-50"
              >
                {savingDetails ? "Saving…" : "Save changes"}
              </button>
            </section>

            {/* Access */}
            <section className="flex flex-col border border-zinc-800 p-9">
              <h2 className="text-[34px] font-semibold leading-none">
                Access
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Change the password you use to sign in.
              </p>

              <div className="mt-9 space-y-7">
                <Field label="Current password">
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full border border-zinc-700 bg-transparent px-4 py-3.5 text-[15px] text-white outline-none transition-colors focus:border-violet-500"
                  />
                </Field>

                <Field label="New password" required>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-zinc-700 bg-transparent px-4 py-3.5 text-[15px] text-white outline-none transition-colors focus:border-violet-500"
                  />
                  <p className="mt-2.5 text-[13px] text-zinc-500">
                    Minimum 8 characters.
                  </p>
                </Field>

                {passwordError && (
                  <p className="text-[13px] text-red-400">{passwordError}</p>
                )}
                {passwordSuccess && (
                  <p className="text-[13px] text-emerald-400">
                    Password changed.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleChangePassword}
                disabled={changingPassword || !newPassword}
                className="mt-9 border border-zinc-700 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 transition-colors enabled:hover:border-zinc-500 enabled:hover:text-white disabled:cursor-not-allowed"
              >
                {changingPassword ? "Changing…" : "Change password"}
              </button>

              <div className="mt-auto pt-14">
                <div className="border-t border-zinc-800 pt-6">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                    Member since
                  </p>
                  <p className="mt-1.5 text-[15px] text-white">
                    {memberSince}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        {label} {required && <span className="text-violet-500">*</span>}
      </span>
      <div className="mt-2.5">{children}</div>
    </label>
  );
}
