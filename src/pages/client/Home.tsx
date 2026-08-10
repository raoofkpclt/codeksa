import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ClientWorkService, {
  type ClientWork,
  type WorkStatus,
} from "../../service/firebaseService/clientWorkService";





// =========================================
// Status Badge Styles
// =========================================

const statusStyles: Record<WorkStatus, string> = {
  sent_to_client: "border-[#8468FF]/50 bg-[#8468FF]/10 text-[#a78bfa]",
  requested_to_edit: "border-amber-500/40 bg-amber-500/5 text-amber-400",
  approved: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400",
  rejected: "border-red-500/40 bg-red-500/5 text-red-400",
};

const statusLabel: Record<WorkStatus, string> = {
  sent_to_client: "Sent to client",
  requested_to_edit: "Changes requested",
  approved: "Approved",
  rejected: "Rejected",
};

// =========================================
// Home
// =========================================

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [works, setWorks] = useState<ClientWork[]>([]);
  const [error, setError] = useState("");

  // =======================================
  // Fetch Works
  // =======================================

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await ClientWorkService.getWorks();
        setWorks(data);
      } catch (fetchError) {
        console.error("Works fetch error:", fetchError);
        setError("Failed to load your works.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  // =======================================
  // Date Formatter
  // =======================================

  const formatDate = (work: ClientWork) => {
    const timestamp = work.updatedAt || work.createdAt;

    if (!timestamp) return "Recently";

    try {
      return timestamp.toDate().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  // =======================================
  // Navigate to work details
  // =======================================

  const openWork = (work: ClientWork) => {
    navigate(`/client/works/${work.id}`);
  };

  // =======================================
  // Status counts
  // =======================================

  const statusCounts = useMemo(() => {
    const counts: Record<WorkStatus, number> = {
      sent_to_client: 0,
      requested_to_edit: 0,
      approved: 0,
      rejected: 0,
    };

    works.forEach((work) => {
      if (work.status in counts) counts[work.status] += 1;
    });

    return counts;
  }, [works]);

  const primaryStats = [
    {
      label: "AWAITING YOUR\nREVIEW",
      value: loading ? "-" : statusCounts.sent_to_client.toString(),
      accent: true,
    },
    {
      label: "CHANGES\nREQUESTED",
      value: loading ? "-" : statusCounts.requested_to_edit.toString(),
      accent: false,
    },
    {
      label: "APPROVED",
      value: loading ? "-" : statusCounts.approved.toString(),
      accent: false,
    },
    {
      label: "TOTAL WORKS",
      value: loading ? "-" : works.length.toString(),
      accent: false,
    },
  ];

  // =======================================
  // Works waiting on review
  // =======================================

  const waitingForReview = useMemo(() => {
    return works.filter((work) => work.status === "sent_to_client");
  }, [works]);

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

        .hover-glow:hover {
          color: var(--violet-glow) !important;
          text-shadow: 0 0 14px rgba(155, 131, 255, 0.55);
        }

        .glow-text {
          color: var(--violet-glow);
          text-shadow: 0 0 22px rgba(155, 131, 255, 0.55);
        }
      `}</style>

      {/* =================================
          Hero
      ================================== */}

      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8468FF]">
          your workspace
        </p>

        <h1 className="mt-3 max-w-2xl text-4xl font-light leading-[1.15] tracking-[-0.02em] text-white sm:text-[42px]">
          Welcome back, <span className="font-semibold">CODE.</span>
        </h1>

        <p className="mt-4 max-w-lg text-sm text-white/40">
          Everything CODE has prepared for you, and everything still waiting on
          your decision.
        </p>
      </div>

      <div className="border-t border-white/[0.08]" />

      {/* =================================
          Primary stats
      ================================== */}

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {primaryStats.map((stat) => (
          <div key={stat.label}>
            <p
              className={`mb-2 text-3xl font-light tracking-[-0.02em] sm:text-4xl ${
                stat.accent ? "text-[#8468FF]" : "text-white"
              }`}
            >
              {stat.value}
            </p>

            <p className="whitespace-pre-line text-[10px] uppercase leading-relaxed tracking-[0.12em] text-white/40">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* =================================
          Error
      ================================== */}

      {error && (
        <div className="border border-red-500/20 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* =================================
          Waiting for your review
      ================================== */}

      <div>
        <h3 className="text-2xl mt-10 font-light text-white sm:text-3xl">
          Waiting for your review
        </h3>
        <p className="mt-2 text-sm text-white/40">
          One decision at a time. Approve, or tell us what to change.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <p className="text-sm text-white/30">Loading works...</p>
        </div>
      ) : waitingForReview.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-white/30">
            Nothing is waiting on your review right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {waitingForReview.map((work) => (
            <div
              key={work.id}
              onClick={() => openWork(work)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openWork(work);
                }
              }}
              className="flex cursor-pointer flex-col gap-5 border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-white/20"
            >
              <div className="flex items-start justify-between">
                <span
                  className={`border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] ${
                    statusStyles[work.status]
                  }`}
                >
                  {statusLabel[work.status]}
                </span>

                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/30">
                  {work.postType}
                </span>
              </div>

              <div>
                <p className="text-[15px] font-medium leading-snug text-white/90">
                  {work.postName}
                </p>

                <p className="mt-2 text-[11px] text-white/30">
                  {work.media?.length ?? 0} files · {formatDate(work)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
