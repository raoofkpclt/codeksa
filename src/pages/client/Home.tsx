import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../../config/firebase/firebase";
// Change path if needed

import ClientWorkService, {
  type ClientWork,
  type ClientWorkStats,
  type WorkStatus,
} from "../../service/firebaseService/clientWorkService";

// =========================================
// Default Stats
// =========================================

const defaultStats: ClientWorkStats = {
  totalWorks: 0,
  activeWorks: 0,
  approvedWorks: 0,
  pendingApproval: 0,
  editRequested: 0,
  rejectedWorks: 0,
  posters: 0,
  reels: 0,
};

// =========================================
// Home
// =========================================

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [clientName, setClientName] =
    useState("there");

  const [stats, setStats] =
    useState<ClientWorkStats>(
      defaultStats
    );

  const [recentWork, setRecentWork] =
    useState<ClientWork[]>([]);

  const [error, setError] =
    useState("");

  // =======================================
  // Fetch Dashboard
  // =======================================

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {
          if (!user) {
            setLoading(false);
            return;
          }

          try {
            setLoading(true);
            setError("");

            // Fetch client profile
            const clientRef = doc(
              db,
              "clients",
              user.uid
            );

            const clientSnapshot =
              await getDoc(clientRef);

            if (
              clientSnapshot.exists()
            ) {
              const clientData =
                clientSnapshot.data();

              setClientName(
                clientData.companyName ||
                  clientData.name ||
                  clientData.clientName ||
                  "there"
              );
            }

            // Fetch all works once
            const works =
              await ClientWorkService.getWorks();

            // Calculate stats locally
            const calculatedStats: ClientWorkStats =
              {
                totalWorks:
                  works.length,

                activeWorks:
                  works.filter(
                    (work) =>
                      work.active === true
                  ).length,

                approvedWorks:
                  works.filter(
                    (work) =>
                      work.status ===
                      "approved"
                  ).length,

                pendingApproval:
                  works.filter(
                    (work) =>
                      work.status ===
                      "sent_to_client"
                  ).length,

                editRequested:
                  works.filter(
                    (work) =>
                      work.status ===
                      "requested_to_edit"
                  ).length,

                rejectedWorks:
                  works.filter(
                    (work) =>
                      work.status ===
                      "rejected"
                  ).length,

                posters:
                  works.filter(
                    (work) =>
                      work.postType ===
                      "poster"
                  ).length,

                reels:
                  works.filter(
                    (work) =>
                      work.postType ===
                      "reel"
                  ).length,
              };

            setStats(
              calculatedStats
            );

            setRecentWork(
              works.slice(0, 5)
            );
          } catch (error) {
            console.error(
              "Dashboard fetch error:",
              error
            );

            setError(
              "Failed to load dashboard data."
            );
          } finally {
            setLoading(false);
          }
        }
      );

    return () => unsubscribe();
  }, []);

  // =======================================
  // Date Formatter
  // =======================================

  const formatDate = (
    work: ClientWork
  ) => {
    const timestamp =
      work.updatedAt ||
      work.createdAt;

    if (!timestamp) {
      return "Recently";
    }

    try {
      return timestamp
        .toDate()
        .toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        );
    } catch {
      return "Recently";
    }
  };

  // =======================================
  // Stat Cards
  // =======================================

  const statCards = [
    {
      label: "Total Works",
      value: loading
        ? "..."
        : stats.totalWorks.toString(),
      note: "All assigned works",
    },
    {
      label: "Approved",
      value: loading
        ? "..."
        : stats.approvedWorks.toString(),
      note: "Approved by you",
    },
    {
      label: "Pending Approval",
      value: loading
        ? "..."
        : stats.pendingApproval.toString(),
      note: "Awaiting your response",
    },
  ];

  // =======================================
  // Status Styles
  // =======================================

  const statusStyles: Record<
    WorkStatus,
    string
  > = {
    sent_to_client:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",

    requested_to_edit:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",

    approved:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

    rejected:
      "border-red-500/20 bg-red-500/10 text-red-400",
  };

  const statusLabel: Record<
    WorkStatus,
    string
  > = {
    sent_to_client:
      "Pending Approval",

    requested_to_edit:
      "Edit Requested",

    approved:
      "Approved",

    rejected:
      "Rejected",
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      {/* =================================
          Welcome Banner
      ================================== */}

      <div className="relative overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[#8B5CF6]/10 via-white/[0.02] to-transparent p-6 sm:p-8">
        <span className="absolute -left-px -top-px h-3 w-3 border-l-[1.5px] border-t-[1.5px] border-[#8B5CF6]" />

        <span className="absolute -bottom-px -right-px h-3 w-3 border-b-[1.5px] border-r-[1.5px] border-[#8B5CF6]" />

        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
          Client Dashboard
        </p>

        <h1 className="mt-2 text-2xl font-black tracking-[-0.02em] sm:text-3xl">
          Welcome back,{" "}
          {loading
            ? "..."
            : clientName}
        </h1>

        <p className="mt-2 max-w-lg text-sm text-white/40">
          Review your posters and reels,
          approve completed work, or request
          changes from our team.
        </p>
      </div>

      {/* =================================
          Error
      ================================== */}

      {error && (
        <div className="border border-red-500/20 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* =================================
          Stats
      ================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="relative border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-[#8B5CF6]/30"
          >
            <span className="absolute -left-px -top-px h-3 w-3 border-l-[1.5px] border-t-[1.5px] border-[#8B5CF6]" />

            <span className="absolute -bottom-px -right-px h-3 w-3 border-b-[1.5px] border-r-[1.5px] border-[#8B5CF6]" />

            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
              {stat.label}
            </p>

            <p className="text-3xl font-black tracking-[-0.02em] text-white">
              {stat.value}
            </p>

            <p className="mt-1 text-[11px] text-white/30">
              {stat.note}
            </p>
          </div>
        ))}
      </div>

      {/* =================================
          Recent Work
      ================================== */}

      <div className="border border-white/[0.08] bg-white/[0.03] p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
            Recent Work
          </p>

          <button
            onClick={() =>
              navigate(
                "/client/works"
              )
            }
            className="text-[11px] font-medium text-[#8B5CF6] hover:text-[#a78bfa]"
          >
            View all
          </button>
        </div>

        {loading ? (
          <div className="py-10 text-center">
            <p className="text-sm text-white/30">
              Loading works...
            </p>
          </div>
        ) : recentWork.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-white/30">
              No works available yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-white/[0.05]">
            {recentWork.map(
              (item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    navigate(
                      "/client/works"
                    )
                  }
                  className="flex w-full items-center justify-between gap-3 py-3 text-left first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[13px] font-medium text-white/80">
                        {
                          item.postName
                        }
                      </p>

                      <span className="text-[9px] uppercase text-white/25">
                        {
                          item.postType
                        }
                      </span>
                    </div>

                    <p className="mt-0.5 text-[11px] text-white/30">
                      Updated{" "}
                      {formatDate(item)}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.1em] ${
                      statusStyles[
                        item.status
                      ]
                    }`}
                  >
                    {
                      statusLabel[
                        item.status
                      ]
                    }
                  </span>
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* =================================
          Additional Overview
      ================================== */}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-wider text-white/30">
            Active
          </p>

          <p className="mt-2 text-xl font-black">
            {loading
              ? "..."
              : stats.activeWorks}
          </p>
        </div>

        <div className="border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-wider text-white/30">
            Edit Requests
          </p>

          <p className="mt-2 text-xl font-black">
            {loading
              ? "..."
              : stats.editRequested}
          </p>
        </div>

        <div className="border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-wider text-white/30">
            Posters
          </p>

          <p className="mt-2 text-xl font-black">
            {loading
              ? "..."
              : stats.posters}
          </p>
        </div>

        <div className="border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-wider text-white/30">
            Reels
          </p>

          <p className="mt-2 text-xl font-black">
            {loading
              ? "..."
              : stats.reels}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;