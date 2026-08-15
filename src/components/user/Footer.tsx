import React from "react";

/* ------------------------------------------------------------------
   CODE — Footer  (Tailwind-only)

   Layout: 1440px shell, 4-column grid on desktop —
     1) Lockup + one-line positioning + contact block
     2) Navigate (sitemap)
     3) Business Areas (the four pathways)
     4) More + Legal
   Bottom strip: copyright (left) · location (right), hairline divider.

   Color tokens are declared once as CSS variables and consumed via
   Tailwind arbitrary-value classes (bg-[var(--charcoal)], etc.) so
   this file matches the Navbar component 1:1.
------------------------------------------------------------------- */

const ACTIVE_LOGO = "/logo/backgroundless-2.png";

const Logo = ({ size = 34 }: { size?: number }) => (
  <span
    className="flex shrink-0 items-center justify-center "
    style={{ width: size, height: size }}
  >
    <img
      src={ACTIVE_LOGO}
      alt="CODE logo"
      className="h-3/5 w-3/5 object-contain"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
        const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
        if (fallback) fallback.classList.remove("hidden");
      }}
    />
    <span className="hidden font-['Space_Grotesk',sans-serif] text-xs font-bold text-[var(--mist)]">
      C
    </span>
  </span>
);

const NAVIGATE = [
  { label: "Home", href: "/" },
  { label: "About CODE", href: "/about" },
  { label: "What We Solve", href: "/what-we-solve" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Engagements", href: "/engagements" },
  { label: "Services", href: "/services" },
  { label: "Works", href: "/works" },
  { label: "Clients", href: "/clients" },
  { label: "Industries", href: "/industries" },
  { label: "Start a Conversation", href: "/contact" },
];

const BUSINESS_AREAS = [
  {
    label: "Strategy & Growth",
    href: "/strategy-growth",
  },
  {
    label: "Brand & Creative",
    href: "/brand-creative",
  },
  {
    label: "Digital & Performance",
    href: "/digital-performance",
  },
  {
    label: "Marketing Operations & Systems",
    href: "/marketing-operations-systems",
  },
];

const MORE = [
  { label: "Selected Work", href: "/works" },
  { label: "Insights", href: "/" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/" },
  { label: "Terms & Conditions", href: "/" },
  { label: "Cookies Policy", href: "/" },
  { label: "Accessibility", href: "/" },
];

const FooterLink = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    className="hover-glow block font-['Space_Grotesk',sans-serif] text-[14.5px] font-normal text-[var(--mist)] transition-colors duration-200"
  >
    {label}
  </a>
);

const ColumnHeading = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-6 block font-['Space_Grotesk',sans-serif] text-[11px] font-medium uppercase tracking-[0.30em] text-[var(--slate-muted)]">
    {children}
  </span>
);

const Footer: React.FC = () => {
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

      <footer className="bg-black border-t border-white/10 pt-24">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-y-14 px-6 md:grid-cols-12 md:gap-x-8 md:px-16">
          {/* Column 1 — lockup, positioning, contact */}
          <div className="md:col-span-4">
            <a href="/" className="flex items-center gap-3">
              <Logo size={110} />
              <span className="font-['Space_Grotesk',sans-serif] text-sm font-bold tracking-[0.20em] text-[var(--code-white)]">
                CODE
              </span>
            </a>

            <p className="mt-8 max-w-[320px] font-['Space_Grotesk',sans-serif] text-[26px] font-light leading-[1.35] text-[var(--mist)]">
              Building structured systems for sustainable growth.
            </p>

            <div className="mt-10 flex flex-col gap-3">
              <span className="font-['Space_Grotesk',sans-serif] text-[14.5px] text-[var(--slate-muted)]">
                Jeddah, Saudi Arabia
              </span>
              <a
                href="https://www.codeksaofficial.com"
                className="hover-glow font-['Space_Grotesk',sans-serif] text-[14.5px] text-[var(--slate-muted)] transition-colors duration-200"
              >
                www.codeksaofficial.com
              </a>
              <a
                href="mailto:info@codeksaofficial.com"
                className="hover-glow font-['Space_Grotesk',sans-serif] text-[14.5px] text-[var(--slate-muted)] transition-colors duration-200"
              >
                info@codeksaofficial.com
              </a>
              <a
                href="tel:+966555922650"
                className="hover-glow font-['Space_Grotesk',sans-serif] text-[14.5px] text-[var(--slate-muted)] transition-colors duration-200"
              >
                +966 55 592 2650
              </a>
            </div>
          </div>

          {/* Column 2 — Navigate */}
          <div className="md:col-span-3">
            <ColumnHeading>Navigate</ColumnHeading>
            <div className="flex flex-col gap-5">
              {NAVIGATE.map((l) => (
                <FooterLink key={l.href} {...l} />
              ))}
            </div>
          </div>

          {/* Column 3 — Business Areas */}
          <div className="md:col-span-3">
            <ColumnHeading>Business Areas</ColumnHeading>
            <div className="flex flex-col gap-5">
              {BUSINESS_AREAS.map((l) => (
                <FooterLink key={l.href} {...l} />
              ))}
            </div>
          </div>

          {/* Column 4 — More + Legal */}
          <div className="flex flex-col gap-12 md:col-span-2">
            <div>
              <ColumnHeading>More</ColumnHeading>
              <div className="flex flex-col gap-5">
                {MORE.map((l) => (
                  <FooterLink key={l.href} {...l} />
                ))}
              </div>
            </div>
            <div>
              <ColumnHeading>Legal</ColumnHeading>
              <div className="flex flex-col gap-5 ">
                {LEGAL.map((l) => (
                  <FooterLink key={""} {...l} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mx-auto mt-20 max-w-[1440px] border-t border-white/10 px-6 py-7 md:px-16">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-['Space_Grotesk',sans-serif] text-[11px] tracking-[0.20em] text-[var(--slate-muted)]">
              © {new Date().getFullYear()} CODE. ALL RIGHTS RESERVED.
            </span>
            <span className="font-['Space_Grotesk',sans-serif] text-[11px] tracking-[0.20em] text-[var(--slate-muted)]">
              JEDDAH, SAUDI ARABIA.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
