import React, { useEffect, useRef, useState } from "react";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

interface Pathway {
  index: string;
  category: string;
  headlinePlain: string;
  headlineBold: string;
  body: string;
  exploreLabel: string;
  href: string;
}

interface WhatWeSolveCopy {
  breadcrumb: {
    home: string;
    current: string;
  };
  sectionLabel: string;
  heading: {
    line1: string;
    line2: string;
  };
  intro: string;
  pathways: Pathway[];
  closing: {
    headingPlain: string;
    headingHighlight: string;
    paragraph: string;
    ctaLabel: string;
  };
}

const COPY: Record<Language, WhatWeSolveCopy> = {
  en: {
    breadcrumb: {
      home: "Home",
      current: "What We Solve",
    },
    sectionLabel: "What We Solve",
    heading: {
      line1: "Four pathways.",
      line2: "One system.",
    },
    intro:
      "CODE connects the disciplines required to help a business move with more clarity, consistency and measurable direction.",
    pathways: [
      {
        index: "01",
        category: "Strategy & Growth",
        headlinePlain: "Direction before ",
        headlineBold: "activity.",
        body: "We clarify where growth should come from and build the strategic structure required to move towards it.",
        exploreLabel: "Explore Strategy & Growth",
        href: "/strategy-growth",
      },
      {
        index: "02",
        category: "Brand & Creative",
        headlinePlain: "Meaning before ",
        headlineBold: "visibility.",
        body: "We build brands people can understand, trust and remember — then translate them into consistent experiences.",
        exploreLabel: "Explore Brand & Creative",
        href: "/brand-creative",
      },
      {
        index: "03",
        category: "Digital & Performance",
        headlinePlain: "Presence with ",
        headlineBold: "purpose.",
        body: "We connect digital experience, visibility and performance to measurable business outcomes.",
        exploreLabel: "Explore Digital & Performance",
        href: "/digital-performance",
      },
      {
        index: "04",
        category: "Marketing Operations & Systems",
        headlinePlain: "Structure before ",
        headlineBold: "scale.",
        body: "We turn marketing into a connected, repeatable operating rhythm.",
        exploreLabel: "Explore Marketing Operations",
        href: "/marketing-operations-systems",
      },
    ],
    closing: {
      headingPlain: "Start with the pathway closest to your current business ",
      headingHighlight: "requirement.",
      paragraph:
        "Each pathway can begin as a focused engagement or as part of a wider system, depending on what the business needs first.",
      ctaLabel: "Start a Conversation",
    },
  },

  ar: {
    breadcrumb: {
      home: "الرئيسية",
      current: "خدماتنا",
    },
    sectionLabel: "خدماتنا",
    heading: {
      line1: "أربعة مسارات.",
      line2: " منظومة واحدة.",
    },
    intro:
      "تربط CODE بين التخصصات اللازمة لمساعدة العمل على التحرك بمزيد من الوضوح والاتساق والاتجاه القابل للقياس.",
    pathways: [
      {
        index: "01",
        category: "الاستراتيجية والنمو",
        headlinePlain: "نحدد الاتجاه.",
        headlineBold: "ثم نبني النمو.",
        body: "نحدد فرص النمو، ونبني الاستراتيجية التي تحوّلها إلى نتائج.",
        exploreLabel: "استكشف الاستراتيجية والنمو",
        href: "/strategy-growth",
      },
      {
        index: "02",
        category: "العلامة التجارية والإبداع",
        headlinePlain: "علامة لها معنى.",
        headlineBold: "وحضور يُذكر.",
        body: "نبني علامة واضحة ومميزة، يفهمها الناس، يثقون بها، ويتذكرونها.",
        exploreLabel: "استكشف العلامة التجارية والإبداع",
        href: "/brand-creative",
      },
      {
        index: "03",
        category: "الحضور الرقمي والأداء",
        headlinePlain: "حضور رقمي.",
        headlineBold: "يخدم النمو.",
        body: "نربط التجربة الرقمية بالأداء والنتائج، ليصبح كل حضور جزءًا من نمو الأعمال.",
        exploreLabel: "استكشف الحضور الرقمي والأداء",
        href: "/digital-performance",
      },
      {
        index: "04",
        category: "إدارة التسويق والأنظمة",
        headlinePlain: "نُنظّم العمل.",
        headlineBold: "ثم نضاعف تأثيره.",
        body: "نربط العمليات والأنظمة وقياس الأداء، لنجعل التسويق أكثر كفاءة وأكثر قابلية للتوسع",
        exploreLabel: "استكشف إدارة التسويق والأنظمة",
        href: "/marketing-operations-systems",
      },
    ],
    closing: {
      headingPlain: "ابدأ بالمسار الأقرب إلى",
      headingHighlight: "احتياجك الحالي.",
      paragraph:
        "يمكن أن يبدأ كل مسار كتعاون مركّز أو كجزء من نظام أوسع، بحسب ما يحتاجه العمل أولاً.",
      ctaLabel: "ابدأ الحديث معنا",
    },
  },
};

const ExploreLink = ({
  label,
  href,
  fontClass,
}: {
  label: string;
  href: string;
  fontClass: string;
}) => {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 sm:gap-4 ${fontClass} text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.28em] !text-white hover:!text-white focus:!text-white active:!text-white transition-all duration-300 ease-out`}
    >
      <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
        {label}
      </span>

      <span className="h-px w-8 sm:w-10 bg-[#8468FF] transition-all duration-300 ease-out group-hover:w-14 sm:group-hover:w-16" />
    </a>
  );
};

interface PathwaySectionProps {
  item: Pathway;
  active: boolean;
  fontClass: string;
  dir: "rtl" | "ltr";
}

const PathwaySection: React.FC<PathwaySectionProps> = ({
  item,
  active,
  fontClass,
  dir,
}) => {
  // Arabic display type needs noticeably looser line-height than the tight
  // Latin values, or ascenders/descenders from adjacent lines touch.
  const heading = (enLeading: string, arLeading: string) =>
    dir === "rtl" ? arLeading : enLeading;

  return (
    <div
      className={`border-t border-[var(--steel)] py-10 sm:py-16 transition-opacity duration-500 md:py-24 ${
        active ? "opacity-100" : "opacity-45"
      }`}
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span
          className={`${fontClass} text-[12px] sm:text-[13px] tracking-[0.2em] text-[var(--slate-muted)]`}
        >
          {item.index}
        </span>
        <span
          className={`${fontClass} text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.30em] transition-colors duration-500 ${
            active ? "text-[var(--code-purple)]" : "text-[var(--slate-muted)]"
          }`}
        >
          {item.category}
        </span>
      </div>

      <h2
        className={`mt-5 sm:mt-8 ${fontClass} text-[32px] ${heading(
          "leading-[1.12] sm:leading-[1.1] md:leading-[1.08]",
          "leading-[1.4]",
        )} sm:text-[44px] md:text-[clamp(48px,6vw,72px)] transition-colors duration-500 ${
          active ? "text-[var(--code-white)]" : "text-[var(--slate-muted)]"
        }`}
      >
        <span className="font-light">{item.headlinePlain}</span>
        <span className="font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
          {item.headlineBold}
        </span>
      </h2>

      <p
        className={`mt-5 sm:mt-8 max-w-[560px] ${fontClass} text-[14px] sm:text-[16px] leading-[1.6] text-[var(--mist)]`}
      >
        {item.body}
      </p>

      <div className="mt-8 sm:mt-10">
        <ExploreLink
          label={item.exploreLabel}
          href={item.href}
          fontClass={fontClass}
        />
      </div>
    </div>
  );
};

const getInitialLanguage = (): "en" | "ar" => {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem("code-language");

  return saved === "ar" ? "ar" : "en";
};

const WhatWeSolve: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [language, setLanguage] = useState<"en" | "ar">(getInitialLanguage);
  const dir = language === "ar" ? "rtl" : "ltr";
  const fontClass =
    language === "ar"
      ? "font-['Alexandria',sans-serif]"
      : "font-['Space_Grotesk',sans-serif]";

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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.index ?? 0,
            );
            setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const t = COPY[language];

  return (
    <div
      dir={dir}
      lang={language}
      className={`min-h-screen bg-black text-[var(--mist)] overflow-x-hidden ${fontClass}`}
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

      <main className="mx-auto max-w-[1440px] px-5 pt-28 pb-20 sm:px-8 sm:pt-32 sm:pb-24 md:px-16 md:pt-[168px] md:pb-32">
        {/* Breadcrumb */}
        <div
          className={`mb-8 flex flex-wrap items-center gap-3 ${fontClass} text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.24em] text-[var(--slate-muted)] md:mb-10`}
        >
          <a
            href="/"
            className="hover-glow uppercase transition-colors duration-200"
          >
            {t.breadcrumb.home}
          </a>
          <span>/</span>
          <span className="uppercase text-[var(--code-white)]">
            {t.breadcrumb.current}
          </span>
        </div>

        {/* PageHero */}
        <span
          className={`mb-6 block ${fontClass} text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.30em] text-[var(--slate-muted)] md:mb-8`}
        >
          {t.sectionLabel}
        </span>

        <h1
          className={`${fontClass} text-[44px] font-light ${heading(
            "leading-[1] sm:leading-[0.95] md:leading-[0.88]",
            "leading-[1.3]",
          )} tracking-[-0.02em] sm:text-[64px] sm:tracking-[-0.04em] md:text-[clamp(88px,9vw,160px)] md:tracking-[-0.08em]`}
        >
          <span className="text-[var(--code-white)]">{t.heading.line1}</span>
          <br />
          <span className="font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
            {t.heading.line2}
          </span>
        </h1>
        <p
          className={`mt-6 max-w-[620px] ${fontClass} text-[15px] leading-[1.6] text-[var(--mist)] sm:mt-8 sm:text-[16px] md:mt-10 md:text-[17px]`}
        >
          {t.intro}
        </p>

        {/* Pathways */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          {t.pathways.map((item, i) => (
            <div
              key={item.index}
              data-index={i}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
            >
              <PathwaySection
                item={item}
                active={activeIndex === i}
                fontClass={fontClass}
                dir={dir}
              />
            </div>
          ))}
        </div>

        {/* Page-specific closing statement */}
        {/* <div className="border-t border-[var(--steel)] pt-12 sm:pt-16 md:pt-24">
          <h2
            className={`max-w-[1100px] ${fontClass} text-[36px] font-light ${heading(
              "leading-[1.1] sm:leading-[1.05] md:leading-[0.999]",
              "leading-[1.35]",
            )} tracking-[-0.02em] text-[var(--code-white)] sm:text-[56px] sm:tracking-[-0.04em] md:text-[clamp(72px,10vw,160px)] md:tracking-[-0.08em]`}
          >
            {t.closing.headingPlain}{" "}
            <span className="font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
              {t.closing.headingHighlight}
            </span>
          </h2>
          <p className={`mt-5 max-w-[560px] ${fontClass} text-[14px] leading-[1.6] text-[var(--mist)] sm:mt-6 sm:text-[16px]`}>
            {t.closing.paragraph}
          </p>
          <div className="mt-8 sm:mt-10">
            <ExploreLink label={t.closing.ctaLabel} href="/contact" fontClass={fontClass} />
          </div>
        </div> */}

        <div className="border-t border-[var(--steel)] pt-12 sm:pt-16 md:pt-24">
          <h2
            className={`max-w-[1100px] ${fontClass} text-[36px] font-light ${heading(
              "leading-[1.1] sm:leading-[1.05] md:leading-[0.999]",
              "leading-[1.35]",
            )} tracking-[-0.02em] text-[var(--code-white)] sm:text-[56px] sm:tracking-[-0.04em] md:text-[clamp(72px,10vw,160px)] md:tracking-[-0.08em]`}
          >
            {t.closing.headingPlain}{" "}
            <span className="font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
              {t.closing.headingHighlight}
            </span>
          </h2>
          <br />
          <p
            className={`mt-8 sm:mt-10 md:mt-12  max-w-[560px] ${fontClass} text-[14px] leading-[1.6] text-[var(--mist)] sm:text-[16px]`}
          >
            {t.closing.paragraph}
          </p>
          <div className="mt-8 sm:mt-10">
            <ExploreLink
              label={t.closing.ctaLabel}
              href="/contact"
              fontClass={fontClass}
            />
          </div>
        </div>
      </main>

      {/* CTASection */}
      <Conversation />

      <Footer />
    </div>
  );
};

export default WhatWeSolve;
