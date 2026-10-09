import React, { type ReactNode, useEffect, useState } from "react";
import Footer from "../../components/user/Footer";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Conversation from "../../components/user/Conversation";

/**
 * BrandCreative page — BILINGUAL (EN / AR)
 * ---------------------------------------------------------
 * Same language pattern as StrategyGrowth.tsx / About.tsx / WorksPage.tsx /
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

interface Capability {
  num: string;
  title: string;
  text: string;
}

interface Outcome {
  num: string;
  text: string;
}

interface OtherPathway {
  num: string;
  title: string;
  href: string;
}

interface BrandCopy {
  breadcrumb: { home: string; whatWeSolve: string; current: string };
  hero: {
    index: string;
    label: string;
    headingBefore: string;
    headingBold: string;
    paragraph: string;
  };
  challenge: { eyebrow: string; paragraph1: string; paragraph2: string };
  howHelps: { eyebrow: string; text: string };
  capabilitiesSection: {
    eyebrow: string;
    headingBefore: string;
    headingBold: string;
    items: Capability[];
  };
  outcomes: {
    eyebrow: string;
    headingLine1: string;
    headingLine2Before: string;
    headingLine2Bold: string;
    items: Outcome[];
  };
  industries: {
    eyebrow: string;
    headingLine1: string;
    headingLine2Before: string;
    headingLine2Bold: string;
    items: string[];
  };
  otherPathways: {
    eyebrow: string;
    headingBefore: string;
    headingBold: string;
    items: OtherPathway[];
  };
  closing: {
    headingLine1: string;
    headingLine2: string;
    headingLine3Before: string;
    headingLine3Bold: string;
    paragraph: string;
    cta1: string;
    cta2: string;
  };
}

const COPY: Record<Language, BrandCopy> = {
  en: {
    breadcrumb: {
      home: "HOME",
      whatWeSolve: "WHAT WE SOLVE",
      current: "BRAND & CREATIVE",
    },
    hero: {
      index: "02",
      label: "Brand & Creative",
      headingBefore: "Meaning before ",
      headingBold: "visibility.",
      paragraph:
        "We build brands people can understand, trust and remember — then translate them into consistent experiences.",
    },
    challenge: {
      eyebrow: "The business challenge",
      paragraph1:
        "Visibility creates attention, but attention alone does not build preference. When positioning, identity and communication are disconnected, customers may see a business without understanding why it matters.",
      paragraph2:
        "CODE connects strategy, identity, messaging and creative execution into one coherent brand system.",
    },
    howHelps: {
      eyebrow: "How CODE helps",
      text: "We shape the meaning of the brand first, then design the visual, verbal and experiential system that carries that meaning consistently across every customer moment.",
    },
    capabilitiesSection: {
      eyebrow: "Capabilities",
      headingBefore: "The disciplines ",
      headingBold: "this pathway connects.",
      items: [
        {
          num: "01",
          title: "Brand Strategy",
          text: "Define the role, direction and long-term meaning of the brand. Establish the foundation every creative decision can be anchored to.",
        },
        {
          num: "02",
          title: "Brand Positioning",
          text: "Clarify what the brand stands for, who it serves and why it should be chosen. Give the business a distinct place in the mind of its customers.",
        },
        {
          num: "03",
          title: "Brand Identity",
          text: "Develop or refine the visual system representing the business consistently and distinctively. Design an identity that scales across formats, teams and time.",
        },
        {
          num: "04",
          title: "Verbal Identity & Messaging",
          text: "Create a clear language system for how the brand communicates across audiences and channels. Turn tone and message into a repeatable craft.",
        },
        {
          num: "05",
          title: "Brand Guidelines",
          text: "Build practical standards supporting consistency across internal teams, agencies and future applications. Protect the brand as it grows.",
        },
        {
          num: "06",
          title: "Campaign Creative",
          text: "Translate strategic campaign ideas into distinctive visual and communication systems. Move from concept to a campaign that behaves as one.",
        },
        {
          num: "07",
          title: "Content Creative",
          text: "Develop intentional creative assets designed around the platform, audience and communication objective. Every asset earns its place.",
        },
        {
          num: "08",
          title: "Photography & Videography",
          text: "Create purposeful visual content aligned with the brand's identity, market and customer experience. Original imagery, produced to a considered standard.",
        },
        {
          num: "09",
          title: "Motion & Visual Storytelling",
          text: "Use motion design and visual narratives to explain ideas and strengthen communication. Bring depth and rhythm to how the brand moves.",
        },
      ],
    },
    outcomes: {
      eyebrow: "Connected outcomes",
      headingLine1: "What clients tend",
      headingLine2Before: "to ",
      headingLine2Bold: "gain.",
      items: [
        { num: "01", text: "Clearer brand meaning" },
        { num: "02", text: "Stronger recognition" },
        { num: "03", text: "Greater communication consistency" },
        { num: "04", text: "More coherent customer experiences" },
      ],
    },
    industries: {
      eyebrow: "Related industries",
      headingLine1: "Where this",
      headingLine2Before: "pathway ",
      headingLine2Bold: "applies.",
      items: [
        "Hospitality",
        "Retail",
        "Real Estate",
        "Automotive",
        "Healthcare",
        "Professional Services",
      ],
    },
    otherPathways: {
      eyebrow: "Continue through the system",
      headingBefore: "Other pathways. ",
      headingBold: "Same system.",
      items: [
        { num: "01", title: "Strategy & Growth", href: "/strategy-growth" },
        {
          num: "03",
          title: "Digital & Performance",
          href: "/digital-performance",
        },
        {
          num: "04",
          title: "Marketing Operations & Systems",
          href: "/marketing-operations-systems",
        },
      ],
    },
    closing: {
      headingLine1: "Clarify what the ",
      headingLine2: "brand should mean ",
      headingLine3Before: "before increasing ",
      headingLine3Bold: "visibility.",
      paragraph:
        "Positioning, identity, messaging and creative execution shaped into one coherent brand system.",
      cta1: "Discuss your brand",
      cta2: "Explore our engagements",
    },
  },

  ar: {
    breadcrumb: {
      home: "الرئيسية",
      whatWeSolve: "خدماتنا",
      current: "العلامة التجارية والإبداع",
    },
    hero: {
      index: "02",
      label: "العلامة التجارية والإبداع",
      headingBefore: "علامة لها معنى.",
      headingBold: "وحضور يُذكر.",
      paragraph:
        "نبني علامة واضحة ومميزة، يفهمها الناس، يثقون بها، ويتذكرونها.",
    },
    challenge: {
      eyebrow: "تحدي العمل",
      paragraph1:
        "الظهور يخلق انتباهاً، لكن الانتباه وحده لا يبني تفضيلاً. حين ينفصل التموضع عن الهوية عن الرسائل، قد يرى العملاء العمل دون أن يفهموا لماذا يهم.",
      paragraph2:
        "تربط CODE بين الاستراتيجية والهوية والرسائل والتنفيذ الإبداعي في نظام علامة تجارية واحد متماسك.",
    },
    howHelps: {
      eyebrow: "كيف تساعد CODE",
      text: "نشكّل معنى العلامة أولاً، ثم نصمم النظام البصري واللفظي والتجريبي الذي يحمل هذا المعنى بثبات في كل لحظة يعيشها العميل.",
    },
    capabilitiesSection: {
      eyebrow: "القدرات",
      headingBefore: "التخصصات ",
      headingBold: "التي يربطها هذا المسار.",
      items: [
        {
          num: "01",
          title: "استراتيجية العلامة التجارية",
          text: "تحديد دور العلامة واتجاهها ومعناها على المدى الطويل. إرساء الأساس الذي تُبنى عليه كل قرارات الإبداع.",
        },
        {
          num: "02",
          title: "تموضع العلامة التجارية",
          text: "توضيح ما تمثله العلامة، ومن تخدم، ولماذا يجب اختيارها. منح العمل مكانة مميزة في ذهن عملائه.",
        },
        {
          num: "03",
          title: "الهوية البصرية",
          text: "نطوّر أو نحسّن النظام البصري الذي يمثل العمل بشكل متسق ومميز. نصمم هوية تتوسع عبر الصيغ والفرق والزمن.",
        },
        {
          num: "04",
          title: "الهوية اللفظية والرسائل",
          text: "نبني نظام لغة واضحًا لكيفية تواصل العلامة التجارية عبر الجماهير والقنوات. نحوّل النبرة والرسالة إلى حرفة قابلة للتكرار.",
        },
        {
          num: "05",
          title: "دليل العلامة التجارية",
          text: "نبني معايير عملية تدعم الاتساق عبر الفرق الداخلية والوكالات والتطبيقات المستقبلية. نحمي العلامة التجارية مع نموها.",
        },
        {
          num: "06",
          title: "إبداع الحملات",
          text: "نترجم أفكار الحملات الاستراتيجية إلى أنظمة بصرية وتواصلية مميزة. ننتقل من الفكرة إلى حملة تتصرف ككيان واحد.",
        },
        {
          num: "07",
          title: "إبداع المحتوى",
          text: "نطوّر أصولًا إبداعية مقصودة مصممة حول المنصة والجمهور وهدف التواصل. كل أصل يستحق مكانه.",
        },
        {
          num: "08",
          title: "التصوير الفوتوغرافي والمرئي",
          text: "إنتاج محتوى بصري هادف يتماشى مع هوية العلامة وسوقها وتجربة عملائها. صور أصلية بمعايير مدروسة.",
        },
        {
          num: "09",
          title: "الحركة والسرد البصري",
          text: "استخدام تصميم الحركة والسرد البصري لشرح الأفكار وتعزيز التواصل. إضفاء عمق وإيقاع على حركة العلامة.",
        },
      ],
    },
    outcomes: {
      eyebrow: "النتائج المترابطة",
      headingLine1: "ما يحققه العملاء",
      headingLine2Before: "",
      headingLine2Bold: "عادة.",
      items: [
        { num: "01", text: "معنى أوضح للعلامة التجارية" },
        { num: "02", text: "وعي أقوى بالعلامة التجارية" },
        { num: "03", text: "اتساق أكبر في التواصل" },
        { num: "04", text: "تجارب عملاء أكثر تماسكًا" },
      ],
    },
    industries: {
      eyebrow: "القطاعات ذات الصلة",
      headingLine1: "أين ينطبق",
      headingLine2Before: "",
      headingLine2Bold: " هذا المسار.",
      items: [
        "الضيافة",
        "التجزئة",
        "العقارات",
        "السيارات",
        "الرعاية الصحية",
        "الخدمات المهنية",
      ],
    },
    otherPathways: {
      eyebrow: "تابع عبر النظام",
      headingBefore: "مسارات أخرى. ",
      headingBold: "نفس النظام.",
      items: [
        { num: "01", title: "الاستراتيجية والنمو", href: "/strategy-growth" },
        {
          num: "03",
          title: "الحضور الرقمي والأداء",
          href: "/digital-performance",
        },
        {
          num: "04",
          title: "إدارة التسويق والأنظمة",
          href: "/marketing-operations-systems",
        },
      ],
    },
    closing: {
      headingLine1: "حدد ما يجب أن تعنيه العلامة قبل زيادة",
      headingLine2: "",
      headingLine3Before: " ",
      headingLine3Bold: "الظهور .",
      paragraph:
        "التموضع والهوية والرسائل والتنفيذ الإبداعي، مشكّلة في نظام علامة تجارية واحد متماسك.",
      cta1: "ناقش علامتك التجارية",
      cta2: "اطّلع على نماذج تعاقدنا",
    },
  },
};

const glowClasses =
  "font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]";

const glowClassesMedium =
  "font-medium text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]";

const accentLine = "w-6 h-px bg-[#8468FF] inline-block";

interface EyebrowProps {
  children: ReactNode;
  font: string;
}

function Eyebrow({ children, font }: EyebrowProps) {
  return (
    <p
      className={`text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500 uppercase mb-4 sm:mb-6 ${font}`}
    >
      {children}
    </p>
  );
}

interface AccordionRowProps {
  item: Capability;
  isOpen: boolean;
  onToggle: () => void;
  font: string;
  dir: "rtl" | "ltr";
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
  font,
  dir,
}: AccordionRowProps) {
  return (
    <div className="border-t border-neutral-800 last:border-b">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 sm:gap-8 py-6 sm:py-10 text-left group"
      >
        <div className="flex items-baseline gap-3 sm:gap-6 md:gap-10 min-w-0">
          <span
            className={`text-xs sm:text-sm text-neutral-500 tabular-nums pt-2 shrink-0 ${font}`}
          >
            {item.num}
          </span>
          <span
            className={`text-xl sm:text-3xl md:text-5xl font-light text-neutral-200 group-hover:text-white transition-colors ${
              dir === "rtl"
                ? "leading-[1.3] sm:leading-[1.15]"
                : "leading-tight sm:leading-none"
            } break-words ${font}`}
          >
            {item.title}
          </span>
        </div>
        <span className="text-xl sm:text-2xl text-neutral-400 shrink-0 pt-1 w-6 text-center">
          {isOpen ? "\u00D7" : "+"}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: isOpen ? "500px" : "0px" }}
      >
        <p
          className={`${dir === "rtl" ? "pr-8 sm:pr-[5.75rem] pl-4 sm:pl-10" : "pl-8 sm:pl-[5.75rem] pr-4 sm:pr-10"} pb-8 sm:pb-10 text-neutral-400 text-base sm:text-lg leading-relaxed max-w-2xl ${font}`}
        >
          {item.text}
        </p>
      </div>
    </div>
  );
}

const getInitialLanguage = (): "en" | "ar" => {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem("code-language");

  return saved === "ar" ? "ar" : "en";
};

const BrandCreative: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(2);
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
          <section className="pb-16 sm:pb-28 md:pb-40 pt-10 sm:pt-16 md:pt-24">
            <div className={`flex items-center gap-3 mb-6 sm:mb-10 ${font}`}>
              <span className="text-sm text-neutral-500 tabular-nums">
                {t.hero.index}
              </span>
              <span className="text-sm tracking-[0.2em] text-[var(--code-purple)] uppercase">
                {t.hero.label}
              </span>
            </div>
            <h1
              className={`max-w-full md:max-w-[1400px] ${font} text-[clamp(40px,11vw,160px)] font-light ${heading(
                "leading-[1] sm:leading-[0.999]",
                "leading-[1.35]",
              )} tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words`}
            >
              <span className="font-light">{t.hero.headingBefore}</span>
              <span className={glowClasses}>{t.hero.headingBold}</span>
            </h1>
            <p
              className={`text-lg sm:text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed ${font}`}
            >
              {t.hero.paragraph}
            </p>
          </section>

          {/* ---------------- BUSINESS CHALLENGE ---------------- */}
          <section className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 sm:gap-16 pb-16 sm:pb-28 md:pb-40 border-t border-neutral-800 pt-10 sm:pt-16">
            <Eyebrow font={font}>{t.challenge.eyebrow}</Eyebrow>
            <div>
              <p
                className={`text-xl sm:text-2xl md:text-3xl text-neutral-200 ${heading(
                  "leading-snug",
                  "leading-relaxed",
                )} mb-6 sm:mb-8 max-w-3xl ${font}`}
              >
                {t.challenge.paragraph1}
              </p>
              <p
                className={`text-neutral-500 text-base sm:text-lg max-w-2xl ${font}`}
              >
                {t.challenge.paragraph2}
              </p>
            </div>
          </section>

          {/* ---------------- HOW CODE HELPS ---------------- */}
          <section className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 sm:gap-16 pb-16 sm:pb-28 md:pb-40 border-t border-neutral-800 pt-10 sm:pt-16">
            <Eyebrow font={font}>{t.howHelps.eyebrow}</Eyebrow>
            <p
              className={`text-xl sm:text-2xl md:text-3xl text-neutral-200 ${heading(
                "leading-snug",
                "leading-relaxed",
              )} max-w-3xl ${font}`}
            >
              {t.howHelps.text}
            </p>
          </section>

          {/* ---------------- CAPABILITIES ---------------- */}
          <section className="pb-16 sm:pb-28 md:pb-40 border-t border-neutral-800 pt-10 sm:pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 sm:gap-16 mb-4">
              <Eyebrow font={font}>{t.capabilitiesSection.eyebrow}</Eyebrow>
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-light ${heading(
                  "leading-tight",
                  "leading-[1.35]",
                )} max-w-3xl ${font}`}
              >
                {t.capabilitiesSection.headingBefore}
                <span className={glowClasses}>
                  {t.capabilitiesSection.headingBold}
                </span>
              </h2>
            </div>
            <div>
              {t.capabilitiesSection.items.map((item, i) => (
                <AccordionRow
                  key={item.num}
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                  font={font}
                  dir={dir}
                />
              ))}
            </div>
          </section>

          {/* ---------------- CONNECTED OUTCOMES ---------------- */}
          <section className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 sm:gap-16 pb-16 sm:pb-28 md:pb-40 border-neutral-800 pt-10 sm:pt-16">
            <div>
              <Eyebrow font={font}>{t.outcomes.eyebrow}</Eyebrow>
              <h2
                className={`mt-4 sm:mt-6 ${font} text-[26px] ${heading(
                  "leading-tight",
                  "leading-[1.4]",
                )} sm:text-[34px] md:text-[42px]`}
              >
                {t.outcomes.headingLine1}
                <br />
                {t.outcomes.headingLine2Before}
                <span className={glowClasses}>
                  {t.outcomes.headingLine2Bold}
                </span>
              </h2>
            </div>
            <div>
              {t.outcomes.items.map((o) => (
                <div
                  key={o.num}
                  className="flex items-baseline gap-4 sm:gap-8 py-6 sm:py-10 border-t border-neutral-800 last:border-b"
                >
                  <span
                    className={`text-xs sm:text-sm text-neutral-500 tabular-nums shrink-0 ${font}`}
                  >
                    {o.num}
                  </span>
                  <span
                    className={`text-xl sm:text-2xl md:text-3xl text-neutral-200 font-light ${font}`}
                  >
                    {o.text}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------- RELATED INDUSTRIES ---------------- */}
          <section className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 sm:gap-16 pb-16 sm:pb-28 md:pb-40 border-t border-neutral-800 pt-10 sm:pt-16">
            <div>
              <Eyebrow font={font}>{t.industries.eyebrow}</Eyebrow>
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-light ${heading(
                  "leading-tight",
                  "leading-[1.35]",
                )} ${font}`}
              >
                {t.industries.headingLine1}
                <br />
                {t.industries.headingLine2Before}
                <span className={glowClassesMedium}>
                  {t.industries.headingLine2Bold}
                </span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-4 sm:gap-y-6 content-start">
              {t.industries.items.map((ind) => (
                <span
                  key={ind}
                  className={`text-lg sm:text-xl md:text-2xl text-neutral-300 font-light ${font}`}
                >
                  {ind}
                </span>
              ))}
            </div>
          </section>

          {/* ---------------- OTHER PATHWAYS ---------------- */}
          <section className="pb-16 sm:pb-28 md:pb-40 border-neutral-800 pt-10 sm:pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 sm:gap-16 mb-4">
              <Eyebrow font={font}>{t.otherPathways.eyebrow}</Eyebrow>
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-light ${heading(
                  "leading-tight",
                  "leading-[1.35]",
                )} ${font}`}
              >
                {t.otherPathways.headingBefore}
                <span className={glowClassesMedium}>
                  {t.otherPathways.headingBold}
                </span>
              </h2>
            </div>
            <div>
              {t.otherPathways.items.map((p) => (
                <a
                  key={p.num}
                  href={p.href}
                  className="flex items-center justify-between gap-4 py-6 sm:py-10 border-t border-neutral-800 last:border-b group"
                >
                  <div className="flex items-baseline gap-3 sm:gap-6 md:gap-10 min-w-0">
                    <span
                      className={`text-xs sm:text-sm text-neutral-500 tabular-nums shrink-0 ${font}`}
                    >
                      {p.num}
                    </span>
                    <span
                      className={`text-xl sm:text-3xl md:text-5xl font-light text-neutral-300 group-hover:text-white transition-colors ${
                        dir === "rtl" ? "leading-[1.3]" : ""
                      } break-words ${font}`}
                    >
                      {p.title}
                    </span>
                  </div>
                  <span className="text-xl sm:text-2xl shrink-0 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all">
                    {dir === "rtl" ? "\u2190" : "\u2192"}
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* ---------------- FINAL CTA ---------------- */}
          <section className="pb-20 sm:pb-32 border-t border-neutral-800 pt-10 sm:pt-16">
            <h2
              className={`max-w-full md:max-w-[1200px] ${font} text-[clamp(34px,12vw,130px)] font-light ${heading(
                "leading-[1.05] sm:leading-[0.999]",
                "leading-[1.35]",
              )} tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words`}
            >
              <span className="font-light">{t.closing.headingLine1}</span>
              <span className="font-light">{t.closing.headingLine2}</span>
              <span className="font-light">
                {t.closing.headingLine3Before}
                <span className={glowClasses}>
                  {t.closing.headingLine3Bold}
                </span>
              </span>
            </h2>
            <p
              className={`mt-8 sm:mt-12 max-w-[760px] ${font} text-[17px] sm:text-[20px] md:text-[24px] font-light leading-[1.6] sm:leading-[1.8] tracking-[-0.01em] sm:tracking-[-0.02em] text-white/55`}
            >
              {t.closing.paragraph}
            </p>
            <div className="mt-10 sm:mt-16 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-6 sm:gap-10 md:gap-16">
              <a
                href="/contact"
                className={`group flex items-center gap-4 ${font} text-[11px] sm:text-[13px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white transition-colors`}
              >
                <span>{t.closing.cta1}</span>
                <span
                  className={`${accentLine} group-hover:w-10 transition-all`}
                />
              </a>
              <a
                href="/engagements"
                className={`group flex items-center gap-4 ${font} text-[11px] sm:text-[13px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/50 transition-colors hover:text-white`}
              >
                <span>{t.closing.cta2}</span>
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

export default BrandCreative;
