import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ClientWorkService, {
  type ClientWork,
  type DecisionEntry,
  type WorkStatus,
} from "../../service/firebaseService/clientWorkService";

// =========================================
// Status styles / labels
// =========================================

const statusStyles: Record<WorkStatus, string> = {
  sent_to_client: "border-[#8468FF]/50 bg-[#8468FF]/10 text-[#a78bfa]",
  requested_to_edit: "border-amber-500/40 bg-amber-500/5 text-amber-400",
  approved: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400",
  rejected: "border-red-500/40 bg-red-500/5 text-red-400",
};

const statusLabel: Record<WorkStatus, string> = {
  sent_to_client: "Sent to Client",
  requested_to_edit: "Changes Requested",
  approved: "Approved",
  rejected: "Rejected",
};

type ActionType = "approve" | "edit" | "reject";

// =========================================
// Timestamp helpers
// =========================================

const formatDateTime = (value: string) => {
  if (!value) return "--";

  const t = new Date(value).getTime();

  if (Number.isNaN(t)) return "--";

  const d = new Date(t);

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

const formatDate = (dateString: string) => {
  if (!dateString) return "Not set";
  try {
    return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

const WorkDetails = () => {
  const { workId } = useParams<{ workId: string }>();

  const [work, setWork] = useState<ClientWork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================
  // Approve / Request changes / Reject
  // =========================================

  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);
  const [editRequestNote, setEditRequestNote] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchWork = async () => {
      if (!workId) {
        setError("No work selected.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await ClientWorkService.getWorkById(workId);

        if (!cancelled) {
          if (!data) {
            setError("This work could not be found.");
          }
          setWork(data);
        }
      } catch (fetchError) {
        console.error("Work fetch error:", fetchError);
        if (!cancelled) setError("Failed to load this work.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchWork();

    return () => {
      cancelled = true;
    };
  }, [workId]);

  // =========================================
  // Real decision history (stored on the work doc,
  // written by both admin and client actions)
  // =========================================

  const history: DecisionEntry[] = [...(work?.decisionHistory ?? [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // =========================================
  // Open / close the confirmation modal
  // =========================================

  const openAction = (action: ActionType) => {
    setActionError("");
    setPendingAction(action);

    if (action === "edit") {
      setEditRequestNote("");
    }
  };

  const closeAction = () => {
    if (actionLoading) return;

    setPendingAction(null);
    setEditRequestNote("");
    setActionError("");
  };

  const handleConfirmAction = async () => {
    if (!work || !pendingAction) return;

    if (pendingAction === "edit" && !editRequestNote.trim()) {
      setActionError("Please describe the changes you need.");
      return;
    }

    try {
      setActionLoading(true);
      setActionError("");

      if (pendingAction === "approve") {
        await ClientWorkService.approveWork(work.id);
      }

      if (pendingAction === "edit") {
        await ClientWorkService.requestEdit(work.id, editRequestNote.trim());
      }

      if (pendingAction === "reject") {
        await ClientWorkService.rejectWork(work.id);
      }

      // Re-fetch so decisionHistory (written server-side via arrayUnion)
      // comes back in sync instead of guessing the shape locally.
      const refreshed = await ClientWorkService.getWorkById(work.id);

      if (refreshed) {
        setWork(refreshed);
      }

      setEditRequestNote("");
      setPendingAction(null);
    } catch (actionErr) {
      console.error("Work action failed:", actionErr);

      setActionError(
        actionErr instanceof Error
          ? actionErr.message
          : "Failed to update work status.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 font-['Space_Grotesk',sans-serif]">
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
      `}</style>

      {/* =================================
          Back link
      ================================== */}

      <Link
        to="/client/works"
        className="flex w-fit items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white/40 transition-colors hover:text-white"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        My works
      </Link>

      {/* =================================
          Loading / Error
      ================================== */}

      {loading && (
        <div className="py-24 text-center">
          <p className="text-sm text-white/30">Loading work...</p>
        </div>
      )}

      {!loading && error && (
        <div className="border border-red-500/20 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* =================================
          Content
      ================================== */}

      {!loading && !error && work && (
        <>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
            {/* =============== Main column =============== */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-3xl">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8468FF]">
                    {work.postType} · {statusLabel[work.status]}
                  </p>

                  <h1 className="mt-4 text-4xl font-normal uppercase leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl">
                    {work.postName}
                  </h1>

                  {work.description && (
                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/40 sm:text-base">
                      {work.description}
                    </p>
                  )}
                </div>

                {/* =============== Decision actions =============== */}

                {work.status === "sent_to_client" && (
                  <div className="flex shrink-0 flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => openAction("approve")}
                      className="bg-[#8468FF] px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#6F4BFF]"
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() => openAction("edit")}
                      className="border border-white/[0.15] px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white/70 transition hover:border-white/30 hover:text-white"
                    >
                      Request changes
                    </button>

                    <button
                      type="button"
                      onClick={() => openAction("reject")}
                      className="border border-red-500/30 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] text-red-400 transition hover:border-red-500/50 hover:bg-red-500/10"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>

              <div className="border-t border-white/[0.08]" />

              {/* =============== The work =============== */}

              <div>
                <h2 className="text-2xl font-light text-white sm:text-3xl">
                  The work
                </h2>
                <p className="mt-2 text-sm text-white/40">
                  Everything shared for this piece.
                </p>
              </div>

              {work.media && work.media.length > 0 ? (
                <div className="grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.05]">
                  {work.media.map((media, index) => (
                    <div
                      key={media.key || `${work.id}-${index}`}
                      className="relative flex min-h-[320px] items-center justify-center bg-black"
                    >
                      {work.postType === "poster" ? (
                        <img
                          src={media.url}
                          alt={media.fileName || `Media ${index + 1}`}
                          className="max-h-[640px] w-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <video
                          src={media.url}
                          controls
                          playsInline
                          preload="metadata"
                          className="max-h-[640px] w-full"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 border border-white/[0.08] bg-white/[0.02] py-24 text-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8468FF]" />
                  <p className="text-lg font-medium text-white/90">
                    No files attached.
                  </p>
                  <p className="text-sm text-white/30">
                    This work has no media attached yet.
                  </p>
                </div>
              )}
            </div>

            {/* =============== Sidebar =============== */}

            <aside className="flex flex-col gap-8 lg:sticky lg:top-10 lg:self-start">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
                  Status
                </p>
                <span
                  className={`mt-2 inline-block border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] ${
                    statusStyles[work.status]
                  }`}
                >
                  {statusLabel[work.status]}
                </span>
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
                  Type
                </p>
                <p className="mt-2 text-sm capitalize text-white/80">
                  {work.postType}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
                  Posting Date
                </p>
                <p className="mt-2 text-sm text-white/80">
                  {formatDate(work.postingDate)}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
                  Live on Website
                </p>
                <p className="mt-2 text-sm text-white/80">
                  {work.isDisplay ? "Yes" : "No"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
                  Files
                </p>
                <p className="mt-2 text-sm text-white/80">
                  {work.media?.length ?? 0} ·{" "}
                  {work.media && work.media.length > 0
                    ? work.media[0].fileName
                    : "—"}
                </p>
              </div>

              {/* =============== One decision =============== */}

              {work.status === "sent_to_client" && (
                <div className="border border-white/[0.08] bg-white/[0.02] p-5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#8468FF]">
                    One decision
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    Approve this work, or tell us precisely what should
                    change. Nothing moves until you decide.
                  </p>

                  <div className="mt-5 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => openAction("approve")}
                      className="bg-[#8468FF] px-4 py-3 text-[10px] font-medium uppercase tracking-[0.1em] text-white transition hover:bg-[#6F4BFF]"
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() => openAction("edit")}
                      className="border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-[10px] font-medium uppercase tracking-[0.1em] text-white/70 transition hover:text-white"
                    >
                      Request changes
                    </button>
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* =================================
              Decision history
          ================================== */}

          <div className="border-t border-white/[0.08] pt-10">
            <h2 className="text-2xl font-light text-white sm:text-3xl">
              Decision history
            </h2>
            <p className="mt-2 text-sm text-white/40">
              A continuous, permanent record.
            </p>

            <div className="mt-8 flex flex-col">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 border border-white/[0.08] bg-white/[0.02] py-16 text-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8468FF]" />
                  <p className="text-lg font-medium text-white/90">
                    No decisions yet.
                  </p>
                  <p className="text-sm text-white/30">
                    Activity will be recorded here.
                  </p>
                </div>
              ) : (
                history.map((entry, index) => (
                  <div
                    key={`${entry.status}-${entry.date}-${index}`}
                    className="flex flex-col gap-2 border-t border-white/[0.08] py-5 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <span
                      className={`w-fit border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] ${
                        statusStyles[entry.status]
                      }`}
                    >
                      {statusLabel[entry.status]}
                    </span>

                    <p className="text-sm text-white/50">
                      {entry.actor} · {formatDateTime(entry.date)}
                    </p>

                    {entry.note && (
                      <p className="text-sm text-white/40 sm:ml-auto sm:max-w-md">
                        "{entry.note}"
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* =====================================
          Confirmation Modal
      ====================================== */}

      {work && pendingAction && (
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
                  "{work.postName}"
                </span>
                ?
              </p>

              {actionError && (
                <div className="mt-4 border border-red-500/20 bg-red-500/10 px-4 py-3">
                  <p className="text-sm text-red-400">{actionError}</p>
                </div>
              )}

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
                    onChange={(event) =>
                      setEditRequestNote(event.target.value)
                    }
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
                disabled={actionLoading}
                className="border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.08em] text-white/50 transition hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmAction}
                disabled={actionLoading}
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
    </div>
  );
};

export default WorkDetails;