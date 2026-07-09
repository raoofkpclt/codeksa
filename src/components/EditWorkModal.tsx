import {
  useEffect,
  useState,
} from "react";

import type {
  Work,
  WorkMedia,
  WorkStatus,
} from "../utils/types";

import WorkMediaService from "../service/s3Service/workMediaService";

type EditWorkModalProps = {
  isOpen: boolean;
  work: Work | null;
  loading: boolean;
  onClose: () => void;

  onSave: (
    updatedData: Partial<Work>
  ) => Promise<void>;
};

const EditWorkModal = ({
  isOpen,
  work,
  loading,
  onClose,
  onSave,
}: EditWorkModalProps) => {
  const [postName, setPostName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [postingDate, setPostingDate] =
    useState("");

  const [status, setStatus] =
    useState<WorkStatus>(
      "sent_to_client"
    );

  const [existingMedia, setExistingMedia] =
    useState<WorkMedia[]>([]);

  const [newFiles, setNewFiles] =
    useState<File[]>([]);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!work) return;

    setPostName(work.postName || "");
    setDescription(
      work.description || ""
    );
    setPostingDate(
      work.postingDate || ""
    );
    setStatus(
      work.status ||
        "sent_to_client"
    );
    setExistingMedia(
      work.media || []
    );
    setNewFiles([]);
    setError(null);
  }, [work, isOpen]);

  if (!isOpen || !work) {
    return null;
  }

  const busy =
    loading || uploading;

  const handleNewFiles = (
    event:
      React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected =
      Array.from(
        event.target.files || []
      );

    if (work.postType === "reel") {
      if (selected.length > 1) {
        setError(
          "Only one reel video is allowed."
        );
        return;
      }

      if (
        selected.some(
          (file) =>
            !file.type.startsWith(
              "video/"
            )
        )
      ) {
        setError(
          "Please select a valid video."
        );
        return;
      }
    }

    if (work.postType === "poster") {
      if (
        selected.some(
          (file) =>
            !file.type.startsWith(
              "image/"
            )
        )
      ) {
        setError(
          "Poster media must be images."
        );
        return;
      }
    }

    setError(null);
    setNewFiles(selected);
  };

  const removeExistingMedia = (
    index: number
  ) => {
    setExistingMedia((prev) =>
      prev.filter(
        (_, itemIndex) =>
          itemIndex !== index
      )
    );
  };

  const removeNewFile = (
    index: number
  ) => {
    setNewFiles((prev) =>
      prev.filter(
        (_, itemIndex) =>
          itemIndex !== index
      )
    );
  };

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!postName.trim()) {
      setError(
        "Post name is required."
      );
      return;
    }

    if (!postingDate) {
      setError(
        "Posting date is required."
      );
      return;
    }

    try {
      setUploading(true);
      setError(null);

      let uploadedMedia: WorkMedia[] =
        [];

      if (newFiles.length > 0) {
        uploadedMedia =
          await WorkMediaService
            .uploadMultipleFiles(
              newFiles,
              work.clientId,
              work.postType
            );
      }

      const finalMedia = [
        ...existingMedia,
        ...uploadedMedia,
      ];

      if (finalMedia.length === 0) {
        setError(
          "At least one media file is required."
        );

        return;
      }

      await onSave({
        postName:
          postName.trim(),

        description:
          description.trim(),

        postingDate,

        status,

        media: finalMedia,
      });
    } catch (error: any) {
      console.error(
        "Failed to edit work:",
        error
      );

      setError(
        error?.message ||
          "Failed to update work."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111116]">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-white/10 bg-[#111116]/95 p-5 backdrop-blur-xl sm:p-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-400">
              Work Management
            </p>

            <h2 className="mt-2 text-xl font-semibold text-white">
              Edit Work
            </h2>

            <p className="mt-1 text-sm text-white/35">
              Update post information and
              media.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xl text-white/50"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                Client
              </label>

              <input
                value={work.clientName}
                disabled
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/50"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                Type
              </label>

              <input
                value={work.postType}
                disabled
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm capitalize text-white/50"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                Post Name
              </label>

              <input
                value={postName}
                onChange={(event) =>
                  setPostName(
                    event.target.value
                  )
                }
                disabled={busy}
                className="w-full rounded-xl border border-white/10 bg-[#08080c] px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
                rows={4}
                disabled={busy}
                className="w-full resize-none rounded-xl border border-white/10 bg-[#08080c] px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                Posting Date
              </label>

              <input
                type="date"
                value={postingDate}
                onChange={(event) =>
                  setPostingDate(
                    event.target.value
                  )
                }
                disabled={busy}
                className="w-full rounded-xl border border-white/10 bg-[#08080c] px-4 py-3 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                Status
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target
                      .value as WorkStatus
                  )
                }
                disabled={busy}
                className="w-full rounded-xl border border-white/10 bg-[#08080c] px-4 py-3 text-sm text-white outline-none"
              >
                <option value="sent_to_client">
                  Sent to Client
                </option>

                <option value="requested_to_edit">
                  Requested to Edit
                </option>

                <option value="approved">
                  Approved
                </option>

                <option value="rejected">
                  Rejected
                </option>
              </select>
            </div>

            {/* Existing Media */}
            <div className="sm:col-span-2">
              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                Current Media
              </label>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {existingMedia.map(
                  (media, index) => (
                    <div
                      key={`${media.key}-${index}`}
                      className="relative overflow-hidden rounded-xl border border-white/10 bg-black"
                    >
                      {work.postType ===
                      "poster" ? (
                        <img
                          src={media.url}
                          alt={
                            media.fileName
                          }
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
                        onClick={() =>
                          removeExistingMedia(
                            index
                          )
                        }
                        className="absolute right-2 top-2 rounded-lg bg-black/70 px-3 py-1.5 text-[10px] font-bold text-rose-400"
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* New Media */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                Add New Media
              </label>

              <input
                type="file"
                accept={
                  work.postType ===
                  "poster"
                    ? "image/*"
                    : "video/*"
                }
                multiple={
                  work.postType ===
                  "poster"
                }
                onChange={handleNewFiles}
                disabled={busy}
                className="w-full rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-4 text-sm text-white/50 file:mr-4 file:rounded-lg file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:text-xs file:font-bold file:text-white"
              />
            </div>

            {newFiles.length > 0 && (
              <div className="sm:col-span-2 space-y-2">
                {newFiles.map(
                  (file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3"
                    >
                      <span className="truncate text-xs text-white/60">
                        {file.name}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeNewFile(index)
                        }
                        className="text-xs text-rose-400"
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
              {error}
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              className="rounded-xl border border-white/10 px-5 py-3 text-xs font-bold uppercase text-white/60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-violet-600 px-6 py-3 text-xs font-bold uppercase text-white disabled:opacity-50"
            >
              {uploading
                ? "Uploading..."
                : loading
                  ? "Saving..."
                  : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWorkModal;