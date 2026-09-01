import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const ACTIVE_LOGO = "/logo/backgroundless-2.png";

const Logo = ({ size = 34 }) => (
  <img
    src={ACTIVE_LOGO}
    alt="CODE logo"
    width={size}
    height={size}
    style={{ width: size, height: size }}
    className="object-contain"
  />
);

const Navbar:React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [open]);

  const links = [
    { label: "ABOUT", href: "/about" },
    { label: "SERVICES", href: "/services" },
    { label: "WORKS", href: "/works" },
    { label: "CLIENTS", href: "/clients" },
  ];

  return (
    <div>
      <nav
  className={`fixed left-1/2 -translate-x-1/2 z-[100] bg-[#111116]/[0.82] backdrop-blur-2xl border rounded-xl md:rounded-full overflow-hidden transition-all duration-[420ms] ${
    scrolled
      ? "top-[14px] w-[95vw] md:w-[min(560px,90vw)] border-[#8B5CF6]/35 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
      : "top-[18px] w-[95vw] md:w-[min(720px,92vw)] border-[#1C1C24]"
  }`}
>

{/* <nav
  className={`fixed left-1/2 -translate-x-1/2 z-[100] bg-[#111116]/[0.82] backdrop-blur-2xl border rounded-xl md:rounded-full overflow-hidden transition-all duration-[420ms] ${
    scrolled
      ? "top-4 w-[170px] md:w-[min(560px,90vw)] border-[#8B5CF6]/35 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
      : "top-4 w-[170px] md:w-[min(720px,92vw)] border-[#1C1C24]"
  }`}
> */}

  {/* <nav
  className={`fixed z-[100] bg-[#111116]/[0.82] backdrop-blur-2xl border transition-all duration-[420ms]
  ${
    scrolled
      ? "top-0 left-0 right-0 w-full rounded-none border-x-0 border-t-0 border-b border-[#8B5CF6]/35"
      : "top-0 left-0 right-0 w-full rounded-none border-x-0 border-t-0 border-b border-[#1C1C24]"
  }
  md:left-1/2 md:right-auto md:-translate-x-1/2 md:top-[14px] md:w-[min(560px,90vw)] md:rounded-full`}
> */}
        {/* <div className="flex items-center gap-2 pl-[18px] pr-2.5 py-2.5"> */}
        <div className="flex items-center justify-between px-3 py-2.5">
          <a
            href="/"
            className="flex items-center gap-2 shrink-0"
            onClick={() => setOpen(false)}
          >
            <Logo size={45} />
          </a>

          <div className="hidden md:flex items-center gap-[26px] mx-auto pl-3">
            {links.map((l) => (
  <NavLink
    key={l.href}
    to={l.href}
    className={({ isActive }) =>
      `text-[13px] font-medium whitespace-nowrap transition-all duration-300 ${
        isActive
          ? "text-[#8B5CF6]"
          : "text-[#6B6B7A] hover:text-[#E8E8ED]"
      }`
    }
  >
    {l.label}
  </NavLink>
))}
          </div>

          <a
            href="/contact"
            className="hidden md:flex items-center gap-1.5 bg-[#eae8ed] text-[#0B0B0F] text-[11px] font-semibold tracking-[0.06em] uppercase px-4 py-2.5 rounded-full border border-[#8B5CF6] whitespace-nowrap transition-all duration-200 hover:shadow-[0_0_0_3px_rgba(139,92,246,0.35)]"
          >
            <span>Engagement</span>
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </a>

          <button
            className="flex md:hidden items-center justify-center bg-transparent border border-[#1C1C24] text-[#E8E8ED] rounded-full w-9 h-9"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X size={18} strokeWidth={1.75} />
            ) : (
              <Menu size={18} strokeWidth={1.75} />
            )}
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-0.5 px-3.5 pb-4 md:hidden">
            {links.map((l) => (
              <NavLink
  key={l.href}
  to={l.href}
  onClick={() => setOpen(false)}
  className={({ isActive }) =>
    `px-2 py-3 text-sm border-t border-[#1C1C24] transition-colors ${
      isActive
        ? "text-[#8B5CF6]"
        : "text-[#E8E8ED] hover:text-[#8B5CF6]"
    }`
  }
>
  {l.label}
</NavLink>
            ))}
            <a
              href="/contact"
              className="mt-2.5 flex items-center justify-center gap-2 bg-[#E8E8ED] text-[#0B0B0F] text-xs font-semibold tracking-[0.06em] uppercase p-3 rounded-full"
              onClick={() => setOpen(false)}
            >
              Engagement <ArrowRight size={15} strokeWidth={1.75} />
            </a>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
