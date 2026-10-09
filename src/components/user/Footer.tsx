import React, { useEffect, useState } from "react";
import { LANGUAGE_EVENT } from "./NavbarNew";

/* ------------------------------------------------------------------
   CODE — Footer  (Tailwind-only, bilingual EN/AR)
------------------------------------------------------------------- */

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

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

interface FooterLinkItem {
  label: string;
  href: string;
}

interface FooterCopy {
  tagline: string;
  location: string;
  columnHeadings: {
    navigate: string;
    businessAreas: string;
    more: string;
    legal: string;
  };
  navigate: FooterLinkItem[];
  businessAreas: FooterLinkItem[];
  more: FooterLinkItem[];
  legal: FooterLinkItem[];
  bottom: {
    rights: string;
    location: string;
  };
}

const COPY: Record<Language, FooterCopy> = {
  en: {
    tagline: "Building structured systems for sustainable growth.",
    location: "Jeddah, Saudi Arabia",
    columnHeadings: {
      navigate: "Navigate",
      businessAreas: "Business Areas",
      more: "More",
      legal: "Legal",
    },
    navigate: [
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
    ],
    businessAreas: [
      { label: "Strategy & Growth", href: "/strategy-growth" },
      { label: "Brand & Creative", href: "/brand-creative" },
      { label: "Digital & Performance", href: "/digital-performance" },
      { label: "Marketing Operations & Systems", href: "/marketing-operations-systems" },
    ],
    more: [
      { label: "Selected Work", href: "/works" },
      { label: "Insights", href: "/" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/" },
      { label: "Terms & Conditions", href: "/" },
      { label: "Cookies Policy", href: "/" },
      { label: "Accessibility", href: "/" },
    ],
    bottom: {
      rights: "CODE. ALL RIGHTS RESERVED.",
      location: "JEDDAH, SAUDI ARABIA.",
    },
  },

  ar: {
    tagline: "نبني أنظمة عمل منظّمة يقوم عليها نمو مستدام.",
    location: "جدة، المملكة العربية السعودية",
    columnHeadings: {
      navigate: "استكشف",
      businessAreas: "مجالات عملنا",
      more: "المزيد",
      legal: "السياسات والأحكام",
    },
    navigate: [
      { label: "الرئيسية", href: "/" },
      { label: "عن CODE", href: "/about" },
      { label: "خدماتنا", href: "/what-we-solve" },
      { label: "طريقة عملنا", href: "/how-we-work" },
      { label: "نماذج التعاقد", href: "/engagements" },
      { label: "الخدمات", href: "/services" },
      { label: "الأعمال", href: "/works" },
      { label: "العملاء", href: "/clients" },
      { label: "القطاعات", href: "/industries" },
      { label: "ابدأ الحديث معنا", href: "/contact" },
    ],
    businessAreas: [
      { label: "الاستراتيجية والنمو", href: "/strategy-growth" },
      { label:"العلامة التجارية والإبداع", href: "/brand-creative" },
      { label: "الحضور الرقمي والأداء", href: "/digital-performance" },
      { label: "إدارة التسويق والأنظمة", href: "/marketing-operations-systems" },
    ],
    more: [
      { label: "أعمال مختارة", href: "/works" },
      { label: "رؤى وتحليلات", href: "/" },
    ],
    legal: [
      { label: "سياسة الخصوصية", href: "/" },
      { label: "الشروط والأحكام", href: "/" },
      { label: "سياسة ملفات الارتباط", href: "/" },
      { label: "إمكانية الوصول", href: "/" },
    ],
    bottom: {
      rights: "CODE. جميع الحقوق محفوظة.",
      location: "جدة، المملكة العربية السعودية.",
    },
  },
};

type FooterLinkProps = FooterLinkItem & { fontClass: string };

const FooterLink: React.FC<FooterLinkProps> = ({ label, href, fontClass }) => {
  return (
    
       <a href={href}
      className={`hover-glow block ${fontClass} text-[14.5px] font-normal text-[var(--mist)] transition-colors duration-200`}
    >
      {label}
    </a>
  );
};

interface ColumnHeadingProps {
  children: React.ReactNode;
  fontClass: string;
}

const ColumnHeading: React.FC<ColumnHeadingProps> = ({ children, fontClass }) => {
  return (
    <span
      className={`mb-6 block ${fontClass} text-[11px] font-medium uppercase tracking-[0.30em] text-[var(--slate-muted)]`}
    >
      {children}
    </span>
  );
};

const Footer: React.FC = () => {
  const [language, setLanguage] = useState<Language>("en");
  const dir = language === "ar" ? "rtl" : "ltr";
  const fontClass =
    language === "ar" ? "font-['Alexandria',sans-serif]" : "font-['Space_Grotesk',sans-serif]";

  useEffect(() => {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "en" || saved === "ar") setLanguage(saved);

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Language>).detail;
      if (detail === "en" || detail === "ar") setLanguage(detail);
    };
    window.addEventListener(LANGUAGE_EVENT, handler);
    return () => window.removeEventListener(LANGUAGE_EVENT, handler);
  }, []);

  const t = COPY[language];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

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

      <footer dir={dir} lang={language} className={`bg-black border-t border-white/10 pt-24 ${fontClass}`}>
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-y-14 px-6 md:grid-cols-12 md:gap-x-8 md:px-16">
          {/* Column 1 — lockup, positioning, contact */}
          <div className="md:col-span-4">
            <a href="/" className="flex items-center gap-3">
              <Logo size={110} />
              <span className={`${fontClass} text-sm font-bold tracking-[0.20em] text-[var(--code-white)]`}>
                CODE
              </span>
            </a>

            <p className={`mt-8 max-w-[320px] ${fontClass} text-[26px] font-light leading-[1.35] text-[var(--mist)]`}>
              {t.tagline}
            </p>

            <div className="mt-10 flex flex-col gap-3">
              <span className={`${fontClass} text-[14.5px] text-[var(--slate-muted)]`}>
                {t.location}
              </span>
              
                <a href="https://www.codeksaofficial.com"
                dir="ltr"
                className={`hover-glow ${fontClass} text-[14.5px] text-[var(--slate-muted)] transition-colors duration-200`}
              >
                www.codeksaofficial.com
              </a>
              
                <a href="mailto:info@codeksaofficial.com"
                dir="ltr"
                className={`hover-glow ${fontClass} text-[14.5px] text-[var(--slate-muted)] transition-colors duration-200`}
              >
                info@codeksaofficial.com
              </a>
              
                <a href="tel:+966555922650"
                dir="ltr"
                className={`hover-glow ${fontClass} text-[14.5px] text-[var(--slate-muted)] transition-colors duration-200`}
              >
                +966 55 592 2650
              </a>
            </div>
          </div>

          {/* Column 2 — Navigate */}
          <div className="md:col-span-3">
            <ColumnHeading fontClass={fontClass}>{t.columnHeadings.navigate}</ColumnHeading>
            <div className="flex flex-col gap-5">
              {t.navigate.map((l) => (
                <FooterLink key={l.href} {...l} fontClass={fontClass} />
              ))}
            </div>
          </div>

          {/* Column 3 — Business Areas */}
          <div className="md:col-span-3">
            <ColumnHeading fontClass={fontClass}>{t.columnHeadings.businessAreas}</ColumnHeading>
            <div className="flex flex-col gap-5">
              {t.businessAreas.map((l) => (
                <FooterLink key={l.href} {...l} fontClass={fontClass} />
              ))}
            </div>
          </div>

          {/* Column 4 — More + Legal */}
          <div className="flex flex-col gap-12 md:col-span-2">
            <div>
              <ColumnHeading fontClass={fontClass}>{t.columnHeadings.more}</ColumnHeading>
              <div className="flex flex-col gap-5">
                {t.more.map((l) => (
                  <FooterLink key={l.href} {...l} fontClass={fontClass} />
                ))}
              </div>
            </div>
            <div>
              <ColumnHeading fontClass={fontClass}>{t.columnHeadings.legal}</ColumnHeading>
              <div className="flex flex-col gap-5 ">
                {t.legal.map((l, i) => (
                  <FooterLink key={`${l.href}-${i}`} {...l} fontClass={fontClass} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mx-auto mt-20 max-w-[1440px] border-t border-white/10 px-6 py-7 md:px-16">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className={`${fontClass} text-[11px] tracking-[0.20em] text-[var(--slate-muted)]`}>
              © {new Date().getFullYear()} {t.bottom.rights}
            </span>
            <span className={`${fontClass} text-[11px] tracking-[0.20em] text-[var(--slate-muted)]`}>
              {t.bottom.location}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;