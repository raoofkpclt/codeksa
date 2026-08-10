import { useEffect, useMemo, useState } from "react";
import type { Client } from "../../utils/types";
import ClientService from "../../service/firebaseService/clientService";
import ReusableModal from "../../components/ReusableModal";
import EditClientModal from "../../components/EditClinetModal";
import AddClientModal from "../../components/AddClinetModal";
import DeleteModal from "../../components/DeleteModal";
import { FirebaseError } from "firebase/app";


type ModalAction =
  | "delete"
  | "add"
  | "edit"
  | "block"
  | "unblock"
  | "onboarding"
  | null;

type ModalState = {
  isOpen: boolean;
  action: ModalAction;
  client: Client | null;
};

const ClientManagement = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    action: null,
    client: null,
  });
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const sortClientsNewestFirst = (data: Client[]) => {
    return [...data].sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() ?? 0;
      const bTime = b.createdAt?.toMillis?.() ?? 0;

      return bTime - aTime;
    });
  };

  useEffect(() => {
    let cancelled = false;

    const fetchClients = async () => {
      try {
        const data = await ClientService.getAllClients();

        if (!cancelled) {
          setClients(sortClientsNewestFirst(data as Client[]));
        }
      } catch (error) {
        console.error("Failed to load clients:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchClients();

    return () => {
      cancelled = true;
    };
  }, []);

  const refreshClients = async () => {
    try {
      const data = await ClientService.getAllClients();

      setClients(sortClientsNewestFirst(data as Client[]));
    } catch (error) {
      console.error("Failed to refresh clients:", error);
    }
  };

  const openModal = (
    action: Exclude<ModalAction, null>,
    client: Client | null = null,
  ) => {
    setOpenMenuId(null);

    setModal({
      isOpen: true,
      action,
      client,
    });
  };

  const closeModal = () => {
    if (modalLoading) return;

    setModal({
      isOpen: false,
      action: null,
      client: null,
    });
  };

  const resetModal = () => {
    setModal({
      isOpen: false,
      action: null,
      client: null,
    });
  };

  const handleModalConfirm = async () => {
    if (!modal.action) return;

    try {
      setModalLoading(true);

      switch (modal.action) {
        case "block": {
          if (!modal.client?.id) return;

          await ClientService.blockClient(modal.client.id);
          await refreshClients();

          break;
        }

        case "unblock": {
          if (!modal.client?.id) return;

          await ClientService.unblockClient(modal.client.id);
          await refreshClients();

          break;
        }

        case "onboarding": {
          if (!modal.client?.id) return;

          await ClientService.completeOnboarding(modal.client.id);
          await refreshClients();

          break;
        }

        case "edit": {
          console.log("Edit client", modal.client);
          break;
        }
      }

      resetModal();
    } catch (error) {
      console.error(`Failed to perform ${modal.action} operation:`, error);
    } finally {
      setModalLoading(false);
    }
  };

  const getModalConfig = () => {
    switch (modal.action) {
      case "delete":
        return {
          title: "Delete Client",
          description: `Are you sure you want to permanently delete ${
            modal.client?.name || "this client"
          }? This action cannot be undone.`,
          confirmText: "Delete",
          loadingText: "Deleting...",
          variant: "danger" as const,
        };

      case "block":
        return {
          title: "Block Client",
          description: `Are you sure you want to block ${
            modal.client?.name || "this client"
          }?`,
          confirmText: "Block",
          loadingText: "Blocking...",
          variant: "warning" as const,
        };

      case "unblock":
        return {
          title: "Unblock Client",
          description: `Restore access for ${
            modal.client?.name || "this client"
          }?`,
          confirmText: "Unblock",
          loadingText: "Unblocking...",
          variant: "success" as const,
        };

      case "onboarding":
        return {
          title: "Activate Client",
          description: `Are you sure you want to activate ${
            modal.client?.name || "this client"
          }?`,
          confirmText: "Activate",
          loadingText: "Activating...",
          variant: "success" as const,
        };

      case "add":
        return {
          title: "Add Client",
          description: "Enter client details to create a new client.",
          confirmText: "Create",
          loadingText: "Creating...",
          variant: "primary" as const,
        };

      case "edit":
        return {
          title: "Edit Client",
          description: `Update details for ${
            modal.client?.name || "this client"
          }.`,
          confirmText: "Save",
          loadingText: "Saving...",
          variant: "info" as const,
        };

      default:
        return {
          title: "",
          description: "",
          confirmText: "Confirm",
          loadingText: "Processing...",
          variant: "primary" as const,
        };
    }
  };

  const modalConfig = getModalConfig();

  const handleEditClient = async (updatedData: Partial<Client>) => {
    if (!modal.client?.id) return;

    try {
      setEditLoading(true);

      await ClientService.editClient(modal.client.id, updatedData);

      await refreshClients();

      resetModal();
    } catch (error) {
      console.error("Failed to update client:", error);
    } finally {
      setEditLoading(false);
    }
  };

  const handleAddClient = async (data: {
    name: string;
    email: string;
    password: string;
    company: string;
    logo?: string;
  }) => {
    try {
      setAddLoading(true);

      await ClientService.register(
        data.name,
        data.email,
        data.password,
        data.company,
        data.logo || "",
      );

      // NOTE: adjust if your register()/ClientService also needs to persist
      // `company` — if register() doesn't accept it, you may need a follow-up
      // ClientService.editClient(newClientId, { company: data.company }) call
      // here once register() returns the created client's id.

      await refreshClients();

      resetModal();
    } catch (error) {
      console.error("Failed to add client:", error);

      throw error;
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteClient = async (password: string) => {
    const client = modal.client;

    if (!client?.id || !client.email) {
      setDeleteError("Client information is missing.");
      return;
    }

    try {
      setModalLoading(true);
      setDeleteError(null);

      await ClientService.deleteClient(client.id, client.email, password);

      setClients((prev) => prev.filter((item) => item.id !== client.id));

      resetModal();
    } catch (error: unknown) {
      console.error("Failed to delete client:", error);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            setDeleteError("Invalid client password.");
            break;

          case "auth/wrong-password":
            setDeleteError("Incorrect client password.");
            break;

          case "auth/user-not-found":
            setDeleteError("Firebase Auth account was not found.");
            break;

          case "auth/too-many-requests":
            setDeleteError("Too many attempts. Please try again later.");
            break;

          default:
            setDeleteError(error.message);
        }
      } else if (error instanceof Error) {
        setDeleteError(error.message);
      } else {
        setDeleteError("Failed to delete client.");
      }
    } finally {
      setModalLoading(false);
    }
  };

  const formatDate = (client: Client) =>
    client.createdAt
      ? client.createdAt.toDate().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "--";

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return clients;

    return clients.filter((client) => {
      const name = client.name?.toLowerCase() || "";
      const email = client.email?.toLowerCase() || "";
      const company = client.company?.toLowerCase() || "";

      return (
        name.includes(query) ||
        email.includes(query) ||
        company.includes(query)
      );
    });
  }, [clients, search]);

  return (
    <>
      <div className="min-h-screen bg-[#08080c] px-6 py-10 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8468FF]">
  Client Management
</p>

            <h4 className="mt-3 text-3xl md:text-4xl font-light leading-tight tracking-tight text-white">
  Every relationship,
  <span className="font-semibold"> structured.</span>
</h4>

            <p className="mt-4 max-w-xl text-sm text-white/40">
              Client accounts, their access to CODE Hub™ and the work held
              against each of them.
            </p>
          </div>

          <button
            onClick={() => openModal("add")}
            className="h-fit shrink-0 bg-violet-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-violet-500"
          >
            Add Client
          </button>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px bg-white/10" />

        {/* Search */}
        <div className="mt-8 flex items-center gap-3 border-b border-white/10 pb-4">
          <span className="text-white/30">⌕</span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients by name, company or email"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
          />
        </div>

        {/* Loading */}
        {loading ? (
          <div className="mt-8 space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-16 w-full animate-pulse border-b border-white/[0.06] bg-white/[0.02]"
              />
            ))}
          </div>
        ) : filteredClients.length === 0 ? (
          /* Empty State */
          <div className="mt-8 flex min-h-[300px] flex-col items-center justify-center border border-dashed border-white/10">
            <h3 className="text-base font-semibold text-white">
              No clients found
            </h3>

            <p className="mt-2 text-sm text-white/35">
              {search
                ? "Try a different search term."
                : "Add your first client to get started."}
            </p>
          </div>
        ) : (
          /* Table */
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-4 pr-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                    Client
                  </th>
                  <th className="py-4 pr-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                    Company
                  </th>
                  <th className="py-4 pr-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                    Works
                  </th>
                  <th className="py-4 pr-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                    Access
                  </th>
                  <th className="py-4 pr-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                    Added
                  </th>
                  <th className="py-4 text-right text-[10px] font-bold uppercase tracking-[0.14em] text-white/35" >
                  Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="group border-b border-white/[0.06] transition hover:bg-white/[0.02]"
                  >
                    <td className="py-5 pr-4">
                      <p className="text-sm font-medium text-white">
                        {client.name || client.email}
                      </p>
                      {client.name && (
                        <p className="mt-0.5 text-xs text-white/35">
                          {client.email}
                        </p>
                      )}
                    </td>

                    <td className="py-5 pr-4 text-sm text-white/40">
                      {client.company || "—"}
                    </td>

                    <td className="py-5 pr-4 text-sm text-white/50">
                      {(client as any).works?.length ?? 0}
                    </td>

                    <td className="py-5 pr-4">
                      <span
                        className={`inline-block border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] ${
                          client.active
                            ? "border-emerald-500/30 text-emerald-400"
                            : "border-amber-500/30 text-amber-400"
                        }`}
                      >
                        {client.active ? "Active" : "Pending"}
                      </span>
                    </td>

                    <td className="py-5 pr-4 text-sm text-white/40">
                      {formatDate(client)}
                    </td>

                    <td className="relative py-5 text-right">
                      <button
                        onClick={() =>
                          setOpenMenuId((prev) =>
                            prev === client.id ? null : client.id!,
                          )
                        }
                        className="px-2 text-white/30 opacity-0 transition hover:text-white group-hover:opacity-100"
                      >
                        ⋯
                      </button>

                      {openMenuId === client.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenMenuId(null)}
                          />

                          <div className="absolute right-0 top-12 z-20 w-40 border border-white/10 bg-[#111116] py-1 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                            {!client.active && (
                              <button
                                onClick={() => openModal("onboarding", client)}
                                className="block w-full px-4 py-2.5 text-left text-xs text-violet-400 hover:bg-white/[0.05]"
                              >
                                Activate
                              </button>
                            )}

                            <button
                              onClick={() => openModal("edit", client)}
                              className="block w-full px-4 py-2.5 text-left text-xs text-white/70 hover:bg-white/[0.05]"
                            >
                              Edit
                            </button>

                            {client.active && (
                              <button
                                onClick={() => openModal("block", client)}
                                className="block w-full px-4 py-2.5 text-left text-xs text-amber-400 hover:bg-white/[0.05]"
                              >
                                Block
                              </button>
                            )}

                            {!client.active && client.onboarding && (
                              <button
                                onClick={() => openModal("unblock", client)}
                                className="block w-full px-4 py-2.5 text-left text-xs text-emerald-400 hover:bg-white/[0.05]"
                              >
                                Unblock
                              </button>
                            )}

                            <button
                              onClick={() => openModal("delete", client)}
                              className="block w-full px-4 py-2.5 text-left text-xs text-rose-400 hover:bg-white/[0.05]"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal.isOpen && (
        <AddClientModal
          isOpen={modal.isOpen && modal.action === "add"}
          loading={addLoading}
          onClose={closeModal}
          onSave={handleAddClient}
        />
      )}

      {modal.isOpen && modal.action === "edit" && modal.client && (
        <EditClientModal
          client={modal.client}
          loading={editLoading}
          onClose={closeModal}
          onSave={handleEditClient}
        />
      )}

      {modal.isOpen && modal.action === "delete" && modal.client && (
        <DeleteModal
          client={modal.client}
          loading={modalLoading}
          error={deleteError}
          onClose={closeModal}
          onConfirm={handleDeleteClient}
        />
      )}

      <ReusableModal
        isOpen={
          modal.isOpen &&
          modal.action !== "edit" &&
          modal.action !== "add" &&
          modal.action !== "delete"
        }
        title={modalConfig.title}
        description={modalConfig.description}
        confirmText={modalConfig.confirmText}
        loadingText={modalConfig.loadingText}
        variant={modalConfig.variant}
        loading={modalLoading}
        onConfirm={handleModalConfirm}
        onClose={closeModal}
      />
    </>
  );
};

export default ClientManagement;
