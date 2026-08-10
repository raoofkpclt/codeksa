import React, { useEffect, useState } from "react";
import ClientUploadService from "../../service/firebaseService/clientUploadService";
import ClientService from "../../service/firebaseService/clientService";
import type { ClientUpload, Client } from "../../utils/types";
import { createPortal } from "react-dom";

const AdminClientUploads: React.FC = () => {
  const [uploads, setUploads] = useState<ClientUpload[]>([]);
  const [clientsById, setClientsById] = useState<Record<string, Client>>({});
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<{
    url: string;
    type: string;
  } | null>(null);

  useEffect(() => {
    const loadUploads = async () => {
      setLoading(true);

      try {
        const data = await ClientUploadService.getUploads();

        const sorted = [...data].sort((a, b) => {
          const aTime = (a.createdAt as any)?.toMillis?.() ?? 0;
          const bTime = (b.createdAt as any)?.toMillis?.() ?? 0;

          return bTime - aTime;
        });

        setUploads(sorted);

        const uniqueClientIds = Array.from(
          new Set(data.map((u) => u.clientId)),
        );

        const clientEntries = await Promise.all(
          uniqueClientIds.map(async (clientId) => {
            const client = await ClientService.getClient(clientId);
            return [clientId, client] as const;
          }),
        );

        const map: Record<string, Client> = {};
        clientEntries.forEach(([clientId, client]) => {
          if (client) map[clientId] = client;
        });

        setClientsById(map);
      } finally {
        setLoading(false);
      }
    };
    loadUploads();
  }, []);

  const formatDate = (value: any) => {
    if (!value) return "--";

    const date =
      typeof value?.toDate === "function" ? value.toDate() : new Date(value);

    if (Number.isNaN(date.getTime())) return "--";

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatSize = (bytes: number | undefined) => {
    if (!bytes) return null;

    if (bytes < 1024) return `${bytes} B`;

    const kb = bytes / 1024;
    if (kb < 1024) return `${Math.round(kb)} KB`;

    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const getUploadKind = (upload: ClientUpload) => {
    if (upload.media?.length) {
      const fileType = upload.media[0].fileType;

      if (fileType === "application/pdf") return "PDF";
      if (fileType.startsWith("image/")) return "IMAGE";
      if (fileType.startsWith("video/")) return "VIDEO";

      return "FILE";
    }

    if (upload.link) return "LINK";

    return "FILE";
  };

  const getUploadFileName = (upload: ClientUpload) => {
    if (upload.media?.length) {
      return upload.media[0].fileName || "Untitled file";
    }

    return upload.link || "Untitled submission";
  };

  const handleOpenUpload = (upload: ClientUpload) => {
    if (upload.media?.length) {
      const media = upload.media[0];

      if (
        media.fileType.startsWith("image/") ||
        media.fileType.startsWith("video/") ||
        media.fileType === "application/pdf"
      ) {
        setSelectedMedia({ url: media.url, type: media.fileType });
        return;
      }

      window.open(media.url, "_blank");
      return;
    }

    if (upload.link) {
      window.open(upload.link, "_blank");
    }
  };

  return (
    <div
      className="min-h-screen px-6 py-10 sm:px-10 lg:px-16"
      style={{ backgroundColor: "#08080c" }}
    >
      <style>{`
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

        .glow-text {
          color: var(--violet-glow);
          text-shadow: 0 0 22px rgba(155, 131, 255, 0.55);
        }

        .hover-glow:hover {
          color: var(--violet-glow) !important;
          text-shadow: 0 0 14px rgba(155, 131, 255, 0.55);
        }

        .upload-row {
          border-color: rgba(255,255,255,0.1);
          transition: border-color 200ms ease, background-color 200ms ease;
        }

        .upload-row:hover {
          border-color: rgba(132, 104, 255, 0.35);
          background-color: rgba(132, 104, 255, 0.03);
        }

        .kind-badge {
          border-color: var(--steel);
          color: var(--mist);
        }

        .open-btn {
          color: var(--slate-muted);
          transition: color 200ms ease, text-shadow 200ms ease;
        }

        .open-btn:hover {
          color: var(--violet-glow);
          text-shadow: 0 0 12px rgba(155, 131, 255, 0.5);
        }
      `}</style>

      {/* Header */}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8468FF]">
          Client Uploads
        </p>

        <h1 className="mt-3 text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl">
          Material received <span className="font-semibold">from clients.</span>
        </h1>

        <p
          className="mt-4 max-w-xl text-sm"
          style={{ color: "var(--slate-muted)" }}
        >
          Everything clients have submitted — briefs, references, assets and
          links.
        </p>
      </div>

      {/* Divider */}
      <div className="mt-10 h-px" style={{ backgroundColor: "var(--steel)" }} />

      {/* Loading */}
      {loading ? (
        <div className="mt-2 space-y-0">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-20 w-full animate-pulse border-b"
              style={{
                borderColor: "var(--steel)",
                backgroundColor: "var(--charcoal)",
              }}
            />
          ))}
        </div>
      ) : uploads.length === 0 ? (
        <div
          className="mt-8 flex min-h-[300px] flex-col items-center justify-center border border-dashed"
          style={{ borderColor: "var(--steel)" }}
        >
          <h3
            className="text-base font-semibold"
            style={{ color: "var(--code-white)" }}
          >
            No uploads yet
          </h3>

          <p className="mt-2 text-sm" style={{ color: "var(--slate-muted)" }}>
            Client submissions will appear here.
          </p>
        </div>
      ) : (
        /* List */
        <div className="mt-2">
          {uploads.map((upload) => {
            const kind = getUploadKind(upload);
            const size = formatSize(upload.media?.[0]?.size);
            const client = clientsById[upload.clientId];
            const clientName = client?.name ?? upload.clientId;

            return (
              <div
                key={upload.id}
                className="upload-row flex flex-col gap-4 border-b px-2 py-7 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0">
                  <h3
                    className="text-lg font-light"
                    style={{ color: "var(--code-white)" }}
                  >
                    {upload.title ? (
                      <>
                        {upload.title}
                        <span style={{ color: "var(--steel)" }}>
                          {" "}
                          &middot;{" "}
                        </span>
                        <span
                          className="font-light"
                          style={{ color: "var(--mist)" }}
                        >
                          {getUploadFileName(upload)}
                        </span>
                      </>
                    ) : (
                      getUploadFileName(upload)
                    )}
                  </h3>

                  <p
                    className="mt-2 text-sm"
                    style={{ color: "var(--slate-muted)" }}
                  >
                    {clientName} &middot; {formatDate(upload.createdAt)}
                    {size ? ` \u00b7 ${size}` : ""}
                  </p>

                  {upload.description && (
                    <p
                      className="mt-3 max-w-2xl text-sm"
                      style={{ color: "var(--mist)" }}
                    >
                      {upload.description}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="kind-badge border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em]">
                    {kind}
                  </span>

                  <button
                    onClick={() => handleOpenUpload(upload)}
                    className="open-btn flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em]"
                  >
                    <span>↓</span> Open
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Fullscreen media viewer */}
      {selectedMedia &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] backdrop-blur-sm"
            style={{ backgroundColor: "rgba(8,8,12,0.95)" }}
            onClick={() => setSelectedMedia(null)}
          >
            <button
              onClick={() => setSelectedMedia(null)}
              className="hover-glow absolute right-6 top-6 z-[10000] rounded-full p-3 text-3xl"
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "var(--code-white)",
              }}
            >
              ×
            </button>

            {selectedMedia.type === "application/pdf" ? (
              <iframe
                src={selectedMedia.url}
                title="PDF Viewer"
                className="h-full w-full"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div
                className="relative mx-auto flex h-[95vh] w-[95vw] items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedMedia.type.startsWith("image/") ? (
                  <img
                    src={selectedMedia.url}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                  />
                ) : selectedMedia.type.startsWith("video/") ? (
                  <video
                    src={selectedMedia.url}
                    controls
                    autoPlay
                    className="max-h-full max-w-full"
                  />
                ) : null}
              </div>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default AdminClientUploads;
