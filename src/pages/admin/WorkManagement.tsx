import { useEffect, useMemo, useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import type { Work, WorkStatus, WorkType } from "../../utils/types";

import WorkService from "../../service/firebaseService/workService";

import WorkMediaService from "../../service/s3Service/workMediaService";

import AddWorkModal from "../../components/AddWorkModal";

import EditWorkModal from "../../components/EditWorkModal";

import WorkDetailView from "./WorkDetails";

import DeleteWorkModal from "../../components/DeleteWorkModal";

type ModalAction = "add" | "edit" | "view" | "delete" | null;

type ModalState = {
  isOpen: boolean;
  action: ModalAction;
  work: Work | null;
};

type StatusTab = "all" | WorkStatus;

const STATUS_TABS: { value: StatusTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "sent_to_client", label: "Sent to Client" },
  { value: "requested_to_edit", label: "Changes Requested" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const WorkManagement = () => {
  const [works, setWorks] = useState<Work[]>([]);

  const [loading, setLoading] = useState(true);

  const [addLoading, setAddLoading] = useState(false);

  const [editLoading, setEditLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [statusLoadingId, setStatusLoadingId] = useState<string | null>(null);

  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<StatusTab>("all");

  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    action: null,
    work: null,
  });

  // Track the currently viewed work as a separate piece of state so the
  // detail page can stay open while delete/edit modals layer on top of it.
  const [viewingWork, setViewingWork] = useState<Work | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Guards against re-opening the detail view every time `works` refreshes
  // (e.g. after an edit) once we've already handled the incoming workId.
  const appliedIncomingWorkId = useRef<string | null>(null);

  const sortWorksNewestFirst = (data: Work[]) => {
    return [...data].sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() ?? 0;

      const bTime = b.createdAt?.toMillis?.() ?? 0;

      return bTime - aTime;
    });
  };

  useEffect(() => {
    let cancelled = false;

    const fetchWorks = async () => {
      try {
        const data = await WorkService.getAllWorks();

        if (!cancelled) {
          setWorks(sortWorksNewestFirst(data));
        }
      } catch (error) {
        console.error("Failed to load works:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchWorks();

    return () => {
      cancelled = true;
    };
  }, []);

  // If we arrived here from a link that passed a workId (e.g. the
  // dashboard's "Requires attention" / "Recent activity" cards), open that
  // work's detail view as soon as the works list has loaded.
  useEffect(() => {
    const incomingWorkId = (location.state as { workId?: string } | null)
      ?.workId;

    if (!incomingWorkId) return;
    if (appliedIncomingWorkId.current === incomingWorkId) return;
    if (works.length === 0) return;

    const match = works.find((item) => item.id === incomingWorkId);

    if (match) {
      setViewingWork(match);
      appliedIncomingWorkId.current = incomingWorkId;

      // Clear the navigation state so refreshing or navigating back
      // doesn't keep re-opening this work.
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [works, location.state, location.pathname, navigate]);

  const refreshWorks = async () => {
    try {
      const data = await WorkService.getAllWorks();

      setWorks(sortWorksNewestFirst(data));

      // Keep the detail page in sync with the latest data.
      setViewingWork((prev) =>
        prev ? data.find((item) => item.id === prev.id) || prev : prev,
      );
    } catch (error) {
      console.error("Failed to refresh works:", error);
    }
  };

  const openModal = (
    action: Exclude<ModalAction, null>,
    work: Work | null = null,
  ) => {
    setDeleteError(null);

    if (action === "view") {
      setViewingWork(work);
      return;
    }

    setModal({
      isOpen: true,
      action,
      work,
    });
  };

  const closeModal = () => {
    if (addLoading || editLoading || deleteLoading) {
      return;
    }

    setDeleteError(null);

    setModal({
      isOpen: false,
      action: null,
      work: null,
    });
  };

  const resetModal = () => {
    setDeleteError(null);

    setModal({
      isOpen: false,
      action: null,
      work: null,
    });
  };

  const handleAddWork = async (
    data: Omit<Work, "id" | "createdAt" | "updatedAt">,
  ) => {
    try {
      setAddLoading(true);

      await WorkService.addWork(data);

      await refreshWorks();

      resetModal();
    } catch (error) {
      console.error("Failed to add work:", error);

      throw error;
    } finally {
      setAddLoading(false);
    }
  };

  // const handleEditWork = async (updatedData: Partial<Work>) => {
  //   if (!modal.work?.id) return;

  //   try {
  //     setEditLoading(true);

  //     await WorkService.editWork(modal.work.id, updatedData);

  //     await refreshWorks();

  //     resetModal();
  //   } catch (error) {
  //     console.error("Failed to edit work:", error);

  //     throw error;
  //   } finally {
  //     setEditLoading(false);
  //   }
  // };

  const handleDeleteWork = async () => {
    const work = modal.work;

    if (!work?.id) {
      setDeleteError("Work information is missing.");
      return;
    }

    try {
      setDeleteLoading(true);
      setDeleteError(null);

      const mediaKeys =
        work.media?.map((media) => media.key).filter(Boolean) || [];

      if (mediaKeys.length > 0) {
        await WorkMediaService.deleteMultipleFiles(mediaKeys);
      }

      await WorkService.deleteWork(work.id);

      setWorks((prev) => prev.filter((item) => item.id !== work.id));

      if (viewingWork?.id === work.id) {
        setViewingWork(null);
      }

      resetModal();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to delete work:", error);
        setDeleteError(error?.message || "Failed to delete work.");
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDisplayChange = async (work: Work, isDisplay: boolean) => {
    if (!work.id) return;

    try {
      setStatusLoadingId(work.id);

      await WorkService.updateDisplay(work.id, isDisplay);

      await refreshWorks();
    } catch (error) {
      console.error("Failed to update display status:", error);
    } finally {
      setStatusLoadingId(null);
    }
  };

  // const handleSendToClientAgain = async (work: Work) => {
  //   if (!work.id) return;

  //   try {
  //     setStatusLoadingId(work.id);

  //     await WorkService.editWork(work.id, { status: "sent_to_client" });

  //     await refreshWorks();
  //   } catch (error) {
  //     console.error("Failed to resend work to client:", error);
  //   } finally {
  //     setStatusLoadingId(null);
  //   }
  // };

//   const handleSendToClientAgain = async (work: Work) => {
//   if (!work.id) return;

//   try {
//     setStatusLoadingId(work.id);

//     await WorkService.updateStatus(work.id, "sent_to_client", "Admin");

//     await refreshWorks();
//   } catch (error) {
//     console.error("Failed to resend work to client:", error);
//   } finally {
//     setStatusLoadingId(null);
//   }
// };



const handleEditWork = async (updatedData: Partial<Work>) => {
  if (!modal.work?.id) return;

  try {
    setEditLoading(true);

    await WorkService.editWork(modal.work.id, updatedData, "Admin");

    await refreshWorks();

    resetModal();
  } catch (error) {
    console.error("Failed to edit work:", error);
    throw error;
  } finally {
    setEditLoading(false);
  }
};

const handleSendToClientAgain = async (work: Work) => {
  if (!work.id) return;

  try {
    setStatusLoadingId(work.id);

    await WorkService.editWork(
      work.id,
      { status: "sent_to_client" },
      "Admin",
    );

    await refreshWorks();
  } catch (error) {
    console.error("Failed to resend work to client:", error);
  } finally {
    setStatusLoadingId(null);
  }
};
  const filteredWorks = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return works.filter((work) => {
      const matchesSearch =
        !searchValue ||
        work.postName?.toLowerCase().includes(searchValue) ||
        work.clientName?.toLowerCase().includes(searchValue) ||
        work.description?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" || work.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [works, search, statusFilter]);

  const formatDate = (date: string) => {
    if (!date) return "--";

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
      return date;
    }

    return value.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusLabel = (status: WorkStatus) => {
    switch (status) {
      case "sent_to_client":
        return "Sent to Client";

      case "requested_to_edit":
        return "Changes Requested";

      case "approved":
        return "Approved";

      case "rejected":
        return "Rejected";
    }
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

  const getTypeLabel = (type: WorkType) => {
    switch (type) {
      case "poster":
        return "Poster";

      case "reel":
        return "Reel";

      default:
        return type;
    }
  };

  // Detail page takes over the whole content area — same pattern as the
  // screenshot, no dimmed overlay.
  if (viewingWork) {
    return (
      <>
        <WorkDetailView
          work={viewingWork}
          statusLoading={statusLoadingId === viewingWork.id}
          onBack={() => setViewingWork(null)}
          onEdit={() => openModal("edit", viewingWork)}
          onToggleDisplay={(isDisplay) =>
            handleDisplayChange(viewingWork, isDisplay)
          }
          onDelete={() => openModal("delete", viewingWork)}
          onSendToClientAgain={() => handleSendToClientAgain(viewingWork)}
          formatDate={formatDate}
          getStatusLabel={getStatusLabel}
          getTypeLabel={getTypeLabel}
        />

        {modal.isOpen && modal.action === "edit" && modal.work && (
          <EditWorkModal
            key={modal.work.clientId}
            isOpen
            work={modal.work}
            loading={editLoading}
            onClose={closeModal}
            onSave={handleEditWork}
          />
        )}

        {modal.action === "delete" && modal.work && (
          <DeleteWorkModal
            work={modal.work}
            loading={deleteLoading}
            error={deleteError}
            onClose={closeModal}
            onConfirm={handleDeleteWork}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#08080c] px-6 py-10 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8468FF]">
  Work Management
</p>

           <h1 className="mt-3 text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl">
  Output held <span className="font-semibold">in structure.</span>
</h1>
            <p className="mt-4 max-w-xl text-sm text-white/40">
              Every piece of work, its client, its status and its position
              in the approval flow.
            </p>
          </div>

          <button
            onClick={() => openModal("add")}
            className="h-fit shrink-0 bg-violet-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-violet-500"
          >
            Add New Work
          </button>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px bg-white/10" />

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition ${
                  statusFilter === tab.value
                    ? "border-violet-500/60 text-white"
                    : "border-white/10 text-white/35 hover:text-white/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search works"
            className="w-full border border-white/10 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-500/50 lg:w-64"
          />
        </div>

        {/* Loading */}
        {loading ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse border border-white/[0.06] bg-white/[0.02]"
              />
            ))}
          </div>
        ) : filteredWorks.length === 0 ? (
          <div className="mt-8 flex min-h-[300px] flex-col items-center justify-center border border-dashed border-white/10">
            <h3 className="text-base font-semibold text-white">
              No work found
            </h3>

            <p className="mt-2 text-sm text-white/35">
              {search || statusFilter !== "all"
                ? "Try a different search or filter."
                : "Add your first poster or reel."}
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => openModal("view", work)}
                className="group flex cursor-pointer flex-col justify-between border border-white/10 p-6 transition hover:border-violet-500/30"
              >
                <div>
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`inline-block border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] ${getStatusStyle(
                        work.status,
                      )}`}
                    >
                      {getStatusLabel(work.status)}
                    </span>

                    <span className="pt-1 text-xs text-white/35">
                      {getTypeLabel(work.postType)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-base font-semibold leading-snug text-white">
                    {work.postName}
                  </h3>

                  {/* Client + meta */}
                  <p className="mt-3 text-sm text-white/40">
                    {work.clientName}
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    {work.media?.length || 0} files &middot;{" "}
                    {formatDate(work.postingDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddWorkModal
        isOpen={modal.isOpen && modal.action === "add"}
        loading={addLoading}
        onClose={closeModal}
        onSave={handleAddWork}
      />
    </>
  );
};

export default WorkManagement;
