import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ClientService from "../../service/firebaseService/clientService";
import WorkService from "../../service/firebaseService/workService";
import ClientUploadService from "../../service/firebaseService/clientUploadService";
import AddWorkModal from "../../components/AddWorkModal"; // adjust path to match where you saved it
import type { Client, Work, WorkStatus, ClientUpload } from "../../utils/types";

// =========================================
// Helpers
// =========================================

const toMillis = (value: unknown): number => {
  if (!value) return 0;

  if (
    typeof value === "object" &&
    value !== null &&
    "toMillis" in value &&
    typeof (value as { toMillis?: unknown }).toMillis === "function"
  ) {
    return (value as { toMillis: () => number }).toMillis();
  }

  if (typeof value === "string" || typeof value === "number") {
    const t = new Date(value).getTime();
    return Number.isNaN(t) ? 0 : t;
  }

  return 0;
};

const formatDate = (millis: number) => {
  if (!millis) return "--";
  return new Date(millis).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (millis: number) => {
  if (!millis) return "--";
  const d = new Date(millis);
  const date = d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${date}, ${time}`;
};

const STATUS_LABELS: Record<WorkStatus, string> = {
  sent_to_client: "Sent to Client",
  requested_to_edit: "Changes Requested",
  approved: "Approved",
  rejected: "Rejected",
};

const Home = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [uploads, setUploads] = useState<ClientUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAddWorkOpen, setIsAddWorkOpen] = useState(false);
  const [savingWork, setSavingWork] = useState(false);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);

      const [clientData, workData, uploadData] = await Promise.all([
        ClientService.getAllClients(),
        WorkService.getAllWorks(),
        ClientUploadService.getUploads(),
      ]);

      setClients(clientData || []);
      setWorks(workData || []);
      setUploads(uploadData || []);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (cancelled) return;
      await fetchAll();
    };

    void run();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveWork = async (
    data: Omit<Work, "id" | "createdAt" | "updatedAt">,
  ) => {
    try {
      setSavingWork(true);

      // NOTE: adjust this to whatever your WorkService's create method is
      // actually named (e.g. createWork, addWork, create) — getAllWorks
      // was the only method visible on this service in what you shared.
      await WorkService.addWork(data);

      // Refresh the dashboard so the new work shows up in stats/activity
      await fetchAll();
    } catch (err) {
      console.error("Failed to create work:", err);
      throw err; // let the modal surface the error to the user
    } finally {
      setSavingWork(false);
    }
  };

  // ---- Stats ----
  const activeClients = clients.filter((c) => c.active === true).length;
  const totalWorks = works.length;
  const liveWorks = works.filter((w) => w.isDisplay === true).length;

  const workStatusCounts = useMemo(() => {
    const counts: Record<WorkStatus, number> = {
      sent_to_client: 0,
      requested_to_edit: 0,
      approved: 0,
      rejected: 0,
    };

    works.forEach((w) => {
      if (w.status in counts) counts[w.status] += 1;
    });

    return counts;
  }, [works]);

  const stats = [
    {
      label: "ACTIVE CLIENTS",
      value: loading ? "-" : activeClients.toString(),
      accent: false,
    },
    {
      label: "TOTAL WORKS",
      value: loading ? "-" : totalWorks.toString(),
      accent: false,
    },
    {
      label: "AWAITING RESPONSE",
      value: loading ? "-" : workStatusCounts.sent_to_client.toString(),
      accent: true,
    },
    {
      label: "CHANGES REQUESTED",
      value: loading ? "-" : workStatusCounts.requested_to_edit.toString(),
      accent: false,
    },
    {
      label: "APPROVED",
      value: loading ? "-" : workStatusCounts.approved.toString(),
      accent: false,
    },
    {
      label: "LIVE ON WEBSITE",
      value: loading ? "-" : liveWorks.toString(),
      accent: false,
    },
  ];

  // ---- Requires attention (changes requested) ----
  const requiresAttention = useMemo(() => {
    return works
      .filter((w) => w.status === "requested_to_edit")
      .sort((a, b) => toMillis(b.updatedAt) - toMillis(a.updatedAt));
  }, [works]);

  // ---- Recent activity (work status changes) ----
  const recentActivity = useMemo(() => {
    return [...works]
      .sort(
        (a, b) =>
          toMillis(b.updatedAt || b.createdAt) -
          toMillis(a.updatedAt || a.createdAt),
      )
      .slice(0, 6);
  }, [works]);

  // ---- Latest client uploads ----
  const latestUploads = useMemo(() => {
    return [...uploads]
      .sort(
        (a, b) =>
          toMillis((b as { createdAt?: unknown }).createdAt) -
          toMillis((a as { createdAt?: unknown }).createdAt),
      )
      .slice(0, 4);
  }, [uploads]);

  return (
    <>
      <div className="min-h-screen bg-[#08080c] px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:px-16 font-['Space_Grotesk',sans-serif] overflow-x-hidden">
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

          html {
            overflow-x: hidden;
          }

          body {
            font-family: 'Space Grotesk', sans-serif;
          }

          * { font-synthesis: none; }
        `}</style>

        {error && (
          <div className="mb-6 sm:mb-8 border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">
            {error}
          </div>
        )}

        {/* =================================
            Hero
        ================================== */}

        <div className="flex flex-col gap-5 sm:gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-[#8468FF]">
              Operating Overview
            </p>

            <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-light leading-tight tracking-tight text-white break-words">
              The system <span className="font-semibold">in motion.</span>
            </h1>

            <p className="mt-3 sm:mt-4 max-w-xl text-sm text-white/40">
              Every client, every piece of work and every decision waiting on
              a response — held in one structure.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddWorkOpen(true)}
            className="h-fit w-full sm:w-auto shrink-0 bg-violet-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-violet-500"
          >
            Add New Work
          </button>
        </div>

        {/* Divider */}
        <div className="mt-8 sm:mt-10 h-px bg-white/10" />

        {/* =================================
            Stats row
        ================================== */}

        <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6 lg:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="min-w-0">
              <p
                className={`mb-2 sm:mb-3 text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.02em] truncate ${
                  stat.accent ? "text-violet-400" : "text-white"
                }`}
              >
                {stat.value}
              </p>
              <p className="text-[9px] sm:text-[10px] font-bold uppercase leading-relaxed tracking-[0.1em] sm:tracking-[0.14em] text-white/35">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* =================================
            Requires attention
        ================================== */}

        <div className="mt-8 sm:mt-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-light text-white sm:text-3xl">
                Requires attention
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/40">
                Work where a client has asked for a change. These move first.
              </p>
            </div>

            <Link
              to="/admin/work"
              className="shrink-0 text-[11px] font-bold uppercase tracking-[0.15em] text-white/35 transition hover:text-violet-400"
            >
              All Works
            </Link>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col gap-4">
            {loading ? (
              <p className="text-[13px] text-white/30">Loading...</p>
            ) : requiresAttention.length === 0 ? (
              <p className="text-[13px] text-white/30">
                Nothing needs attention right now.
              </p>
            ) : (
              requiresAttention.map((work) => (
                <Link
                  key={work.id}
                  to="/admin/work"
                  state={{ workId: work.id }}
                  className="flex flex-col gap-3 border border-white/[0.06] bg-white/[0.02] p-4 sm:p-6 transition hover:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[14px] sm:text-[15px] font-medium text-white/90">
                      {work.postName}
                    </p>
                    <p className="mt-1.5 text-[12px] text-white/35">
                      {work.clientName} · {work.postType} ·{" "}
                      {formatDate(toMillis(work.updatedAt || work.createdAt))}
                    </p>
                  </div>

                  <span className="w-fit shrink-0 border border-amber-500/40 bg-amber-500/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-amber-400">
                    Changes Requested
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* =================================
            Recent activity + Latest uploads
        ================================== */}

        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2">
          {/* =============== Recent activity =============== */}

          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-light text-white">
                  Recent activity
                </h2>
                <p className="mt-2 text-sm text-white/40">
                  A continuous record of decisions.
                </p>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 flex flex-col">
              {loading ? (
                <p className="py-4 text-[13px] text-white/30">Loading...</p>
              ) : recentActivity.length === 0 ? (
                <p className="py-4 text-[13px] text-white/30">
                  No recent activity.
                </p>
              ) : (
                recentActivity.map((work) => (
                  <Link
                    key={work.id}
                    to="/admin/work"
                    state={{ workId: work.id }}
                    className="border-b border-white/[0.06] py-5 transition hover:bg-white/[0.02]"
                  >
                    <p className="text-[14px] sm:text-[15px] font-medium leading-snug text-white/90 break-words">
                      {work.postName} —{" "}
                      <span className="text-white/60">
                        {STATUS_LABELS[work.status]}
                      </span>
                    </p>
                    <p className="mt-1.5 text-[11px] text-white/35">
                      {formatDateTime(
                        toMillis(work.updatedAt || work.createdAt),
                      )}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* =============== Latest client uploads =============== */}

          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-light text-white">
                  Latest client uploads
                </h2>
                <p className="mt-2 text-sm text-white/40">
                  Material submitted by clients for the team.
                </p>
              </div>

              <Link
                to="/admin/clientUploads"
                className="shrink-0 text-[11px] font-bold uppercase tracking-[0.15em] text-white/35 transition hover:text-violet-400"
              >
                All Uploads
              </Link>
            </div>

            <div className="mt-5 sm:mt-6 flex flex-col">
              {loading ? (
                <p className="py-4 text-[13px] text-white/30">Loading...</p>
              ) : latestUploads.length === 0 ? (
                <p className="py-4 text-[13px] text-white/30">
                  No uploads yet.
                </p>
              ) : (
                latestUploads.map((upload) => {
                  const media = upload.media?.[0];
                  const isLink = !media && !!upload.link;

                  const badgeLabel = isLink
                    ? "LINK"
                    : media?.fileType === "application/pdf"
                      ? "PDF"
                      : media?.fileType?.startsWith("video/")
                        ? "VIDEO"
                        : media?.fileType?.startsWith("image/")
                          ? "IMAGE"
                          : upload.postType?.toUpperCase() || "FILE";

                  const titleLine = isLink
                    ? upload.link
                    : media?.fileName || "Untitled upload";

                  return (
                    <div
                      key={upload.id}
                      className="flex items-center justify-between gap-3 sm:gap-4 border-b border-white/[0.06] py-5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[14px] sm:text-[15px] font-medium text-white/90">
                          {titleLine}
                        </p>
                        <p className="mt-1.5 text-[11px] text-white/35">
                          {(upload as { clientName?: string }).clientName ||
                            "Client"}{" "}
                          ·{" "}
                          {formatDate(
                            toMillis(
                              (upload as { createdAt?: unknown }).createdAt,
                            ),
                          )}
                        </p>
                      </div>

                      <span className="shrink-0 border border-white/10 px-2.5 sm:px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/50">
                        {badgeLabel}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      <AddWorkModal
        isOpen={isAddWorkOpen}
        loading={savingWork}
        onClose={() => setIsAddWorkOpen(false)}
        onSave={handleSaveWork}
      />
    </>
  );
};

export default Home;
