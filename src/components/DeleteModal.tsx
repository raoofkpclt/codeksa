import { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      <div
        className="w-full max-w-md border border-white/10 bg-[#0c0c11] p-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Delete client
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-white/40">
                Permanently remove this client's account.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="text-white/40 transition hover:text-white disabled:opacity-40"
            >
              ✕
            </button>
          </div>

          {/* Warning */}
          <div className="mb-6 border border-rose-500/20 bg-rose-500/10 px-4 py-3">
            <p className="text-sm font-medium text-rose-400">
              Permanent deletion
            </p>

            <p className="mt-1 text-xs leading-5 text-rose-300/60">
              This will delete the client from Firebase Authentication and
              Firestore. This action cannot be undone.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 border border-rose-500/20 bg-rose-500/10 px-4 py-3">
              <p className="text-sm text-rose-400">{error}</p>
            </div>
          )}

          {/* Fields */}
          <div className="space-y-6">
            {/* Client */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Client
              </label>

              <div className="flex items-center gap-4 border border-white/10 bg-white/[0.03] p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden bg-white">
                  <img
                    src={client.logo || "/logo.png"}
                    alt={client.name}
                    className="h-full w-full object-contain p-2"
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white/90">
                    {client.name}
                  </p>

                  <p className="mt-1 truncate text-xs text-white/35">
                    {client.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Client password <span className="text-rose-400">*</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter client password"
                  disabled={loading}
                  required
                  autoComplete="off"
                  className="w-full border border-white/10 bg-transparent px-4 py-3 pr-16 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-rose-500/60 disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-rose-400 transition hover:text-rose-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <p className="mt-2 text-xs text-white/25">
                Required to authenticate and delete the Firebase Auth
                account.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white/60 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="flex items-center justify-center gap-2 bg-rose-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Deleting...
                </>
              ) : (
                "Delete client"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteModal;
