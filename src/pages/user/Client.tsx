import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import userClientService from "../../service/firebaseService/userClientService";
import type { Client } from "../../utils/types";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

/* ---------------------------------------------------------
   CODE — Clients  (/clients)  — BILINGUAL (EN / AR)

   Same pattern as About.tsx / WorksPage.tsx / StartAConversation.tsx:
     - Language state read from localStorage("code-language")
     - Kept in sync via the LANGUAGE_EVENT custom event dispatched by
       NavbarNew
     - dir="rtl"/"ltr" + lang applied on the root wrapper
     - A single `font` variable (Alexandria for ar, Space Grotesk for
       en) is threaded through every className that sets a font — no
       hardcoded font-['Space_Grotesk',...] left behind
     - Static UI copy lives in COPY (en / ar) below.

   NOTE: `client.sector` and `client.name` come straight from
   Firestore (the Client documents) and are rendered as-is in both
   languages — there's no translation map for user-entered data.
--------------------------------------------------------- */

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

interface HeadingSpan {
  text: string;
  bold?: boolean;
}

interface ClientsCopy {
  breadcrumb: { home: string; current: string };
  eyebrow: string;
  hero: { heading: HeadingSpan[]; paragraph: string };
  filterAll: string;
  errorMsg: string;
  noClientsFound: (sector: string | null) => string;
}

const COPY: Record<Language, ClientsCopy> = {
  en: {
    breadcrumb: { home: "HOME", current: "CLIENTS" },
    eyebrow: "CLIENTS",
    hero: {
      heading: [
        { text: "Organisations inside " },
        { text: "the system.", bold: true },
      ],
      paragraph:
        "Select any organisation to view the engagement: the problem, the system built and the result.",
    },
    filterAll: "All",
    errorMsg: "Unable to load clients.",
    noClientsFound: (sector) =>
      `No clients found${sector ? ` in ${sector}` : ""}.`,
  },
  ar: {
    breadcrumb: { home: "الرئيسية", current: "العملاء" },
    eyebrow: "العملاء",
    hero: {
      heading: [{ text: "مؤسسات ضمن " }, { text: "النظام.", bold: true }],
      paragraph:
        "اختر أي مؤسسة لعرض التعاقد: المشكلة، والنظام الذي تم بناؤه، والنتيجة.",
    },
    filterAll: "الكل",
    errorMsg: "تعذر تحميل العملاء.",
    noClientsFound: (sector) =>
      sector ? `لا يوجد عملاء ضمن ${sector}.` : "لا يوجد عملاء.",
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

const initialsOf = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const getInitialLanguage = (): "en" | "ar" => {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem("code-language");

  return saved === "ar" ? "ar" : "en";
};

/* ---------------------------------------------------------
   ClientCard
--------------------------------------------------------- */
const ClientCard = ({ client, font }: { client: Client; font: string }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <Link to={`/clientWorks/${client.id}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors">
        {client.logo && !imgFailed ? (
          <img
            src={client.logo}
            alt={client.name}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/[0.03] text-2xl sm:text-3xl md:text-4xl font-light text-white/30">
            {initialsOf(client.name)}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 right-0 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6">
          {client.sector && (
            <p
              className={`text-[10px] sm:text-xs tracking-[0.2em] text-white/50 mb-1.5 sm:mb-2 ${font}`}
            >
              {client.sector.toUpperCase()}
            </p>
          )}
          <div className="flex items-center justify-between gap-3">
            <h3
              className={`text-sm sm:text-lg md:text-xl font-light text-white truncate ${font}`}
            >
              {client.name}
            </h3>
            <span className="text-violet-400 text-base sm:text-lg shrink-0 transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const CardSkeleton = () => (
  <div className="aspect-[4/3] border border-white/10 bg-white/[0.02] animate-pulse" />
);

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeSector, setActiveSector] = useState("All");
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

    const loadClients = async () => {
      setLoading(true);
      setHasError(false);

      try {
        const data = await userClientService.getClients();
        if (!cancelled) setClients(data);
      } catch (error) {
        console.error("Load Clients:", error);
        if (!cancelled) setHasError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadClients();
    return () => {
      cancelled = true;
    };
  }, []);

  const sectors: string[] = [
    "All",
    ...Array.from(
      new Set(
        clients
          .map((c) => c.sector)
          .filter((sector): sector is string => Boolean(sector)),
      ),
    ),
  ];
  const filtered =
    activeSector === "All"
      ? clients
      : clients.filter((c) => c.sector === activeSector);

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

      {/* Sector filter + grid */}
      <section className="border-t border-white/10 px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          {sectors.length > 1 && !loading && !hasError && (
            <Reveal
              className={`flex flex-wrap gap-x-6 gap-y-3 mb-10 sm:gap-x-8 sm:gap-y-4 sm:mb-12 md:mb-16 ${font}`}
            >
              {sectors.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSector(s)}
                  className={`text-[10px] sm:text-xs tracking-[0.2em] transition-colors pb-2 border-b ${
                    activeSector === s
                      ? "text-white border-violet-400"
                      : "text-white/40 border-transparent hover:text-white/70"
                  }`}
                >
                  {s === "All" ? t.filterAll.toUpperCase() : s.toUpperCase()}
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/10">
              {Array.from({ length: 8 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}

          {!hasError && !loading && filtered.length === 0 && (
            <Reveal
              className={`border border-white/10 py-16 text-center ${font}`}
            >
              <p className="text-white/50">
                {t.noClientsFound(activeSector !== "All" ? activeSector : null)}
              </p>
            </Reveal>
          )}

          {!hasError && !loading && filtered.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filtered.map((client, i) => (
                <Reveal key={client.id} delay={(i % 8) * 40}>
                  <ClientCard client={client} font={font} />
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

export default ClientsPage;
