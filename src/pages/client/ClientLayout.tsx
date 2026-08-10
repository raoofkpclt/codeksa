import { useEffect, useState, type ReactNode } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../../config/firebase/firebase";
import AuthService from "../../service/firebaseService/auth";

// =========================================
// Client Navigation
// =========================================

const navItems = [
  {
    label: "Dashboard",
    path: "/client/home",
    icon: "grid",
  },
  {
    label: "My works",
    path: "/client/works",
    icon: "layers",
  },
  {
    label: "My uploads",
    path: "/client/clientUploads",
    icon: "inbox",
  },
  {
    label: "Profile",
    path: "/client/profile",
    icon: "user",
  },
];

// =========================================
// Icons
// =========================================

const icons: Record<string, ReactNode> = {
  grid: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),

  layers: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),

  inbox: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),

  user: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

// =========================================
// Client Layout
// =========================================

const ClientLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const [clientName, setClientName] = useState("CODE Hub Test Client");
  const [clientEmail, setClientEmail] = useState("");

  // =========================================
  // Fetch Client Info
  // =========================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      setClientEmail(user.email || "");

      try {
        const clientRef = doc(db, "clients", user.uid);
        const clientSnapshot = await getDoc(clientRef);

        if (clientSnapshot.exists()) {
          const clientData = clientSnapshot.data();

          setClientName(
            clientData.companyName ||
              clientData.name ||
              clientData.clientName ||
              "there",
          );
        }
      } catch (error) {
        console.error(error);
      }
    });

    return () => unsubscribe();
  }, []);

  // =========================================
  // Logout
  // =========================================

  const handleLogout = async () => {
    try {
      await AuthService.logout();

      navigate("/client/login", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const clientInitial = (clientName || "C").trim().charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen bg-black text-white font-['Space_Grotesk',sans-serif]">
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

        .sidebar-tooltip {
          opacity: 0;
          transform: translateX(-4px);
          pointer-events: none;
          transition: opacity 150ms ease, transform 150ms ease;
        }

        .group:hover .sidebar-tooltip {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      {/* =====================================
          Background Grid
      ====================================== */}

      <div
        className="fixed inset-0 pointer-events-none bg-[length:40px_40px] opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(132,104,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(132,104,255,0.05) 1px, transparent 1px)",
        }}
      />

      {/* =====================================
          Sidebar
      ====================================== */}

      <aside
        className={`relative z-20 flex flex-col border-r border-white/[0.08] bg-white/[0.03] transition-all duration-300 ${
          collapsed ? "w-20" : "w-[260px]"
        }`}
      >
        {/* =================================
            Collapse toggle — anchored to the edge, always reachable
        ================================== */}

        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-3 top-8 z-30 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#111116] text-white/50 transition hover:border-[#8468FF]/50 hover:text-white"
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
            {collapsed ? (
              <polyline points="9 18 15 12 9 6" />
            ) : (
              <polyline points="15 18 9 12 15 6" />
            )}
          </svg>
        </button>

        {/* =================================
            Brand
        ================================== */}

        <div
          className={`flex items-center border-b border-white/[0.08] py-6 ${
            collapsed ? "justify-center px-0" : "px-5"
          }`}
        >
          <img
            src="/logo/backgroundless-2.png"
            className={`object-contain transition-all duration-300 ${
              collapsed ? "h-6 w-6" : "h-7 w-7"
            }`}
          />

          {!collapsed && (
            <span className="ml-3 text-base font-medium tracking-[0.15em] uppercase text-white">
              Code Hub
              <sup className="ml-0.5 text-[9px] text-white/40">TM</sup>
            </span>
          )}
        </div>

        {/* =================================
            Navigation
        ================================== */}

        <nav
          className={`flex flex-1 flex-col gap-1 py-6 ${
            collapsed ? "px-0" : "px-4"
          }`}
        >
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={`group relative flex items-center transition-all duration-200 ${
                  collapsed ? "justify-center px-0 py-3" : "gap-3 px-4 py-3"
                } ${
                  active
                    ? "bg-white/[0.06] text-white"
                    : "text-white/40 hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                <span
                  className={`absolute left-0 top-1/2 h-7 w-[2px] -translate-y-1/2 rounded-full bg-[#8468FF] transition ${
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                <span className="flex-shrink-0">{icons[item.icon]}</span>

                {!collapsed && (
                  <span className="text-sm tracking-[0.02em]">
                    {item.label}
                  </span>
                )}

                {collapsed && (
                  <span className="sidebar-tooltip pointer-events-none absolute left-full top-1/2 z-40 ml-3 -translate-y-1/2 whitespace-nowrap border border-white/10 bg-[#111116] px-3 py-1.5 text-xs tracking-[0.05em] text-white shadow-lg">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* =================================
            Client Info / Sign Out
        ================================== */}

        {!collapsed ? (
          <div className="border-t border-white/[0.08] px-6 py-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
              Client
            </p>

            <p className="mt-2 text-[13px] font-medium text-white/90">
              {clientName}
            </p>

            <p className="mt-0.5 truncate text-[11px] text-white/35">
              {clientEmail}
            </p>

            <button
              onClick={handleLogout}
              className="mt-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-white/40 transition-colors hover:text-white/80"
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
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 border-t border-white/[0.08] py-6">
            <div
              className="group relative flex h-8 w-8 items-center justify-center border border-[#8468FF]/30 bg-[#8468FF]/10 text-xs font-medium text-[#8468FF]"
              title={clientName}
            >
              {clientInitial}
              <span className="sidebar-tooltip pointer-events-none absolute left-full top-1/2 z-40 ml-3 -translate-y-1/2 whitespace-nowrap border border-white/10 bg-[#111116] px-3 py-1.5 text-xs tracking-[0.05em] text-white shadow-lg">
                {clientName}
              </span>
            </div>

            <button
              onClick={handleLogout}
              title="Sign out"
              className="group relative flex h-8 w-8 items-center justify-center text-white/40 transition-colors hover:text-white/80"
            >
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
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="sidebar-tooltip pointer-events-none absolute left-full top-1/2 z-40 ml-3 -translate-y-1/2 whitespace-nowrap border border-white/10 bg-[#111116] px-3 py-1.5 text-xs tracking-[0.05em] text-white shadow-lg">
                Sign out
              </span>
            </button>
          </div>
        )}
      </aside>

      {/* =====================================
          Main Column
      ====================================== */}

      <div className="relative z-10 flex-1 min-w-0">
        <main className="min-h-screen p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
