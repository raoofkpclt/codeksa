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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-md border border-white/10 bg-[#0c0c11] p-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex h-14 w-14 items-center justify-center border border-rose-500/20 bg-rose-500/10">
          <span className="text-2xl text-rose-400">!</span>
        </div>

        <h2 className="mt-6 text-2xl font-semibold text-white">
          Delete work
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-white/40">
          Are you sure you want to permanently delete{" "}
          <span className="font-medium text-white/90">{work.postName}</span>?
          The Firestore record and S3 media files will be removed.
        </p>

        {error && (
          <div className="mt-6 border border-rose-500/20 bg-rose-500/10 px-4 py-3">
            <p className="text-sm text-rose-400">{error}</p>
          </div>
        )}

        <div className="mt-10 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white/60 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => void onConfirm()}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-rose-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Deleting...
              </>
            ) : (
              "Delete work"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWorkModal;
