import React, { useEffect, useState } from "react";

/* ------------------------------------------------------------------
   CODE — SiteHeader / NavbarNew  (Tailwind-only version)

   Color tokens (from the v3 design system doc) are declared as CSS
   custom properties in the <style> block below, then consumed
   throughout via Tailwind arbitrary-value classes, e.g. bg-[var(--charcoal)].
   This keeps every class Tailwind-native — no inline style objects
   for anything Tailwind can express (only per-item transition-delay,
   which Tailwind has no utility for, stays inline).
------------------------------------------------------------------- */

const ACTIVE_LOGO = "/logo/backgroundless-2.png";

const LINKS = [
  { label: "What We Solve", href: "/what-we-solve" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Engagements", href: "/engagements" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
];

const Logo = () => (
  <a
    href="/"
    aria-label="CODE - Home"
    className="group flex h-20 w-20 shrink-0 items-center justify-center"
  >
    <img
      src={ACTIVE_LOGO}
      alt="CODE Logo"
      className="h-15 w-auto object-contain lg:h-15"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
        const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
        if (fallback) fallback.classList.remove("hidden");
      }}
    />
    <span className="hidden font-['Space_Grotesk',sans-serif] text-[34px] font-bold leading-none text-[var(--code-white)]">
      C
    </span>
  </a>
);

const NavLink = ({
  href,
  children,
  onClick,
  large = false,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  large?: boolean;
}) => {
  const isActive =
    typeof window !== "undefined" && window.location.pathname === href;

  return (
    <a
      href={href}
      onClick={onClick}
      className={`hover-glow relative font-['Space_Grotesk',sans-serif] font-normal transition-colors duration-200 ${
        large ? "text-[28px]" : "text-[14.5px]"
      } ${isActive ? "text-[var(--code-white)]" : "text-[var(--mist)]"}`}
    >
      {children}
    </a>
  );
};

const StartConversationLink = ({
  onClick,
  className = "",
}: {
  onClick?: () => void;
  className?: string;
}) => (
  <a
    href="/contact"
    onClick={onClick}
    className={`hover-glow whitespace-nowrap font-['Space_Grotesk',sans-serif] text-[15px] font-medium uppercase tracking-[0.10em]  ${className}`}
  >
    Start a Conversation
  </a>
);

const NavbarNew = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
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

        * { font-synthesis: none; }

        .hover-glow:hover {
          color: var(--violet-glow) !important;
          text-shadow: 0 0 14px rgba(155, 131, 255, 0.55);
        }
      `}</style>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b bg-black transition-colors duration-300 ${
          scrolled ? "border-white/10" : "border-white/[0.06]"
        }`}
      >
        <nav className="mx-auto flex h-[88px] max-w-[1440px] items-center justify-between px-6 md:px-16">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden items-center gap-10 lg:flex">
            {LINKS.map((l) => (
              <NavLink key={l.href} href={l.href}>
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:block">
            <StartConversationLink />
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex h-8 w-8 flex-col items-end justify-center gap-[6px] lg:hidden"
          >
            <span
              className={`block h-[1.5px] w-6 bg-[var(--mist)] transition-transform duration-300 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] bg-[var(--mist)] transition-all duration-300 ${
                menuOpen ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen sheet */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center gap-8 px-8">
          {LINKS.map((l, i) => (
            <div
              key={l.href}
              className={`transition-all duration-300 ${
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 45}ms` }}
            >
              <NavLink href={l.href} onClick={closeMenu} large>
                {l.label}
              </NavLink>
            </div>
          ))}
          <div
            className={`border-t border-white/10 pt-6 transition-all duration-300 ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: `${LINKS.length * 45}ms` }}
          >
            <StartConversationLink onClick={closeMenu} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarNew;
