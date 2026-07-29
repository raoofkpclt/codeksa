import React, { useEffect, useRef, useState } from "react";
import WorkMediaService from "../../service/s3Service/workMediaService"; // your S3 service — adjust path
import ClientUploadService from "../../service/firebaseService/clientUploadService"; // adjust path
import type { ClientUpload } from "../../utils/types"; // adjust path
import { auth } from "../../config/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

type PostType = "poster" | "reel" | "pdf" | "link";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [clientId, setClientId] = useState<string>("");

  onAuthStateChanged(auth, async (user) => {
    if (!user) return;

    setClientId(user.uid);

    const uploads = await ClientUploadService.getClientUploads(user.uid);
    setRecords(uploads);
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);

      try {
        if (!user) {
          setRecords([]);
          return;
        }

        const uploads = await ClientUploadService.getClientUploads(user.uid);

        console.log("Uploads", uploads);

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

  const handleSubmit = async () => {
    console.log(". Upload started");
    console.log("ClientUploads clientId:", clientId);
    console.log({
      clientId,
      selectedType,
      pendingFile,
    });
    // if ((!pendingFile && !note.trim()) || !clientId) return console.log("object");

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

      setPendingFile(null);
      setNote("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

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

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      {/* =================================
          Header
      ================================== */}

      <div className="relative overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[#8B5CF6]/10 via-white/[0.02] to-transparent p-6 sm:p-8">
        <span className="absolute -left-px -top-px h-3 w-3 border-l-[1.5px] border-t-[1.5px] border-[#8B5CF6]" />

        <span className="absolute -bottom-px -right-px h-3 w-3 border-b-[1.5px] border-r-[1.5px] border-[#8B5CF6]" />

        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
          Client Portal
        </p>

        <h1 className="mt-2 text-2xl font-black tracking-[-0.02em] sm:text-3xl">
          Client Media
        </h1>

        <p className="mt-2 max-w-xl text-sm text-white/40">
          Upload posters or reels for this client and track their review status.
        </p>
      </div>

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

      <section className="border border-white/10 bg-[#111116]">
        {/* Header */}
        <div className="border-b border-white/10 px-8 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B5CF6]">
            NEW UPLOAD
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">Upload Media</h2>

          <p className="mt-2 text-sm text-white/40">
            Upload posters, videos, PDFs or share a link.
          </p>
        </div>

        <div className="p-8 space-y-8">
          {/* Upload Type */}
          <div>
            <label className="mb-4 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
              Upload Type
            </label>

            <div className="flex flex-wrap gap-3">
              {[
                { value: "poster", label: "Poster" },
                { value: "video", label: "Video" },
                { value: "pdf", label: "PDF" },
                { value: "link", label: "Link" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setSelectedType(item.value as PostType)}
                  className={`px-6 py-3 border transition-all duration-300 text-sm font-medium
              ${
                selectedType === item.value
                  ? "border-[#8B5CF6] bg-[#8B5CF6] text-white"
                  : "border-white/10 bg-[#17171D] text-white/60 hover:border-[#8B5CF6]/40"
              }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          {selectedType !== "link" && (
            <label className="block cursor-pointer border-2 border-dashed border-white/10 bg-[#17171D] px-8 py-16 text-center transition hover:border-[#8B5CF6]/40">
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

              <p className="text-lg font-semibold text-white">
                Drag & Drop or Click to Upload
              </p>

              <p className="mt-3 text-sm text-white/35">JPG, PNG, MP4 or PDF</p>
            </label>
          )}

          {pendingFile && (
            <div className="border border-white/10 bg-[#17171D] p-6">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[#8B5CF6]">
                Preview
              </p>

              <div className="overflow-hidden border border-white/10 bg-[#0F0F14]">
                {selectedType === "poster" && (
                  <img
                    src={URL.createObjectURL(pendingFile)}
                    alt={pendingFile.name}
                    className="max-h-[500px] w-full object-contain"
                  />
                )}

                {selectedType === "reel" && (
                  <video
                    src={URL.createObjectURL(pendingFile)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="max-h-[500px] w-full"
                  />
                )}

                {selectedType === "pdf" && (
                  <iframe
                    src={URL.createObjectURL(pendingFile)}
                    title="PDF Preview"
                    className="h-[500px] w-full"
                  />
                )}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {pendingFile.name}
                  </h3>

                  <p className="mt-1 text-xs text-white/40">
                    {(pendingFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPendingFile(null);

                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="border border-red-500/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-red-400 transition hover:bg-red-500/10"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* Link */}
          {selectedType === "link" && (
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Paste Instagram, Drive, YouTube..."
              className="h-12 w-full border border-white/10 bg-[#17171D] px-4 text-white outline-none focus:border-[#8B5CF6]"
            />
          )}

          {/* Note */}
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write a short note..."
            rows={4}
            className="w-full border border-white/10 bg-[#17171D] p-4 text-white outline-none focus:border-[#8B5CF6]"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="border border-[#8B5CF6] bg-[#8B5CF6] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED]"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </section>

      {/* =================================
          Existing Records
      ================================== */}

      <section className="border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.35)]">
        {/* Header */}
        <div className="border-b border-white/10 px-8 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B5CF6]">
            UPLOAD HISTORY
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">Uploaded Media</h2>

          <p className="mt-2 text-sm text-white/40">
            Review, manage and delete your uploaded files.
          </p>
        </div>

        <div className="p-8">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[320px] animate-pulse border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : records.length === 0 ? (
            <div className="flex h-72 items-center justify-center border border-dashed border-white/10">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">
                  No Uploads Yet
                </h3>

                <p className="mt-2 text-sm text-white/35">
                  Upload your first media to get started.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {records.map((record) => {
                const isBusy = record.id ? busyIds.has(record.id) : false;

                const media = record.media ?? [];

                const firstMedia = media[0];

                const isImage = firstMedia?.fileType.startsWith("image/");

                const isVideo = firstMedia?.fileType.startsWith("video/");

                return (
                  <div
                    key={record.id}
                    className="group overflow-hidden border border-white/10 bg-[#141419] transition-all duration-300 hover:border-[#8B5CF6]/40 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(139,92,246,.15)]"
                  >
                    {/* Preview */}

                    {firstMedia && (
                      <div className="relative bg-black">
                        {isImage ? (
                          <img
                            src={firstMedia.url}
                            alt={firstMedia.fileName}
                            className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : isVideo ? (
                          <video
                            controls
                            preload="metadata"
                            className="h-72 w-full object-cover"
                          >
                            <source
                              src={firstMedia.url}
                              type={firstMedia.fileType}
                            />
                          </video>
                        ) : (
                          <div className="flex h-72 items-center justify-center bg-[#1B1B22]">
                            <span className="text-6xl">📄</span>
                          </div>
                        )}

                        {/* Status */}
                      </div>
                    )}

                    {/* Content */}

                    <div className="space-y-4 p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8B5CF6]">
                          {record.postType}
                        </span>

                        <button
                          onClick={() => handleDelete(record)}
                          disabled={isBusy}
                          className="text-xs font-semibold uppercase tracking-[0.1em] text-red-400 transition hover:text-red-300"
                        >
                          {isBusy ? "Deleting..." : "Delete"}
                        </button>
                      </div>

                      {record.note && (
                        <p className="line-clamp-3 text-sm leading-6 text-white/45">
                          {record.note}
                        </p>
                      )}

                      {record.link && (
                        <div className="border border-white/10 bg-[#18181F] p-3">
                          <a
                            href={record.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block truncate text-sm text-[#8B5CF6] hover:underline"
                          >
                            {record.link}
                          </a>

                          <button
                            type="button"
                            onClick={() =>
                              navigator.clipboard.writeText(record.link!)
                            }
                            className="mt-3 border border-white/10 px-4 py-2 text-xs text-white/70 transition hover:border-[#8B5CF6]/40 hover:text-white"
                          >
                            Copy Link
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ClientUploads;
