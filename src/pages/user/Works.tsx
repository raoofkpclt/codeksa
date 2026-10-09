import React, { useEffect, useRef, useState } from "react";

import UserWorkService from "../../service/firebaseService/userWorkService";
import type { Work } from "../../utils/types";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

/* ---------------------------------------------------------
   CODE — Works  (/works)  — BILINGUAL (EN / AR)

   Follows the same language pattern used on About.tsx / Home.tsx:
     - Language state read from localStorage("code-language")
     - Kept in sync via the LANGUAGE_EVENT custom event dispatched by
       NavbarNew (so switching language anywhere updates this page too)
     - dir="rtl"/"ltr" + lang applied on the root wrapper
     - Arabic uses 'Alexandria', English keeps 'Space Grotesk' — a
       single `font` variable is threaded through every className
       (no hardcoded font-['Space_Grotesk',...] left behind)
     - Static UI copy lives in COPY (en / ar) below.

   NOTE: `postType` values and `clientName` / `postName` come straight
   from Firestore (the Work documents), so they are rendered as-is in
   both languages — there's no translation map for user-entered data.
--------------------------------------------------------- */

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

interface HeadingSpan {
  text: string;
  bold?: boolean;
}

interface WorksCopy {
  breadcrumb: { home: string; current: string };
  eyebrow: string;
  hero: { heading: HeadingSpan[]; paragraph: string };
  filterAll: string;
  noPreview: string;
  errorMsg: string;
  noWorksFound: (type: string | null) => string;
}

const COPY: Record<Language, WorksCopy> = {
  en: {
    breadcrumb: { home: "HOME", current: "WORKS" },
    eyebrow: "WORKS",
    hero: {
      heading: [{ text: "Systems, " }, { text: "shipped.", bold: true }],
      paragraph:
        "Every engagement, across every client: the problem, the system built and the result.",
    },
    filterAll: "All",
    noPreview: "No Preview",
    errorMsg: "Unable to load works.",
    noWorksFound: (type) => `No works found${type ? ` in ${type}` : ""}.`,
  },
  ar: {
    breadcrumb: { home: "الرئيسية", current: "الأعمال" },
    eyebrow: "الأعمال",
    hero: {
      heading: [{ text: "أنظمة " }, { text: "مُنجزة.", bold: true }],
      paragraph:
        "كل تعاقد، مع كل عميل: المشكلة، والنظام الذي تم بناؤه، والنتيجة.",
    },
    filterAll: "الكل",
    noPreview: "لا توجد معاينة",
    errorMsg: "تعذر تحميل الأعمال.",
    noWorksFound: (type) =>
      type ? `لا توجد أعمال ضمن ${type}.` : "لا توجد أعمال.",
  },
};

const glowClasses =
  "font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]";

const RenderHeading = ({ spans }: { spans: HeadingSpan[] }) => (
  <>
    {spans.map((s, i) =>
      s.bold ? (
        <span key={i} className={glowClasses}>
          {s.text}
        </span>
      ) : (
        <span key={i} className="font-light">
          {s.text}
        </span>
      ),
    )}
  </>
);

/* ---------------------------------------------------------
   Reveal — subtle fade-up on scroll entry
--------------------------------------------------------- */
const Reveal = ({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

/* ---------------------------------------------------------
   Helpers
--------------------------------------------------------- */
const initialsOf = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const toMillis = (ts: any) => {
  if (!ts) return 0;
  if (typeof ts.toMillis === "function") return ts.toMillis();
  if (typeof ts.seconds === "number") return ts.seconds * 1000;
  return 0;
};

const formatDate = (dateStr?: string, language: Language = "en") => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(language === "ar" ? "ar-SA" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const coverOf = (work: Work) => {
  const media = Array.isArray(work.media) ? work.media : [];
  const firstImage = media.find((m) => m.fileType?.startsWith("image/"));
  return firstImage || media[0] || null;
};

/* ---------------------------------------------------------
   WorkCard — cover media, reveal-on-hover attribution
--------------------------------------------------------- */
const WorkCard = ({
  work,
  language,
  font,
  noPreviewLabel,
}: {
  work: Work & { id: string };
  language: Language;
  font: string;
  noPreviewLabel: string;
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const cover = coverOf(work);
  const isVideo = cover?.fileType?.startsWith("video/");

  return (
    <div className="group block mb-4 sm:mb-6 break-inside-avoid">
      <div className="relative overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors">
        {cover && !imgFailed ? (
          isVideo ? (
            <video
              src={cover.url}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <img
              src={cover.url}
              alt={work.postName}
              onError={() => setImgFailed(true)}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )
        ) : (
          <div
            className={`aspect-[4/5] flex items-center justify-center bg-white/[0.03] text-white/30 ${font}`}
          >
            {noPreviewLabel}
          </div>
        )}

        {work.postType && (
          <span
            className={`absolute top-3 ${language === "ar" ? "right-3 sm:right-4" : "left-3 sm:left-4"} text-[10px] sm:text-xs tracking-[0.2em] text-white/70 bg-black/60 border border-white/10 px-2.5 py-1 sm:px-3 ${font}`}
          >
            {work.postType.toUpperCase()}
          </span>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 right-0 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 px-4 py-4 sm:px-5 sm:py-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h3
                className={`text-base sm:text-lg font-light text-white truncate ${font}`}
              >
                {work.postName}
              </h3>

              {work.postingDate && (
                <span className={`text-xs text-white/50 ${font}`}>
                  {formatDate(work.postingDate, language)}
                </span>
              )}
            </div>
          </div>

          <div className="mt-3 sm:mt-4 flex items-center gap-2.5 pt-3 sm:pt-4 border-t border-white/10">
            <div className="w-6 h-6 shrink-0 flex items-center justify-center">
              {work.clientLogo && !logoFailed ? (
                <img
                  src={work.clientLogo}
                  alt={work.clientName}
                  className="w-full h-full object-contain"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[9px] font-light text-white/60">
                  {initialsOf(work.clientName)}
                </span>
              )}
            </div>

            <span className={`text-xs text-white/50 truncate ${font}`}>
              {work.clientName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardSkeleton = () => (
  <div className="mb-4 sm:mb-6 break-inside-avoid aspect-[4/5] border border-white/10 bg-white/[0.02] animate-pulse" />
);

const getInitialLanguage = (): "en" | "ar" => {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem("code-language");

  return saved === "ar" ? "ar" : "en";
};

const WorksPage: React.FC = () => {
  const [works, setWorks] = useState<(Work & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeType, setActiveType] = useState("All");
  const [language, setLanguage] = useState<"en" | "ar">(getInitialLanguage);

  const dir = language === "ar" ? "rtl" : "ltr";
  const font =
    language === "ar"
      ? "font-['Alexandria',sans-serif]"
      : "font-['Space_Grotesk',sans-serif]";
  const t = COPY[language];

  // Returns the English leading class when LTR, the Arabic one when RTL.
  // Arabic display type needs noticeably looser line-height than the tight
  // Latin values, or ascenders/descenders from adjacent lines touch.
  const heading = (enLeading: string, arLeading: string) =>
    dir === "rtl" ? arLeading : enLeading;

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

  useEffect(() => {
    let cancelled = false;

    const loadWorks = async () => {
      setLoading(true);
      setHasError(false);

      try {
        const data = await UserWorkService.getWorks();

        const visible = data
          .filter((w: any) => w.active === true && w.isDisplay === true)
          .sort(
            (a: any, b: any) => toMillis(b.createdAt) - toMillis(a.createdAt),
          );

        if (!cancelled) setWorks(visible as (Work & { id: string })[]);
      } catch (error) {
        console.error("Load Works:", error);
        if (!cancelled) setHasError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadWorks();
    return () => {
      cancelled = true;
    };
  }, []);

  const types = [
    "All",
    ...Array.from(new Set(works.map((w: any) => w.postType).filter(Boolean))),
  ];
  const filtered =
    activeType === "All"
      ? works
      : works.filter((w: any) => w.postType === activeType);

  return (
    <div
      dir={dir}
      lang={language}
      className={`min-h-screen bg-black text-white overflow-x-hidden ${font}`}
    >
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
      `}</style>
      <NavbarNew />

      {/* Hero */}
      <section className="px-5 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16 md:px-10 md:pt-40 md:pb-20 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div
            className={`flex flex-wrap items-center gap-3 text-[10px] sm:text-xs tracking-[0.2em] text-white/40 mb-8 sm:mb-12 md:mb-24 ${font}`}
          >
            <a
              href="/"
              className="hover-glow uppercase transition-colors duration-200"
            >
              <span>{t.breadcrumb.home}</span>
            </a>

            <span>/</span>
            <span className="text-white/70">{t.breadcrumb.current}</span>
          </div>

          <p
            className={`text-xs tracking-[0.3em] text-white/40 mb-5 sm:mb-6 ${font}`}
          >
            {t.eyebrow}
          </p>

          <h1
            className={`max-w-[1400px] ${font} text-[44px] font-light ${heading(
              "leading-[1] sm:leading-[0.95] md:leading-[0.9]",
              "leading-[1.3]",
            )} tracking-[-0.02em] text-[var(--code-white)] sm:text-[64px] sm:tracking-[-0.04em] md:text-[clamp(72px,10vw,160px)] md:tracking-[-0.06em]`}
          >
            <RenderHeading spans={t.hero.heading} />
          </h1>

          <p
            className={`mt-6 sm:mt-8 md:mt-10 max-w-xl text-white/50 text-sm leading-relaxed sm:text-base md:text-lg ${font}`}
          >
            {t.hero.paragraph}
          </p>
        </div>
      </section>

      {/* Type filter + grid */}
      <section className="border-t border-white/10 px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          {types.length > 1 && !loading && !hasError && (
            <Reveal
              className={`flex flex-wrap gap-x-6 gap-y-3 mb-10 sm:gap-x-8 sm:gap-y-4 sm:mb-12 md:mb-16 ${font}`}
            >
              {types.map((ty) => (
                <button
                  key={ty}
                  onClick={() => setActiveType(ty)}
                  className={`text-[10px] sm:text-xs tracking-[0.2em] transition-colors pb-2 border-b ${
                    activeType === ty
                      ? "text-white border-violet-400"
                      : "text-white/40 border-transparent hover:text-white/70"
                  }`}
                >
                  {ty === "All" ? t.filterAll.toUpperCase() : ty.toUpperCase()}
                </button>
              ))}
            </Reveal>
          )}

          {hasError && (
            <Reveal
              className={`border border-white/10 py-16 text-center ${font}`}
            >
              <p className="text-white/50">{t.errorMsg}</p>
            </Reveal>
          )}

          {!hasError && loading && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}

          {!hasError && !loading && filtered.length === 0 && (
            <Reveal
              className={`border border-white/10 py-16 text-center ${font}`}
            >
              <p className="text-white/50">
                {t.noWorksFound(activeType !== "All" ? activeType : null)}
              </p>
            </Reveal>
          )}

          {!hasError && !loading && filtered.length > 0 && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6">
              {filtered.map((work, i) => (
                <Reveal key={work.id} delay={(i % 6) * 40}>
                  <WorkCard
                    work={work}
                    language={language}
                    font={font}
                    noPreviewLabel={t.noPreview}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <Conversation />

      <Footer />
    </div>
  );
};

export default WorksPage;
