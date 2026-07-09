import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  Client,
  Work,
  WorkStatus,
  WorkType,
} from "../utils/types";

import ClientService from "../service/firebaseService/clientService";

import WorkMediaService from "../service/s3Service/workMediaService";

type AddWorkModalProps = {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;

  onSave: (
    data: Omit<
      Work,
      "id" | "createdAt" | "updatedAt"
    >
  ) => Promise<void>;
};

const DEFAULT_CLIENT_LOGO =
  "https://codeksa-web.s3.ap-south-1.amazonaws.com/clients/logos/Preto.jpeg";

const AddWorkModal = ({
  isOpen,
  loading,
  onClose,
  onSave,
}: AddWorkModalProps) => {
  const [clients, setClients] =
    useState<Client[]>([]);

  const [clientsLoading, setClientsLoading] =
    useState(false);

  const [clientId, setClientId] =
    useState("");

  const [postType, setPostType] =
    useState<WorkType>("poster");

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

  const [files, setFiles] =
    useState<File[]>([]);

  const [uploading, setUploading] =
    useState(false);

  const [
    uploadProgress,
    setUploadProgress,
  ] = useState("");

  const [error, setError] =
    useState<string | null>(null);

  const selectedClient =
    useMemo(
      () =>
        clients.find(
          (client) =>
            client.id === clientId
        ),
      [clients, clientId]
    );

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    const fetchClients = async () => {
      try {
        setClientsLoading(true);

        const data =
          await ClientService.getAllClients();

        if (!cancelled) {
          setClients(
            (data as Client[]).filter(
              (client) =>
                client.active
            )
          );
        }
      } catch (error) {
        console.error(
          "Failed to load clients:",
          error
        );
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

  useEffect(() => {
    setFiles([]);
    setError(null);
  }, [postType]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setClientId("");
    setPostType("poster");
    setPostName("");
    setDescription("");
    setPostingDate("");
    setStatus("sent_to_client");
    setFiles([]);
    setError(null);
    setUploadProgress("");
  };

  const handleFiles = (
    event:
      React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected =
      Array.from(
        event.target.files || []
      );

    if (postType === "reel") {
      if (selected.length > 1) {
        setError(
          "Only one video can be uploaded for a reel."
        );

        return;
      }

      const invalid =
        selected.find(
          (file) =>
            !file.type.startsWith(
              "video/"
            )
        );

      if (invalid) {
        setError(
          "Please select a valid video file."
        );

        return;
      }
    }

    if (postType === "poster") {
      const invalid =
        selected.find(
          (file) =>
            !file.type.startsWith(
              "image/"
            )
        );

      if (invalid) {
        setError(
          "Poster uploads must contain images only."
        );

        return;
      }
    }

    setError(null);
    setFiles(selected);
  };

  const removeFile = (
    index: number
  ) => {
    setFiles((prev) =>
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

    if (!selectedClient?.id) {
      setError(
        "Please select a client."
      );
      return;
    }

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

    if (files.length === 0) {
      setError(
        postType === "poster"
          ? "Please upload at least one poster image."
          : "Please upload a reel video."
      );

      return;
    }

    try {
      setUploading(true);
      setError(null);

      const media =
        await WorkMediaService
          .uploadMultipleFiles(
            files,
            selectedClient.id,
            postType,
            (completed, total) => {
              setUploadProgress(
                `Uploading ${completed}/${total}`
              );
            }
          );

      const active =
        status === "approved" &&
        new Date(postingDate) <=
          new Date();

      await onSave({
        clientId:
          selectedClient.id,

        clientName:
          selectedClient.name,

        clientLogo:
          selectedClient.logo || "",

        postType,

        postName:
          postName.trim(),

        description:
          description.trim(),

        postingDate,

        media,

        status,

        active,
      });

      resetForm();
    } catch (error: any) {
      console.error(
        "Failed to create work:",
        error
      );

      setError(
        error?.message ||
          "Failed to create work."
      );
    } finally {
      setUploading(false);
      setUploadProgress("");
    }
  };

  if (!isOpen) return null;

  const busy =
    loading || uploading;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111116]">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-white/10 bg-[#111116]/95 p-5 backdrop-blur-xl sm:p-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-400">
              Work Management
            </p>

            <h2 className="mt-2 text-xl font-semibold text-white">
              Add New Work
            </h2>

            <p className="mt-1 text-sm text-white/35">
              Upload poster or reel content
              for client approval.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xl text-white/50 transition hover:text-white disabled:opacity-50"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Client */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                Select Client
              </label>

              <select
                value={clientId}
                onChange={(event) =>
                  setClientId(
                    event.target.value
                  )
                }
                disabled={
                  clientsLoading || busy
                }
                className="w-full rounded-xl border border-white/10 bg-[#08080c] px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50"
              >
                <option value="">
                  {clientsLoading
                    ? "Loading clients..."
                    : "Choose client"}
                </option>

                {clients.map(
                  (client) => (
                    <option
                      key={client.id}
                      value={client.id}
                    >
                      {client.name}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Selected Client */}
            {selectedClient && (
              <div className="sm:col-span-2 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <img
                  src={
                    selectedClient.logo ||
                    DEFAULT_CLIENT_LOGO
                  }
                  alt={
                    selectedClient.name
                  }
                  className="h-14 w-14 rounded-xl object-cover"
                />

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {selectedClient.name}
                  </p>

                  <p className="mt-1 truncate text-xs text-white/35">
                    {selectedClient.email}
                  </p>
                </div>
              </div>
            )}

            {/* Type */}
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                Post Type
              </label>

              <select
                value={postType}
                onChange={(event) =>
                  setPostType(
                    event.target
                      .value as WorkType
                  )
                }
                disabled={busy}
                className="w-full rounded-xl border border-white/10 bg-[#08080c] px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50"
              >
                <option value="poster">
                  Poster
                </option>

                <option value="reel">
                  Reel
                </option>
              </select>
            </div>

            {/* Posting Date */}
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
                className="w-full rounded-xl border border-white/10 bg-[#08080c] px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50"
              />
            </div>

            {/* Post Name */}
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
                placeholder="Example: Eid Campaign Poster"
                className="w-full rounded-xl border border-white/10 bg-[#08080c] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-violet-500/50"
              />
            </div>

            {/* Description */}
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
                disabled={busy}
                rows={4}
                placeholder="Enter post description, caption details or approval notes..."
                className="w-full resize-none rounded-xl border border-white/10 bg-[#08080c] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-violet-500/50"
              />
            </div>

            {/* Status */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                Initial Status
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
                className="w-full rounded-xl border border-white/10 bg-[#08080c] px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50"
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

            {/* Upload */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                {postType === "poster"
                  ? "Poster Images"
                  : "Reel Video"}
              </label>

              <label className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center transition hover:border-violet-500/40 hover:bg-violet-500/[0.04]">
                <span className="text-3xl text-white/25">
                  ↑
                </span>

                <span className="mt-3 text-sm font-medium text-white/60">
                  {postType === "poster"
                    ? "Upload multiple images"
                    : "Upload reel video"}
                </span>

                <span className="mt-1 text-xs text-white/25">
                  {postType === "poster"
                    ? "PNG, JPG, JPEG, WEBP"
                    : "MP4, MOV, WEBM"}
                </span>

                <input
                  type="file"
                  accept={
                    postType === "poster"
                      ? "image/*"
                      : "video/*"
                  }
                  multiple={
                    postType === "poster"
                  }
                  disabled={busy}
                  onChange={handleFiles}
                  className="hidden"
                />
              </label>
            </div>

            {/* Selected Files */}
            {files.length > 0 && (
              <div className="sm:col-span-2 space-y-2">
                {files.map(
                  (file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-white/70">
                          {file.name}
                        </p>

                        <p className="mt-1 text-[10px] text-white/30">
                          {(
                            file.size /
                            1024 /
                            1024
                          ).toFixed(2)}{" "}
                          MB
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFile(index)
                        }
                        disabled={busy}
                        className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-[10px] font-bold uppercase text-rose-400"
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {uploadProgress && (
            <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-400">
              {uploadProgress}
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white/60 transition hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-violet-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading
                ? "Uploading..."
                : loading
                  ? "Creating..."
                  : "Create Work"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkModal;