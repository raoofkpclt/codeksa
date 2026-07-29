import { useEffect, useMemo, useState } from "react";
import ClientService from "../../service/firebaseService/clientService";
import WorkService from "../../service/firebaseService/workService";
import ClientUploadService from "../../service/firebaseService/clientUploadService";
import type { Client, Work, WorkStatus, ClientUpload } from "../../utils/types";

type ActivityItem = {
  id: string;
  title: string;
  subtitle: string;
  time: number;
  kind: "client" | "work" | "upload";
};

const toMillis = (value: unknown): number => {
  if (!value) return 0;

  if (
    typeof value === "object" &&
    value !== null &&
    "toMillis" in value &&
    typeof value.toMillis === "function"
  ) {
    return value.toMillis();
  }

  if (typeof value === "string" || typeof value === "number") {
    const t = new Date(value).getTime();
    return Number.isNaN(t) ? 0 : t;
  }

  return 0;
};

const formatRelativeTime = (millis: number) => {
  if (!millis) return "--";

  const diffMs = Date.now() - millis;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;

  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;

  return new Date(millis).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const STATUS_LABELS: Record<WorkStatus, string> = {
  sent_to_client: "Sent to Client",
  requested_to_edit: "Edit Requested",
  approved: "Approved",
  rejected: "Rejected",
};

const STATUS_DOT: Record<WorkStatus, string> = {
  sent_to_client: "bg-blue-400",
  requested_to_edit: "bg-amber-400",
  approved: "bg-emerald-400",
  rejected: "bg-rose-400",
};

const Home = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [uploads, setUploads] = useState<ClientUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const [clientData, workData, uploadData] = await Promise.all([
          ClientService.getAllClients(),
          WorkService.getAllWorks(),
          ClientUploadService.getUploads(),
        ]);

        if (!cancelled) {
          setClients(clientData || []);
          setWorks(workData || []);
          setUploads(uploadData || []);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        if (!cancelled) setError("Failed to load dashboard data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchAll();

    return () => {
      cancelled = true;
    };
  }, []);

  // ---- Client stats ----
  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.active === true).length;
  const pendingOnboarding = clients.filter((c) => c.onboarding !== true).length;

  // ---- Work stats ----
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

  const workTypeCounts = useMemo(() => {
    const counts = { poster: 0, reel: 0 };

    works.forEach((w) => {
      if (w.postType === "poster") counts.poster += 1;
      else if (w.postType === "reel") counts.reel += 1;
    });

    return counts;
  }, [works]);

  // ---- Upload stats ----
  const totalUploads = uploads.length;

  const uploadTypeCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    uploads.forEach((u) => {
      const key = u.postType || "other";
      counts[key] = (counts[key] || 0) + 1;
    });

    return counts;
  }, [uploads]);

  // ---- Combined recent activity ----
  const recentActivity = useMemo(() => {
    const items: ActivityItem[] = [];

    clients.forEach((c) => {
      const time = toMillis((c as { createdAt?: unknown }).createdAt);
      items.push({
        id: `client-${c.id}`,
        title: `New client added: ${c.name}`,
        subtitle: c.active ? "Active" : "Inactive",
        time,
        kind: "client",
      });
    });

    works.forEach((w) => {
      const time = toMillis(w.createdAt);
      items.push({
        id: `work-${w.id}`,
        title: `Work added: ${w.postName}`,
        subtitle: `${w.clientName} · ${STATUS_LABELS[w.status]}`,
        time,
        kind: "work",
      });
    });

    uploads.forEach((u) => {
      const time = toMillis((u as { createdAt?: unknown }).createdAt);
      items.push({
        id: `upload-${u.id}`,
        title: `Client upload received (${u.postType})`,
        subtitle: u.note ? u.note.slice(0, 60) : "No note added",
        time,
        kind: "upload",
      });
    });

    return items
      .sort((a, b) => b.time - a.time)
      .slice(0, 8);
  }, [clients, works, uploads]);

  const statCards = [
    {
      label: "Total Clients",
      value: loading ? "..." : totalClients.toString(),
      delta: "All registered clients",
    },
    {
      label: "Active Clients",
      value: loading ? "..." : activeClients.toString(),
      delta: "Currently active",
    },
    {
      label: "Pending Onboarding",
      value: loading ? "..." : pendingOnboarding.toString(),
      delta: "Needs completion",
    },
    {
      label: "Total Works",
      value: loading ? "..." : totalWorks.toString(),
      delta: `${workTypeCounts.poster} posters · ${workTypeCounts.reel} reels`,
    },
    {
      label: "Live on Website",
      value: loading ? "..." : liveWorks.toString(),
      delta: "Currently displayed",
    },
    {
      label: "Client Uploads",
      value: loading ? "..." : totalUploads.toString(),
      delta: "Total submissions received",
    },
  ];

  const kindDot: Record<ActivityItem["kind"], string> = {
    client: "bg-violet-400",
    work: "bg-cyan-400",
    upload: "bg-amber-400",
  };

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">
          {error}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="relative border border-white/[0.08] bg-white/[0.03] p-5"
          >
            {/* Top Left Corner */}
            <span className="absolute -left-px -top-px h-3 w-3 border-l-[1.5px] border-t-[1.5px] border-[#8B5CF6]" />

            {/* Bottom Right Corner */}
            <span className="absolute -bottom-px -right-px h-3 w-3 border-b-[1.5px] border-r-[1.5px] border-[#8B5CF6]" />

            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
              {stat.label}
            </p>

            <p className="text-3xl font-black tracking-[-0.02em] text-white">
              {stat.value}
            </p>

            <p className="mt-1 text-[11px] text-white/30">{stat.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Work Status Breakdown */}
        <div className="border border-white/[0.08] bg-white/[0.03] p-5">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
            Work Status Breakdown
          </p>

          <div className="flex flex-col gap-3">
            {(Object.keys(STATUS_LABELS) as WorkStatus[]).map((status) => (
              <div
                key={status}
                className="flex items-center justify-between text-[13px] text-white/70"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${STATUS_DOT[status]}`}
                  />
                  {STATUS_LABELS[status]}
                </div>

                <span className="font-semibold text-white">
                  {loading ? "..." : workStatusCounts[status]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Type Breakdown */}
        <div className="border border-white/[0.08] bg-white/[0.03] p-5">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
            Client Uploads by Type
          </p>

          {Object.keys(uploadTypeCounts).length === 0 ? (
            <p className="text-[13px] text-white/30">
              {loading ? "Loading..." : "No uploads yet."}
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {Object.entries(uploadTypeCounts).map(([type, count]) => (
                <div
                  key={type}
                  className="flex items-center justify-between text-[13px] text-white/70"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8B5CF6]" />
                    <span className="capitalize">{type}</span>
                  </div>

                  <span className="font-semibold text-white">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="border border-white/[0.08] bg-white/[0.03] p-5">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
          Recent Activity
        </p>

        {loading ? (
          <p className="text-[13px] text-white/30">Loading...</p>
        ) : recentActivity.length === 0 ? (
          <p className="text-[13px] text-white/30">No recent activity.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 text-[13px] text-white/70"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${kindDot[item.kind]}`}
                  />
                  <div>
                    <p className="text-white/85">{item.title}</p>
                    <p className="mt-0.5 text-[11px] text-white/35">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 text-[11px] text-white/30">
                  {formatRelativeTime(item.time)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
