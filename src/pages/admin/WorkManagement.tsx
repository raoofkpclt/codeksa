import { useEffect, useMemo, useState } from "react";

import type { Work, WorkStatus, WorkType } from "../../utils/types";

import WorkService from "../../service/firebaseService/workService";

import WorkMediaService from "../../service/s3Service/workMediaService";

import AddWorkModal from "../../components/AddWorkModal";

import EditWorkModal from "../../components/EditWorkModal";

import ViewWorkModal from "../../components/ViewWorkModal";

import DeleteWorkModal from "../../components/DeleteWorkModal";

type ModalAction = "add" | "edit" | "view" | "delete" | null;

type ModalState = {
  isOpen: boolean;
  action: ModalAction;
  work: Work | null;
};

const WorkManagement = () => {
  const [works, setWorks] = useState<Work[]>([]);

  const [loading, setLoading] = useState(true);

  const [addLoading, setAddLoading] = useState(false);

  const [editLoading, setEditLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [statusLoadingId, setStatusLoadingId] = useState<string | null>(null);

  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] = useState<"all" | WorkType>("all");

  const [statusFilter, setStatusFilter] = useState<"all" | WorkStatus>("all");

  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    action: null,
    work: null,
  });

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

  const refreshWorks = async () => {
    try {
      const data = await WorkService.getAllWorks();

      setWorks(sortWorksNewestFirst(data));
    } catch (error) {
      console.error("Failed to refresh works:", error);
    }
  };

  const openModal = (
    action: Exclude<ModalAction, null>,
    work: Work | null = null,
  ) => {
    setDeleteError(null);

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

  const handleEditWork = async (updatedData: Partial<Work>) => {
    if (!modal.work?.id) return;

    try {
      setEditLoading(true);

      await WorkService.editWork(modal.work.id, updatedData);

      await refreshWorks();

      resetModal();
    } catch (error) {
      console.error("Failed to edit work:", error);

      throw error;
    } finally {
      setEditLoading(false);
    }
  };

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

  const filteredWorks = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return works.filter((work) => {
      const matchesSearch =
        !searchValue ||
        work.postName?.toLowerCase().includes(searchValue) ||
        work.clientName?.toLowerCase().includes(searchValue) ||
        work.description?.toLowerCase().includes(searchValue);

      const matchesType = typeFilter === "all" || work.postType === typeFilter;

      const matchesStatus =
        statusFilter === "all" || work.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [works, search, typeFilter, statusFilter]);

  const formatDate = (date: string) => {
    if (!date) return "--";

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
      return date;
    }

    return value.toLocaleDateString("en-IN", {
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
        return "Edit Requested";

      case "approved":
        return "Approved";

      case "rejected":
        return "Rejected";
    }
  };

  const getStatusStyle = (status: WorkStatus) => {
    switch (status) {
      case "sent_to_client":
        return "border-blue-500/20 bg-blue-500/10 text-blue-400";

      case "requested_to_edit":
        return "border-amber-500/20 bg-amber-500/10 text-amber-400";

      case "approved":
        return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";

      case "rejected":
        return "border-rose-500/20 bg-rose-500/10 text-rose-400";
    }
  };

  const getAccentStyle = (status: WorkStatus) => {
    switch (status) {
      case "sent_to_client":
        return "from-blue-500 via-cyan-400 to-transparent";

      case "requested_to_edit":
        return "from-amber-500 via-orange-400 to-transparent";

      case "approved":
        return "from-emerald-500 via-green-400 to-transparent";

      case "rejected":
        return "from-rose-500 via-red-400 to-transparent";
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#08080c] ">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div></div>

          <button
            onClick={() => openModal("add")}
            className="group flex items-center justify-center gap-2  bg-violet-600 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-violet-500"
          >
            <span className="text-lg leading-none">+</span>
            Add Work
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 grid gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 md:grid-cols-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search post or client..."
            className="w-full rounded-xl border border-white/10 bg-[#111116] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-500/50"
          />

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value as "all" | WorkType)
            }
            className="w-full rounded-xl border border-white/10 bg-[#111116] px-4 py-3 text-sm text-white outline-none"
          >
            <option value="all">All Types</option>

            <option value="poster">Posters</option>

            <option value="reel">Reels</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as "all" | WorkStatus)
            }
            className="w-full rounded-xl border border-white/10 bg-[#111116] px-4 py-3 text-sm text-white outline-none"
          >
            <option value="all">All Status</option>

            <option value="sent_to_client">Sent to Client</option>

            <option value="requested_to_edit">Edit Requested</option>

            <option value="approved">Approved</option>

            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[450px] animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]"
              />
            ))}
          </div>
        ) : filteredWorks.length === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <span className="text-2xl text-white/30">◫</span>
            </div>

            <h3 className="text-base font-semibold text-white">
              No work found
            </h3>

            <p className="mt-2 text-sm text-white/35">
              Add your first poster or reel.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredWorks.map((work) => {
              const firstMedia = work.media?.[0];

              return (
                <div
                  key={work.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111116] transition-all duration-500 hover:-translate-y-1 hover:border-violet-500/30"
                >
                  {/* Accent */}
                  <div
                    className={`absolute left-0 top-0 z-10 h-1 w-full bg-gradient-to-r ${getAccentStyle(
                      work.status,
                    )}`}
                  />

                  {/* Media Preview */}
                  <div className="relative h-52 overflow-hidden bg-black">
                    {firstMedia ? (
                      work.postType === "poster" ? (
                        <img
                          src={firstMedia.url}
                          alt={work.postName}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <video
                          src={firstMedia.url}
                          muted
                          preload="metadata"
                          className="h-full w-full object-cover"
                        />
                      )
                    ) : (
                      <div className="flex h-full items-center justify-center text-white/20">
                        No Media
                      </div>
                    )}

                    {/* Type */}
                    <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
                      {work.postType}
                    </span>

                    {/* Media Count */}
                    {work.media?.length > 1 && (
                      <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1.5 text-[9px] font-bold text-white">
                        +{work.media.length - 1} more
                      </span>
                    )}

                    {/* Active */}
                    {work.active && (
                      <span className="absolute right-3 top-3 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-300 backdrop-blur">
                        Active
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    {/* Status */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-semibold text-white">
                          {work.postName}
                        </h3>

                        <p className="mt-1 truncate text-sm text-white/40">
                          {work.clientName}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] ${getStatusStyle(
                          work.status,
                        )}`}
                      >
                        {getStatusLabel(work.status)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-4 line-clamp-2 min-h-[40px] text-sm leading-5 text-white/35">
                      {work.description || "No description added."}
                    </p>

                    <div className="my-5 h-px bg-white/10" />

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
                          Posting
                        </span>

                        <span className="text-xs text-white/55">
                          {formatDate(work.postingDate)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
                          Media
                        </span>

                        <span className="text-xs text-white/55">
                          {work.media?.length || 0} file(s)
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
                          Live
                        </span>

                        <span
                          className={`text-xs font-medium ${
                            work.active ? "text-emerald-400" : "text-white/35"
                          }`}
                        >
                          {work.active ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>

                    {/* Status Select */}
                    {/* <div className="mt-5">
                        <select
                          value={
                            work.status
                          }
                          disabled={
                            statusLoadingId ===
                            work.id
                          }
                          onChange={(
                            event
                          ) =>
                            handleStatusChange(
                              work,
                              event.target
                                .value as WorkStatus
                            )
                          }
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs text-white outline-none focus:border-violet-500/40 disabled:opacity-50"
                        >
                          <option value="sent_to_client">
                            Sent to Client
                          </option>

                          <option value="requested_to_edit">
                            Requested to Edit
                          </option>

                          <option value="approved">
                            Approved
                          </option>

                          <option value="rejected">
                            Rejected
                          </option>
                        </select>
                      </div> */}

                    {/* Display on Website */}
                    <div className="mt-5">
                      <select
                        value={work.isDisplay ? "true" : "false"}
                        disabled={statusLoadingId === work.id}
                        onChange={(event) =>
                          handleDisplayChange(
                            work,
                            event.target.value === "true",
                          )
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs text-white outline-none focus:border-violet-500/40 disabled:opacity-50"
                      >
                        <option value="true">Display on Website</option>

                        <option value="false">Hide from Website</option>
                      </select>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <button
                        onClick={() => openModal("view", work)}
                        className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2.5 text-[10px] font-bold uppercase text-blue-400 transition hover:bg-blue-500/20"
                      >
                        View
                      </button>

                      <button
                        onClick={() => openModal("edit", work)}
                        className="rounded-xl border border-violet-500/20 bg-violet-500/10 px-3 py-2.5 text-[10px] font-bold uppercase text-violet-400 transition hover:bg-violet-500/20"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => openModal("delete", work)}
                        className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2.5 text-[10px] font-bold uppercase text-rose-400 transition hover:bg-rose-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AddWorkModal
        isOpen={modal.isOpen && modal.action === "add"}
        loading={addLoading}
        onClose={closeModal}
        onSave={handleAddWork}
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

      <ViewWorkModal
        isOpen={modal.isOpen && modal.action === "view"}
        work={modal.work}
        onClose={closeModal}
      />
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
};

export default WorkManagement;
