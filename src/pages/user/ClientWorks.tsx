import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserWorkService from "../../service/firebaseService/userWorkService";
import type { Work } from "../../utils/types";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";
import clientService from "../../service/firebaseService/clientService";

/**
 * ClientWorks page — BILINGUAL (EN / AR)
 * ---------------------------------------------------------
 * Same language pattern as Automotive.tsx / Hospitality.tsx /
 * StrategyGrowth.tsx / BrandCreative.tsx / DigitalPerformance.tsx /
 * MarketingOperationsSystems.tsx / About.tsx / WorksPage.tsx /
 * ClientsPage.tsx / StartAConversation.tsx:
 *   - Language state read from localStorage("code-language")
 *   - Kept in sync via the LANGUAGE_EVENT custom event dispatched by
 *     NavbarNew
 *   - dir="rtl"/"ltr" + lang applied on the root wrapper
 *   - All static copy lives in COPY (en / ar) below.
 *
 * NOTE: client names, work titles and postType values come from
 * Firebase and are shown as stored (not translated) — only the
 * surrounding static UI copy is bilingual.
 * ---------------------------------------------------------
 */

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

interface ClientWorksCopy {
  breadcrumb: { home: string; clients: string };
  headingBold: string;
  loadingHeading: string;
  paragraph: string;
  backToClients: string;
  filterAll: string;
  errorLoad: string;
  noWorksFound: string;
  noWorksFoundIn: (type: string) => string;
}

const COPY: Record<Language, ClientWorksCopy> = {
  en: {
    breadcrumb: { home: "HOME", clients: "CLIENTS" },
    headingBold: "in system.",
    loadingHeading: "Loading engagement.",
    paragraph:
      "Every piece of work delivered for this engagement: the format, the date and the outcome shipped.",
    backToClients: "BACK TO CLIENTS",
    filterAll: "ALL",
    errorLoad: "Unable to load works.",
    noWorksFound: "No works found.",
    noWorksFoundIn: (type: string) => `No works found in ${type}.`,
  },
  ar: {
    breadcrumb: { home: "الرئيسية", clients: "العملاء" },
    headingBold: "ضمن النظام.",
    loadingHeading: "جارٍ تحميل التعاقد.",
    paragraph:
      "كل عمل تم تسليمه في إطار هذا التعاقد: الصيغة، والتاريخ، والنتيجة التي تم تحقيقها.",
    backToClients: "العودة إلى العملاء",
    filterAll: "الكل",
    errorLoad: "تعذّر تحميل الأعمال.",
    noWorksFound: "لم يتم العثور على أعمال.",
    noWorksFoundIn: (type: string) => `لم يتم العثور على أعمال في ${type}.`,
  },
};

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
  return d.toLocaleDateString(language === "ar" ? "ar" : "en-GB", {
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
   WorkCard — same visual treatment as the Works grid, but no
   client attribution footer since every card here is one client
--------------------------------------------------------- */
const WorkCard = ({
  work,
  language,
}: {
  work: Work & { id: string };
  language: Language;
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  const cover = coverOf(work);
  const isVideo = cover?.fileType?.startsWith("video/");

  return (
    <div className="group mb-4 sm:mb-6 break-inside-avoid cursor-default">
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
          <div className="aspect-[4/5] flex items-center justify-center bg-white/[0.03] text-white/30">
            No Preview
          </div>
        )}

        {work.postType && (
          <span className="absolute top-3 left-3 sm:top-4 sm:left-4 text-[10px] sm:text-xs tracking-[0.2em] text-white/70 bg-black/60 border border-white/10 px-2.5 py-1 sm:px-3">
            {work.postType.toUpperCase()}
          </span>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 right-0 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 px-4 py-4 sm:px-5 sm:py-5">
          <h3 className="text-base sm:text-lg font-light text-white truncate">
            {work.postName}
          </h3>
          {work.postingDate && (
            <span className="text-xs text-white/50">
              {formatDate(work.postingDate, language)}
            </span>
          )}
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

const ClientWorks: React.FC = () => {
  const { clientId } = useParams();
  const [works, setWorks] = useState<(Work & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeType, setActiveType] = useState("All");
  const [client, setClient] = useState<{
    name: string;
    logo?: string;
  } | null>(null);

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
    if (!clientId) return;

    const loadClient = async () => {
      const data = await clientService.getClient(clientId);

      if (data) {
        setClient({
          name: data.name,
          logo: data.logo,
        });
      }
    };

    loadClient();
  }, [clientId]);

  useEffect(() => {
    if (!clientId) return;
    let cancelled = false;

    const loadWorks = async () => {
      setLoading(true);
      setErrorMsg(null);

      try {
        const data = await UserWorkService.getWorksByClient(clientId);

        const visible = (data as any[])
          .filter((w) => w.active === true && w.isDisplay === true)
          .sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));

        if (!cancelled) setWorks(visible as (Work & { id: string })[]);
      } catch (error) {
        console.error("Load Client Works:", error);
        if (!cancelled) setErrorMsg(t.errorLoad);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadWorks();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, language]);

  const clientName = client?.name;
  const clientLogo = client?.logo;

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
            className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-xs tracking-[0.2em] text-white/40 mb-8 sm:mb-12 md:mb-24 ${font}`}
          >
            <Link
              to="/"
              className="hover-glow uppercase transition-colors duration-200"
            >
              {t.breadcrumb.home}
            </Link>
            <span>/</span>
            <Link
              to="/clients"
              className="hover-glow uppercase transition-colors duration-200"
            >
              {t.breadcrumb.clients}
            </Link>
            <span>/</span>
            <span className="min-w-0 max-w-[60vw] truncate text-white/70 sm:max-w-none">
              {loading ? "..." : client?.name?.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-5 sm:gap-4 sm:mb-6">
            {!loading && clientLogo ? (
              <img
                src={clientLogo}
                alt={clientName}
                className="w-8 h-8 object-contain shrink-0 sm:w-10 sm:h-10"
              />
            ) : !loading ? (
              <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] sm:text-xs font-light text-white/60 shrink-0 sm:w-10 sm:h-10">
                {initialsOf(clientName)}
              </span>
            ) : null}
            <p className="text-[11px] tracking-[0.24em] text-white/40 sm:text-xs sm:tracking-[0.3em]">
              {loading ? "" : client?.name?.toUpperCase()}
            </p>
          </div>

          <h1
            className={`max-w-[1400px] ${font} text-[44px] font-light ${heading(
              "leading-[1] sm:leading-[0.95] md:leading-[0.9]",
              "leading-[1.3]",
            )} tracking-[-0.02em] text-[var(--code-white)] sm:text-[64px] sm:tracking-[-0.04em] md:text-[clamp(72px,10vw,160px)] md:tracking-[-0.06em]`}
          >
            {loading ? (
              t.loadingHeading
            ) : (
              <>
                <span className="font-light">{clientName},</span>

                <span
                  className="font-bold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]"
                >
                  {" "}
                  {t.headingBold}
                </span>
              </>
            )}
          </h1>

          <p
            className={`mt-6 sm:mt-8 md:mt-10 max-w-xl text-white/50 text-sm leading-relaxed sm:text-base md:text-lg ${font}`}
          >
            {t.paragraph}
          </p>

          <Link
            to="/clients"
            className={`mt-8 sm:mt-10 inline-flex items-center gap-3 text-[10px] sm:text-xs tracking-[0.2em] text-white/50 hover:text-white/80 transition-colors group ${font}`}
          >
            <span
              className={`transition-transform ${dir === "rtl" ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}
            >
              {dir === "rtl" ? "\u2192" : "\u2190"}
            </span>
            {t.backToClients}
          </Link>
        </div>
      </section>

      {/* Type filter + grid */}
      <section className="border-t border-white/10 px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          {types.length > 1 && !loading && !errorMsg && (
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
                  {ty === "All" ? t.filterAll : ty.toUpperCase()}
                </button>
              ))}
            </Reveal>
          )}

          {errorMsg && (
            <Reveal className="border border-white/10 py-16 text-center">
              <p className={`text-white/50 ${font}`}>{errorMsg}</p>
            </Reveal>
          )}

          {!errorMsg && loading && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}

          {!errorMsg && !loading && filtered.length === 0 && (
            <Reveal className="border border-white/10 py-16 text-center">
              <p className={`text-white/50 ${font}`}>
                {activeType !== "All"
                  ? t.noWorksFoundIn(activeType)
                  : t.noWorksFound}
              </p>
            </Reveal>
          )}

          {!errorMsg && !loading && filtered.length > 0 && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6">
              {filtered.map((work, i) => (
                <Reveal key={work.id} delay={(i % 6) * 40}>
                  <WorkCard work={work} language={language} />
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

export default ClientWorks;
