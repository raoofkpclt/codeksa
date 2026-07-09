import { useEffect, useState } from "react";
import type { Client } from "../../utils/types";
import ClientService from "../../service/firebaseService/clientService";
import ReusableModal from "../../components/ReusableModal";
import EditClientModal from "../../components/EditClinetModal";
import AddClientModal from "../../components/AddClinetModal";
import DeleteModal from "../../components/DeleteModal";


const DEFAULT_CLIENT_LOGO =
  "https://codeksa-web.s3.ap-south-1.amazonaws.com/clients/logos/Preto.jpeg";

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

  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    action: null,
    client: null,
  });
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // useEffect(() => {
  //   let cancelled = false;

  //   const fetchClients = async () => {
  //     try {
  //       const data = await ClientService.getAllClients();

  //       if (!cancelled) {
  //         setClients(data as Client[]);
  //       }
  //     } catch (error) {
  //       console.error("Failed to load clients:", error);
  //     } finally {
  //       if (!cancelled) {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   void fetchClients();

  //   return () => {
  //     cancelled = true;
  //   };
  // }, []);

  // const refreshClients = async () => {
  //   try {
  //     const data = await ClientService.getAllClients();
  //     setClients(data as Client[]);
  //   } catch (error) {
  //     console.error("Failed to refresh clients:", error);
  //   }
  // };

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
        setClients(
          sortClientsNewestFirst(data as Client[])
        );
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

    setClients(
      sortClientsNewestFirst(data as Client[])
    );
  } catch (error) {
    console.error("Failed to refresh clients:", error);
  }
};

  const openModal = (
    action: Exclude<ModalAction, null>,
    client: Client | null = null,
  ) => {
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

  // const handleEditClient = async (updatedData: Partial<Client>) => {
  //   if (!modal.client?.id) return;

  //   try {
  //     setEditLoading(true);

  //     await ClientService.editClient(modal.client.id, updatedData);

  //     await refreshClients();

  //     resetModal();
  //   } catch (error) {
  //     console.error("Failed to update client:", error);
  //   } finally {
  //     setEditLoading(false);
  //   }
  // };

  const handleEditClient = async (
  updatedData: Partial<Client>
) => {
  if (!modal.client?.id) return;

  try {
    setEditLoading(true);

    await ClientService.editClient(
      modal.client.id,
      updatedData
    );

    await refreshClients();

    resetModal();
  } catch (error) {
    console.error(
      "Failed to update client:",
      error
    );
  } finally {
    setEditLoading(false);
  }
};

  // const handleAddClient = async (data: any) => {
  //   try {
  //     setAddLoading(true);

  //     // Create Firebase Auth user
  //     // + save client data in Firestore
  //     await ClientService.register(data.name, data.email, data.password);

  //     // Refresh client list
  //     await refreshClients();

  //     // Close modal
  //     resetModal();
  //   } catch (error) {
  //     console.error("Failed to add client:", error);

  //     // Throw again so AddClientModal
  //     // can display the error
  //     throw error;
  //   } finally {
  //     setAddLoading(false);
  //   }
  // };


  const handleAddClient = async (data: {
  name: string;
  email: string;
  password: string;
  logo?: string;
}) => {
  try {
    setAddLoading(true);

    await ClientService.register(
      data.name,
      data.email,
      data.password,
      data.logo || ""
    );

    await refreshClients();

    resetModal();
  } catch (error) {
    console.error(
      "Failed to add client:",
      error
    );

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
    } catch (error: any) {
      console.error("Failed to delete client:", error);

      switch (error?.code) {
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
          setDeleteError(error?.message || "Failed to delete client.");
      }
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#08080c] p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
           
           
          </div>

          <button
            onClick={() => openModal("add")}
            className="group flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-violet-500"
          >
            <span className="text-lg leading-none">+</span>
            Add Client
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[360px] animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]"
              />
            ))}
          </div>
        ) : clients.length === 0 ? (
          /* Empty State */
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <span className="text-2xl text-white/30">◫</span>
            </div>

            <h3 className="text-base font-semibold text-white">
              No clients found
            </h3>

            <p className="mt-2 text-sm text-white/35">
              Add your first client to get started.
            </p>
          </div>
        ) : (
          /* Client Cards */
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111116] transition-all duration-500 hover:-translate-y-1 hover:border-violet-500/30"
              >
                {/* Accent Line */}
                <div
                  className={`absolute left-0 top-0 h-1 w-full ${
                    client.active
                      ? "bg-gradient-to-r from-emerald-500 via-green-400 to-transparent"
                      : "bg-gradient-to-r from-amber-500 via-orange-400 to-transparent"
                  }`}
                />

                <div className="relative p-5">
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <div className="relative">
                      <div className="h-20 w-20 overflow-hidden rounded-2xl">
  <img
    src={
      client.logo?.trim()
        ? client.logo
        : DEFAULT_CLIENT_LOGO
    }
    alt={client.name || "Client logo"}
    className="h-full w-full object-cover"
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src =
        DEFAULT_CLIENT_LOGO;
    }}
  />
</div>

                      <span
                        className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-[#111116] ${
                          client.active ? "bg-emerald-400" : "bg-amber-400"
                        }`}
                      />
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] ${
                        client.active
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                          : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {client.active ? "Active" : "Pending"}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="mt-5">
                    <h3 className="truncate text-lg font-semibold text-white">
                      {client.name}
                    </h3>

                    <p className="mt-1 truncate text-sm text-white/40">
                      {client.email}
                    </p>
                  </div>

                  <div className="my-5 h-px bg-white/10" />

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
                        Client ID
                      </span>

                      <span className="max-w-[150px] truncate rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-white/50">
                        {client.uid || "--"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
                        Onboarding
                      </span>

                      <span
                        className={`text-xs font-medium ${
                          client.onboarding ? "text-blue-400" : "text-rose-400"
                        }`}
                      >
                        {client.onboarding ? "Completed" : "Incomplete"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
                        Created
                      </span>

                      <span className="text-xs text-white/50">
                        {client.createdAt
                          ? client.createdAt
                              .toDate()
                              .toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                          : "--"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6">
                    {!client.active ? (
                      <button
                        onClick={() => openModal("onboarding", client)}
                        className="w-full rounded-xl bg-violet-600 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-violet-500"
                      >
                        Activate Client
                      </button>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => openModal("edit", client)}
                          className="rounded-xl border border-violet-500/20 bg-violet-500/10 px-3 py-2.5 text-[10px] font-bold uppercase text-violet-400"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => openModal("block", client)}
                          className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2.5 text-[10px] font-bold uppercase text-amber-400"
                        >
                          Block
                        </button>

                        <button
                          onClick={() => openModal("delete", client)}
                          className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2.5 text-[10px] font-bold uppercase text-rose-400"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AddClientModal
        isOpen={modal.isOpen && modal.action === "add"}
        loading={addLoading}
        onClose={closeModal}
        onSave={handleAddClient}
      />

      <EditClientModal
        isOpen={modal.isOpen && modal.action === "edit"}
        client={modal.client}
        loading={editLoading}
        onClose={closeModal}
        onSave={handleEditClient}
      />

      <DeleteModal
        isOpen={modal.isOpen && modal.action === "delete"}
        client={modal.client}
        loading={modalLoading}
        error={deleteError}
        onClose={closeModal}
        onConfirm={handleDeleteClient}
      />

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
