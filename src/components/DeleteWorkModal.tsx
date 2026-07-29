import type { Work } from "../utils/types";

type DeleteWorkModalProps = {
  work: Work;
  loading?: boolean;
  error?: string | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

const DeleteWorkModal = ({
  work,
  loading = false,
  error = null,
  onClose,
  onConfirm,
}: DeleteWorkModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111116] p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10">
          <span className="text-2xl text-rose-400">!</span>
        </div>

        <h2 className="mt-5 text-xl font-semibold text-white">Delete Work</h2>

        <p className="mt-2 text-sm leading-6 text-white/40">
          Are you sure you want to permanently delete{" "}
          <span className="font-semibold text-white">{work.postName}</span>? The
          Firestore record and S3 media files will be removed.
        </p>

        {error && (
          <div className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
            {error}
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-bold uppercase text-white/60 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={() => void onConfirm()}
            disabled={loading}
            className="rounded-xl bg-rose-600 px-4 py-3 text-xs font-bold uppercase text-white transition hover:bg-rose-500 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWorkModal;
