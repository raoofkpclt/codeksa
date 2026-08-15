import { useState, type ReactNode } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import AuthService from "../../service/firebaseService/auth";

const navItems = [
  { label: "Home", path: "/admin/home", icon: "home" },
  { label: "Client Management", path: "/admin/clients", icon: "users" },
  { label: "Work Management", path: "/admin/work", icon: "briefcase" },
  { label: "Client Uploads", path: "/admin/clientUploads", icon: "cloud" },
  { label: "Profile", path: "/admin/profile", icon: "user" },
];

const icons: Record<string, ReactNode> = {
  home: (
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  users: (
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
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ), user: (
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
      <circle cx="12" cy="8" r="5" />
    </svg>
  ),
  briefcase: (
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
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  upload: (
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  cloud: (
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
      <path d="M16 16l-4-4-4 4" />
      <path d="M12 12v9" />
      <path d="M20.39 18.39A5.5 5.5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.3" />
      <path d="M16 16h1a3 3 0 0 0 0-6" />
    </svg>
  ),
};

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const closeMobileNav = () => setMobileOpen(false);

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

        html {
          overflow-x: hidden;
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
          Mobile overlay (behind the sidebar drawer)
      ====================================== */}

      {mobileOpen && (
        <div
          onClick={closeMobileNav}
          className="fixed inset-0 z-30 bg-black/70 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* =====================================
          Sidebar
      ====================================== */}

      <aside
        className={`fixed md:relative inset-y-0 left-0 z-40 md:z-20 flex flex-col border-r border-white/[0.08] bg-[#08080c] md:bg-white/[0.03] transition-transform md:transition-all duration-300 w-[260px] ${
          collapsed ? "md:w-20" : "md:w-[260px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* =================================
            Collapse toggle — desktop only, anchored to the edge
        ================================== */}

        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden md:flex absolute -right-3 top-8 z-30 h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#111116] text-white/50 transition hover:border-[#8468FF]/50 hover:text-white"
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
            Close button — mobile only
        ================================== */}

        <button
          onClick={closeMobileNav}
          aria-label="Close menu"
          className="md:hidden absolute right-4 top-6 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#111116] text-white/50 transition hover:border-[#8468FF]/50 hover:text-white"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* =================================
            Brand
        ================================== */}

        <div
          className={`flex items-center border-b border-white/[0.08] py-6 px-5 ${
            collapsed ? "md:justify-center md:px-0" : ""
          }`}
        >
          <img
            src="/logo/backgroundless-2.png"
            alt="CODE Logo"
            className={`object-contain transition-all duration-300 h-7 w-7 ${
              collapsed ? "md:h-6 md:w-6" : ""
            }`}
          />

          <span
            className={`ml-3 text-base font-medium tracking-[0.15em] uppercase text-white ${
              collapsed ? "md:hidden" : ""
            }`}
          >
            Code Hub
            <sup className="ml-0.5 text-[9px] text-white/40">TM</sup>
          </span>
        </div>

        {/* =================================
            Navigation
        ================================== */}

        <nav
          className={`flex flex-1 flex-col gap-1 py-6 px-4 overflow-y-auto ${
            collapsed ? "md:px-0" : ""
          }`}
        >
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileNav}
                title={collapsed ? item.label : undefined}
                className={`group relative flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                  collapsed ? "md:justify-center md:px-0 md:py-3" : ""
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

                <span
                  className={`text-sm tracking-[0.02em] ${
                    collapsed ? "md:hidden" : ""
                  }`}
                >
                  {item.label}
                </span>

                {collapsed && (
                  <span className="sidebar-tooltip pointer-events-none absolute left-full top-1/2 z-40 ml-3 hidden -translate-y-1/2 whitespace-nowrap border border-white/10 bg-[#111116] px-3 py-1.5 text-xs tracking-[0.05em] text-white shadow-lg md:block">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* =================================
            Footer label
        ================================== */}

        <div
          className={`border-t border-white/[0.08] py-6 px-6 ${
            collapsed ? "md:flex md:flex-col md:items-center md:px-0" : ""
          }`}
        >
          <div className={collapsed ? "md:hidden" : ""}>
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
              Admin Portal
            </p>
            <p className="mt-2 text-[13px] font-medium text-white/70">
              CODE — Structured Marketing
            </p>
          </div>

          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`group relative flex w-full items-center justify-center gap-2 border border-white/10 bg-white/[0.03] px-3.5 py-2.5 mt-4 text-[11px] font-medium uppercase tracking-[0.1em] text-white/70 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 ${
              collapsed ? "md:mt-0 md:h-9 md:w-9 md:px-0" : ""
            }`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>

            <span className={collapsed ? "md:hidden" : ""}>Logout</span>

            {collapsed && (
              <span className="sidebar-tooltip pointer-events-none absolute left-full top-1/2 z-40 ml-3 hidden -translate-y-1/2 whitespace-nowrap border border-white/10 bg-[#111116] px-3 py-1.5 text-xs tracking-[0.05em] text-white shadow-lg md:block">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* =====================================
          Main Column
      ====================================== */}

      <div className="relative z-10 flex flex-1 min-w-0 flex-col">
        {/* =================================
            Mobile top bar — hamburger + brand
        ================================== */}

        <div className="flex items-center gap-4 border-b border-white/[0.08] bg-[#08080c] px-4 py-4 md:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-[#8468FF]/50 hover:text-white"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <span className="text-sm font-medium tracking-[0.15em] uppercase text-white">
            Code Hub
          </span>
        </div>

        {/* =================================
            Routed inner content
        ================================== */}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
