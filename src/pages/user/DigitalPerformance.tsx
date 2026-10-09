import React, { useEffect, useState } from "react";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

/**
 * DigitalPerformance page — BILINGUAL (EN / AR)
 * ---------------------------------------------------------
 * Same language pattern as StrategyGrowth.tsx / BrandCreative.tsx /
 * About.tsx / WorksPage.tsx / ClientsPage.tsx / StartAConversation.tsx:
 *   - Language state read from localStorage("code-language")
 *   - Kept in sync via the LANGUAGE_EVENT custom event dispatched by
 *     NavbarNew
 *   - dir="rtl"/"ltr" + lang applied on the root wrapper
 *   - All static copy lives in COPY (en / ar) below.
 * ---------------------------------------------------------
 */

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

interface Capability {
  number: string;
  title: string;
  description: string;
}

interface Outcome {
  number: string;
  title: string;
}

interface Pathway {
  number: string;
  title: string;
  href: string;
}

interface DigitalCopy {
  breadcrumb: { home: string; whatWeSolve: string; current: string };
  hero: {
    index: string;
    label: string;
    headingBefore: string;
    headingBold: string;
    paragraph: string;
  };
  challenge: { eyebrow: string; paragraph1: string; paragraph2: string };
  howHelps: { eyebrow: string; textBefore: string; textBold: string };
  capabilitiesSection: {
    eyebrow: string;
    headingBefore: string;
    headingBold: string;
    items: Capability[];
  };
  outcomes: {
    eyebrow: string;
    headingBefore: string;
    headingBold: string;
    items: Outcome[];
  };
  industries: {
    eyebrow: string;
    headingBefore1: string;
    headingBefore2: string;
    headingBold: string;
    items: string[];
  };
  pathwaysSection: {
    eyebrow: string;
    headingBefore: string;
    headingBold: string;
    items: Pathway[];
  };
  closing: {
    line1: string;
    line2: string;
    line3: string;
    line4Before: string;
    line4Bold: string;
    paragraph: string;
    cta1: string;
    cta2: string;
  };
}

const COPY: Record<Language, DigitalCopy> = {
  en: {
    breadcrumb: {
      home: "Home",
      whatWeSolve: "What We Solve",
      current: "Digital & Performance",
    },
    hero: {
      index: "03",
      label: "Digital & Performance",
      headingBefore: "Presence with ",
      headingBold: "purpose.",
      paragraph:
        "We connect digital experience, visibility and performance to measurable business outcomes.",
    },
    challenge: {
      eyebrow: "The Business Challenge",
      paragraph1:
        "A digital presence is valuable only when customers can find it, understand it and act on it. Disconnected websites, search activity, advertising and analytics make performance harder to understand and improve.",
      paragraph2:
        "CODE brings digital touchpoints together around a clearer customer journey and measurable commercial purpose.",
    },
    howHelps: {
      eyebrow: "How CODE Helps",
      textBefore: "We treat digital as a connected system — ",
      textBold:
        "where experience, discovery and measurement work together to move customers with intent rather than compete for their attention in isolation.",
    },
    capabilitiesSection: {
      eyebrow: "Capabilities",
      headingBefore: "The disciplines ",
      headingBold: "this pathway connects.",
      items: [
        {
          number: "01",
          title: "Website Strategy & Experience",
          description:
            "Plan and create digital experiences that communicate clearly, build confidence and support business objectives. Design the journey before the interface.",
        },
        {
          number: "02",
          title: "Website Design & Development",
          description:
            "Design and develop responsive, structured and scalable websites aligned with the brand and customer journey. Built to perform and built to last.",
        },
        {
          number: "03",
          title: "Search Engine Optimisation",
          description:
            "Improve organic visibility through technical foundations, relevant content and sustainable search practices. Long-term visibility, not short-term tactics.",
        },
        {
          number: "04",
          title: "Local Search & Google Business Profile",
          description:
            "Strengthen visibility for businesses serving customers within specific cities, regions or locations. Meet demand where it happens.",
        },
        {
          number: "05",
          title: "Paid Media",
          description:
            "Plan, launch and optimise targeted advertising across relevant digital platforms. Investment aligned to intent, audience and stage of decision.",
        },
        {
          number: "06",
          title: "Campaign Landing Pages",
          description:
            "Create focused digital destinations connecting campaign messaging, customer intent and conversion. Give every campaign a place designed to convert.",
        },
        {
          number: "07",
          title: "Analytics & Measurement",
          description:
            "Build clearer visibility of customer behaviour, digital performance and business-relevant outcomes. Measure what matters, not what is easy.",
        },
        {
          number: "08",
          title: "Conversion Optimisation",
          description:
            "Identify and improve friction points affecting customer action and digital performance. Refine the moments where decisions are made.",
        },
        {
          number: "09",
          title: "Digital Customer Journeys",
          description:
            "Connect relevant digital touchpoints into clearer paths from discovery to consideration and action. One journey, not many disconnected steps.",
        },
      ],
    },
    outcomes: {
      eyebrow: "Connected Outcomes",
      headingBefore: "What clients tend to ",
      headingBold: "gain.",
      items: [
        { number: "01", title: "Stronger digital visibility" },
        { number: "02", title: "Clearer customer journeys" },
        { number: "03", title: "More measurable marketing performance" },
        { number: "04", title: "Better-informed optimisation" },
      ],
    },
    industries: {
      eyebrow: "Related Industries",
      headingBefore1: "Where this ",
      headingBefore2: "pathway ",
      headingBold: "applies.",
      items: [
        "Retail",
        "Hospitality",
        "Healthcare",
        "Automotive",
        "Real Estate",
        "Professional Services",
      ],
    },
    pathwaysSection: {
      eyebrow: "Continue Through The System",
      headingBefore: "Other pathways. ",
      headingBold: "Same system.",
      items: [
        {
          number: "01",
          title: "Strategy & Growth",
          href: "/what-we-solve/strategy-growth",
        },
        {
          number: "02",
          title: "Brand & Creative",
          href: "/what-we-solve/brand-creative",
        },
        {
          number: "04",
          title: "Marketing Operations & Systems",
          href: "/what-we-solve/marketing-operations-systems",
        },
      ],
    },
    closing: {
      line1: "Connect digital ",
      line2: "presence to the ",
      line3: "journey customers ",
      line4Before: "actually ",
      line4Bold: "take.",
      paragraph:
        "Experience, discovery and measurement designed to work together, not compete for attention.",
      cta1: "Discuss Your Digital Performance",
      cta2: "Explore Our Engagements",
    },
  },

  ar: {
    breadcrumb: {
      home: "الرئيسية",
      whatWeSolve: "خدماتنا",
      current: "الحضور الرقمي والأداء",
    },
    hero: {
      index: "03",
      label: "حضور رقمي.",
      headingBefore: "حضور له ",
      headingBold: "يخدم النمو.",
      paragraph:
        "نربط التجربة الرقمية بالأداء والنتائج، ليصبح كل حضور جزءًا من نمو الأعمال.",
    },
    challenge: {
      eyebrow: "تحدي الأعمال",
      paragraph1:
        "لا يكون الحضور الرقمي ذا قيمة إلا حين يستطيع العملاء إيجاده وفهمه والتصرف بناءً عليه. عندما تنفصل المواقع والبحث والإعلان والتحليلات عن بعضها، يصعب فهم الأداء وتحسينه.",
      paragraph2:
        "تجمع CODE نقاط التماس الرقمية حول رحلة عميل أوضح وغاية تجارية قابلة للقياس.",
    },
    howHelps: {
      eyebrow: "كيف تساعد CODE",
      textBefore: "نتعامل مع الرقمنة كنظام متكامل — ",
      textBold:
        "حيث تعمل التجربة والاكتشاف والقياس معًا لتحريك العملاء بقصد بدلاً من التنافس على انتباههم بشكل منعزل.",
    },
    capabilitiesSection: {
      eyebrow: "القدرات",
      headingBefore: "التخصصات ",
      headingBold: "التي يربطها هذا المسار.",
      items: [
        {
          number: "01",
          title: "استراتيجية الموقع وتجربته",
          description:
            "تخطيط وبناء تجارب رقمية تتواصل بوضوح وتبني الثقة وتخدم أهداف العمل. تصميم الرحلة قبل الواجهة.",
        },
        {
          number: "02",
          title: "تصميم المواقع وتطويرها",
          description:
            "تصميم وتطوير مواقع متجاوبة ومنظمة وقابلة للتوسع تتماشى مع العلامة ورحلة العميل. مبنية للأداء وللاستمرار.",
        },
        {
          number: "03",
          title: "تحسين محركات البحث",
          description:
            "تحسين الظهور العضوي من خلال أسس تقنية ومحتوى ذي صلة وممارسات بحث مستدامة. ظهور طويل الأمد، لا تكتيكات عابرة.",
        },
        {
          number: "04",
          title: "البحث المحلي وملف Google للأعمال",
          description:
            "تعزيز الظهور للأعمال التي تخدم عملاء في مدن أو مناطق أو مواقع محددة. الوصول إلى الطلب حيث يحدث.",
        },
        {
          number: "05",
          title: "الإعلانات المدفوعة",
          description:
            "تخطيط وإطلاق وتحسين الإعلانات المستهدفة عبر المنصات الرقمية ذات الصلة. استثمار يتوافق مع النية والجمهور ومرحلة القرار.",
        },
        {
          number: "06",
          title: "صفحات هبوط الحملات",
          description:
            "بناء وجهات رقمية مركّزة تربط بين رسائل الحملة ونية العميل والتحويل. منح كل حملة مكاناً مصمماً للتحويل.",
        },
        {
          number: "07",
          title: "التحليلات والقياس",
          description:
            "بناء رؤية أوضح لسلوك العملاء والأداء الرقمي والنتائج ذات الصلة بالعمل. قياس ما يهم لا ما هو سهل.",
        },
        {
          number: "08",
          title: "تحسين معدل التحويل",
          description:
            "تحديد وتحسين نقاط الاحتكاك المؤثرة على تصرف العميل والأداء الرقمي. صقل اللحظات التي تُتخذ فيها القرارات.",
        },
        {
          number: "09",
          title: "رحلات العميل الرقمية",
          description:
            "ربط نقاط التماس الرقمية ذات الصلة في مسارات أوضح من الاكتشاف إلى التفكير والتصرف. رحلة واحدة، لا خطوات متفرقة.",
        },
      ],
    },
    outcomes: {
      eyebrow: "النتائج المترابطة",
      headingBefore: "ما يحققه العملاء",
      headingBold: " عادة.",
      items: [
        { number: "01", title: "ظهور رقمي أقوى" },
        { number: "02", title: "رحلات عملاء أوضح" },
        { number: "03", title: "أداء تسويقي أكثر قابلية للقياس" },
        { number: "04", title: "تحسين مبني على معرفة أدق" },
      ],
    },
    industries: {
      eyebrow: "القطاعات ذات الصلة",
      headingBefore1: "أين ينطبق",
      headingBefore2: "",
      headingBold: "هذا المسار.",
      items: [
        "التجزئة",
        "الضيافة",
        "الرعاية الصحية",
        "السيارات",
        "العقارات",
        "الخدمات المهنية",
      ],
    },
    pathwaysSection: {
      eyebrow: "تابع عبر النظام",
      headingBefore: "مسارات أخرى. ",
      headingBold: "النظام نفسه.",
      items: [
        {
          number: "01",
          title: "الاستراتيجية والنمو",
          href: "/what-we-solve/strategy-growth",
        },
        {
          number: "02",
          title: "العلامة التجارية والإبداع",
          href: "/what-we-solve/brand-creative",
        },
        {
          number: "04",
          title: "إدارة التسويق والأنظمة",
          href: "/what-we-solve/marketing-operations-systems",
        },
      ],
    },
    closing: {
      line1: "اربط الحضور الرقمي بالرحلة التي يسلكها",
      line2: "",
      line3: "",
      line4Before: " ",
      line4Bold: "عملاؤك فعلياً.",
      paragraph:
        "التجربة والاكتشاف والقياس، مصممة لتعمل معاً، لا لتتنافس على الانتباه.",
      cta1: "ناقش أداءك الرقمي",
      cta2: "اطّلع على نماذج تعاقدنا",
    },
  },
};

const glowClasses =
  "font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]";

const glowClassesSemibold =
  "font-semibold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]";

const accentLine = "w-6 h-px bg-[#8468FF] inline-block";

const getInitialLanguage = (): "en" | "ar" => {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem("code-language");

  return saved === "ar" ? "ar" : "en";
};

const DigitalPerformance: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);
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

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

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
          <span>{t.breadcrumb.home}</span>
          <span className="text-white/20">/</span>
          <span>{t.breadcrumb.whatWeSolve}</span>
          <span className="text-white/20">/</span>
          <span className="text-white">{t.breadcrumb.current}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 pb-16 sm:pb-24 md:pb-32">
        <div
          className={`text-xs tracking-[0.2em] text-white/40 uppercase mb-4 sm:mb-6 ${font}`}
        >
          {t.hero.index}&nbsp;&nbsp;&nbsp;
          <span className="text-[var(--code-purple)]">{t.hero.label}</span>
        </div>
        <h1
          className={`max-w-full md:max-w-[1400px] ${font} text-[clamp(40px,10vw,160px)] font-light ${heading(
            "leading-[0.95] sm:leading-[0.9]",
            "leading-[1.3]",
          )} tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words`}
        >
          <span className="font-light">{t.hero.headingBefore}</span>
          <span className={glowClasses}>{t.hero.headingBold}</span>
        </h1>
        <p
          className={`mt-8 sm:mt-14 md:mt-24 max-w-xl text-white/50 text-base sm:text-lg leading-relaxed ${font}`}
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

      {/* How CODE Helps */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 sm:gap-8 md:gap-24">
          <div
            className={`text-xs tracking-[0.2em] text-white/40 uppercase h-fit ${font}`}
          >
            {t.howHelps.eyebrow}
          </div>
          <p
            className={`max-w-3xl text-xl sm:text-2xl md:text-3xl ${heading("leading-snug", "leading-relaxed")} text-white/70 ${font}`}
          >
            {t.howHelps.textBefore}
            <span className="text-white font-medium">
              {t.howHelps.textBold}
            </span>
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="grid min-h-0 md:min-h-[280px] grid-cols-1 md:grid-cols-[280px_1fr] gap-6 sm:gap-8 md:gap-16">
          {/* Eyebrow */}
          <div className="flex items-start">
            <p
              className={`${font} text-xs uppercase tracking-[0.2em] text-white/40`}
            >
              {t.capabilitiesSection.eyebrow}
            </p>
          </div>

          {/* Heading */}
          <div className="flex items-start">
            <h2
              className={`max-w-full md:max-w-[1100px] ${font} text-[clamp(28px,5vw,52px)] font-light ${heading(
                "leading-[1.1] sm:leading-[0.999]",
                "leading-[1.4]",
              )} tracking-[-0.02em] sm:tracking-[0.02em] text-white break-words`}
            >
              <span className="font-light">
                {t.capabilitiesSection.headingBefore}
              </span>
              <span className={glowClasses}>
                {t.capabilitiesSection.headingBold}
              </span>
            </h2>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-0 border-t border-white/10">
          {t.capabilitiesSection.items.map((cap, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={cap.number} className="border-b border-white/10">
                <button
                  onClick={() => toggle(index)}
                  className={`w-full flex items-center gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8 md:py-10 text-left transition-colors duration-300 ${
                    isOpen ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  <span
                    className={`text-xs sm:text-sm tracking-widest w-6 sm:w-8 shrink-0 ${font}`}
                  >
                    {cap.number}
                  </span>
                  <span
                    className={`flex-1 font-light transition-all duration-300 break-words ${font} ${heading(
                      "",
                      "leading-[1.3]",
                    )} ${
                      isOpen
                        ? "text-2xl sm:text-4xl md:text-6xl text-white"
                        : "text-lg sm:text-2xl md:text-4xl"
                    }`}
                  >
                    {cap.title}
                  </span>
                  <span className="text-xl sm:text-2xl w-6 sm:w-8 text-right shrink-0 font-light">
                    {isOpen ? "×" : "+"}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`max-w-2xl text-white/50 text-sm sm:text-base md:text-lg leading-relaxed ${
                        dir === "rtl"
                          ? "pr-10 sm:pr-14 md:pr-16 pl-2"
                          : "pl-10 sm:pl-14 md:pl-16 pr-2"
                      } pb-6 sm:pb-8 md:pb-10 ${font}`}
                    >
                      {cap.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Connected Outcomes */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 sm:gap-10 md:gap-24">
          {/* Left */}
          <div>
            <div
              className={`text-xs tracking-[0.2em] text-white/40 uppercase mb-4 sm:mb-6 ${font}`}
            >
              {t.outcomes.eyebrow}
            </div>

            <h2
              className={`mt-4 sm:mt-6 ${font} text-[24px] ${heading(
                "leading-tight",
                "leading-[1.4]",
              )} sm:text-[32px] md:text-[42px]`}
            >
              {t.outcomes.headingBefore}
              <span className={glowClassesSemibold}>
                {t.outcomes.headingBold}
              </span>
            </h2>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <div className="w-full max-w-[700px] border-t border-white/10">
              {t.outcomes.items.map((outcome) => (
                <div
                  key={outcome.number}
                  className="flex items-center gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8 md:py-10 border-b border-white/10"
                >
                  <span
                    className={`w-6 sm:w-8 shrink-0 ${font} text-xs sm:text-sm tracking-[0.2em] text-white/40`}
                  >
                    {outcome.number}
                  </span>

                  <span
                    className={`${font} text-[19px] sm:text-[28px] md:text-[42px] font-light ${heading(
                      "leading-[1.15] sm:leading-[1.1]",
                      "leading-[1.4]",
                    )} text-white/80`}
                  >
                    {outcome.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Industries */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 sm:gap-8 md:gap-16">
          <div>
            <div
              className={`text-xs tracking-[0.2em] text-white/40 uppercase mb-4 sm:mb-6 ${font}`}
            >
              {t.industries.eyebrow}
            </div>
            <h2
              className={`max-w-full md:max-w-[900px] ${font} text-[clamp(32px,7vw,90px)] font-light ${heading(
                "leading-[0.95] sm:leading-[0.9]",
                "leading-[1.3]",
              )} tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words`}
            >
              <span className="font-light">{t.industries.headingBefore1}</span>
              <span className="font-light">
                {t.industries.headingBefore2}
                <span className={glowClasses}>{t.industries.headingBold}</span>
              </span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-4 sm:gap-y-6 content-start">
            {t.industries.items.map((industry) => (
              <span
                key={industry}
                className={`text-lg sm:text-xl md:text-2xl font-light text-white/60 hover:text-white transition-colors cursor-default ${font}`}
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Continue Through the System */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 pt-14 sm:pt-20 md:pt-28 pb-20 sm:pb-28 md:pb-48 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 sm:gap-10 lg:gap-24">
          {/* Left */}
          <div className="flex items-start">
            <div
              className={`${font} text-[11px] font-medium uppercase tracking-[0.3em] text-white/40`}
            >
              {t.pathwaysSection.eyebrow}
            </div>
          </div>

          {/* Right */}
          <div
            className={`flex items-start ${dir === "rtl" ? "lg:justify-start" : "lg:items-end lg:justify-end"}`}
          >
            <h2
              className={`max-w-full lg:max-w-[1400px] ${font} text-[clamp(32px,8vw,64px)] font-light ${heading(
                "leading-[0.95] sm:leading-[0.9]",
                "leading-[1.3]",
              )} tracking-[-0.04em] sm:tracking-[-0.06em] text-white break-words`}
            >
              <span className="font-light">
                {t.pathwaysSection.headingBefore}
              </span>
              <span className={glowClasses}>
                {t.pathwaysSection.headingBold}
              </span>
            </h2>
          </div>
        </div>

        <div className="border-t mt-10 sm:mt-16 md:mt-24 border-white/10">
          {t.pathwaysSection.items.map((pathway) => (
            <a
              key={pathway.number}
              href={pathway.href}
              className="flex items-center gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8 md:py-10 border-b border-white/10 group"
            >
              <span
                className={`text-xs sm:text-sm tracking-widest text-white/40 w-6 sm:w-8 shrink-0 ${font}`}
              >
                {pathway.number}
              </span>
              <span
                className={`flex-1 text-xl sm:text-3xl md:text-5xl font-light text-white/70 group-hover:text-white transition-colors break-words ${font} ${
                  dir === "rtl" ? "leading-[1.3]" : ""
                }`}
              >
                {pathway.title}
              </span>
              <span className="text-xl sm:text-2xl shrink-0 text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all">
                {dir === "rtl" ? "←" : "→"}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Closing Statement */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-16 sm:py-24 md:py-32 border-t border-white/10">
        <h2
          className={`max-w-full md:max-w-[1100px] ${font} text-[clamp(32px,10vw,130px)] font-light ${heading(
            "leading-[0.95] sm:leading-[0.9]",
            "leading-[1.3]",
          )} tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words`}
        >
          <span className="font-light">{t.closing.line1}</span>
          <span className="font-light">{t.closing.line2}</span>
          <span className="font-light">{t.closing.line3}</span>
          <span className="font-light">
            {t.closing.line4Before}
            <span className={glowClasses}>{t.closing.line4Bold}</span>
          </span>
        </h2>
        <p
          className={`mt-6 sm:mt-8 md:mt-10 max-w-xl text-white/50 text-base sm:text-lg leading-relaxed ${font}`}
        >
          {t.closing.paragraph}
        </p>

        <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-6 sm:gap-10 md:gap-16">
          <a
            href="/contact"
            className={`group flex items-center gap-4 ${font} text-[11px] sm:text-[13px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white transition-colors`}
          >
            <span>{t.closing.cta1}</span>
            <span className={`${accentLine} group-hover:w-10 transition-all`} />
          </a>

          <a
            href="/engagements"
            className={`group flex items-center gap-4 ${font} text-[11px] sm:text-[13px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/50 transition-colors hover:text-white`}
          >
            <span>{t.closing.cta2}</span>
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

export default DigitalPerformance;
