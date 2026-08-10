import type { Work, WorkStatus } from "../utils/types";

type ViewWorkModalProps = {
  isOpen: boolean;
  work: Work | null;
  onClose: () => void;
};

const getStatusLabel = (status: WorkStatus) => {
  switch (status) {
    case "sent_to_client":
      return "Sent to Client";

    case "requested_to_edit":
      return "Requested to Edit";

    case "approved":
      return "Approved";

    case "rejected":
      return "Rejected";
  }
};

const ViewWorkModal = ({ isOpen, work, onClose }: ViewWorkModalProps) => {
  if (!isOpen || !work) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto border border-white/10 bg-[#0c0c11] p-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-400">
              {work.clientName}
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              {work.postName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-white/40 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/30">
              Type
            </p>

            <p className="mt-2 text-sm capitalize text-white">
              {work.postType}
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/30">
              Status
            </p>

            <p className="mt-2 text-sm text-white">
              {getStatusLabel(work.status)}
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/30">
              Display
            </p>

            <p
              className={`mt-2 text-sm font-medium ${
                work.isDisplay ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {work.isDisplay ? "Visible" : "Hidden"}
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/30">
              Posting Date
            </p>

            <p className="mt-2 text-sm text-white">{work.postingDate}</p>
          </div>
        </div>

        {work.description && (
          <div className="mt-5 border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/30">
              Description
            </p>

            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/60">
              {work.description}
            </p>
          </div>
        )}

        {/* =================================
    Client Edit Request Note
================================= */}

        {work.status === "requested_to_edit" && work.editRequestNote && (
          <div className="mt-5 border border-blue-500/20 bg-blue-500/[0.06]">
            {/* Header */}

            <div className="flex items-center gap-3 border-b border-blue-500/15 px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-blue-500/10 text-blue-400">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                </svg>
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-blue-400">
                  Client Edit Request
                </p>

                <p className="mt-0.5 text-[10px] text-white/30">
                  Changes requested by {work.clientName}
                </p>
              </div>
            </div>

            {/* Note */}

            <div className="p-4">
              <p className="whitespace-pre-wrap text-sm leading-6 text-white/70">
                {work.editRequestNote}
              </p>
            </div>
          </div>
        )}

        <div className="mt-8">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/30">
            Media
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {work.media?.map((media, index) => (
              <div
                key={`${media.key}-${index}`}
                className="overflow-hidden border border-white/10 bg-black"
              >
                {work.postType === "poster" ? (
                  <img
                    src={media.url}
                    alt={media.fileName}
                    className="max-h-[600px] w-full object-contain"
                  />
                ) : (
                  <video
                    src={media.url}
                    controls
                    className="max-h-[600px] w-full"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewWorkModal;
