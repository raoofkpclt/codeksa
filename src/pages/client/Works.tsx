import { useCallback, useEffect, useMemo, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../config/firebase/firebase";
// Change path if needed

import ClientWorkService, {
  type ClientWork,
  type WorkStatus,
} from "../../service/firebaseService/clientWorkService";

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

  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [selectedWork, setSelectedWork] = useState<ClientWork | null>(null);

  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);

  const [editRequestNote, setEditRequestNote] = useState("");

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
    if (filter === "all") {
      return works;
    }

    return works.filter((work) => work.status === filter);
  }, [works, filter]);

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
  // Open Confirmation
  // =======================================

  const openAction = (work: ClientWork, action: ActionType) => {
    setSelectedWork(work);
    setPendingAction(action);

    if (action === "edit") {
      setEditRequestNote("");
    }
  };

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
    sent_to_client: "border-amber-500/20 bg-amber-500/10 text-amber-400",

    requested_to_edit: "border-blue-500/20 bg-blue-500/10 text-blue-400",

    approved: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

    rejected: "border-red-500/20 bg-red-500/10 text-red-400",
  };

  const statusLabels: Record<WorkStatus, string> = {
    sent_to_client: "Pending Approval",

    requested_to_edit: "Edit Requested",

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
      label: "Pending",
      value: "sent_to_client",
      count: counts.sent_to_client,
    },
    {
      label: "Edit Requested",
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
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
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
            Your Works
          </h1>

          <p className="mt-2 max-w-xl text-sm text-white/40">
            Review posters and reels, approve completed work, request changes,
            or reject submissions.
          </p>
        </div>

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
            Filters
        ================================== */}

        <div className="flex flex-wrap gap-2 border border-white/[0.08] bg-white/[0.03] p-3">
          {filterButtons.map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`flex items-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] transition-colors ${
                filter === item.value
                  ? "bg-[#8B5CF6] text-white"
                  : "border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white"
              }`}
            >
              {item.label}

              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[9px] ${
                  filter === item.value
                    ? "bg-white/20 text-white"
                    : "bg-white/[0.06] text-white/40"
                }`}
              >
                {item.count}
              </span>
            </button>
          ))}
        </div>

        {/* =================================
            Loading
        ================================== */}

        {loading && (
          <div className="grid gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse border border-white/[0.08] bg-white/[0.03]"
              >
                <div className="aspect-video bg-white/[0.04]" />

                <div className="space-y-3 p-5">
                  <div className="h-4 w-2/3 bg-white/[0.06]" />
                  <div className="h-3 w-full bg-white/[0.04]" />
                  <div className="h-3 w-1/2 bg-white/[0.04]" />
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

            <p className="mt-4 text-sm font-semibold text-white/60">
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
          <div className="grid gap-5 md:grid-cols-2">
            {filteredWorks.map((work) => (
              <article
                key={work.id}
                className="group overflow-hidden border border-white/[0.08] bg-white/[0.03] transition-colors hover:border-[#8B5CF6]/30"
              >
                {/* =====================
                        Media
                    ====================== */}

                <div className="relative bg-black">
                  {work.media && work.media.length > 0 ? (
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
                            className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-black"
                          >
                            {work.postType === "poster" ? (
                              <img
                                src={mediaUrl}
                                alt={mediaName}
                                className="max-h-[500px] w-full object-contain"
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
                                className="max-h-[500px] w-full"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-white/[0.02]">
                      <p className="text-xs text-white/20">No media</p>
                    </div>
                  )}

                  {/* Type Badge */}

                  <span className="absolute left-3 top-3 border border-white/10 bg-black/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white/70 backdrop-blur-sm">
                    {work.postType}
                  </span>
                </div>

                {/* =====================
                        Content
                    ====================== */}

                <div className="p-5">
                  {/* Status */}

                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h2 className="text-base font-bold tracking-[-0.01em] text-white">
                      {work.postName}
                    </h2>

                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.08em] ${
                        statusStyles[work.status]
                      }`}
                    >
                      {statusLabels[work.status]}
                    </span>
                  </div>

                  {/* Description */}

                  {work.description && (
                    <p className="line-clamp-3 text-[12px] leading-5 text-white/40">
                      {work.description}
                    </p>
                  )}

                  {/* Posting Date */}

                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-white/25">
                        Posting Date
                      </p>

                      <p className="mt-1 text-[11px] font-medium text-white/60">
                        {formatPostingDate(work.postingDate)}
                      </p>
                    </div>

                    {work.active && (
                      <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Active
                      </span>
                    )}
                  </div>

                  {/* =====================
                          Actions
                      ====================== */}

                  {work.status === "sent_to_client" && (
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {/* Approve */}

                      <button
                        onClick={() => openAction(work, "approve")}
                        disabled={actionLoading === work.id}
                        className="border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5 text-[9px] font-bold uppercase tracking-[0.08em] text-emerald-400 transition-colors hover:bg-emerald-500/20 disabled:opacity-50"
                      >
                        Approve
                      </button>

                      {/* Edit */}

                      <button
                        onClick={() => openAction(work, "edit")}
                        disabled={actionLoading === work.id}
                        className="border border-blue-500/20 bg-blue-500/10 px-3 py-2.5 text-[9px] font-bold uppercase tracking-[0.08em] text-blue-400 transition-colors hover:bg-blue-500/20 disabled:opacity-50"
                      >
                        Edit
                      </button>

                      {/* Reject */}

                      <button
                        onClick={() => openAction(work, "reject")}
                        disabled={actionLoading === work.id}
                        className="border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-[9px] font-bold uppercase tracking-[0.08em] text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {/* Already Responded */}

                  {work.status !== "sent_to_client" && (
                    <div className="mt-5 border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                      <p className="text-center text-[10px] font-medium text-white/30">
                        Response submitted:{" "}
                        <span className="text-white/55">
                          {statusLabels[work.status]}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={closeAction}
        >
          <div
            className="w-full max-w-md border border-white/[0.1] bg-[#111114] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}

            <div className="border-b border-white/[0.08] px-5 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">
                Confirm Action
              </p>

              <h3 className="mt-1 text-lg font-bold text-white">
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
                <span className="font-semibold text-white/80">
                  {pendingAction === "approve"
                    ? "approve"
                    : pendingAction === "edit"
                      ? "request changes for"
                      : "reject"}
                </span>{" "}
                the work{" "}
                <span className="font-semibold text-white">
                  "{selectedWork.postName}"
                </span>
                ?
              </p>

              {/* =================================
      Edit Request Note
  ================================== */}

              {pendingAction === "edit" && (
                <div className="mt-5">
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.1em] text-white/40">
                    Changes Required
                  </label>

                  <textarea
                    value={editRequestNote}
                    onChange={(event) => setEditRequestNote(event.target.value)}
                    maxLength={1000}
                    rows={6}
                    autoFocus
                    placeholder="Example: Please change the background color, update the offer text, and move the logo to the top-right corner..."
                    className="w-full resize-none border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-blue-500/50"
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
                className="border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white/50 transition hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmAction}
                disabled={!!actionLoading}
                className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] transition disabled:opacity-50 ${
                  pendingAction === "approve"
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : pendingAction === "edit"
                      ? "bg-blue-500 text-white hover:bg-blue-600"
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
