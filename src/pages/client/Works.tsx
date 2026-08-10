import { useCallback, useEffect, useMemo, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../config/firebase/firebase";
// Change path if needed

import ClientWorkService, {
  type ClientWork,
  type WorkStatus,
} from "../../service/firebaseService/clientWorkService";
import { useNavigate } from "react-router-dom";

// =========================================
// Filter Type
// =========================================

type FilterStatus = "all" | WorkStatus;

type ActionType = "approve" | "edit" | "reject";

// =========================================
// Works Page
// =========================================

const Works = () => {
  const [works, setWorks] = useState<ClientWork[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [filter, setFilter] = useState<FilterStatus>("all");

  const [search, setSearch] = useState("");

  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [selectedWork, setSelectedWork] = useState<ClientWork | null>(null);

  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);

  const [editRequestNote, setEditRequestNote] = useState("");

  const navigate = useNavigate();

  // =======================================
  // Fetch Works
  // =======================================

  const fetchWorks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await ClientWorkService.getWorks();

      setWorks(data);
    } catch (error) {
      console.error("Works fetch error:", error);

      setError("Failed to load your works.");
    } finally {
      setLoading(false);
    }
  }, []);

  // =======================================
  // Wait for Firebase Auth
  // =======================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchWorks();
      } else {
        setWorks([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [fetchWorks]);

  // =======================================
  // Filtered Works
  // =======================================

  const filteredWorks = useMemo(() => {
    let result = works;

    if (filter !== "all") {
      result = result.filter((work) => work.status === filter);
    }

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      result = result.filter((work) =>
        work.postName?.toLowerCase().includes(query),
      );
    }

    return result;
  }, [works, filter, search]);

  // =======================================
  // Counts
  // =======================================

  const counts = useMemo(
    () => ({
      all: works.length,

      sent_to_client: works.filter((work) => work.status === "sent_to_client")
        .length,

      requested_to_edit: works.filter(
        (work) => work.status === "requested_to_edit",
      ).length,

      approved: works.filter((work) => work.status === "approved").length,

      rejected: works.filter((work) => work.status === "rejected").length,
    }),
    [works],
  );


 

  // =======================================
  // Close Confirmation
  // =======================================

  const closeAction = () => {
    if (actionLoading) return;

    setSelectedWork(null);
    setPendingAction(null);
    setEditRequestNote("");
  };

  // =======================================
  // Confirm Action
  // =======================================

  const handleConfirmAction = async () => {
    if (!selectedWork || !pendingAction) {
      return;
    }

    // Validate edit note
    if (pendingAction === "edit" && !editRequestNote.trim()) {
      setError("Please describe the changes you need.");

      return;
    }

    try {
      setActionLoading(selectedWork.id);

      if (pendingAction === "approve") {
        await ClientWorkService.approveWork(selectedWork.id);
      }

      if (pendingAction === "edit") {
        await ClientWorkService.requestEdit(
          selectedWork.id,
          editRequestNote.trim(),
        );
      }

      if (pendingAction === "reject") {
        await ClientWorkService.rejectWork(selectedWork.id);
      }

      const newStatus: WorkStatus =
        pendingAction === "approve"
          ? "approved"
          : pendingAction === "edit"
            ? "requested_to_edit"
            : "rejected";

      setWorks((currentWorks) =>
        currentWorks.map((work) =>
          work.id === selectedWork.id
            ? {
                ...work,

                status: newStatus,

                ...(pendingAction === "edit"
                  ? {
                      editRequestNote: editRequestNote.trim(),
                    }
                  : {}),
              }
            : work,
        ),
      );

      setEditRequestNote("");
      setSelectedWork(null);
      setPendingAction(null);
    } catch (error) {
      console.error("Work action failed:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update work status.",
      );
    } finally {
      setActionLoading(null);
    }
  };

  // =======================================
  // Status Styles
  // =======================================

  const statusStyles: Record<WorkStatus, string> = {
    sent_to_client: "border-[#8468FF]/50 bg-[#8468FF]/10 text-[#a78bfa]",

    requested_to_edit: "border-amber-500/40 bg-amber-500/5 text-amber-400",

    approved: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400",

    rejected: "border-red-500/40 bg-red-500/5 text-red-400",
  };

  const statusLabels: Record<WorkStatus, string> = {
    sent_to_client: "Sent to Client",

    requested_to_edit: "Changes Requested",

    approved: "Approved",

    rejected: "Rejected",
  };

  // =======================================
  // Filter Buttons
  // =======================================

  const filterButtons: {
    label: string;
    value: FilterStatus;
    count: number;
  }[] = [
    {
      label: "All",
      value: "all",
      count: counts.all,
    },
    {
      label: "Sent to client",
      value: "sent_to_client",
      count: counts.sent_to_client,
    },
    {
      label: "Changes requested",
      value: "requested_to_edit",
      count: counts.requested_to_edit,
    },
    {
      label: "Approved",
      value: "approved",
      count: counts.approved,
    },
    {
      label: "Rejected",
      value: "rejected",
      count: counts.rejected,
    },
  ];

  // =======================================
  // Date Formatter
  // =======================================

  const formatPostingDate = (date: string) => {
    if (!date) return "Not set";

    try {
      return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  return (
    <>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 font-['Space_Grotesk',sans-serif]">
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
            your works
          </p>

          <h1 className="mt-3 max-w-2xl font-light text-4xl  leading-[1.15] tracking-[-0.02em] text-white sm:text-[42px]">
            Everything we have 
            <br />
            <span className="font-bold">prepared</span>
            
            <span className="font-bold">for you.</span>
          </h1>

          <p className="mt-4 max-w-lg text-sm text-white/40">
            Review, approve or request changes. Each decision is recorded.
          </p>
        </div>

        <div className="border-t border-white/[0.08]" />

        {/* =================================
            Error
        ================================== */}

        {error && (
          <div className="flex items-center justify-between border border-red-500/20 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-400">{error}</p>

            <button
              onClick={() => setError("")}
              className="text-xs text-red-300"
            >
              Close
            </button>
          </div>
        )}

        {/* =================================
            Filters + Search
        ================================== */}

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {filterButtons.map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.1em] transition-colors ${
                  filter === item.value
                    ? "border border-[#8468FF] text-white"
                    : "border border-white/[0.1] text-white/40 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search works"
            className="ml-auto min-w-[200px] flex-1 max-w-xs border border-white/[0.1] bg-transparent px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#8468FF]/50 sm:flex-none"
          />
        </div>

        {/* =================================
            Loading
        ================================== */}

        {loading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse border border-white/[0.08] bg-white/[0.03] p-6"
              >
                <div className="space-y-3">
                  <div className="h-4 w-1/2 bg-white/[0.06]" />
                  <div className="h-5 w-full bg-white/[0.06]" />
                  <div className="h-3 w-1/3 bg-white/[0.04]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =================================
            Empty
        ================================== */}

        {!loading && filteredWorks.length === 0 && (
          <div className="border border-dashed border-white/[0.1] bg-white/[0.02] px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04] text-white/20">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>

            <p className="mt-4 text-sm font-medium text-white/60">
              No works found
            </p>

            <p className="mt-1 text-xs text-white/30">
              No work items match this filter.
            </p>
          </div>
        )}

        {/* =================================
            Work Grid
        ================================== */}

        {!loading && filteredWorks.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorks.map((work) => (
              // <article
              //   key={work.id}
              //   className="group flex flex-col gap-5 border border-white/[0.08] bg-white/[0.03] p-6 transition-colors hover:border-[#8468FF]/30"
              // >
              <article
                key={work.id}
                onClick={() => navigate(`/client/works/${work.id}`)}
                className="group flex cursor-pointer flex-col gap-5 border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-300 hover:border-[#8468FF]/30 hover:bg-white/[0.04]"
              >
                {/* =====================
                        Media (only when present)
                    ====================== */}

                {/* {work.media && work.media.length > 0 && (
                  <div className="relative -mx-6 -mt-6 mb-1 bg-black">
                    <div className="grid gap-px bg-white/[0.05]">
                      {work.media.map((media, index) => {
                        const mediaUrl =
                          typeof media === "string" ? media : media.url;

                        const mediaName =
                          typeof media === "string"
                            ? `Media ${index + 1}`
                            : media.fileName || `Media ${index + 1}`;

                        return (
                          <div
                            key={
                              typeof media === "string"
                                ? `${work.id}-${index}`
                                : media.key || `${work.id}-${index}`
                            }
                            className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-black"
                          >
                            {work.postType === "poster" ? (
                              <img
                                src={mediaUrl}
                                alt={mediaName}
                                className="max-h-[440px] w-full object-contain"
                                loading="lazy"
                                onError={(event) => {
                                  console.error("Image failed:", mediaUrl);

                                  event.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <video
                                src={mediaUrl}
                                controls
                                playsInline
                                preload="metadata"
                                className="max-h-[440px] w-full"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )} */}

                {/* =====================
                        Status + Type
                    ====================== */}

                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] ${
                      statusStyles[work.status]
                    }`}
                  >
                    {statusLabels[work.status]}
                  </span>

                  <span className="text-[12px] capitalize text-white/30">
                    {work.postType}
                  </span>
                </div>

                {/* =====================
                        Title + Description
                    ====================== */}

                <div>
                  <h2 className="text-[15px] font-medium leading-snug text-white/90">
                    {work.postName}
                  </h2>

                  {work.description && (
                    <p className="mt-2 line-clamp-3 text-[12px] leading-5 text-white/40">
                      {work.description}
                    </p>
                  )}

                  <p className="mt-3 text-[11px] text-white/30">
                    {work.media?.length ?? 0} files ·{" "}
                    {formatPostingDate(work.postingDate)}
                  </p>
                </div>

                {work.active && (
                  <span className="-mt-2 flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-wider text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Active
                  </span>
                )}

                {/* =====================
                        Actions
                    ====================== */}

                

                {/* Already Responded */}

                {work.status !== "sent_to_client" && (
                  <div className="border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                    <p className="text-center text-[10px] font-normal text-white/30">
                      Response submitted:{" "}
                      <span className="text-white/55">
                        {statusLabels[work.status]}
                      </span>
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      {/* =====================================
          Confirmation Modal
      ====================================== */}

      {selectedWork && pendingAction && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm font-['Space_Grotesk',sans-serif]"
          onClick={closeAction}
        >
          <div
            className="w-full max-w-md border border-white/[0.1] bg-[#111114] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}

            <div className="border-b border-white/[0.08] px-5 py-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/30">
                Confirm Action
              </p>

              <h3 className="mt-1 text-lg font-medium text-white">
                {pendingAction === "approve"
                  ? "Approve Work"
                  : pendingAction === "edit"
                    ? "Request Edit"
                    : "Reject Work"}
              </h3>
            </div>

            {/* Modal Body */}

            <div className="p-5">
              <p className="text-sm leading-6 text-white/50">
                Are you sure you want to{" "}
                <span className="font-medium text-white/80">
                  {pendingAction === "approve"
                    ? "approve"
                    : pendingAction === "edit"
                      ? "request changes for"
                      : "reject"}
                </span>{" "}
                the work{" "}
                <span className="font-medium text-white">
                  "{selectedWork.postName}"
                </span>
                ?
              </p>

              {/* =================================
      Edit Request Note
  ================================== */}

              {pendingAction === "edit" && (
                <div className="mt-5">
                  <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.1em] text-white/40">
                    Changes Required
                  </label>

                  <textarea
                    value={editRequestNote}
                    onChange={(event) => setEditRequestNote(event.target.value)}
                    maxLength={1000}
                    rows={6}
                    autoFocus
                    placeholder="Example: Please change the background color, update the offer text, and move the logo to the top-right corner..."
                    className="w-full resize-none border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-[#8468FF]/50"
                  />

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-[10px] text-white/25">
                      Describe exactly what should be changed.
                    </p>

                    <p
                      className={`text-[10px] ${
                        editRequestNote.length > 900
                          ? "text-amber-400"
                          : "text-white/25"
                      }`}
                    >
                      {editRequestNote.length}
                      /1000
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}

            <div className="flex justify-end gap-2 border-t border-white/[0.08] px-5 py-4">
              <button
                onClick={closeAction}
                disabled={!!actionLoading}
                className="border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.08em] text-white/50 transition hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmAction}
                disabled={!!actionLoading}
                className={`px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.08em] transition disabled:opacity-50 ${
                  pendingAction === "approve"
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : pendingAction === "edit"
                      ? "bg-[#8468FF] text-white hover:bg-[#6F4BFF]"
                      : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                {actionLoading
                  ? "Updating..."
                  : pendingAction === "approve"
                    ? "Approve"
                    : pendingAction === "edit"
                      ? "Request Edit"
                      : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Works;
