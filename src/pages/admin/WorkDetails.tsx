import type { Work, WorkStatus, WorkType } from "../../utils/types";

type DecisionEntry = {
  status: WorkStatus;
  actor?: string;
  date: string;
};

type WorkDetailViewProps = {
  work: Work;
  statusLoading: boolean;
  onBack: () => void;
  onEdit: () => void;
  onToggleDisplay: (isDisplay: boolean) => void;
  onDelete: () => void;
  onSendToClientAgain: () => void;
  formatDate: (date: string) => string;
  getStatusLabel: (status: WorkStatus) => string;
  getTypeLabel: (type: WorkType) => string;
};

const WorkDetailView = ({
  work,
  statusLoading,
  onBack,
  onEdit,
  onToggleDisplay,
  onDelete,
  onSendToClientAgain,
  formatDate,
  getStatusLabel,
  getTypeLabel,
}: WorkDetailViewProps) => {
  // Decision history is optional on Work — render gracefully if absent.
  const decisionHistory = ((work as any).decisionHistory ||
    []) as DecisionEntry[];

  const formatDateTime = (value: string) => {
    if (!value) return "--";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    const datePart = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const timePart = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${datePart}, ${timePart}`;
  };

  const getStatusStyle = (status: WorkStatus) => {
    switch (status) {
      case "sent_to_client":
        return "border-blue-500/30 text-blue-300";

      case "requested_to_edit":
        return "border-amber-500/30 text-amber-300";

      case "approved":
        return "border-emerald-500/30 text-emerald-300";

      case "rejected":
        return "border-rose-500/30 text-rose-300";
    }
  };

  return (
    <div className="min-h-screen bg-[#08080c] px-6 py-10 sm:px-10 lg:px-16">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40 transition hover:text-white"
      >
        <span>←</span> Works
      </button>

      {/* Header */}
      <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">
            {getTypeLabel(work.postType)} &middot; {getStatusLabel(work.status)}
          </p>

          <h1 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {work.postName}
          </h1>

          {work.description && (
            <p className="mt-4 max-w-2xl text-sm text-white/40">
              {work.description}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            onClick={onEdit}
            className="border border-violet-500/40 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-violet-300 transition hover:bg-violet-500/10"
          >
            Edit
          </button>

          <button
            onClick={() => onToggleDisplay(!work.isDisplay)}
            disabled={statusLoading}
            className="border border-white/15 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70 transition hover:border-white/30 hover:text-white disabled:opacity-50"
          >
            {work.isDisplay ? "Hide from Website" : "Mark Live on Website"}
          </button>

          <button
            onClick={onDelete}
            className="border border-rose-500/30 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-rose-400 transition hover:bg-rose-500/10"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 h-px bg-white/10" />

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div>
          {/* The work */}
          <section>
            <h2 className="text-2xl font-semibold text-white">The work</h2>

            <p className="mt-2 text-sm text-white/35">
              Everything shared for this piece.
            </p>

            <div className="mt-6 flex min-h-[260px] flex-col items-center justify-center gap-2 border border-white/10 bg-white/[0.02]">
              {work.media && work.media.length > 0 ? (
                <div className="grid w-full grid-cols-2 gap-3 p-4 sm:grid-cols-3">
                  {work.media.map((media, index) =>
                    work.postType === "poster" ? (
                      <img
                        key={media.key || index}
                        src={media.url}
                        alt={work.postName}
                        className="aspect-square w-full object-cover"
                      />
                    ) : (
                      <video
                        key={media.key || index}
                        src={media.url}
                        muted
                        preload="metadata"
                        className="aspect-square w-full object-cover"
                      />
                    ),
                  )}
                </div>
              ) : (
                <>
                  <span className="mb-2 h-2 w-2 rounded-full bg-violet-500" />

                  <p className="text-lg font-semibold text-white">
                    No files attached.
                  </p>

                  <p className="text-sm text-white/30">
                    This work has no media attached yet.
                  </p>
                </>
              )}
            </div>
          </section>

          {/* Decision history */}
          <section className="mt-14">
            <h2 className="text-2xl font-semibold text-white">
              Decision history
            </h2>

            <p className="mt-2 text-sm text-white/35">
              A continuous, permanent record.
            </p>

            {decisionHistory.length === 0 ? (
              <p className="mt-6 text-sm text-white/25">
                No decisions recorded yet.
              </p>
            ) : (
              <div className="mt-6">
                {decisionHistory.map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b border-white/10 py-4"
                  >
                    <span
                      className={`inline-block border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] ${getStatusStyle(
                        entry.status,
                      )}`}
                    >
                      {getStatusLabel(entry.status)}
                    </span>

                    <span className="text-sm text-white/40">
                      {entry.actor || "Client"} &middot;{" "}
                      {formatDateTime(entry.date)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
              Status
            </p>

            <span
              className={`mt-2 inline-block border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] ${getStatusStyle(
                work.status,
              )}`}
            >
              {getStatusLabel(work.status)}
            </span>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
              Client
            </p>

            <p className="mt-2 text-sm text-white">{work.clientName}</p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
              Type
            </p>

            <p className="mt-2 text-sm text-white">
              {getTypeLabel(work.postType)}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
              Posting Date
            </p>

            <p className="mt-2 text-sm text-white">
              {formatDate(work.postingDate)}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
              Live on Website
            </p>

            <p className="mt-2 text-sm text-white">
              {work.isDisplay ? "Yes" : "No"}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
              Files
            </p>

            <p className="mt-2 text-sm text-white">
              {work.media?.length || 0}
              {work.media && work.media.length > 0 ? "" : " · —"}
            </p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
              Re-open
            </p>

            <p className="mt-2 text-sm text-white/50">
              Send an updated version back to the client for review.
            </p>

            <button
              onClick={onSendToClientAgain}
              disabled={statusLoading}
              className="mt-4 w-full border border-white/15 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/80 transition hover:border-violet-500/40 hover:text-white disabled:opacity-50"
            >
              Send to Client Again
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default WorkDetailView;
