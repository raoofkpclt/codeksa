import React, { useEffect, useState } from "react";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

/**
 * StrategyGrowth page — BILINGUAL (EN / AR)
 * ---------------------------------------------------------
 * Same language pattern as About.tsx / WorksPage.tsx / ClientsPage.tsx /
 * StartAConversation.tsx:
 *   - Language state read from localStorage("code-language")
 *   - Kept in sync via the LANGUAGE_EVENT custom event dispatched by
 *     NavbarNew
 *   - dir="rtl"/"ltr" + lang applied on the root wrapper
 *   - `font`   -> Alexandria (ar) / Space Grotesk (en), used wherever
 *                 the original hardcoded font-['Space_Grotesk',...]
 *   - `display`-> Alexandria (ar) / font-serif-display (en, Fraunces),
 *                 used wherever the original hardcoded font-serif-display
 *                 (Fraunces has no Arabic glyphs, so Arabic falls back
 *                 to Alexandria for those headings/body copy too)
 *   - All static copy lives in COPY (en / ar) below.
 *
 * Fonts used (add to your index.html <head>, or import in CSS):
 *
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
 * ---------------------------------------------------------
 */

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

interface HeadingSpan {
  text: string;
  bold?: boolean;
}
type HeadingLines = HeadingSpan[][];

interface Capability {
  number: string;
  title: string;
  description: string;
}

interface Outcome {
  number: string;
  text: string;
}

interface OtherPathway {
  number: string;
  title: string;
  href: string;
}

interface StrategyCopy {
  breadcrumb: { home: string; whatWeSolve: string; current: string };
  hero: {
    index: string;
    label: string;
    heading: HeadingLines;
    paragraph: string;
  };
  challenge: { eyebrow: string; paragraph1: string; paragraph2: string };
  howHelps: { eyebrow: string; textBefore: string; textBold: string };
  capabilitiesSection: {
    eyebrow: string;
    heading: HeadingLines;
    items: Capability[];
  };
  outcomes: { eyebrow: string; heading: HeadingLines; items: Outcome[] };
  industries: {
    eyebrow: string;
    heading: HeadingLines;
    row1: string[];
    row2: string[];
  };
  otherPathways: {
    eyebrow: string;
    heading: HeadingLines;
    items: OtherPathway[];
  };
  closing: {
    heading: HeadingLines;
    paragraph: string;
    cta1: string;
    cta2: string;
  };
}

const COPY: Record<Language, StrategyCopy> = {
  en: {
    breadcrumb: {
      home: "HOME",
      whatWeSolve: "WHAT WE SOLVE",
      current: "STRATEGY & GROWTH",
    },
    hero: {
      index: "01",
      label: "STRATEGY & GROWTH",
      heading: [
        [{ text: "Direction before " }, { text: "activity.", bold: true }],
      ],
      paragraph:
        "We clarify where growth should come from and build the strategic structure required to move towards it.",
    },
    challenge: {
      eyebrow: "THE BUSINESS CHALLENGE",
      paragraph1:
        "Activity can create movement without creating progress. Businesses often invest in marketing, expansion or new ideas before defining where growth should come from, who it should reach or how success will be measured.",
      paragraph2:
        "CODE brings business priorities, market understanding and marketing direction into one connected growth framework.",
    },
    howHelps: {
      eyebrow: "HOW CODE HELPS",
      textBefore:
        "We work alongside leadership to translate ambition into a clear, prioritised structure — ",
      textBold:
        "one that connects business objectives, market reality and the marketing decisions required to move forward.",
    },
    capabilitiesSection: {
      eyebrow: "CAPABILITIES",
      heading: [
        [
          { text: "The disciplines " },
          { text: "this pathway connects.", bold: true },
        ],
      ],
      items: [
        {
          number: "01",
          title: "Business & Growth Strategy",
          description:
            "Define priorities, growth opportunities and the role marketing should play in achieving wider business objectives. Set the direction against which every downstream decision can be measured.",
        },
        {
          number: "02",
          title: "Marketing Strategy",
          description:
            "Create a structured direction for audiences, positioning, channels, activity and measurement. Turn abstract intent into a plan the business can execute against.",
        },
        {
          number: "03",
          title: "Go-to-Market Strategy",
          description:
            "Build a clear route for introducing a new business, brand, product, service or market proposition. Sequence the moves that create the strongest early traction.",
        },
        {
          number: "04",
          title: "Market & Competitive Research",
          description:
            "Develop a stronger understanding of the market, customer behaviour, competitors and visible opportunities. Make decisions on evidence rather than assumption.",
        },
        {
          number: "05",
          title: "Customer & Audience Strategy",
          description:
            "Clarify priority audiences, their needs and the factors influencing their decisions. Focus effort where it can generate the most meaningful response.",
        },
        {
          number: "06",
          title: "Campaign Strategy",
          description:
            "Create focused campaign direction connecting business objectives, audiences, messaging, channels and performance. Design campaigns to compound, not simply appear.",
        },
        {
          number: "07",
          title: "Growth Planning",
          description:
            "Translate strategic direction into prioritised initiatives and practical growth roadmaps. Give leadership a plan that is both ambitious and operationally realistic.",
        },
      ],
    },
    outcomes: {
      eyebrow: "CONNECTED OUTCOMES",
      heading: [
        [{ text: "What clients tend" }],
        [{ text: "to " }, { text: "gain.", bold: true }],
      ],
      items: [
        { number: "01", text: "Clearer business and marketing priorities" },
        {
          number: "02",
          text: "Stronger alignment between activity and growth",
        },
        { number: "03", text: "Better-informed market decisions" },
        { number: "04", text: "More focused use of resources" },
      ],
    },
    industries: {
      eyebrow: "RELATED INDUSTRIES",
      heading: [
        [{ text: "Where this" }],
        [{ text: "pathway " }, { text: "applies.", bold: true }],
      ],
      row1: [
        "Automotive",
        "Hospitality",
        "Healthcare",
        "Industrial",
        "Construction",
        "Retail",
      ],
      row2: ["Real Estate", "Professional Services"],
    },
    otherPathways: {
      eyebrow: "CONTINUE THROUGH THE SYSTEM",
      heading: [
        [{ text: "Other pathways. " }, { text: "Same system.", bold: true }],
      ],
      items: [
        { number: "02", title: "Brand & Creative", href: "/brand-creative" },
        {
          number: "03",
          title: "Digital & Performance",
          href: "/digital-performance",
        },
        {
          number: "04",
          title: "Marketing Operations & Systems",
          href: "/marketing-operations-systems",
        },
      ],
    },
    closing: {
      heading: [
        [
          { text: "Clarify where growth " },
          { text: "should come from " },
          { text: "before increasing " },
          { text: "activity.", bold: true },
        ],
      ],
      paragraph:
        "Business direction, market understanding and marketing decisions brought into one connected framework.",
      cta1: "Discuss your growth direction",
      cta2: "Explore our engagements",
    },
  },

  ar: {
    breadcrumb: {
      home: "الرئيسية",
      whatWeSolve: "خدماتنا",
      current: "الاستراتيجية والنمو",
    },
    hero: {
      index: "01",
      label: "الاستراتيجية والنمو",
      heading: [
        [{ text: "نحدد الاتجاه." }, { text: "ثم نبني النمو.", bold: true }],
      ],
      paragraph: "نحدد فرص النمو، ونبني الاستراتيجية التي تحوّلها إلى نتائج.",
    },
    challenge: {
      eyebrow: "تحدي العمل",
      paragraph1:
        "قد يخلق التحرك حركة دون أن يخلق تقدماً. كثير من المؤسسات تستثمر في التسويق أو التوسع أو أفكار جديدة قبل أن تحدد من أين يأتي النمو، ومن يستهدف، وكيف يُقاس نجاحه.",
      paragraph2:
        "تجمع CODE بين أولويات العمل وفهم السوق والتوجه التسويقي في إطار نمو واحد متصل.",
    },
    howHelps: {
      eyebrow: "كيف تساعد CODE",
      textBefore:
        "نعمل مع القيادة لترجمة الطموح إلى بنية واضحة ومرتبة الأولويات —",
      textBold:
        "تربط بين أهداف العمل وواقع السوق والقرارات التسويقية اللازمة للمضي قدماً.",
    },
    capabilitiesSection: {
      eyebrow: "القدرات",
      heading: [
        [
          { text: "التخصصات " },
          { text: " التي يربطها هذا المسار.", bold: true },
        ],
      ],
      items: [
        {
          number: "01",
          title: "استراتيجية العمل والنمو",
          description:
            "تحديد الأولويات وفرص النمو والدور الذي يجب أن يؤديه التسويق في تحقيق أهداف العمل الأوسع. وضع الاتجاه الذي يُقاس عليه كل قرار لاحق.",
        },
        {
          number: "02",
          title: "الاستراتيجية التسويقية",

          description:
            "بناء توجه منظم للجمهور والتموضع والقنوات والأنشطة والقياس. تحويل النية المجردة إلى خطة قابلة للتنفيذ.",
        },
        {
          number: "03",
          title: "استراتيجية الدخول إلى السوق",
          description:
            "بناء مسار واضح لإطلاق عمل أو علامة أو منتج أو خدمة أو عرض جديد في السوق. ترتيب الخطوات التي تحقق أقوى زخم مبكر.",
        },
        {
          number: "04",
          title: "أبحاث السوق والمنافسين",

          description:
            "تطوير فهم أعمق للسوق وسلوك العملاء والمنافسين والفرص المتاحة. اتخاذ القرارات بناءً على الأدلة لا الافتراضات.",
        },
        {
          number: "05",
          title: "استراتيجية العملاء والجمهور",

          description:
            "تحديد الجمهور ذو الأولوية، احتياجاته، والعوامل المؤثرة في قراراته. توجيه الجهد نحو ما يحقق أكبر أثر.",
        },
        {
          number: "06",
          title: "استراتيجية الحملات",
          description:
            "بناء توجه حملات مركّز يربط بين أهداف العمل والجمهور والرسائل والقنوات والأداء. تصميم حملات تتراكم أثرها لا مجرد أن تظهر.",
        },
        {
          number: "07",
          title: "تخطيط النمو",

          description:
            "ترجمة التوجه الاستراتيجي إلى مبادرات مرتبة الأولويات وخرائط نمو عملية. منح القيادة خطة طموحة وواقعية في آن.",
        },
      ],
    },
    outcomes: {
      eyebrow: "النتائج المترابطة",
      heading: [
        [{ text: "ما يحققه العملاء" }],
        [{ text: "" }, { text: "عادة.", bold: true }],
      ],
      items: [
        { number: "01", text: "أولويات أوضح للعمل والتسويق" },
        { number: "02", text: "توافق أقوى بين النشاط والنمو" },
        { number: "03", text: "قرارات سوقية أفضل استناداً إلى المعرفة" },
        { number: "04", text: "استخدام أكثر تركيزاً للموارد" },
      ],
    },
    industries: {
      eyebrow: "القطاعات ذات الصلة",
      heading: [
        [{ text: "أين ينطبق" }],
        [{ text: "" }, { text: "هذا المسار.", bold: true }],
      ],
      row1: [
        "السيارات",
        "الضيافة",
        "الرعاية الصحية",
        "الصناعة",
        "المقاولات",
        "التجزئة",
      ],
      row2: ["العقار", "الخدمات المهنية"],
    },
    otherPathways: {
      eyebrow: "تابع عبر النظام",
      heading: [
        [{ text: "مسارات أخرى." }, { text: "النظام نفسه.", bold: true }],
      ],
      items: [
        {
          number: "02",
          title: "العلامة التجارية والإبداع",
          href: "/brand-creative",
        },
        {
          number: "03",
          title: "الحضور الرقمي والأداء",
          href: "/digital-performance",
        },
        {
          number: "04",
          title: "إدارة التسويق والأنظمة",
          href: "/marketing-operations-systems",
        },
      ],
    },
    closing: {
      heading: [
        [
          { text: "حدد من أين يجب أن يأتي النمو قبل زيادة " },
          { text: "التحرك.", bold: true },
        ],
      ],
      paragraph:
        "اتجاه العمل، وفهم السوق، والقرارات التسويقية، مجتمعة في إطار نمو واحد متصل.",
      cta1: "ناقش اتجاه نموك",
      cta2: "اطّلع على نماذج تعاقدنا",
    },
  },
};

const accentLine = "w-6 h-px bg-[#8468FF] inline-block";

const glowClasses =
  "font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]";

const RenderLines = ({
  lines,
  className = "",
}: {
  lines: HeadingLines;
  className?: string;
}) => (
  <>
    {lines.map((line, li) => (
      <React.Fragment key={li}>
        {li > 0 && <br />}
        {line.map((s, si) =>
          s.bold ? (
            <span key={si} className={glowClasses}>
              {s.text}
            </span>
          ) : (
            <span key={si} className={className || "font-light"}>
              {s.text}
            </span>
          ),
        )}
      </React.Fragment>
    ))}
  </>
);

const eyebrowBase =
  "text-[10px] sm:text-[11px] tracking-[0.24em] sm:tracking-[0.28em] uppercase text-neutral-500 font-medium";

const getInitialLanguage = (): "en" | "ar" => {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem("code-language");

  return saved === "ar" ? "ar" : "en";
};

const StrategyGrowth: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(1); // "02" open by default, matching screenshots
  const [language, setLanguage] = useState<"en" | "ar">(getInitialLanguage);

  const dir = language === "ar" ? "rtl" : "ltr";
  const font =
    language === "ar"
      ? "font-['Alexandria',sans-serif]"
      : "font-['Space_Grotesk',sans-serif]";
  const display =
    language === "ar" ? "font-['Alexandria',sans-serif]" : "font-serif-display";
  const eyebrow = `${eyebrowBase} ${font}`;
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
    <>
      <div
        dir={dir}
        lang={language}
        className={`min-h-screen bg-black text-white ${font} selection:bg-violet-300 selection:text-black overflow-x-hidden`}
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

        <main className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
          {/* ---------------- BREADCRUMB ---------------- */}
          <div
            className={`flex flex-wrap items-center gap-x-2 gap-y-1 pt-24 sm:pt-36 md:pt-40 text-[10px] sm:text-[11px] tracking-[0.2em] text-neutral-500 ${font}`}
          >
            <a
              href="/"
              className="hover-glow uppercase transition-colors duration-200"
            >
              <span>{t.breadcrumb.home}</span>
            </a>

            <span>/</span>
            <a
              href="/what-we-solve"
              className="hover-glow uppercase transition-colors duration-200"
            >
              <span>{t.breadcrumb.whatWeSolve}</span>
            </a>

            <span>/</span>
            <span className="font-semibold text-white">
              {t.breadcrumb.current}
            </span>
          </div>

          {/* ---------------- HERO ---------------- */}
          <section className="pb-16 pt-10 sm:pb-24 sm:pt-16 md:pb-28 md:pt-24">
            <div
              className={`flex items-center gap-3 text-[12px] sm:text-[13px] tracking-[0.2em] sm:tracking-[0.25em] ${font}`}
            >
              <span className="text-neutral-500">{t.hero.index}</span>
              <span className="text-[var(--code-purple)]">{t.hero.label}</span>
            </div>

            <h1
              className={`max-w-full md:max-w-[1400px] ${font} text-[clamp(40px,10vw,160px)] font-light ${heading(
                "leading-[0.95] sm:leading-[0.9]",
                "leading-[1.3]",
              )} tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words`}
            >
              <RenderLines lines={t.hero.heading} />
            </h1>

            <p
              className={`mt-6 sm:mt-8 md:mt-10 max-w-xl text-[15px] sm:text-[17px] leading-relaxed text-neutral-400 ${font}`}
            >
              {t.hero.paragraph}
            </p>
          </section>

          {/* ---------------- BUSINESS CHALLENGE ---------------- */}
          <section className="grid grid-cols-1 gap-6 sm:gap-8 border-t border-white/10 py-12 sm:py-16 md:grid-cols-[220px_1fr] md:gap-16 md:py-20">
            <p className={eyebrow}>{t.challenge.eyebrow}</p>

            <div className="max-w-3xl space-y-6 sm:space-y-8 md:space-y-10">
              <p
                className={`${display} text-[21px] ${heading("leading-snug", "leading-relaxed")} text-neutral-100 sm:text-[26px] md:text-[30px]`}
              >
                {t.challenge.paragraph1}
              </p>
              <p
                className={`max-w-2xl text-[14px] sm:text-[15px] leading-relaxed text-neutral-500 ${font}`}
              >
                {t.challenge.paragraph2}
              </p>
            </div>
          </section>

          {/* ---------------- HOW CODE HELPS ---------------- */}
          <section className="grid grid-cols-1 gap-6 sm:gap-8 border-t border-white/10 py-12 sm:py-16 md:grid-cols-[220px_1fr] md:gap-16 md:py-20">
            <p className={eyebrow}>{t.howHelps.eyebrow}</p>

            <p
              className={`max-w-3xl ${display} text-[21px] ${heading("leading-snug", "leading-relaxed")} text-neutral-100 sm:text-[26px] md:text-[30px]`}
            >
              {t.howHelps.textBefore}
              <span className="font-semibold text-white">
                {t.howHelps.textBold}
              </span>
            </p>
          </section>

          {/* ---------------- CAPABILITIES ---------------- */}
          <section className="border-t border-white/10 py-12 sm:py-16 md:py-20">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-[220px_1fr] md:gap-16">
              <p className={eyebrow}>{t.capabilitiesSection.eyebrow}</p>
              <h2
                className={`max-w-2xl ${display} text-[26px] ${heading(
                  "leading-tight",
                  "leading-[1.4]",
                )} sm:text-[34px] md:text-[42px]`}
              >
                <RenderLines lines={t.capabilitiesSection.heading} />
              </h2>
            </div>

            <div className="mt-10 sm:mt-16 border-t border-white/10">
              {t.capabilitiesSection.items.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={item.number} className="border-b border-white/10">
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      className="flex w-full items-start justify-between gap-3 sm:gap-6 py-6 sm:py-8 text-left"
                    >
                      <div className="flex items-baseline gap-3 sm:gap-6 md:gap-10">
                        <span
                          className={`w-6 sm:w-8 shrink-0 text-[12px] sm:text-[13px] text-neutral-500 ${font}`}
                        >
                          {item.number}
                        </span>
                        <span
                          className={`${display} text-[19px] ${heading(
                            "leading-tight",
                            "leading-[1.3]",
                          )} transition-colors sm:text-[30px] md:text-[42px] break-words ${
                            isOpen ? "text-white" : "text-neutral-400"
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                      <span
                        className={`mt-1 sm:mt-2 shrink-0 text-xl sm:text-2xl font-light transition-transform ${
                          isOpen ? "rotate-45 text-white" : "text-neutral-500"
                        }`}
                      >
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <p
                        className={`max-w-2xl pb-8 sm:pb-10 ${dir === "rtl" ? "pr-9 sm:pr-14 md:pr-[104px]" : "pl-9 sm:pl-14 md:pl-[104px]"} text-[14px] sm:text-[15px] leading-relaxed text-neutral-500 ${font}`}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ---------------- CONNECTED OUTCOMES ---------------- */}
          <section className="grid grid-cols-1 gap-8 sm:gap-10 border-t border-white/10 py-12 sm:py-16 md:grid-cols-[minmax(260px,360px)_1fr] md:gap-16 md:py-20">
            <div>
              <p className={eyebrow}>{t.outcomes.eyebrow}</p>
              <h2
                className={`mt-4 sm:mt-6 ${display} text-[26px] ${heading(
                  "leading-tight",
                  "leading-[1.4]",
                )} sm:text-[34px] md:text-[42px]`}
              >
                <RenderLines lines={t.outcomes.heading} />
              </h2>
            </div>

            <div className="border-t border-white/10">
              {t.outcomes.items.map((o) => (
                <div
                  key={o.number}
                  className="flex items-baseline gap-4 sm:gap-8 border-b border-white/10 py-6 sm:py-8"
                >
                  <span
                    className={`w-5 sm:w-6 shrink-0 text-[12px] sm:text-[13px] text-neutral-500 ${font}`}
                  >
                    {o.number}
                  </span>
                  <span
                    className={`${display} text-[19px] ${
                      dir === "rtl" ? "leading-[1.4]" : ""
                    } text-neutral-200 sm:text-[26px] md:text-[30px]`}
                  >
                    {o.text}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------- RELATED INDUSTRIES ---------------- */}
          <section className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 sm:gap-10 lg:gap-16 border-t border-white/10 py-12 sm:py-16 md:py-20">
            {/* Left */}
            <div>
              <p className={eyebrow}>{t.industries.eyebrow}</p>

              <h2
                className={`mt-6 sm:mt-8 ${font} text-[clamp(32px,8vw,72px)] font-light ${heading(
                  "leading-[0.95] sm:leading-[0.9]",
                  "leading-[1.3]",
                )} tracking-[-0.04em] sm:tracking-[-0.06em] text-white break-words`}
              >
                <RenderLines lines={t.industries.heading} />
              </h2>
            </div>

            {/* Right */}
            <div className="flex flex-col justify-center gap-6 sm:gap-8 md:gap-10">
              <div className="flex flex-wrap gap-x-6 sm:gap-x-10 md:gap-x-12 gap-y-4 sm:gap-y-6">
                {t.industries.row1.map((industry) => (
                  <span
                    key={industry}
                    className={`${font} text-[15px] sm:text-[18px] text-white/70 hover:text-white transition-colors`}
                  >
                    {industry}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-6 sm:gap-x-10 md:gap-x-12 gap-y-4 sm:gap-y-6">
                {t.industries.row2.map((industry) => (
                  <span
                    key={industry}
                    className={`${font} text-[15px] sm:text-[18px] text-white/70 hover:text-white transition-colors`}
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------- OTHER PATHWAYS ---------------- */}
          <section className="mt-12 sm:mt-16 md:mt-24 border-white/10 py-12 sm:py-16 md:py-20">
            <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-[220px_1fr] md:gap-16">
              <p className={eyebrow}>{t.otherPathways.eyebrow}</p>
              <h2
                className={`text-left md:text-right ${display} text-[26px] ${heading(
                  "leading-tight",
                  "leading-[1.4]",
                )} sm:text-[34px] md:text-[42px]`}
              >
                <RenderLines lines={t.otherPathways.heading} />
              </h2>
            </div>

            <div className="mt-10 sm:mt-16 border-t border-white/10">
              {t.otherPathways.items.map((p) => (
                <a
                  href={p.href}
                  key={p.number}
                  className="group flex items-center justify-between gap-4 border-b border-white/10 py-6 sm:py-10 transition-colors"
                >
                  <div className="flex items-baseline gap-3 sm:gap-6 md:gap-10">
                    <span
                      className={`w-6 sm:w-8 text-[12px] sm:text-[13px] text-neutral-500 ${font}`}
                    >
                      {p.number}
                    </span>
                    <span
                      className={`${display} text-[19px] text-neutral-400 transition-colors group-hover:text-white sm:text-[30px] md:text-[42px] break-words ${
                        dir === "rtl" ? "leading-[1.3]" : ""
                      }`}
                    >
                      {p.title}
                    </span>
                  </div>
                  <span className="text-xl sm:text-2xl shrink-0 text-neutral-500 transition-transform group-hover:translate-x-1 group-hover:text-white">
                    {dir === "rtl" ? "\u2190" : "\u2192"}
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* ---------------- CLOSING CTA ---------------- */}
          <section className="border-white/10 py-16 sm:py-20 md:py-24">
            <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:items-end md:justify-between">
              <h2
                className={`max-w-full md:max-w-[1500px] ${font} text-[clamp(32px,10vw,130px)] font-light ${heading(
                  "leading-[1.05] sm:leading-[0.999]",
                  "leading-[1.35]",
                )} tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words`}
              >
                <RenderLines lines={t.closing.heading} />
              </h2>
            </div>
            <div>
              <p
                className={`mt-8 sm:mt-12 max-w-[720px] ${font} text-[16px] sm:text-[18px] font-light leading-[1.6] sm:leading-[1.75] tracking-[-0.01em] sm:tracking-[-0.02em] text-white/55`}
              >
                {t.closing.paragraph}
              </p>
            </div>

            <div className="mt-10 sm:mt-16 flex flex-col gap-5 sm:gap-6 border-white/10 pt-8 sm:pt-10 sm:flex-row sm:items-center sm:gap-12">
              <a
                href="/contact"
                className={`group inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.24em] text-white transition-opacity hover:opacity-70 ${font}`}
              >
                {t.closing.cta1}
                <span
                  className={`${accentLine} group-hover:w-10 transition-all`}
                />
              </a>
              <a
                href="/engagements"
                className={`group inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.24em] text-white transition-opacity hover:opacity-70 ${font}`}
              >
                {t.closing.cta2}
                <span
                  className={`${accentLine} group-hover:w-10 transition-all`}
                />
              </a>
            </div>
          </section>
          <Conversation />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default StrategyGrowth;
