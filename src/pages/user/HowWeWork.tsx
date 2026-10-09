import React, { useEffect, useState } from "react";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

interface Step {
  index: string;
  title: string;
  body: string;
}

interface HowWeWorkCopy {
  breadcrumb: {
    home: string;
    current: string;
  };
  sectionLabel: string;
  hero: {
    line1: string;
    line2: string;
    paragraph: string;
  };
  stepLabel: string;
  steps: Step[];
  includes: {
    label: string;
    headingPlain: string;
    headingHighlight: string;
    items: string[];
  };
  closing: {
    headingPart1: string;
    headingPart2: string;
    headingHighlight: string;
    paragraph: string;
    ctaLabel: string;
  };
}

const COPY: Record<Language, HowWeWorkCopy> = {
  en: {
    breadcrumb: {
      home: "Home",
      current: "How We Work",
    },
    sectionLabel: "How We Work",
    hero: {
      line1: "Clarity before",
      line2: "execution.",
      paragraph:
        "CODE begins with the business requirement before recommending channels, deliverables or activity. The process is designed to reduce ambiguity, protect quality and connect every engagement to a clear outcome.",
    },
    stepLabel: "Step",
    steps: [
      {
        index: "01",
        title: "Decode",
        body: "We clarify the business challenge, current context, audience, market position, constraints and desired outcome.",
      },
      {
        index: "02",
        title: "Architect",
        body: "We define the structure required: strategy, scope, pathway, responsibilities, deliverables, timing, measurement and specialist capability.",
      },
      {
        index: "03",
        title: "Deploy",
        body: "We coordinate the right strategic, creative, digital and operational work according to the approved scope.",
      },
      {
        index: "04",
        title: "Optimise",
        body: "We review what is working, what is unclear and what should improve next.",
      },
    ],
    includes: {
      label: "What Every Engagement Includes",
      headingPlain: "Common ground across every",
      headingHighlight: "CODE engagement.",
      items: [
        "Named CODE contact",
        "Defined scope",
        "Confirmed responsibilities",
        "Agreed milestones",
        "Clear delivery standards",
        "Structured communication",
        "A regular strategic review rhythm",
      ],
    },
    closing: {
      headingPart1: "Define the right structure",
      headingPart2: "before execution",
      headingHighlight: "begins.",
      paragraph:
        "Every CODE engagement opens with a short conversation to clarify the requirement, the outcome and the right structure to support it.",
      ctaLabel: "Discuss Your Business",
    },
  },

  ar: {
    breadcrumb: {
      home: "الرئيسية",
      current: "كيف نعمل",
    },
    sectionLabel: "كيف نعمل",
    hero: {
      line1: "الوضوح قبل",
      line2: "التنفيذ.",
      paragraph:
        "تبدأ CODE من احتياج العمل قبل التوصية بأي قنوات أو مخرجات أو نشاط. صُمّمت المنهجية لتقليل الغموض، وحماية الجودة، وربط كل مشروع بنتيجة واضحة.",
    },
    stepLabel: "خطوة",
    steps: [
      {
        index: "01",
        title: "الفهم",
        body: "نوضح التحدي التجاري، والسياق الحالي، والجمهور، والموقع في السوق، والقيود، والنتيجة المرجوة.",
      },
      {
        index: "02",
        title: "البناء",
        body: "نحدد الهيكل المطلوب: الاستراتيجية، والنطاق، والمسار، والمسؤوليات، والمخرجات، والتوقيت، والقياس، والقدرات المتخصصة.",
      },
      {
        index: "03",
        title: "التنفيذ",
        body: "ننسق العمل الاستراتيجي والإبداعي والرقمي والتشغيلي المناسب وفقًا للنطاق المعتمد.",
      },
      {
        index: "04",
        title: "التحسين",
        body: "نراجع ما ينجح، وما يحتاج إلى وضوح أكبر، وما ينبغي تحسينه لاحقًا.",
      },
    ],
    includes: {
      label: "ما يتضمنه كل تعاقد",
      headingPlain: "أرضية مشتركة في كل",
      headingHighlight: "تعاقد مع CODE.",
      items: [
        "جهة اتصال محددة من CODE",
        "نطاق محدد",
        "مسؤوليات مؤكدة",
        "محطات متفق عليها",
        "معايير تسليم واضحة",
        "تواصل منظم",
        "إيقاع مراجعة استراتيجية منتظم",
      ],
    },
    closing: {
      headingPart1: "حدّد البنية الصحيحة قبل أن",
      headingPart2: " ",
      headingHighlight: "يبدأ التنفيذ.",
      paragraph:
        "يبدأ كل مشروع مع CODE بمحادثة قصيرة لتوضيح الاحتياج والنتيجة والبنية المناسبة لدعمها.",
      ctaLabel: "ناقش عملك",
    },
  },
};

/* Split into a 4/3 two-column layout, alternating left/right — matches
   the live preview (left: 1,3,5,7 · right: 2,4,6). */
const splitIncludes = (items: string[]) => ({
  left: items.filter((_, i) => i % 2 === 0),
  right: items.filter((_, i) => i % 2 === 1),
});

const DiagonalDivider = () => (
  <div className="relative border-t border-[var(--steel)]">
    <svg
      className="pointer-events-none absolute -top-px left-0 h-full w-full overflow-visible"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1="8%"
        y1="0"
        x2="38%"
        y2="100%"
        stroke="var(--code-electric)"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
    </svg>
  </div>
);

interface ExploreLinkProps {
  label: string;
  href: string;
  fontClass: string;
}

const ExploreLink: React.FC<ExploreLinkProps> = ({
  label,
  href,
  fontClass,
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

const getInitialLanguage = (): "en" | "ar" => {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem("code-language");

  return saved === "ar" ? "ar" : "en";
};

const HowWeWork = () => {
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
  const { left: includesLeft, right: includesRight } = splitIncludes(
    t.includes.items,
  );

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
      `}</style>

      <NavbarNew />

      <main className="mx-auto max-w-[1440px] px-5 pt-24 pb-20 sm:px-6 sm:pt-28 sm:pb-24 md:px-16 md:pt-32 md:pb-32 lg:pt-[168px]">
        {/* Breadcrumb */}
        <div
          className={`mb-6 sm:mb-8 md:mb-10 flex flex-wrap items-center gap-3 ${fontClass} text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.24em] text-[var(--slate-muted)]`}
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
          className={`mb-5 sm:mb-6 md:mb-8 block ${fontClass} text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.30em] text-[var(--slate-muted)]`}
        >
          {t.sectionLabel}
        </span>

        <h1
          className={`max-w-[1100px] ${fontClass} text-[44px] font-light ${heading(
            "leading-[1] sm:leading-[0.95] md:leading-[0.9]",
            "leading-[1.3]",
          )} tracking-[-0.02em] sm:text-[64px] sm:tracking-[-0.04em] md:text-[clamp(72px,10vw,160px)] md:tracking-[-0.06em]`}
        >
          <span className="font-light text-[var(--code-white)]">
            {t.hero.line1}
          </span>
          <br />
          <span className="font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
            {t.hero.line2}
          </span>
        </h1>

        <p
          className={`mt-6 sm:mt-8 md:mt-10 max-w-[680px] ${fontClass} text-[15px] leading-[1.6] text-[var(--mist)] sm:text-[16px] md:text-[17px]`}
        >
          {t.hero.paragraph}
        </p>

        {/* Steps */}
        <div className="mt-14 sm:mt-16 md:mt-24">
          {t.steps.map((step, i) => (
            <React.Fragment key={step.index}>
              {i > 0 && <DiagonalDivider />}
              <div className="py-12 sm:py-16 md:py-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 sm:gap-8 md:gap-16">
                {/* Left Side */}
                <div>
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`${fontClass} text-[12px] sm:text-[13px] tracking-[0.2em] text-[var(--slate-muted)]`}
                    >
                      {step.index}
                    </span>

                    <span
                      className={`${fontClass} text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.30em] text-[var(--code-purple)]`}
                    >
                      {t.stepLabel}
                    </span>
                  </div>
                </div>

                {/* Right Side */}
                <div>
                  <h2
                    className={`${fontClass} text-[40px] font-light ${heading(
                      "leading-[1] sm:leading-[0.95] md:leading-[0.9]",
                      "leading-[1.3]",
                    )} tracking-[-0.02em] text-[var(--code-white)] sm:text-[56px] sm:tracking-[-0.04em] md:text-[clamp(64px,8vw,120px)] md:tracking-[-0.06em] text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]`}
                  >
                    {step.title}
                  </h2>

                  <p
                    className={`mt-5 sm:mt-6 md:mt-8 max-w-[720px] ${fontClass} text-[15px] leading-[1.6] text-[var(--mist)] sm:text-[16px] sm:leading-[1.65] md:text-[18px] md:leading-[1.7]`}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* What every engagement includes */}
        <div className="border-t border-[var(--steel)] pt-12 sm:pt-16 md:pt-24">
          <span
            className={`mb-5 sm:mb-6 md:mb-8 block ${fontClass} text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.30em] text-[var(--slate-muted)]`}
          >
            {t.includes.label}
          </span>

          <div className="flex justify-end items-end ">
            <h2
              className={`max-w-[900px] ${fontClass} text-[28px] font-light ${heading(
                "leading-[1.2]",
                "leading-[1.45]",
              )} tracking-[-0.02em] text-[var(--code-white)] sm:text-[36px] sm:tracking-[-0.03em] md:text-[clamp(30px,4.5vw,52px)] md:tracking-[-0.04em]`}
            >
              <span className="font-light">{t.includes.headingPlain}</span>{" "}
              <span className="font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
                {t.includes.headingHighlight}
              </span>
            </h2>
          </div>

          <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 gap-0 md:grid-cols-2">
            {[includesLeft, includesRight].map((list, index) => (
              <div key={index} className="flex flex-col gap-0">
                {list.map((item) => (
                  <div
                    key={item}
                    className="group px-5 py-5 transition-all duration-300 sm:px-6 sm:py-6 md:px-8 md:py-7"
                  >
                    <span
                      className={`${fontClass} text-[17px] font-normal ${heading(
                        "leading-[1.3]",
                        "leading-[1.5]",
                      )} text-[var(--mist)] transition-colors group-hover:text-white sm:text-[19px] md:text-[22px]`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-16 border-t border-[var(--steel)] pt-12 sm:mt-20 sm:pt-16 md:mt-32 md:pt-24">
          <h2
            className={`max-w-[1400px] ${fontClass} text-[40px] font-light ${heading(
              "leading-[1.05] sm:leading-[0.95] md:leading-[0.9]",
              "leading-[1.35]",
            )} tracking-[-0.02em] text-[var(--code-white)] sm:text-[64px] sm:tracking-[-0.04em] md:text-[clamp(72px,10vw,130px)] md:tracking-[-0.06em]`}
          >
            <span className="font-light">{t.closing.headingPart1} </span>
            <span className="font-light">
              {t.closing.headingPart2}{" "}
              <span className="font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
                {t.closing.headingHighlight}
              </span>
            </span>
          </h2>
          <p
            className={`mt-6 sm:mt-8 max-w-[620px] ${fontClass} text-[14px] leading-[1.6] text-[var(--mist)] sm:text-[16px]`}
          >
            {t.closing.paragraph}
          </p>

          <div className="mt-8 sm:mt-10 md:mt-12">
            <ExploreLink
              label={t.closing.ctaLabel}
              href="/contact"
              fontClass={fontClass}
            />
          </div>
        </div>
      </main>
      <Conversation />

      <Footer />
    </div>
  );
};

export default HowWeWork;
