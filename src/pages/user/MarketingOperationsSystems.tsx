import React, { useEffect, useState } from "react";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import { Link } from "react-router-dom";
import Conversation from "../../components/user/Conversation";

/**
 * MarketingOperationsSystems page — BILINGUAL (EN / AR)
 * ---------------------------------------------------------
 * Same language pattern as StrategyGrowth.tsx / BrandCreative.tsx /
 * DigitalPerformance.tsx / About.tsx / WorksPage.tsx / ClientsPage.tsx /
 * StartAConversation.tsx:
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

interface MarketingOpsCopy {
  breadcrumb: { home: string; whatWeSolve: string; current: string };
  hero: {
    index: string;
    label: string;
    headingLine1: string;
    headingLine2: string;
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
    headingLine1: string;
    headingLine2Before: string;
    headingLine2Bold: string;
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
    line2Before: string;
    line2Bold: string;
    paragraph: string;
    cta1: string;
    cta2: string;
  };
}

const COPY: Record<Language, MarketingOpsCopy> = {
  en: {
    breadcrumb: {
      home: "Home",
      whatWeSolve: "What We Solve",
      current: "Marketing Operations & Systems",
    },
    hero: {
      index: "04",
      label: "Marketing Operations & Systems",
      headingLine1: "Structure before",
      headingLine2: "scale.",
      paragraph:
        "We turn marketing into a connected, repeatable operating rhythm.",
    },
    challenge: {
      eyebrow: "The Business Challenge",
      paragraph1:
        "Marketing becomes difficult to scale when planning, execution and measurement operate separately. Activity increases, but coherence and control decrease.",
      paragraph2:
        "CODE creates the structure that connects strategy, execution and continuous improvement.",
    },
    howHelps: {
      eyebrow: "How CODE Helps",
      textBefore:
        "We design the operating structure that lets marketing move at pace without losing coherence — ",
      textBold:
        "a rhythm of planning, execution and review the business can rely on.",
    },
    capabilitiesSection: {
      eyebrow: "Capabilities",
      headingBefore: "The disciplines ",
      headingBold: "this pathway connects.",
      items: [
        {
          number: "01",
          title: "Marketing Operations",
          description:
            "Design the structure connecting strategy, people, processes and measurement. Give marketing a way of working, not only a list of tasks.",
        },
        {
          number: "02",
          title: "Social Media Management",
          description:
            "Manage social presence through planned, consistent and brand-aligned content. Steady, intentional and on-brand.",
        },
        {
          number: "03",
          title: "Content Planning & Systems",
          description:
            "Create organised content frameworks supporting continuity, relevance and efficient execution. Move from ad-hoc output to a considered pipeline.",
        },
        {
          number: "04",
          title: "Integrated Campaign Management",
          description:
            "Coordinate campaign planning, creative delivery and performance across relevant channels. One campaign, executed as one.",
        },
        {
          number: "05",
          title: "Campaign Planning",
          description:
            "Structured visibility of planned campaigns, content and business priorities. Give leadership a clear view of what is coming and why.",
        },
        {
          number: "06",
          title: "Marketing Automation",
          description:
            "Introduce appropriate automation supporting consistency, efficiency and customer communication. Automate the repeatable so the team can focus on the meaningful.",
        },
        {
          number: "07",
          title: "CRM & Customer Journey Integration",
          description:
            "Connect relevant marketing and customer information to support stronger follow-up and lifecycle visibility. Turn interest into a relationship.",
        },
        {
          number: "08",
          title: "Applied AI in Marketing",
          description:
            "Apply AI responsibly where it improves speed, organisation or insight. Considered application, not novelty.",
        },
        {
          number: "09",
          title: "Performance Review & Optimisation",
          description:
            "Structured review rhythms supporting informed decisions and continuous improvement. Insight that informs the next move.",
        },
      ],
    },
    outcomes: {
      eyebrow: "Connected Outcomes",
      headingBefore: "What clients tend to ",
      headingBold: "gain.",
      items: [
        { number: "01", title: "Clearer marketing direction" },
        { number: "02", title: "More consistent execution" },
        { number: "03", title: "Stronger internal coordination" },
        { number: "04", title: "Reduced operational friction" },
        { number: "05", title: "Stronger foundations for scale" },
      ],
    },
    industries: {
      eyebrow: "RELATED INDUSTRIES",
      headingLine1: "Where this",
      headingLine2Before: "pathway ",
      headingLine2Bold: "applies.",
      items: [
        "Hospitality",
        "Retail",
        "Healthcare",
        "Industrial",
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
          number: "03",
          title: "Digital & Performance",
          href: "/what-we-solve/digital-performance",
        },
      ],
    },
    closing: {
      line1: "Create the structure required before marketing ",
      line2Before: "activity ",
      line2Bold: "scales.",
      paragraph:
        "Planning, execution and review brought into one repeatable operating rhythm.",
      cta1: "Discuss Your Marketing Operations",
      cta2: "Explore Our Engagements",
    },
  },

  ar: {
    breadcrumb: {
      home: "الرئيسية",
      whatWeSolve: "خدماتنا",
      current: "إدارة التسويق والأنظمة",
    },
    hero: {
      index: "04",
      label: "إدارة التسويق والأنظمة",
      headingLine1: "نُنظّم العمل.",
      headingLine2: "ثم نضاعف تأثيره.",
      paragraph:
        "نربط العمليات والأنظمة وقياس الأداء، لنجعل التسويق أكثر كفاءة وأكثر قابلية للتوسع.",
    },
    challenge: {
      eyebrow: "تحدي الأعمال",
      paragraph1:
        "يصعب توسيع التسويق حين يعمل التخطيط والتنفيذ والقياس كل على حدة. يزداد النشاط بينما يتراجع التماسك والتحكم.",
      paragraph2:
        "تبني CODE البنية التي تربط بين الاستراتيجية والتنفيذ والتحسين المستمر.",
    },
    howHelps: {
      eyebrow: "كيف تساعد CODE",
      textBefore:
        "نصمم البنية التشغيلية التي تتيح للتسويق التحرك بوتيرة سريعة دون فقدان التماسك —",
      textBold:
        " إيقاع من التخطيط والتنفيذ والمراجعة يمكن للعمل الاعتماد عليه.",
    },
    capabilitiesSection: {
      eyebrow: "القدرات",
      headingBefore: "التخصصات ",
      headingBold: "التي يربطها هذا المسار.",
      items: [
        {
          number: "01",
          title: "إدارة التسويق",
          description:
            "تصميم البنية التي تربط بين الاستراتيجية والأفراد والعمليات والقياس. منح التسويق طريقة عمل، لا مجرد قائمة مهام.",
        },
        {
          number: "02",
          title: "إدارة وسائل التواصل الاجتماعي",
          description:
            "إدارة الحضور الاجتماعي من خلال محتوى مخطط ومتسق ومتوافق مع العلامة. ثابت ومقصود ومتماشٍ مع الهوية.",
        },
        {
          number: "03",
          title: "تخطيط المحتوى وأنظمته",
          description:
            "بناء أطر محتوى منظمة تدعم الاستمرارية والملاءمة والتنفيذ الفعال. الانتقال من الإنتاج العشوائي إلى خط إنتاج مدروس.",
        },
        {
          number: "04",
          title: "إدارة الحملات المتكاملة",
          description:
            "تنسيق تخطيط الحملات وتسليم الإبداع والأداء عبر القنوات ذات الصلة. حملة واحدة، تُنفذ ككيان واحد.",
        },
        {
          number: "05",
          title: "تخطيط الحملات",
          description:
            "رؤية منظمة للحملات والمحتوى وأولويات العمل المخطط لها. منح القيادة صورة واضحة لما هو قادم ولماذا.",
        },
        {
          number: "06",
          title: "أتمتة التسويق",
          description:
            "إدخال الأتمتة المناسبة التي تدعم الاتساق والكفاءة والتواصل مع العملاء. أتمتة ما هو متكرر ليتفرغ الفريق لما هو جوهري.",
        },
        {
          number: "07",
          title: "تكامل إدارة علاقات العملاء ورحلاتهم",
          description:
            "ربط معلومات التسويق والعملاء ذات الصلة لدعم متابعة أقوى ورؤية أوضح لدورة حياة العميل. تحويل الاهتمام إلى علاقة.",
        },
        {
          number: "08",
          title: "الذكاء الاصطناعي التطبيقي في التسويق",
          description:
            "تطبيق الذكاء الاصطناعي بمسؤولية حيث يحسّن السرعة أو التنظيم أو الفهم. تطبيق مدروس، لا استعراض.",
        },
        {
          number: "09",
          title: "مراجعة الأداء وتحسينه",
          description:
            "إيقاعات مراجعة منظمة تدعم قرارات مبنية على معرفة وتحسيناً مستمراً. رؤية تُبنى عليها الخطوة التالية.",
        },
      ],
    },
    outcomes: {
      eyebrow: "النتائج المرتبطة",
      headingBefore: "ما يحققه العملاء",
      headingBold: "عادة.",
      items: [
        { number: "01", title: "توجه تسويقي أوضح" },
        { number: "02", title: "تنفيذ أكثر اتساقاً" },
        { number: "03", title: "تنسيق داخلي أقوى" },
        { number: "04", title: "احتكاك تشغيلي أقل" },
        { number: "05", title: "أسس أقوى للتوسع" },
      ],
    },
    industries: {
      eyebrow: "القطاعات ذات الصلة",
      headingLine1: "أين ينطبق",
      headingLine2Before: " ",
      headingLine2Bold: "هذا المسار.",
      items: [
        "الضيافة",
        "التجزئة",
        "الرعاية الصحية",
        "الصناعة",
        "الخدمات المهنية",
      ],
    },
    pathwaysSection: {
      eyebrow: "تابع عبر النظام",
      headingBefore: "مسارات أخرى. ",
      headingBold: " النظام نفسه.",
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
          number: "03",
          title: "الحضور الرقمي والأداء",
          href: "/what-we-solve/digital-performance",
        },
      ],
    },
    closing: {
      line1: "ابنِ البنية اللازمة قبل أن يتوسع",
      line2Before: " ",
      line2Bold: "النشاط التسويقي.",
      paragraph:
        "التخطيط والتنفيذ والمراجعة، مجتمعة في إيقاع تشغيلي واحد قابل للتكرار.",
      cta1: "ناقش تشغيل تسويقك",
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

const MarketingOperationsSystems: React.FC = () => {
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
        <nav
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-3 ${font} text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40`}
        >
          <Link
            to="/"
            className="hover-glow uppercase transition-colors duration-200"
          >
            {t.breadcrumb.home}
          </Link>

          <span className="text-white/20">/</span>

          <Link
            to="/what-we-solve"
            className="hover-glow uppercase transition-colors duration-200"
          >
            {t.breadcrumb.whatWeSolve}
          </Link>

          <span className="text-white/20">/</span>

          <span className="text-white">{t.breadcrumb.current}</span>
        </nav>
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
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 sm:gap-8 md:gap-16 mb-8 sm:mb-12 md:mb-16">
          <div
            className={`text-xs tracking-[0.2em] text-white/40 uppercase h-fit ${font}`}
          >
            {t.capabilitiesSection.eyebrow}
          </div>
          <h2
            className={`max-w-3xl text-2xl sm:text-4xl md:text-6xl ${heading(
              "leading-tight",
              "leading-[1.4]",
            )} font-light break-words ${font}`}
          >
            {t.capabilitiesSection.headingBefore}
            <span className={glowClassesSemibold}>
              {t.capabilitiesSection.headingBold}
            </span>
          </h2>
        </div>

        <div className="border-t border-white/10">
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
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 sm:gap-10 lg:gap-24">
          {/* Left */}
          <div>
            <div
              className={`${font} text-[11px] font-medium uppercase tracking-[0.3em] text-white/40`}
            >
              {t.outcomes.eyebrow}
            </div>

            <h2
              className={`mt-4 sm:mt-6 md:mt-8 ${font} text-[clamp(30px,6vw,60px)] font-light ${heading(
                "leading-[0.95] sm:leading-[0.9]",
                "leading-[1.35]",
              )} tracking-[-0.04em] sm:tracking-[-0.06em] text-white break-words`}
            >
              {t.outcomes.headingBefore}
              <span className={glowClasses}>{t.outcomes.headingBold}</span>
            </h2>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <div className="w-full max-w-[720px] border-t border-white/10">
              {t.outcomes.items.map((outcome) => (
                <div
                  key={outcome.number}
                  className="flex items-center gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8 md:py-10 border-b border-white/10"
                >
                  <span
                    className={`w-6 sm:w-8 shrink-0 ${font} text-[11px] sm:text-[12px] tracking-[0.2em] text-white/40`}
                  >
                    {outcome.number}
                  </span>

                  <span
                    className={`${font} text-[17px] sm:text-[24px] md:text-[40px] font-light ${heading(
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

      {/* ---------------- RELATED INDUSTRIES ---------------- */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 sm:gap-10 lg:gap-16">
          {/* Left */}
          <div>
            <p
              className={`${font} text-[11px] font-medium uppercase tracking-[0.3em] text-white/40`}
            >
              {t.industries.eyebrow}
            </p>

            <h2
              className={`mt-4 sm:mt-6 md:mt-8 ${font} text-[clamp(30px,7vw,60px)] font-light ${heading(
                "leading-[0.95] sm:leading-[0.9]",
                "leading-[1.35]",
              )} tracking-[-0.04em] sm:tracking-[-0.06em] text-white break-words`}
            >
              <span className="font-light">{t.industries.headingLine1}</span>
              <br />
              <span className="font-light">
                {t.industries.headingLine2Before}
                <span className={glowClasses}>
                  {t.industries.headingLine2Bold}
                </span>
              </span>
            </h2>
          </div>

          {/* Right */}
          <div className="flex items-center">
            <div className="flex flex-wrap gap-x-6 sm:gap-x-10 md:gap-x-16 gap-y-4 sm:gap-y-6 md:gap-y-8 max-w-[900px]">
              {t.industries.items.map((industry) => (
                <span
                  key={industry}
                  className={`${font} text-[16px] sm:text-[22px] md:text-[28px] font-light leading-[1.2] tracking-[-0.02em] sm:tracking-[-0.03em] text-white/60 transition-colors duration-300 hover:text-white cursor-default`}
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Continue Through the System */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16">
          <div
            className={`text-xs tracking-[0.2em] text-white/40 uppercase ${font}`}
          >
            {t.pathwaysSection.eyebrow}
          </div>
          <h2
            className={`text-2xl sm:text-4xl md:text-6xl font-light break-words ${font} ${
              dir === "rtl" ? "leading-[1.4]" : ""
            }`}
          >
            {t.pathwaysSection.headingBefore}
            <span className={glowClassesSemibold}>
              {t.pathwaysSection.headingBold}
            </span>
          </h2>
        </div>

        <div className="pt-10 sm:pt-16 md:pt-24 border-white/10">
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
          className={`max-w-full md:max-w-[1300px] ${font} text-[clamp(32px,10vw,150px)] font-light ${heading(
            "leading-[1.05] sm:leading-[0.999]",
            "leading-[1.35]",
          )} tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words`}
        >
          <span className="font-light">{t.closing.line1}</span>
          <span className="font-light">
            {t.closing.line2Before}
            <span className={glowClasses}>{t.closing.line2Bold}</span>
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

export default MarketingOperationsSystems;
