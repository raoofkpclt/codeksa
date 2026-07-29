import {  useState } from "react";
import type { Client } from "../utils/types";

type DeleteModalProps = {
  client: Client;
  loading?: boolean;
  error?: string | null;
  onClose: () => void;
  onConfirm: (password: string) => Promise<void>;
};
const DeleteModal = ({
  client,
  loading = false,
  error = null,
  onClose,
  onConfirm,
}: DeleteModalProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

 

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!password.trim()) return;

    await onConfirm(password);
  };

  const handleClose = () => {
    if (loading) return;

    setPassword("");
    setShowPassword(false);

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#111116] shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-start justify-between border-b border-white/10 p-6">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Delete Client
              </h2>

              <p className="mt-1 text-sm text-white/40">
                Permanently remove client account.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="space-y-5 p-6">
            {/* Warning */}
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4">
              <p className="text-sm font-medium text-rose-400">
                Permanent deletion
              </p>

              <p className="mt-1 text-xs leading-5 text-rose-300/60">
                This will delete the client from Firebase
                Authentication and Firestore. This action
                cannot be undone.
              </p>
            </div>

            {/* Client */}
            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
                <img
                  src={client.logo || "/logo.png"}
                  alt={client.name}
                  className="h-full w-full object-contain p-2"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {client.name}
                </p>

                <p className="mt-1 truncate text-xs text-white/40">
                  {client.email}
                </p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3">
                <p className="text-sm text-rose-400">
                  {error}
                </p>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Client Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter client password"
                  disabled={loading}
                  required
                  autoComplete="off"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-rose-500/60 focus:bg-white/[0.06] disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-rose-400 transition hover:text-rose-300"
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>

              <p className="mt-2 text-xs text-white/30">
                Required to authenticate and delete the
                Firebase Auth account.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-white/10 p-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white/60 transition hover:bg-white/[0.08] hover:text-white disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                !password.trim()
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  Deleting...
                </>
              ) : (
                "Delete Client"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteModal;