import { useState } from "react";

import type { Work, WorkMedia, WorkStatus } from "../utils/types";

import WorkMediaService from "../service/s3Service/workMediaService";

type EditWorkModalProps = {
  isOpen: boolean;
  work: Work | null;
  loading: boolean;
  onClose: () => void;

  onSave: (updatedData: Partial<Work>) => Promise<void>;
};

const EditWorkModal = ({
  isOpen,
  work,
  loading,
  onClose,
  onSave,
}: EditWorkModalProps) => {
  const [postName, setPostName] = useState(() => work?.postName ?? "");
  const [description, setDescription] = useState(() => work?.description ?? "");
  const [postingDate, setPostingDate] = useState(() => work?.postingDate ?? "");
  const [status, setStatus] = useState<WorkStatus>(
    () => work?.status ?? "sent_to_client",
  );
  const [existingMedia, setExistingMedia] = useState<WorkMedia[]>(
    () => work?.media ?? [],
  );

  const [newFiles, setNewFiles] = useState<File[]>([]);

  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !work) {
    return null;
  }

  const busy = loading || uploading;

  const handleNewFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []);

    if (work.postType === "reel") {
      if (selected.length > 1) {
        setError("Only one reel video is allowed.");
        return;
      }

      if (selected.some((file) => !file.type.startsWith("video/"))) {
        setError("Please select a valid video.");
        return;
      }
    }

    if (work.postType === "poster") {
      if (selected.some((file) => !file.type.startsWith("image/"))) {
        setError("Poster media must be images.");
        return;
      }
    }

    setError(null);
    setNewFiles(selected);
  };

  const removeExistingMedia = (index: number) => {
    setExistingMedia((prev) =>
      prev.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const removeNewFile = (index: number) => {
    setNewFiles((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!postName.trim()) {
      setError("Post name is required.");
      return;
    }

    if (!postingDate) {
      setError("Posting date is required.");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      let uploadedMedia: WorkMedia[] = [];

      if (
        newFiles.length > 0 &&
        (work.postType === "poster" || work.postType === "reel")
      ) {
        uploadedMedia = await WorkMediaService.uploadMultipleFiles(
          newFiles,
          work.clientId,
          work.postType,
        );
      }

      const finalMedia = [...existingMedia, ...uploadedMedia];

      if (finalMedia.length === 0) {
        setError("At least one media file is required.");

        return;
      }

      await onSave({
        postName: postName.trim(),

        description: description.trim(),

        postingDate,

        status,

        media: finalMedia,
      });
    } catch (error: unknown) {
      console.error("Failed to edit work:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to update work.");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    if (busy) return;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto border border-white/10 bg-[#0c0c11] p-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Edit work</h2>

              <p className="mt-2 text-sm leading-relaxed text-white/40">
                Update post information and media.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={busy}
              className="text-white/40 transition hover:text-white disabled:opacity-40"
            >
              ✕
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 border border-rose-500/20 bg-rose-500/10 px-4 py-3">
              <p className="text-sm text-rose-400">{error}</p>
            </div>
          )}

          {/* Fields */}
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                  Client
                </label>

                <input
                  value={work.clientName}
                  disabled
                  className="w-full cursor-not-allowed border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-white/40 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                  Type
                </label>

                <input
                  value={work.postType}
                  disabled
                  className="w-full cursor-not-allowed border border-white/5 bg-white/[0.02] px-4 py-3 text-sm capitalize text-white/40 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Post name <span className="text-violet-400">*</span>
              </label>

              <input
                value={postName}
                onChange={(event) => setPostName(event.target.value)}
                disabled={busy}
                className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500/60 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                disabled={busy}
                className="w-full resize-none border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500/60 disabled:opacity-50"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                  Posting date <span className="text-violet-400">*</span>
                </label>

                <input
                  type="date"
                  value={postingDate}
                  onChange={(event) => setPostingDate(event.target.value)}
                  disabled={busy}
                  className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition [color-scheme:dark] focus:border-violet-500/60 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as WorkStatus)
                  }
                  disabled={busy}
                  className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500/60 disabled:opacity-50"
                >
                  <option value="sent_to_client" className="bg-[#0c0c11]">
                    Sent to Client
                  </option>

                  <option value="requested_to_edit" className="bg-[#0c0c11]">
                    Requested to Edit
                  </option>

                  <option value="approved" className="bg-[#0c0c11]">
                    Approved
                  </option>

                  <option value="rejected" className="bg-[#0c0c11]">
                    Rejected
                  </option>
                </select>
              </div>
            </div>

            {/* Existing Media */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Current media
              </label>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {existingMedia.map((media, index) => (
                  <div
                    key={`${media.key}-${index}`}
                    className="relative overflow-hidden border border-white/10 bg-black"
                  >
                    {work.postType === "poster" ? (
                      <img
                        src={media.url}
                        alt={media.fileName}
                        className="h-40 w-full object-cover"
                      />
                    ) : (
                      <video
                        src={media.url}
                        controls
                        className="h-40 w-full object-cover"
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => removeExistingMedia(index)}
                      className="absolute right-2 top-2 border border-rose-500/20 bg-black/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-rose-400 transition hover:bg-rose-500/20"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* New Media */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Add new media
              </label>

              <input
                type="file"
                accept={work.postType === "poster" ? "image/*" : "video/*"}
                multiple={work.postType === "poster"}
                onChange={handleNewFiles}
                disabled={busy}
                className="w-full border border-dashed border-white/15 bg-white/[0.03] p-4 text-sm text-white/50 file:mr-4 file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:text-[10px] file:font-bold file:uppercase file:tracking-[0.1em] file:text-white"
              />

              {newFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {newFiles.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between gap-3 border border-white/10 bg-white/[0.03] p-3"
                    >
                      <span className="truncate text-xs text-white/70">
                        {file.name}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeNewFile(index)}
                        className="border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-[10px] font-bold uppercase text-rose-400"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={busy}
              className="border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white/60 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={busy}
              className="flex items-center justify-center gap-2 bg-violet-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Uploading...
                </>
              ) : loading ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWorkModal;
