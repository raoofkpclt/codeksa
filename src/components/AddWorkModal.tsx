import { useEffect, useMemo, useState } from "react";

import type { Client, Work, WorkStatus, WorkType } from "../utils/types";

import ClientService from "../service/firebaseService/clientService";

import WorkMediaService from "../service/s3Service/workMediaService";

type AddWorkModalProps = {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;

  onSave: (data: Omit<Work, "id" | "createdAt" | "updatedAt">) => Promise<void>;
};

const AddWorkModal = ({
  isOpen,
  loading,
  onClose,
  onSave,
}: AddWorkModalProps) => {
  const [clients, setClients] = useState<Client[]>([]);

  const [clientsLoading, setClientsLoading] = useState(false);

  const [clientId, setClientId] = useState("");

  const [postType, setPostType] = useState<WorkType>("poster");

  const [postName, setPostName] = useState("");

  const [description, setDescription] = useState("");

  const [postingDate, setPostingDate] = useState("");

  const [status] = useState<WorkStatus>("sent_to_client");

  const [files, setFiles] = useState<File[]>([]);

  const [uploading, setUploading] = useState(false);

  const [uploadProgress, setUploadProgress] = useState("");

  const [error, setError] = useState<string | null>(null);

  const selectedClient = useMemo(
    () => clients.find((client) => client.id === clientId),
    [clients, clientId],
  );

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    const fetchClients = async () => {
      try {
        setClientsLoading(true);

        const data = await ClientService.getAllClients();

        if (!cancelled) {
          setClients((data as Client[]).filter((client) => client.active));
        }
      } catch (error) {
        console.error("Failed to load clients:", error);
      } finally {
        if (!cancelled) {
          setClientsLoading(false);
        }
      }
    };

    void fetchClients();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const resetForm = () => {
    setClientId("");
    setPostType("poster");
    setPostName("");
    setDescription("");
    setPostingDate("");
    setFiles([]);
    setError(null);
    setUploadProgress("");
  };

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []);

    if (postType === "reel") {
      if (selected.length > 1) {
        setError("Only one video can be uploaded for a reel.");

        return;
      }

      const invalid = selected.find((file) => !file.type.startsWith("video/"));

      if (invalid) {
        setError("Please select a valid video file.");

        return;
      }
    }

    if (postType === "poster") {
      const invalid = selected.find((file) => !file.type.startsWith("image/"));

      if (invalid) {
        setError("Poster uploads must contain images only.");

        return;
      }
    }

    setError(null);
    setFiles(selected);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedClient?.id) {
      setError("Please select a client.");
      return;
    }

    if (!postName.trim()) {
      setError("Title is required.");
      return;
    }

    if (!postingDate) {
      setError("Posting date is required.");
      return;
    }

    if (files.length === 0) {
      setError(
        postType === "poster"
          ? "Please upload at least one poster image."
          : "Please upload a reel video.",
      );

      return;
    }

    try {
      setUploading(true);
      setError(null);

      const media = await WorkMediaService.uploadMultipleFiles(
        files,
        selectedClient.id,
        postType,
        (completed, total) => {
          setUploadProgress(`Uploading ${completed}/${total}`);
        },
      );

      const active =
        status === "approved" && new Date(postingDate) <= new Date();

      await onSave({
        clientId: selectedClient.id,

        clientName: selectedClient.name,

        clientLogo: selectedClient.logo || "",

        postType,

        postName: postName.trim(),

        description: description.trim(),

        postingDate,

        media,

        status,

        active,
        isDisplay: false,
      });

      resetForm();
      onClose();
    } catch (error: unknown) {
      console.error("Failed to create work:", error);

      setError(
        error instanceof Error ? error.message : "Failed to create work.",
      );
    } finally {
      setUploading(false);
      setUploadProgress("");
    }
  };

  const busy = loading || uploading;

  const handleClose = () => {
    if (busy) return;

    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-white/10 bg-[#0c0c11] p-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Add new work
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-white/40">
                Attach the output, assign the client and send it for review.
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
            {/* Title */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Title <span className="text-violet-400">*</span>
              </label>

              <input
                type="text"
                value={postName}
                onChange={(event) => setPostName(event.target.value)}
                disabled={busy}
                required
                className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-violet-500/60 disabled:opacity-50"
              />
            </div>

            {/* Client */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Client <span className="text-violet-400">*</span>
              </label>

              <select
                value={clientId}
                onChange={(event) => setClientId(event.target.value)}
                disabled={clientsLoading || busy}
                className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500/60 disabled:opacity-50"
              >
                <option value="" className="bg-[#0c0c11]">
                  {clientsLoading ? "Loading clients..." : "Select a client"}
                </option>

                {clients.map((client) => (
                  <option
                    key={client.id}
                    value={client.id}
                    className="bg-[#0c0c11]"
                  >
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Type + Posting Date */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                  Type
                </label>

                <select
                  value={postType}
                  onChange={(event) => {
                    const value = event.target.value as WorkType;

                    setPostType(value);
                    setFiles([]);
                    setError(null);
                  }}
                  disabled={busy}
                  className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500/60 disabled:opacity-50"
                >
                  <option value="poster" className="bg-[#0c0c11]">
                    Poster
                  </option>

                  <option value="reel" className="bg-[#0c0c11]">
                    Reel
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                  Posting Date
                </label>

                <input
                  type="date"
                  value={postingDate}
                  onChange={(event) => setPostingDate(event.target.value)}
                  disabled={busy}
                  className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition [color-scheme:dark] focus:border-violet-500/60 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                disabled={busy}
                rows={4}
                className="w-full resize-none border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500/60 disabled:opacity-50"
              />

              <p className="mt-2 text-xs text-white/25">
                Context the client needs before deciding.
              </p>
            </div>

            {/* Files */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Files
              </label>

              <div className="flex items-center gap-4">
                <label
                  className={`shrink-0 cursor-pointer border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white/70 transition hover:bg-white/[0.08] hover:text-white ${
                    busy ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  Choose files
                  <input
                    type="file"
                    accept={postType === "poster" ? "image/*" : "video/*"}
                    multiple={postType === "poster"}
                    disabled={busy}
                    onChange={handleFiles}
                    className="hidden"
                  />
                </label>

                <span className="truncate text-sm text-white/30">
                  {files.length === 0
                    ? "No file chosen"
                    : files.length === 1
                      ? files[0].name
                      : `${files.length} files chosen`}
                </span>
              </div>

              <p className="mt-2 text-xs text-white/25">
                Images, video or PDF. Multiple files allowed.
              </p>

              {/* Selected Files */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between gap-3 border border-white/10 bg-white/[0.03] p-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-white/70">
                          {file.name}
                        </p>

                        <p className="mt-1 text-[10px] text-white/30">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        disabled={busy}
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

          {uploadProgress && (
            <div className="mt-6 border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-400">
              {uploadProgress}
            </div>
          )}

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
              {uploading
                ? "Uploading..."
                : loading
                  ? "Creating..."
                  : "Send to Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkModal;