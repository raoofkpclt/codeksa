import { useState, type ReactNode } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";

import AuthService from "../../service/firebaseService/auth";

// =========================================
// Client Navigation
// =========================================

const navItems = [
  {
    label: "Home",
    path: "/client/home",
    icon: "home",
  },
  {
    label: "Works",
    path: "/client/works",
    icon: "briefcase",
  },
  {
    label: "Profile",
    path: "/client/profile",
    icon: "user",
  },
  {
    label: "Client Uploads",
    path: "/client/clientUploads",
    icon: "cloud",
  },
];

// =========================================
// Icons
// =========================================

const icons: Record<string, ReactNode> = {
  home: (
    <svg
      width="18"
      height="18"
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

  briefcase: (
    <svg
      width="18"
      height="18"
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
  cloud: (
    <svg
      width="18"
      height="18"
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

  user: (
    <svg
      width="18"
      height="18"
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
  const [collapsed, setCollapsed] = useState(false);

  const [notifOpen, setNotifOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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

  // =========================================
  // Temporary Notifications
  // Replace later with Firestore data
  // =========================================

  const notifications = [
    {
      id: 1,
      text: "New work has been sent for your approval",
      time: "2m ago",
    },
    {
      id: 2,
      text: "Poster design is waiting for review",
      time: "1h ago",
    },
    {
      id: 3,
      text: "Your requested edit has been updated",
      time: "3h ago",
    },
  ];

  // =========================================
  // Current Page
  // =========================================

  const currentPage =
    navItems.find((item) => item.path === location.pathname)?.label || "Home";

  return (
    <div className="flex min-h-screen bg-[#0B0B0F] text-white font-sans [font-family:'Inter',sans-serif]">
      {/* =====================================
          Background Grid
      ====================================== */}

      <div
        className="fixed inset-0 pointer-events-none bg-[length:40px_40px] opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
        }}
      />

      {/* =====================================
          Sidebar
      ====================================== */}

      <aside
        className={`relative z-20 flex flex-col bg-white/[0.03] border-r border-white/[0.08] transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-[240px]"
        }`}
      >
        {/* =================================
            Brand
        ================================== */}

        <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-5">
          <img
            src="/logo/backgroundless-2.png"
            alt="CODE Logo"
            className={`object-contain transition-all duration-300 ${
              collapsed ? "h-10 w-10" : "h-12 w-auto max-w-[140px]"
            }`}
          />

          {!collapsed && (
            <span className="text-lg font-bold tracking-[0.08em] uppercase text-white">
              CODE
            </span>
          )}
        </div>

        {/* =================================
            Navigation
        ================================== */}

        <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium tracking-[0.01em] transition-colors duration-150 ${
                  active
                    ? "bg-[#8B5CF6]/10 text-[#8B5CF6] border-l-2 border-[#8B5CF6]"
                    : "text-white/50 hover:text-white/90 hover:bg-white/[0.04] border-l-2 border-transparent"
                }`}
              >
                <span className="flex-shrink-0">{icons[item.icon]}</span>

                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* =================================
            Collapse Toggle
        ================================== */}

        <button
          onClick={() => setCollapsed((value) => !value)}
          className="flex items-center justify-center gap-2 px-3 py-3 mx-3 mb-3 text-[11px] text-white/30 hover:text-white/60 border-t border-white/[0.08] transition-colors"
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
            style={{
              transform: collapsed ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          >
            <polyline points="11 17 6 12 11 7" />
            <polyline points="18 17 13 12 18 7" />
          </svg>

          {!collapsed && (
            <span className="uppercase tracking-[0.1em]">Collapse</span>
          )}
        </button>
      </aside>

      {/* =====================================
          Main Column
      ====================================== */}

      <div className="relative z-10 flex-1 flex flex-col min-w-0">
        {/* =================================
            Navbar
        ================================== */}

        <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0B0B0F]/80 backdrop-blur-sm sticky top-0 z-30">
          {/* Page Title */}

          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] text-white/30 uppercase">
              Client Portal
            </p>

            <h2 className="text-base font-bold tracking-[-0.01em]">
              {currentPage}
            </h2>
          </div>

          {/* =================================
              Right Actions
          ================================== */}

          <div className="flex items-center gap-3">
            {/* =============================
                Notification Bell
            ============================== */}

            <div className="relative">
              <button
                onClick={() => setNotifOpen((value) => !value)}
                className="relative w-9 h-9 flex items-center justify-center border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
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
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>

                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[9px] font-bold bg-[#8B5CF6] rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* =============================
                  Notification Dropdown
              ============================== */}

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#111114] border border-white/[0.08] shadow-2xl z-40">
                  <div className="px-4 py-3 border-b border-white/[0.08] text-[11px] font-semibold tracking-[0.1em] text-white/40 uppercase">
                    Notifications
                  </div>

                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 border-b border-white/[0.05] hover:bg-white/[0.03] transition-colors"
                      >
                        <p className="text-[13px] text-white/80">
                          {notification.text}
                        </p>

                        <p className="text-[10px] text-white/30 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* =============================
                Logout
            ============================== */}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 text-[11px] font-bold tracking-[0.1em] uppercase text-white/70 hover:text-white border border-white/10 bg-white/[0.03] hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-colors"
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
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* =================================
            Routed Inner Content
        ================================== */}

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
