import React, { useEffect, useState } from "react";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

/**
 * Hospitality page — BILINGUAL (EN / AR)
 * ---------------------------------------------------------
 * Same language pattern as Automotive.tsx / StrategyGrowth.tsx /
 * BrandCreative.tsx / DigitalPerformance.tsx /
 * MarketingOperationsSystems.tsx / About.tsx / WorksPage.tsx /
 * ClientsPage.tsx / StartAConversation.tsx:
 *   - Language state read from localStorage("code-language")
 *   - Kept in sync via the LANGUAGE_EVENT custom event dispatched by
 *     NavbarNew
 *   - dir="rtl"/"ltr" + lang applied on the root wrapper
 *   - All static copy lives in COPY (en / ar) below.
 * ---------------------------------------------------------
 */

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

interface HospitalityCopy {
  breadcrumb: { home: string; industries: string; current: string };
  hero: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    paragraph: string;
  };
  challenge: { eyebrow: string; paragraph1: string; paragraph2: string };
  relevantFor: { eyebrow: string; items: string[] };
  systemSection: {
    eyebrow: string;
    headingBefore: string;
    headingBold: string;
    items: string[];
  };
  closing: {
    headingBefore: string;
    headingBold: string;
    paragraph: string;
    cta: string;
  };
}

const COPY: Record<Language, HospitalityCopy> = {
  en: {
    breadcrumb: {
      home: "Home",
      industries: "Industries",
      current: "Hospitality",
    },
    hero: {
      eyebrow: "Hospitality",
      headingLine1: "Hospitality,",
      headingLine2: "structured.",
      paragraph:
        "Food and hospitality businesses do not compete only on taste.",
    },
    challenge: {
      eyebrow: "The Business Challenge",
      paragraph1:
        "They compete on memory, experience, convenience, visibility and the customer's confidence before arrival.",
      paragraph2:
        "CODE helps hospitality businesses connect brand presence, local discovery, content, reviews and customer experience into a clearer growth system.",
    },
    relevantFor: {
      eyebrow: "Relevant For",
      items: [
        "Restaurants",
        "Cafés",
        "Food trucks",
        "Hospitality groups",
        "Local food businesses",
      ],
    },
    systemSection: {
      eyebrow: "What CODE May Connect",
      headingBefore: "The parts that make ",
      headingBold: "the system.",
      items: [
        "Brand atmosphere",
        "Menu clarity",
        "Google Maps visibility",
        "Reviews",
        "Food photography",
        "Content planning",
        "Local campaigns",
        "Social media presence",
        "Customer journey",
        "Repeat visit opportunities",
      ],
    },
    closing: {
      headingBefore: "Connect brand memory, local discovery and customer ",
      headingBold: "experience.",
      paragraph:
        "Food and hospitality businesses win on memory and confidence. CODE connects brand, content, reviews and journey into one system.",
      cta: "Discuss Your Hospitality Business",
    },
  },

  ar: {
    breadcrumb: {
      home: "الرئيسية",
      industries: "القطاعات",
      current: "قطاع الضيافة",
    },
    hero: {
      eyebrow: "قطاع الضيافة",
      headingLine1: "قطاع الضيافة، ",
      headingLine2: "بمنهجية واضحة.",
      paragraph: "شركات الأغذية والضيافة لا تتنافس على الطعم وحده.",
    },
    challenge: {
      eyebrow: "تحدي الأعمال",
      paragraph1:
        "فهي تتنافس على الذكرى والتجربة والراحة والظهور، وعلى ثقة العميل قبل وصوله.",
      paragraph2:
        "تساعد CODE شركات الضيافة على ربط حضور العلامة والظهور المحلي والمحتوى والتقييمات وتجربة العميل ضمن منظومة نمو أكثر وضوحًا.",
    },
    relevantFor: {
      eyebrow: "مناسب لـ",
      items: [
        "المطاعم",
        "المقاهي",
        "عربات الطعام",
        "مجموعات الضيافة",
        "الأعمال الغذائية المحلية",
      ],
    },
    systemSection: {
      eyebrow: "ما قد تربطه CODE",
      headingBefore: "الأجزاء التي تشكّل ",
      headingBold: "المنظومة.",
      items: [
        "أجواء العلامة ",
        "وضوح قائمة الطعام",
        "الظهور على خرائط جوجل",
        "التقييمات",
        "تصوير الطعام",
        "تخطيط المحتوى",
        "الحملات المحلية",
        "الحضور على وسائل التواصل الاجتماعي",
        "رحلة العميل",
        "فرص تكرار الزيارة",
      ],
    },
    closing: {
      headingBefore: "اربط ذكرى العلامة والاكتشاف المحلي وتجربة ",
      headingBold: "العميل.",
      paragraph:
        "تفوز شركات الأغذية والضيافة بالذكرى والثقة. تربط CODE العلامة والمحتوى والتقييمات ورحلة العميل ضمن منظومة واحدة.",
      cta: "ناقش عملك في قطاع الضيافة",
    },
  },
};

const glowClasses =
  "font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]";

const accentLine = "w-6 h-px bg-[#8468FF] inline-block";

const getInitialLanguage = (): "en" | "ar" => {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem("code-language");

  return saved === "ar" ? "ar" : "en";
};

const Hospitality: React.FC = () => {
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

  return (
    <div
      dir={dir}
      lang={language}
      className={`bg-black text-white overflow-x-hidden ${font}`}
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
      `}</style>
      <NavbarNew />

      {/* Breadcrumb */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 pt-28 sm:pt-32 md:pt-40 pb-6 sm:pb-10">
        <div
          className={`flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs tracking-[0.2em] text-white/40 uppercase ${font}`}
        >
          <span>{t.breadcrumb.home}</span>
          <span className="text-white/20">/</span>
          <span>{t.breadcrumb.industries}</span>
          <span className="text-white/20">/</span>
          <span className="text-white">{t.breadcrumb.current}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 pb-16 sm:pb-24 md:pb-32">
        <div
          className={`text-xs tracking-[0.2em] text-white/40 uppercase mb-4 sm:mb-6 ${font}`}
        >
          {t.hero.eyebrow}
        </div>
        <h1
          className={`max-w-full md:max-w-[1400px] ${font} text-[clamp(40px,11vw,160px)] font-light ${heading(
            "leading-[0.95] sm:leading-[0.9]",
            "leading-[1.3]",
          )} tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words`}
        >
          <span className="font-light">{t.hero.headingLine1}</span>
          <br />
          <span className={glowClasses}>{t.hero.headingLine2}</span>
        </h1>
        <p
          className={`mt-6 sm:mt-8 md:mt-10 max-w-xl text-white/50 text-base sm:text-lg leading-relaxed ${font}`}
        >
          {t.hero.paragraph}
        </p>
      </section>

      {/* The Business Challenge */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-16 sm:py-20 md:py-28 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 sm:gap-10 md:gap-24">
          <div
            className={`text-xs tracking-[0.2em] text-white/40 uppercase h-fit ${font}`}
          >
            {t.challenge.eyebrow}
          </div>
          <div className="max-w-3xl space-y-6 sm:space-y-8 md:space-y-10">
            <p
              className={`text-xl sm:text-2xl md:text-3xl ${heading("leading-snug", "leading-relaxed")} text-white ${font}`}
            >
              {t.challenge.paragraph1}
            </p>
            <p
              className={`text-white/50 text-base sm:text-lg leading-relaxed ${font}`}
            >
              {t.challenge.paragraph2}
            </p>
          </div>
          <div
            className={`text-xs tracking-[0.2em] text-white/40 uppercase h-fit mt-2 md:mt-0 ${font}`}
          >
            {t.relevantFor.eyebrow}
          </div>
          <div className="max-w-3xl flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-5 md:gap-x-10 md:gap-y-6">
            {t.relevantFor.items.map((item) => (
              <span
                key={item}
                className={`${font} text-lg sm:text-2xl md:text-3xl font-light text-white/70 hover:text-white transition-colors cursor-default`}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="hidden md:block" />
        </div>
      </section>

      {/* What CODE May Connect */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-16 sm:py-20 md:py-28 border-t border-white/10">
        <div className="grid min-h-[80px] sm:min-h-[120px] grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-16 lg:mb-20">
          {/* Left */}
          <div className="flex items-start">
            <p
              className={`${font} text-[11px] font-medium uppercase tracking-[0.3em] text-white/40`}
            >
              {t.systemSection.eyebrow}
            </p>
          </div>

          {/* Right */}
          <div className="flex items-end">
            <h2
              className={`max-w-full lg:max-w-[900px] ${font} text-[clamp(28px,5vw,64px)] font-light ${heading(
                "leading-[1.05] sm:leading-[0.999]",
                "leading-[1.4]",
              )} tracking-[-0.03em] sm:tracking-[-0.06em] text-white break-words`}
            >
              {t.systemSection.headingBefore}
              <span className={glowClasses}>{t.systemSection.headingBold}</span>
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {t.systemSection.items.map((part) => (
            <div
              key={part}
              className="px-6 sm:px-8 py-8 sm:py-10 md:py-12 flex items-center justify-center text-center transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <span
                className={`${font} text-center text-base sm:text-xl md:text-[28px] font-light tracking-[-0.02em] sm:tracking-[-0.03em] text-white/80 ${
                  dir === "rtl" ? "leading-[1.4]" : ""
                }`}
              >
                {part}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Statement */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-16 sm:py-24 md:py-32 border-t border-white/10">
        <h2
          className={`max-w-full md:max-w-[1400px] ${font} text-[clamp(36px,10vw,130px)] font-light ${heading(
            "leading-[0.95] sm:leading-[0.9]",
            "leading-[1.3]",
          )} tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words`}
        >
          <span className="font-light">{t.closing.headingBefore}</span>
          <span className={glowClasses}>{t.closing.headingBold}</span>
        </h2>
        <p
          className={`mt-6 sm:mt-8 md:mt-10 max-w-xl text-white/50 text-base sm:text-lg leading-relaxed ${font}`}
        >
          {t.closing.paragraph}
        </p>

        <div className="mt-12 sm:mt-16 md:mt-20 flex items-center">
          <a
            href="/contact"
            className={`group flex items-center gap-4 ${font} text-[11px] sm:text-[13px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white transition-colors`}
          >
            <span>{t.closing.cta}</span>
            <span className={`${accentLine} group-hover:w-10 transition-all`} />
          </a>
        </div>
      </section>

      {/* Start a Conversation */}
      <Conversation />

      <Footer />
    </div>
  );
};

export default Hospitality;
