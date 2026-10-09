import React, { useEffect, useState } from "react";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

/**
 * Automotive page — BILINGUAL (EN / AR)
 * ---------------------------------------------------------
 * Same language pattern as StrategyGrowth.tsx / BrandCreative.tsx /
 * DigitalPerformance.tsx / MarketingOperationsSystems.tsx / About.tsx /
 * WorksPage.tsx / ClientsPage.tsx / StartAConversation.tsx:
 *   - Language state read from localStorage("code-language")
 *   - Kept in sync via the LANGUAGE_EVENT custom event dispatched by
 *     NavbarNew
 *   - dir="rtl"/"ltr" + lang applied on the root wrapper
 *   - All static copy lives in COPY (en / ar) below.
 * ---------------------------------------------------------
 */

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

interface AutomotiveCopy {
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

const COPY: Record<Language, AutomotiveCopy> = {
  en: {
    breadcrumb: {
      home: "Home",
      industries: "Industries",
      current: "Automotive",
    },
    hero: {
      eyebrow: "Automotive",
      headingLine1: "Automotive,",
      headingLine2: "structured.",
      paragraph:
        "Automotive businesses are often judged before the customer calls, visits or books.",
    },
    challenge: {
      eyebrow: "The Business Challenge",
      paragraph1:
        "A customer may compare vehicle presentation, reviews, response routes, pricing clarity, location information and overall professionalism within seconds.",
      paragraph2:
        "CODE helps automotive businesses strengthen the system behind visibility, trust and customer action.",
    },
    relevantFor: {
      eyebrow: "Relevant For",
      items: [
        "Car rental companies",
        "Car dealerships",
        "Auto services",
        "Workshops",
        "Specialist automotive businesses",
      ],
    },
    systemSection: {
      eyebrow: "What CODE May Connect",
      headingBefore: "The parts that make ",
      headingBold: "the system.",
      items: [
        "Google Business Profile",
        "Local search visibility",
        "Fleet or service presentation",
        "Brand credibility",
        "Website or landing page experience",
        "Social media structure",
        "Campaign planning",
        "Review and trust signals",
        "WhatsApp and enquiry pathways",
        "Performance reporting",
      ],
    },
    closing: {
      headingBefore: "Strengthen the system behind visibility, trust and ",
      headingBold: "customer action.",
      paragraph:
        "From Google Business Profile to enquiry pathways, CODE connects the moments that shape an automotive customer's decision.",
      cta: "Discuss Your Automotive Business",
    },
  },

  ar: {
    breadcrumb: {
      home: "الرئيسية",
      industries: "القطاعات",
      current: "قطاع السيارات",
    },
    hero: {
      eyebrow: "قطاع السيارات",
      headingLine1: "قطاع السيارات،",
      headingLine2: "بمنهجية واضحة..",
      paragraph:
        "غالبًا ما يُحكم على شركات السيارات قبل أن يتصل العميل أو يزور المعرض أو يحجز الخدمة.",
    },
    challenge: {
      eyebrow: "تحدي الأعمال",
      paragraph1:
        "قد يقارن العميل بين عرض المركبات والتقييمات وسرعة الرد ووضوح الأسعار ودقة معلومات الموقع والانطباع العام خلال ثوانٍ معدودة.",
      paragraph2:
        "تساعد CODE شركات السيارات على تعزيز المنظومة القائمة خلف الظهور والثقة وتحفيز العميل على اتخاذ القرار.",
    },
    relevantFor: {
      eyebrow: "مناسب لـ",
      items: [
        "شركات تأجير السيارات",
        "معارض السيارات",
        "مراكز خدمة السيارات",
        "الورش",
        "الشركات المتخصصة في قطاع السيارات",
      ],
    },
    systemSection: {
      eyebrow: "ما قد تربطه CODE",
      headingBefore: "الأجزاء التي تشكّل ",
      headingBold: " المنظومة.",
      items: [
        "الملف التجاري على جوجل",
        "الظهور في البحث المحلي",
        "عرض الأسطول أو الخدمات",
        "مصداقية العلامة",
        "تجربة الموقع الإلكتروني أو صفحة التسويقية",
        "بنية حسابات التواصل الاجتماعي",
        "تخطيط الحملات",
        "التقييمات ومؤشرات الثقة",
        "قنوات التواصل عبر واتساب والاستفسارات",
        "تقارير الأداء",
      ],
    },
    closing: {
      headingBefore:
        "عزّز المنظومة القائمة خلف الظهور والثقة وتحفيز العميل على ",
      headingBold: "اتخاذ القرار.",
      paragraph:
        "من الملف التجاري على جوجل إلى قنوات الاستفسار، تربط CODE اللحظات التي تشكّل قرار عميل السيارات.",
      cta: "ناقش عملك في قطاع السيارات",
    },
  },
};

const glowClasses =
  "font-bold text-white transition-all duration-500 ease-out hover:text-[#8468FF] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]";

const glowClassesSemibold =
  "font-semibold text-white transition-all duration-500 ease-out hover:text-[#8468FF] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]";

const accentLine = "w-6 h-px bg-[#8468FF] inline-block";

const getInitialLanguage = (): "en" | "ar" => {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem("code-language");

  return saved === "ar" ? "ar" : "en";
};

const Automotive: React.FC = () => {
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
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 pt-24 sm:pt-32 md:pt-40 pb-6 sm:pb-10">
        <div
          className={`flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs tracking-[0.2em] text-white/40 uppercase ${font}`}
        >
          <a
            href="/"
            className="hover-glow uppercase transition-colors duration-200 flex items-center gap-2 sm:gap-3"
          >
            <span>{t.breadcrumb.home}</span>
            <span className="text-white/20">/</span>
          </a>
          <a
            href="/industries"
            className="hover-glow uppercase transition-colors duration-200 flex items-center gap-2 sm:gap-3"
          >
            <span>{t.breadcrumb.industries}</span>
            <span className="text-white/20">/</span>
          </a>

          <span className="text-white">{t.breadcrumb.current}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 pb-14 sm:pb-20 md:pb-32">
        <div
          className={`text-xs tracking-[0.2em] text-white/40 uppercase mb-4 sm:mb-6 ${font}`}
        >
          {t.hero.eyebrow}
        </div>
        <h1
          className={`max-w-full md:max-w-[1400px] ${font} text-[clamp(36px,11vw,160px)] font-light ${heading(
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
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 sm:gap-8 md:gap-24">
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
        </div>
      </section>

      {/* Relevant For */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 sm:gap-8 md:gap-24">
          <div
            className={`text-xs tracking-[0.2em] text-white/40 uppercase h-fit ${font}`}
          >
            {t.relevantFor.eyebrow}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-5 md:gap-x-16 md:gap-y-8">
            {t.relevantFor.items.map((item) => (
              <span
                key={item}
                className={`text-lg sm:text-2xl md:text-4xl font-light text-white/70 hover:text-white transition-colors cursor-default ${font}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* What CODE May Connect */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="grid min-h-0 sm:min-h-[150px] grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 sm:gap-8 md:gap-16">
          {/* Left */}
          <div className="flex items-start">
            <p
              className={`${font} text-[11px] font-medium uppercase tracking-[0.3em] text-white/40`}
            >
              {t.systemSection.eyebrow}
            </p>
          </div>

          {/* Right */}
          <div
            className={`flex items-start ${dir === "rtl" ? "lg:justify-start" : "lg:items-end lg:justify-end"}`}
          >
            <h2
              className={`text-3xl sm:text-4xl md:text-6xl font-light ${heading(
                "leading-tight",
                "leading-[1.35]",
              )} break-words ${font}`}
            >
              {t.systemSection.headingBefore}
              <span className={glowClassesSemibold}>
                {t.systemSection.headingBold}
              </span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-10 sm:pt-12 md:pt-24 text-center">
          {t.systemSection.items.map((part) => (
            <div key={part} className="py-8 sm:py-10 md:py-16 px-2">
              <span
                className={`text-base sm:text-lg md:text-2xl font-light text-white/70 ${font}`}
              >
                {part}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Statement */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-16 sm:py-20 md:py-32 border-t border-white/10">
        <h2
          className={`max-w-full md:max-w-[1500px] ${font} text-[clamp(32px,10vw,130px)] font-light ${heading(
            "leading-[1.05] sm:leading-[0.999]",
            "leading-[1.35]",
          )} tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words`}
        >
          <span className="font-light">
            {t.closing.headingBefore}
            <span className={glowClasses}>{t.closing.headingBold}</span>
          </span>
        </h2>
        <p
          className={`mt-6 sm:mt-8 md:mt-10 max-w-xl text-white/50 text-base sm:text-lg leading-relaxed ${font}`}
        >
          {t.closing.paragraph}
        </p>

        <div className="mt-10 sm:mt-12 md:mt-20 flex flex-wrap items-center gap-6 sm:gap-10">
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

export default Automotive;
