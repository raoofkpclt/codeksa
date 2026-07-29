import React, { useEffect, useMemo, useState } from "react";
import ClientUploadService from "../../service/firebaseService/clientUploadService";
import ClientService from "../../service/firebaseService/clientService";
import type { ClientUpload, Client } from "../../utils/types";

const AdminClientUploads:React.FC = () => {
  const [uploads, setUploads] = useState<ClientUpload[]>([]);
  const [clientsById, setClientsById] = useState<Record<string, Client>>({});
  const [loading, setLoading] = useState(true);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<{
    url: string;
    type: string;
  } | null>(null);

  useEffect(() => {
    const loadUploads = async () => {
      setLoading(true);

      try {
        const data = await ClientUploadService.getUploads();
        setUploads(data);

        // Resolve each unique clientId to its Client record
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



  const groupedUploads = useMemo(() => {
    const groups: Record<string, ClientUpload[]> = {};

    uploads.forEach((upload) => {
      const key = upload.clientId;

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(upload);
    });

    return groups;
  }, [uploads]);

  const clients = useMemo(() => {
    return Object.entries(groupedUploads).map(([clientId, clientUploads]) => {
      const client = clientsById[clientId];

      return {
        clientId,
        name: client?.name ?? clientId,
        logo: client?.logo ?? null,
        count: clientUploads.length,
      };
    });
  }, [groupedUploads, clientsById]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // ---- Client picker view ----
  if (!selectedClientId) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {clients.map((client) => (
            <button
              key={client.clientId}
              onClick={() => setSelectedClientId(client.clientId)}
              className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-lg font-semibold">
                  {client.name.slice(0, 2).toUpperCase()}
                </div>
              )}

              <div className="text-center">
                <p className="font-semibold">{client.name}</p>
                <p className="text-xs text-gray-400">
                  {client.count} upload{client.count !== 1 ? "s" : ""}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ---- Selected client's uploads view ----
  const clientUploads = groupedUploads[selectedClientId] ?? [];
  const clientMeta = clients.find((c) => c.clientId === selectedClientId);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={() => setSelectedClientId(null)}
            className="flex h-11 items-center gap-2 border border-white/10 bg-[#17171D] px-5 text-sm font-medium text-white transition hover:border-[#8B5CF6]/40 hover:bg-[#1D1D25]"
          >
            ← Back
          </button>

          <div>
            <h1 className="mt-2 text-3xl font-bold text-white">
              {clientMeta?.name}
            </h1>

            <p className="mt-1 text-sm text-white/40">
              {clientUploads.length} Upload
              {clientUploads.length !== 1 && "s"}
            </p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {clientUploads.map((upload) => (
          <div
            key={upload.id}
            className="group overflow-hidden border border-white/10 bg-[#111116] transition-all duration-500 hover:-translate-y-2 hover:border-[#8B5CF6]/40 hover:shadow-[0_20px_60px_rgba(139,92,246,.18)]"
          >
            {/* Preview */}
            <div className="relative  overflow-hidden bg-[#0B0B0F] group">
              {upload.media?.length ? (
                upload.media[0].fileType.startsWith("image/") ? (
                  <img
                    src={upload.media[0].url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    src={upload.media[0].url}
                    className="h-full w-full object-cover"
                    muted
                  />
                )
              ) : (
                <div className="flex h-full items-center justify-center text-white/40">
                  No Media
                </div>
              )}

              {upload.media?.length ? (
                <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() =>
                      setSelectedMedia({
                        url: upload.media![0].url,
                        type: upload.media![0].fileType,
                      })
                    }
                    className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white"
                  >
                    View Full
                  </button>

                 
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6">
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute right-6 top-6 text-4xl text-white"
          >
            ×
          </button>

          {selectedMedia.type.startsWith("image/") ? (
            <img
              src={selectedMedia.url}
              alt=""
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          ) : (
            <video
              src={selectedMedia.url}
              controls
              autoPlay
              className="max-h-[90vh] max-w-[90vw]"
            />
          )}

          {/* <a
            href={selectedMedia.url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-8 rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white"
          >
            Download
          </a> */}
        </div>
      )}
    </div>
  );
};

export default AdminClientUploads;
