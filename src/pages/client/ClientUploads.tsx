import React, { useEffect, useRef, useState } from "react";
import WorkMediaService from "../../service/s3Service/workMediaService"; // your S3 service — adjust path
import ClientUploadService from "../../service/firebaseService/clientUploadService"; // adjust path
import type { ClientUpload } from "../../utils/types"; // adjust path
import { auth } from "../../config/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

type PostType = "poster" | "reel" | "pdf" | "link";

const typeOptions: { value: PostType; label: string }[] = [
  { value: "poster", label: "Poster" },
  { value: "reel", label: "Reel" },
  { value: "pdf", label: "PDF" },
  { value: "link", label: "Link" },
];

const formatBytes = (bytes?: number) => {
  if (!bytes) return "";
  const mb = bytes / 1024 / 1024;
  if (mb >= 1) return `${mb.toFixed(2)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
};

const formatDate = (value: unknown) => {
  if (!value) return "Recently";

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
    return "Recently";
  }
};

const ClientUploads: React.FC = () => {
  const [selectedType, setSelectedType] = useState<PostType>("poster");
  const [records, setRecords] = useState<ClientUpload[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [note, setNote] = useState("");
  const [link, setLink] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [clientId, setClientId] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);

      try {
        if (!user) {
          setRecords([]);
          return;
        }

        setClientId(user.uid);

        const uploads = await ClientUploadService.getClientUploads(user.uid);

        setRecords(uploads);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const setBusy = (id: string, busy: boolean) => {
    setBusyIds((prev) => {
      const next = new Set(prev);
      if (busy) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPendingFile(null);
      return;
    }

    setPendingFile(file);
  };

  const resetForm = () => {
    setPendingFile(null);
    setNote("");
    setLink("");
    setSelectedType("poster");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const closeModal = () => {
    if (isUploading) return;
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async () => {
    if (!clientId) return;

    setIsUploading(true);
    setError(null);

    try {
      const uploadedMedia = [];

      if (pendingFile) {
        const media = await WorkMediaService.uploadFile(
          pendingFile,
          clientId,
          selectedType,
        );

        uploadedMedia.push(media);
      }

      const result = await ClientUploadService.createUpload({
        clientId,
        postType: selectedType,
        media: uploadedMedia,
        link,
        note: note.trim(),
        status: "pending",
      });

      if (!result.success) {
        throw new Error("Failed to save upload");
      }

      resetForm();
      setIsModalOpen(false);

      const data = await ClientUploadService.getClientUploads(clientId);
      setRecords(data as ClientUpload[]);
    } catch (err) {
      console.error(err);
      setError("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (record: ClientUpload) => {
    if (!record.id) return;

    setBusy(record.id, true);

    try {
      const keys = (record.media ?? []).map((m) => m.key);

      if (keys.length > 0) {
        await WorkMediaService.deleteMultipleFiles(keys);
      }

      await ClientUploadService.deleteUpload(record.id);

      setRecords((prev) => prev.filter((r) => r.id !== record.id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete upload.");
    } finally {
      setBusy(record.id, false);
    }
  };

  const handleOpen = (record: ClientUpload) => {
    const media = record.media?.[0];
    const url = media?.url || record.link;
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

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

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8468FF]">
            your uploads
          </p>

          <h1 className="mt-3 max-w-2xl text-4xl font-light leading-[1.15] tracking-[-0.02em] text-white sm:text-[42px]">
            Send us <span className="font-bold">your material.</span>
          </h1>

          <p className="mt-4 max-w-lg text-sm text-white/40">
            Share briefs, references, assets or links with the CODE team.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="border border-[#8468FF] bg-[#8468FF] px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#6F4BFF]"
        >
          Upload Material
        </button>
      </div>

      <div className="border-t border-white/[0.08]" />

      {/* =================================
          Error
      ================================== */}

      {error && (
        <div className="flex items-center justify-between border border-red-500/20 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>

          <button
            type="button"
            onClick={() => setError(null)}
            className="text-xs text-red-300 hover:text-red-200"
          >
            Close
          </button>
        </div>
      )}

      {/* =================================
          Records list
      ================================== */}

      {isLoading ? (
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse border-t border-white/[0.08]"
            />
          ))}
        </div>
      ) : records.length === 0 ? (
        <div className="flex h-64 items-center justify-center border border-dashed border-white/[0.1]">
          <div className="text-center">
            <h3 className="text-lg font-medium text-white">
              No uploads yet
            </h3>
            <p className="mt-2 text-sm text-white/35">
              Upload your first material to get started.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          {records.map((record) => {
            const isBusy = record.id ? busyIds.has(record.id) : false;
            const media = record.media ?? [];
            const firstMedia = media[0];

            const isLinkRecord = !firstMedia && !!record.link;

            const badgeLabel = isLinkRecord
              ? "LINK"
              : firstMedia?.fileType === "application/pdf"
                ? "PDF"
                : firstMedia?.fileType?.startsWith("video/")
                  ? "VIDEO"
                  : firstMedia?.fileType?.startsWith("image/")
                    ? "IMAGE"
                    : record.postType?.toUpperCase() || "FILE";

            const titleLine = isLinkRecord
              ? record.link
              : firstMedia
                ? `${
                    record.note
                      ? record.note.split(".")[0].trim()
                      : "Untitled"
                  } · ${firstMedia.fileName}`
                : record.note?.split(".")[0].trim() || "Untitled upload";

            const metaLine = isLinkRecord
              ? formatDate(record.createdAt)
              : `${formatDate(record.createdAt)}${
                  firstMedia?.size
                    ? ` · ${formatBytes(firstMedia.size)}`
                    : ""
                }`;

            return (
              <div
                key={record.id}
                className="flex flex-col gap-3 border-t border-white/[0.08] py-6 last:border-b sm:flex-row sm:items-start sm:justify-between sm:gap-6"
              >
                <div className="min-w-0 flex-1">
                  {isLinkRecord ? (
                    <a
                      href={record.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate text-[15px] font-medium text-[#8468FF] hover:underline"
                    >
                      {titleLine}
                    </a>
                  ) : (
                    <p className="text-[15px] font-medium text-white/90">
                      {titleLine}
                    </p>
                  )}

                  <p className="mt-1 text-[11px] text-white/30">
                    {metaLine}
                  </p>

                  {record.note && (
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/40">
                      {record.note}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="border border-white/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-white/50">
                    {badgeLabel}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleOpen(record)}
                    className="flex items-center gap-1.5 border border-white/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-white/60 transition hover:border-[#8468FF]/40 hover:text-white"
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Open
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(record)}
                    disabled={isBusy}
                    className="px-2 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-white/25 transition hover:text-red-400 disabled:opacity-50"
                  >
                    {isBusy ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =================================
          Upload Material Modal
      ================================== */}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm font-['Space_Grotesk',sans-serif]"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-lg border border-white/[0.1] bg-[#111114] p-8 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-normal text-white">
                  Upload material
                </h2>
                <p className="mt-2 max-w-sm text-sm text-white/40">
                  Give the team what they need to move. Context is as useful
                  as the file.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="text-2xl leading-none text-white/40 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-6">
              {/* Type */}
              <div>
                <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                  Type
                </label>

                <select
                  value={selectedType}
                  onChange={(e) =>
                    setSelectedType(e.target.value as PostType)
                  }
                  className="w-full appearance-none border border-white/[0.1] bg-transparent px-4 py-3 text-sm text-white outline-none transition focus:border-[#8468FF]/50"
                >
                  {typeOptions.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                      className="bg-[#111114] text-white"
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* File or Link */}
              {selectedType === "link" ? (
                <div>
                  <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                    Link <span className="text-[#8468FF]">*</span>
                  </label>

                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Paste Instagram, Drive, YouTube..."
                    className="w-full border border-white/[0.1] bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#8468FF]/50"
                  />
                </div>
              ) : (
                <div>
                  <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                    File <span className="text-[#8468FF]">*</span>
                  </label>

                  <div className="flex items-center gap-3 border border-white/[0.1] px-4 py-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="border border-white/15 px-4 py-1.5 text-xs text-white/70 transition hover:border-[#8468FF]/40 hover:text-white"
                    >
                      Choose file
                    </button>

                    <span className="truncate text-xs text-white/30">
                      {pendingFile ? pendingFile.name : "No file chosen"}
                    </span>

                    <input
                      ref={fileInputRef}
                      type="file"
                      hidden
                      accept={
                        selectedType === "poster"
                          ? "image/*"
                          : selectedType === "reel"
                            ? "video/*"
                            : ".pdf"
                      }
                      onChange={handleFilesSelected}
                    />
                  </div>
                </div>
              )}

              {/* Note */}
              <div>
                <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                  Note
                </label>

                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={5}
                  className="w-full resize-none border border-white/[0.1] bg-transparent p-4 text-sm leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-[#8468FF]/50"
                />

                <p className="mt-2 text-[11px] text-white/25">
                  What is this, and what should we do with it?
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                disabled={isUploading}
                className="border border-white/10 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white/60 transition hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isUploading}
                className="border border-[#8468FF] bg-[#8468FF] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition hover:bg-[#6F4BFF] disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Send to CODE"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientUploads;
