import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

interface Pathway {
  index: string;
  label: string;
  title: string;
  highlight: string;
  description: string;
  href: string;
}

interface StandardItem {
  index: string;
  title: string;
  description: string;
}

interface Engagement {
  index: string;
  title: string;
  description: string;
}

interface WorkItem {
  title: string;
}

interface Industry {
  key: string; // stable key, used for the Automotive/Hospitality link check
  label: string;
}

interface HomeCopy {
  hero: {
    line1: string;
    line2: string;
    highlight: string;
    paragraph: string;
    startConversation: string;
    exploreWhatWeSolve: string;
  };
  whatCodeDoes: {
    label: string;
    heading: string;
    highlight: string;
    paragraph1: string;
    paragraph2: string;
  };
  whatWeSolveIntro: {
    label: string;
    heading: string;
    highlight: string;
  };
  pathways: Pathway[];
  standard: {
    label: string;
    heading: string;
    highlight: string;
    items: StandardItem[];
  };
  engagements: {
    label: string;
    heading: string;
    highlight: string;
    items: Engagement[];
    cta: string;
  };
  industries: {
    label: string;
    heading: string;
    highlight: string;
    items: Industry[];
    cta: string;
  };
  selectedWork: {
    label: string;
    heading: string;
    highlight: string;
    paragraph: string;
    items: WorkItem[];
    inPreparation: string;
  };
}

const COPY: Record<Language, HomeCopy> = {
  en: {
    hero: {
      line1: "The system",
      line2: "behind",
      highlight: "growth.",
      paragraph:
        "CODE connects strategy, brand, digital presence and marketing operations into structured systems for sustainable growth.",
      startConversation: "START A CONVERSATION",
      exploreWhatWeSolve: "EXPLORE WHAT WE SOLVE",
    },
    whatCodeDoes: {
      label: "WHAT CODE DOES",
      heading: "Business growth needs more than",
      highlight: "activity.",
      paragraph1:
        "Most businesses do not need more isolated marketing activity. They need clearer direction, stronger brand meaning, purposeful digital presence and a repeatable operating rhythm.",
      paragraph2:
        "CODE helps businesses understand what needs to move, then builds the structure required to move it.",
    },
    whatWeSolveIntro: {
      label: "WHAT WE SOLVE",
      heading: "Four pathways.",
      highlight: "One system.",
    },
    pathways: [
      {
        index: "01",
        label: "STRATEGY & GROWTH",
        title: "Direction before",
        highlight: "activity.",
        description:
          "We define where growth should come from—and build the structure to move towards it.",
        href: "/strategy-growth",
      },
      {
        index: "02",
        label: "BRAND & CREATIVE",
        title: "Meaning before",
        highlight: "visibility.",
        description: "We shape brands people understand, trust and remember.",
        href: "/brand-creative",
      },
      {
        index: "03",
        label: "DIGITAL & PERFORMANCE",
        title: "Presence with",
        highlight: "purpose.",
        description:
          "We connect digital experience, visibility and performance to measurable business outcomes.",
        href: "/digital-performance",
      },
      {
        index: "04",
        label: "MARKETING OPERATIONS & SYSTEMS",
        title: "Structure before",
        highlight: "scale.",
        description:
          "We turn marketing into a connected, repeatable operating rhythm.",
        href: "/marketing-operations-systems",
      },
    ],
    standard: {
      label: "THE CODE STANDARD",
      heading: "Clear before work",
      highlight: "begins.",
      items: [
        {
          index: "01",
          title: "Business Before Activity",
          description:
            "We begin with the business requirement before recommending channels or deliverables.",
        },
        {
          index: "02",
          title: "Defined Scope",
          description:
            "Deliverables, responsibilities, assumptions, timing and fees are confirmed before work begins.",
        },
        {
          index: "03",
          title: "Connected Expertise",
          description:
            "The right strategic, creative, digital and operational capabilities are combined according to the requirement.",
        },
        {
          index: "04",
          title: "Structured Delivery",
          description:
            "Every engagement includes a named contact, agreed milestones and clear delivery standards.",
        },
      ],
    },
    engagements: {
      label: "ENGAGEMENTS",
      heading: "Different levels of engagement.",
      highlight: "One standard.",
      items: [
        {
          index: "01",
          title: "CODE Essentials",
          description: "One focused requirement. One defined scope.",
        },
        {
          index: "02",
          title: "Foundation",
          description: "Build the right structure.",
        },
        {
          index: "03",
          title: "Growth",
          description: "Scale with greater direction.",
        },
        {
          index: "04",
          title: "Partnership",
          description: "An embedded growth and marketing partner.",
        },
      ],
      cta: "EXPLORE OUR ENGAGEMENTS",
    },
    industries: {
      label: "INDUSTRIES",
      heading: "Built for businesses where clarity, trust and",
      highlight: "execution matter.",
      items: [
        { key: "Automotive", label: "Automotive" },
        { key: "Hospitality", label: "Hospitality" },
        { key: "Retail", label: "Retail" },
        { key: "Professional Services", label: "Professional Services" },
        { key: "Real Estate", label: "Real Estate" },
        { key: "Healthcare", label: "Healthcare" },
        { key: "Construction", label: "Construction" },
        { key: "Industrial", label: "Industrial" },
        { key: "Growing Businesses", label: "Growing Businesses" },
      ],
      cta: "EXPLORE INDUSTRIES",
    },
    selectedWork: {
      label: "SELECTED WORK",
      heading: "Selected",
      highlight: "work.",
      paragraph:
        "Selected work is being prepared for publication. Until then, CODE presents its capabilities through defined pathways, engagement models and structured working standards.",
      items: [
        { title: "Strategy" },
        { title: "Brand" },
        { title: "Digital" },
        { title: "Campaigns" },
        { title: "Marketing Operations" },
        { title: "Content & Production" },
      ],
      inPreparation: "IN PREPARATION",
    },
  },

  ar: {
    hero: {
      line1: "النظام الذي",
      line2: "يقف خلف",
      highlight: "النمو.",
      paragraph:
        "تربط CODE الاستراتيجية والعلامة التجارية والحضور الرقمي وتشغيل التسويق في نظام واحد منظّم يقود إلى نمو مستدام.",
      startConversation: "ابدأ الحديث معنا",
      exploreWhatWeSolve: "استكشف خدماتنا",
    },
    whatCodeDoes: {
      label: "دور CODE",
      heading: "النمو لا يحتاج مزيداً من",
      highlight: "نشاط.",
      paragraph1:
        "أغلب الشركات لا ينقصها مزيد من الحملات المتفرقة، بل اتجاه أوضح، ومعنى أقوى للعلامة، وحضور رقمي له هدف، وإيقاع عمل قابل للتكرار.",
      paragraph2:
        "نساعد الشركات على تحديد ما يجب أن يتحرك أولاً، ثم نبني البنية التي تجعل حركته ممكنة.",
    },
    whatWeSolveIntro: {
      label: "خدماتنا",
      heading: "أربعة مسارات.",
      highlight: "منظومة واحدة.",
    },
    pathways: [
      {
        index: "01",
        label: "الاستراتيجية والنمو",
        title: "نحدد الاتجاه.",
        highlight: "ثم نبني النمو.",
        description:
          "نحدد فرص النمو، ونبني الاستراتيجية التي تحوّلها إلى نتائج.",
        href: "/strategy-growth",
      },
      {
        index: "02",
        label: "العلامة التجارية والإبداع",
        title: "علامة لها معنى.",
        highlight: "وحضور يُذكر.",
        description:
          "نبني علامة واضحة ومميزة، يفهمها الناس، يثقون بها، ويتذكرونها.",
        href: "/brand-creative",
      },
      {
        index: "03",
        label: "الحضور الرقمي والأداء",
        title: "حضور رقمي.",
        highlight: "يخدم النمو.",
        description:
          "نربط التجربة الرقمية بالأداء والنتائج، ليصبح كل حضور جزءًا من نمو الأعمال.",
        href: "/digital-performance",
      },
      {
        index: "04",
        label: "إدارة التسويق والأنظمة",
        title: "نُنظّم العمل.",
        highlight: "ثم نضاعف تأثيره.",
        description:
          "نربط العمليات والأنظمة وقياس الأداء، لنجعل التسويق أكثر كفاءة وأكثر قابلية للتوسع.",
        href: "/marketing-operations-systems",
      },
    ],
    standard: {
      label: "معيار CODE",
      heading: "الوضوح أولًا.",
      highlight: "ثم نبدأ.",
      items: [
        {
          index: "01",
          title: "الهدف قبل التنفيذ",
          description: "نبدأ بفهم هدف العمل، ثم نحدد ما يحتاج لتحقيقه.",
        },
        {
          index: "02",
          title: "نطاق واضح",
          description:
            "نحدد المخرجات، والمسؤوليات، والجدول الزمني قبل بدء العمل.",
        },
        {
          index: "03",
          title: "خبرات مترابطة",
          description:
            "نجمع الخبرات الاستراتيجية والإبداعية والرقمية والتشغيلية وفق احتياجات كل مشروع.",
        },
        {
          index: "04",
          title: "تنفيذ منظّم",
          description:
            "لكل مشروع مسؤول محدد، ومراحل متفق عليها، ومعايير واضحة للتسليم.",
        },
      ],
    },
    engagements: {
      label: "نماذج التعاقد",
      heading: "مستويات تعاون مختلفة.",
      highlight: "معيار واحد.",
      items: [
        {
          index: "01",
          title: "CODE Essentials",
          description: "متطلب واحد واضح. نطاق واحد محدد.",
        },
        {
          index: "02",
          title: "Foundation",
          description: "بناء البنية الصحيحة.",
        },
        {
          index: "03",
          title: "Growth",
          description: "توسّع باتجاه أوضح وأثر أعلى.",
        },
        {
          index: "04",
          title: "Partnership",
          description: "شريك نمو وتسويق داخل فريقك.",
        },
      ],
      cta: "استعرض نماذج التعاقد",
    },
    industries: {
      label: "القطاعات",
      heading: "مبني لشركات يشكّل فيها الوضوح والثقة",
      highlight: "والتنفيذ فارقاً.",
      items: [
        { key: "Automotive", label: "قطاع السيارات" },
        { key: "Hospitality", label: "الضيافة والمطاعم" },
        { key: "Retail", label: "التجزئة والتجارة" },
        { key: "Professional Services", label: "الخدمات المهنية" },
        { key: "Real Estate", label: "العقار والتطوير" },
        { key: "Healthcare", label: "الرعاية الصحية" },
        { key: "Construction", label: "المقاولات والإنشاءات" },
        { key: "Industrial", label: "Industrial" },
        { key: "Growing Businesses", label: "Growing Businesses" },
      ],
      cta: "استعرض القطاعات",
    },
    selectedWork: {
      label: "أعمال مختارة",
      heading: "أعمال",
      highlight: "مختارة.",
      paragraph:
        "يجري إعداد الأعمال المختارة للنشر. وحتى ذلك الحين، نقدّم قدراتنا عبر مسارات واضحة، ونماذج تعاقد محددة، ومعايير عمل منظّمة.",
      items: [
        { title: "الاستراتيجية" },
        { title: "العلامة التجارية" },
        { title: "الحضور الرقمي" },
        { title: "الحملات" },
        { title: "إدارة التسويق" },
        { title: "المحتوى والإنتاج" },
      ],
      inPreparation: "قيد الإعداد",
    },
  },
};

const labelBase = "text-xs tracking-[0.2em] text-white/40";
const accentLine = "w-6 h-px bg-[#8468FF] inline-block";
const glowSpan =
  "font-semibold text-white transition-all duration-500 ease-out hover:text-[#8468FF] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]";

const getInitialLanguage = (): "en" | "ar" => {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem("code-language");

  return saved === "ar" ? "ar" : "en";
};

const Home: React.FC = () => {
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

  const t = COPY[language];

  return (
    <div
      dir={dir}
      lang={language}
      className={`bg-black text-white overflow-x-hidden ${fontClass}`}
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

        body { font-family: 'Space Grotesk', sans-serif; }
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
      <section className="px-6 md:px-10 lg:px-16 pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28">
        <div className="max-w-[1600px] mx-auto">
          <h1
            className={`font-light text-[clamp(5rem,15vw,20rem)] ${heading(
              "leading-[0.999]",
              "leading-[1.3]",
            )} tracking-[-0.08em]`}
          >
            {t.hero.line1}
            <br />
            {t.hero.line2} <span className={glowSpan}>{t.hero.highlight}</span>
          </h1>

          <p className="mt-10 sm:mt-14 md:mt-20 max-w-xl text-base sm:text-lg leading-relaxed text-white/50">
            {t.hero.paragraph}
          </p>
          <div className="mt-10 md:mt-14 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-x-10 gap-y-6">
            <Link
              to="/contact"
              className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/80 hover:text-white transition-colors group"
            >
              {t.hero.startConversation}
              <span
                className={`${accentLine} group-hover:w-10 transition-all`}
              />
            </Link>

            <Link
              to="/what-we-solve"
              className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/50 hover:text-white/80 transition-colors group"
            >
              {t.hero.exploreWhatWeSolve}
              <span
                className={`${accentLine} group-hover:w-10 transition-all`}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* What CODE does */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,440px)_1fr] gap-8 md:gap-20">
          <p className={labelBase}>{t.whatCodeDoes.label}</p>

          <div>
            <h2
              className={`font-light text-3xl sm:text-4xl md:text-6xl ${heading(
                "leading-[1.1] sm:leading-[1.05]",
                "leading-[1.35]",
              )} tracking-tight max-w-3xl`}
            >
              {t.whatCodeDoes.heading}{" "}
              <span className={glowSpan}>{t.whatCodeDoes.highlight}</span>
            </h2>

            <p className="mt-8 md:mt-10 max-w-2xl text-white/50 text-base sm:text-lg leading-relaxed">
              {t.whatCodeDoes.paragraph1}
            </p>

            <p className="mt-6 max-w-2xl text-white/50 text-base sm:text-lg leading-relaxed">
              {t.whatCodeDoes.paragraph2}
            </p>
          </div>
        </div>
      </section>

      {/* What we solve intro */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,440px)_1fr] gap-8 md:gap-20">
          <p className={labelBase}>{t.whatWeSolveIntro.label}</p>

          <div>
            <div className="flex justify-start md:justify-end">
              <div className="w-full max-w-[650px] lg:max-w-[950px]">
                <h2
                  className={`font-light text-[clamp(2.75rem,8vw,8rem)] ${heading(
                    "leading-[0.95] sm:leading-[0.9]",
                    "leading-[1.3]",
                  )} tracking-[-0.03em] sm:tracking-[-0.05em] break-words`}
                >
                  {t.whatWeSolveIntro.heading}
                  <br />
                  <span className={glowSpan}>
                    {t.whatWeSolveIntro.highlight}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we solve */}
      <section className="border-white/10 px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto">
          {t.pathways.map((pathway) => (
            <Link
              key={pathway.index}
              to={pathway.href}
              className="group block border-t border-white/10 last:border-b py-10 sm:py-14 md:py-20"
            >
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-6 sm:mb-8">
                <span className="text-xs tracking-[0.2em] text-white/40 shrink-0">
                  {pathway.index}
                </span>
                <span className="text-xs tracking-[0.2em] text-white/40 break-words">
                  {pathway.label}
                </span>
              </div>

              <div className="flex items-center justify-center gap-8">
                <div className="w-full max-w-[1150px]">
                  <h3
                    className={`font-light text-[clamp(2.5rem,7vw,8rem)] ${heading(
                      "leading-[0.85]",
                      "leading-[1.25]",
                    )} tracking-[-0.06em]`}
                  >
                    {pathway.title}{" "}
                    <span className={glowSpan}>{pathway.highlight}</span>
                  </h3>

                  <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/50">
                    {pathway.description}
                  </p>
                </div>

                <span className="hidden md:block text-3xl text-violet-400 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100">
                  {dir === "rtl" ? "←" : "→"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* The CODE standard */}
      <section className="px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto flex flex-col justify-between">
          <p className={`${labelBase} self-start`}>{t.standard.label}</p>

          <h2
            className={`self-end text-right font-light text-3xl sm:text-4xl md:text-6xl ${heading(
              "leading-[1.05]",
              "leading-[1.3]",
            )} tracking-[-0.04em]`}
          >
            {t.standard.heading}{" "}
            <span className={glowSpan}>{t.standard.highlight}</span>
          </h2>
        </div>

        <div className="max-w-[1600px] mx-auto mt-12 sm:mt-20 grid grid-cols-1 md:grid-cols-2">
          {t.standard.items.map((item) => (
            <div
              key={item.index}
              className="px-0 md:px-14 py-10 sm:py-14 md:py-16"
            >
              <span className="text-xs tracking-[0.2em] text-white/40">
                {item.index}
              </span>
              <h3 className="mt-4 sm:mt-6 mb-4 sm:mb-5 text-xl sm:text-2xl md:text-3xl font-light">
                {item.title}
              </h3>
              <p className="text-white/50 leading-relaxed max-w-md text-sm sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Engagements */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto grid min-h-[40vh] grid-cols-1 md:grid-cols-[250px_1fr]">
          <div className="flex items-start">
            <p className={labelBase}>{t.engagements.label}</p>
          </div>

          <div className="flex items-center justify-between">
            <h2
              className={`max-w-4xl font-light text-3xl sm:text-4xl md:text-6xl ${heading(
                "leading-[1.05]",
                "leading-[1.3]",
              )} tracking-[-0.04em]`}
            >
              {t.engagements.heading}
              <br />
              <span className={glowSpan}>{t.engagements.highlight}</span>
            </h2>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {t.engagements.items.map((item) => (
            <div
              key={item.index}
              className="px-6 md:px-10 py-10 sm:py-12 md:py-14"
            >
              <span className="text-xs tracking-[0.2em] text-white/40">
                {item.index}
              </span>
              <h3
                className={`mt-4 sm:mt-6 mb-3 sm:mb-4 text-xl sm:text-2xl ${glowSpan}`}
              >
                {item.title}
              </h3>
              <p className="text-white/50 leading-relaxed text-sm sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-[1600px] mx-auto mt-12 sm:mt-16">
          <Link
            to="/engagements"
            className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/70 hover:text-white transition-colors group w-fit"
          >
            {t.engagements.cta}
            <span className={`${accentLine} group-hover:w-10 transition-all`} />
          </Link>
        </div>
      </section>

      {/* Industries */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto">
          <div className="max-w-[1600px] mx-auto grid min-h-[50vh] grid-cols-1 md:grid-cols-[250px_1fr]">
            <div className="flex items-start">
              <p className={labelBase}>{t.industries.label}</p>
            </div>

            <div className="flex items-center justify-between">
              <h2
                className={`max-w-5xl font-light text-3xl sm:text-4xl md:text-6xl ${heading(
                  "leading-[1.05]",
                  "leading-[1.3]",
                )} tracking-[-0.04em]`}
              >
                {t.industries.heading}{" "}
                <span className={glowSpan}>{t.industries.highlight}</span>
              </h2>
            </div>
          </div>
          <div className="mt-10 sm:mt-16 flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-4 sm:gap-y-6">
            {t.industries.items.map((industry) =>
              industry.key === "Automotive" ||
              industry.key === "Hospitality" ? (
                <Link
                  key={industry.key}
                  to={`/${industry.key}`}
                  className="text-xs sm:text-xl md:text-xl font-light text-white/70 hover:text-white transition-colors"
                >
                  {industry.label}
                </Link>
              ) : (
                <span
                  key={industry.key}
                  className="text-xs sm:text-xl md:text-xl font-light text-white/70 cursor-default"
                >
                  {industry.label}
                </span>
              ),
            )}
          </div>

          <div className="mt-10 sm:mt-16">
            <Link
              to="/industries"
              className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/70 hover:text-white transition-colors group w-fit"
            >
              {t.industries.cta}
              <span
                className={`${accentLine} group-hover:w-10 transition-all`}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto grid min-h-[50vh] grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <div className="flex items-start">
            <p className={labelBase}>{t.selectedWork.label}</p>
          </div>

          <div className="flex flex-col justify-center items-end">
            <div className="max-w-4xl">
              <h2
                className={`font-light text-3xl sm:text-4xl md:text-6xl ${heading(
                  "leading-[1.05]",
                  "leading-[1.3]",
                )} tracking-[-0.04em]`}
              >
                {t.selectedWork.heading}{" "}
                <span className={glowSpan}>{t.selectedWork.highlight}</span>
              </h2>

              <p className="mt-8 text-white/50 text-base sm:text-lg leading-relaxed">
                {t.selectedWork.paragraph}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {t.selectedWork.items.map((item) => (
            <div
              key={item.title}
              className="px-6 md:px-10 lg:px-14 py-10 sm:py-14 md:py-16"
            >
              <span className="text-xs tracking-[0.2em] text-white/40">
                {t.selectedWork.inPreparation}
              </span>
              <h3 className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-light">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <Conversation />
      <Footer />
    </div>
  );
};

export default Home;
