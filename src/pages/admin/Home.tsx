import { useEffect, useState } from "react";
import ClientService from "../../service/firebaseService/clientService";

const Home = () => {
  const [totalClients, setTotalClients] = useState(0);
  const [activeClients, setActiveClients] = useState(0);
  const [pendingOnboarding, setPendingOnboarding] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientStats = async () => {
      try {
        setLoading(true);

        // Fetch all clients from Firestore
        const clients =
          await ClientService.getAllClients();

        // Total clients
        const totalCount = clients.length;

        // Active clients
        const activeCount = clients.filter(
          (client) => client.active === true
        ).length;

        // Pending onboarding clients
        const pendingCount = clients.filter(
          (client) => client.onboarding !== true
        ).length;

        setTotalClients(totalCount);
        setActiveClients(activeCount);
        setPendingOnboarding(pendingCount);
      } catch (error) {
        console.error(
          "Failed to fetch client stats:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClientStats();
  }, []);

  const statCards = [
    {
      label: "Total Clients",
      value: loading
        ? "..."
        : totalClients.toString(),
      delta: "All registered clients",
    },
    {
      label: "Active Clients",
      value: loading
        ? "..."
        : activeClients.toString(),
      delta: "Currently active",
    },
    {
      label: "Pending Onboarding",
      value: loading
        ? "..."
        : pendingOnboarding.toString(),
      delta: "Needs completion",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="relative border border-white/[0.08] bg-white/[0.03] p-5"
          >
            {/* Top Left Corner */}
            <span className="absolute -left-px -top-px h-3 w-3 border-l-[1.5px] border-t-[1.5px] border-[#8B5CF6]" />

            {/* Bottom Right Corner */}
            <span className="absolute -bottom-px -right-px h-3 w-3 border-b-[1.5px] border-r-[1.5px] border-[#8B5CF6]" />

            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
              {stat.label}
            </p>

            <p className="text-3xl font-black tracking-[-0.02em] text-white">
              {stat.value}
            </p>

            <p className="mt-1 text-[11px] text-white/30">
              {stat.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="border border-white/[0.08] bg-white/[0.03] p-5">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
          Recent Activity
        </p>

        <div className="flex flex-col gap-3">
          {[
            "New client registered",
            "Client onboarding completed",
            "Client account updated",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-[13px] text-white/70"
            >
              <div className="h-1 w-1 flex-shrink-0 rounded-full bg-[#8B5CF6]" />

              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;