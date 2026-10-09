import React, { useEffect, useState } from "react";
import NavbarNew from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";



type Language = "en" | "ar";

interface Principle {
  index: string;
  text: string;
}

interface HeadingSpan {
  text: string;
  bold?: boolean;
}

interface AboutCopy {
  breadcrumb: { home: string; current: string };
  hero: {
    eyebrow: string;
    heading: HeadingSpan[]; // rendered inline, last bold span glows
    paragraph: string;
  };
  whyExists: {
    eyebrow: string;
    heading: HeadingSpan[];
    paragraphs: string[];
    closing: string;
  };
  whatIs: {
    eyebrow: string;
    heading: HeadingSpan[];
    paragraphs: string[];
  };
  howWorks: {
    eyebrow: string;
    heading: HeadingSpan[];
    paragraphs: string[];
  };
  principles: {
    eyebrow: string;
    items: Principle[];
  };
  exploreWhatWeSolve: string;
  exploreStructure: {
    heading: HeadingSpan[];
    paragraph: string;
    startConversation: string;
  };
}

const COPY: Record<Language, AboutCopy> = {
  en: {
    breadcrumb: { home: "Home", current: "About" },
    hero: {
      eyebrow: "About Code",
      heading: [
        { text: "Built for structured " },
        { text: "growth.", bold: true },
      ],
      paragraph:
        "CODE is a Business Growth & Marketing Operations company headquartered in Jeddah, Saudi Arabia. We help businesses move beyond disconnected activity by connecting strategy, brand, digital presence, marketing operations, creative execution and measurement into structured systems for sustainable growth.",
    },
    whyExists: {
      eyebrow: "Why Code Exists",
      heading: [
        { text: "Most businesses do " },
        { text: "not lack activity. " },
        { text: "They lack connection.", bold: true },
      ],
      paragraphs: [
        "A campaign may be active without being aligned.",
        "A brand may be visible without being understood.",
        "A website may exist without supporting the customer journey.",
        "A marketing team may work hard without operating from a clear system.",
      ],
      closing: "CODE exists to bring these parts together.",
    },
    whatIs: {
      eyebrow: "What Code Is",
      heading: [
        { text: "A strategic business " },
        { text: "partner, not a service " },
        { text: "list.", bold: true },
      ],
      paragraphs: [
        "CODE is not positioned as a social media agency, design studio, production house, branding agency, website company or media-buying agency.",
        "Those are capabilities.",
        "They are not the identity of CODE.",
        "CODE works at the intersection of business understanding, marketing systems, creative execution and measurable performance.",
      ],
    },
    howWorks: {
      eyebrow: "How Code Works",
      heading: [
        { text: "Founder-led. " },
        { text: "Specialist-enabled. " },
        { text: "System-driven.", bold: true },
      ],
      paragraphs: [
        "CODE combines strategic direction, structured delivery and selected specialist capability according to each engagement.",
        "The model allows CODE to remain focused, flexible and quality-controlled while building the right structure around each business requirement.",
      ],
    },
    principles: {
      eyebrow: "Principles",
      items: [
        { index: "01", text: "Structure before decoration." },
        { index: "02", text: "Clarity before complexity." },
        { index: "03", text: "Outcomes before activity." },
        { index: "04", text: "Intelligence before assumption." },
        { index: "05", text: "Consistency before volume." },
        { index: "06", text: "Premium is quiet." },
      ],
    },
    exploreWhatWeSolve: "Explore What We Solve",
    exploreStructure: {
      heading: [
        { text: "Explore the " },
        { text: "structure behind " },
        { text: "CODE's " },
        { text: "work.", bold: true },
      ],
      paragraph:
        "Every engagement begins with clarifying the business requirement, the required outcome and the right place to begin.",
      startConversation: "Start a Conversation",
    },
  },

  ar: {
    breadcrumb: { home: "الرئيسية", current: "عن CODE" },
    hero: {
      eyebrow: "عن CODE",
      heading: [{ text: "مبنيّة من أجل نمو " }, { text: "منظّم.", bold: true }],
      paragraph:
        "CODE شركة نمو أعمال وتشغيل تسويق مقرّها جدة، المملكة العربية السعودية. نساعد المنشآت على تجاوز النشاط المتفرّق عبر ربط الاستراتيجية والعلامة والحضور الرقمي وتشغيل التسويق والتنفيذ الإبداعي والقياس ضمن أنظمة واضحة لنمو مستدام.",
    },
    whyExists: {
      eyebrow: "لماذا توجد CODE",
      heading: [
        { text: "معظم المنشآت لا تفتقر إلى النشاط. " },
        { text: "" },
        { text: "بل تفتقر إلى الترابط.", bold: true },
      ],
      paragraphs: [
        "قد تكون الحملة نشطة دون أن تكون متّسقة.",
        "قد تكون العلامة ظاهرة دون أن تكون مفهومة.",
        "قد يوجد موقع إلكتروني دون أن يدعم رحلة العميل.",
        "قد يعمل فريق التسويق بجهد دون أن يعمل وفق نظام واضح.",
      ],
      closing: "وُجدت CODE لتجمع هذه الأجزاء معًا.",
    },
    whatIs: {
      eyebrow: "ما هي CODE",
      heading: [
        { text: "شريك أعمال استراتيجي، لا مجرد قائمة " },
        { text: "" },
        { text: " خدمات.", bold: true },
      ],
      paragraphs: [
        "لا تُعرّف CODE كوكالة وسائل تواصل اجتماعي، أو استوديو تصميم، أو بيت إنتاج، أو وكالة هوية، أو شركة مواقع، أو وكالة شراء إعلاني.",
        "هذه قدرات.",
        "وليست هوية CODE.",
        "تعمل CODE عند تقاطع فهم الأعمال، وأنظمة التسويق، والتنفيذ الإبداعي، والأداء القابل للقياس.",
      ],
    },
    howWorks: {
      eyebrow: "كيف تعمل CODE",
      heading: [
        { text: "بقيادة المؤسسين، وبدعم متخصصين. " },
        { text: "" },
        { text: "ونظام واضح.", bold: true },
      ],
      paragraphs: [
        "تجمع CODE بين التوجيه الاستراتيجي، والتنفيذ المنظّم، وقدرات متخصصة مختارة بحسب كل مشروع.",
        "يتيح هذا النموذج لـCODE أن تبقى مركّزة ومرنة وعالية الجودة مع بناء الهيكل المناسب لكل احتياج عمل.",
      ],
    },
    principles: {
      eyebrow: "المبادئ",
      items: [
        { index: "01", text: "الهيكل قبل الزخرفة." },
        { index: "02", text: "الوضوح قبل التعقيد." },
        { index: "03", text: "النتائج قبل النشاط." },
        { index: "04", text: "الفهم العميق قبل الافتراض." },
        { index: "05", text: "الاتساق قبل الكمّ." },
        { index: "06", text: "التميّز الحقيقي هادئ." },
      ],
    },
    exploreWhatWeSolve: "استكشف خدماتنا",
    exploreStructure: {
      heading: [
        { text: "تعرّف على البنية التي يقوم عليها عمل " },
        { text: "" },
        { text: "" },
        { text: "CODE.", bold: true },
      ],
      paragraph:
        "يبدأ كل مشروع بتوضيح احتياج العمل، والنتيجة المطلوبة، ونقطة البداية الصحيحة.",
      startConversation: "ابدأ محادثة",
    },
  },
};

const glowClasses =
  "font-bold text-white transition-all duration-500 ease-out hover:text-[#8468FF] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]";

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

const ExploreLink = ({
  label,
  href,
  font,
}: {
  label: string;
  href: string;
  font: string;
}) => (
  <a
    href={href}
    className={`group inline-flex items-center gap-3 sm:gap-4 ${font} text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.28em] !text-white hover:!text-white focus:!text-white active:!text-white transition-all duration-300 ease-out`}
  >
    <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
      {label}
    </span>

    <span className="h-px w-8 sm:w-10 bg-[#8468FF] transition-all duration-300 ease-out group-hover:w-14 sm:group-hover:w-16" />
  </a>
);

const Eyebrow = ({
  children,
  font,
}: {
  children: React.ReactNode;
  font: string;
}) => (
  <span
    className={`mb-4 sm:mb-5 md:mb-8 block ${font} text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.30em] text-[var(--slate-muted)]`}
  >
    {children}
  </span>
);

const getInitialLanguage = (): "en" | "ar" => {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem("code-language");

  return saved === "ar" ? "ar" : "en";
};

const About = () => {
  const [language, setLanguage] = useState<"en" | "ar">(getInitialLanguage);
  const dir = language === "ar" ? "rtl" : "ltr";
  const font =
    language === "ar"
      ? "font-['Alexandria',sans-serif]"
      : "font-['Space_Grotesk',sans-serif]";

  // Returns the English leading class when LTR, the Arabic one when RTL.
  // Arabic display type needs noticeably looser line-height than the tight
  // Latin values, or ascenders/descenders from adjacent lines touch.
  const heading = (enLeading: string, arLeading: string) =>
    dir === "rtl" ? arLeading : enLeading;

  // useEffect(() => {
  //   const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  //   if (saved === "en" || saved === "ar") setLanguage(saved);

  //   const handler = (e: Event) => {
  //     const detail = (e as CustomEvent<Language>).detail;
  //     if (detail === "en" || detail === "ar") setLanguage(detail);
  //   };
  //   window.addEventListener(LANGUAGE_EVENT, handler);
  //   return () => window.removeEventListener(LANGUAGE_EVENT, handler);
  // }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<"en" | "ar">).detail;

      if (detail === "en" || detail === "ar") {
        setLanguage(detail);
      }
    };

    window.addEventListener("code-language-change", handler);

    return () => {
      window.removeEventListener("code-language-change", handler);
    };
  }, []);

  const t = COPY[language];

  return (
    <div
      dir={dir}
      lang={language}
      className={`min-h-screen bg-black text-[var(--mist)] overflow-x-hidden ${font}`}
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

      <main className="mx-auto max-w-[1440px] px-5 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 md:px-16 md:pt-32 md:pb-32 lg:pt-[168px]">
        {/* Breadcrumb */}
        <div
          className={`mb-5 sm:mb-6 md:mb-10 flex flex-wrap items-center gap-3 ${font} text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.24em] text-[var(--slate-muted)]`}
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

        {/* Hero */}
        <Eyebrow font={font}>{t.hero.eyebrow}</Eyebrow>
       ```tsx
<h1
  className={`max-w-[2000px] ${font} text-[clamp(44px,11vw,180px)] font-light ${heading(
    "leading-[1.25] sm:leading-[1.3] md:leading-[1.15]",
    "leading-[1.5]",
  )} tracking-[-0.02em] sm:tracking-[-0.05em] md:tracking-[-0.08em] text-[var(--code-white)]`}
>
  <RenderHeading spans={t.hero.heading} />
</h1>
        <p
          className={`mt-5 sm:mt-6 md:mt-10 max-w-[620px] ${font} text-[15px] leading-[1.6] text-[var(--mist)] sm:text-[16px] md:text-[17px]`}
        >
          {t.hero.paragraph}
        </p>

        {/* Why CODE exists */}
        <div className="mt-10 sm:mt-12 md:mt-20 border-t border-[var(--steel)] py-10 sm:py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 sm:gap-8 lg:gap-24">
            {/* Left (Empty) */}
            <div className="flex">
              <Eyebrow font={font}>{t.whyExists.eyebrow}</Eyebrow>
            </div>

            {/* Right */}
            <div className="max-w-[900px]">
              <h2
                className={`${font} text-[clamp(32px,10vw,72px)] font-light ${heading(
                  "leading-[1] sm:leading-[0.95] md:leading-[0.9]",
                  "leading-[1.35]",
                )} tracking-[-0.02em] sm:tracking-[-0.04em] md:tracking-[-0.06em] text-[var(--code-white)]`}
              >
                <RenderHeading spans={t.whyExists.heading} />
              </h2>

              <div
                className={`mt-6 sm:mt-8 md:mt-12 max-w-[680px] space-y-4 sm:space-y-6 ${font} text-[15px] leading-[1.55] text-[var(--mist)] sm:text-[16px] md:text-[18px] md:leading-[1.5]`}
              >
                {t.whyExists.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <p className="text-[var(--code-white)] font-medium">
                  {t.whyExists.closing}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What CODE is */}
        <div className="border-t border-[var(--steel)] py-10 sm:py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 sm:gap-8 lg:gap-24">
            {/* Left */}
            <div className="flex">
              <Eyebrow font={font}>{t.whatIs.eyebrow}</Eyebrow>
            </div>

            {/* Right */}
            <div className="max-w-[900px]">
              <h2
                className={`${font} text-[clamp(32px,10vw,72px)] font-light ${heading(
                  "leading-[1.02] sm:leading-[1] md:leading-[0.999]",
                  "leading-[1.35]",
                )} tracking-[-0.02em] sm:tracking-[-0.04em] md:tracking-[-0.06em] text-[var(--code-white)]`}
              >
                <RenderHeading spans={t.whatIs.heading} />
              </h2>

              <div
                className={`mt-6 sm:mt-8 md:mt-12 max-w-[680px] space-y-4 sm:space-y-6 ${font} text-[15px] leading-[1.55] text-[var(--mist)] sm:text-[16px] md:text-[18px] md:leading-[1.5]`}
              >
                {t.whatIs.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How CODE works */}
        <div className="border-t border-[var(--steel)] py-10 sm:py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 sm:gap-8 lg:gap-24">
            {/* Left */}
            <div className="flex">
              <Eyebrow font={font}>{t.howWorks.eyebrow}</Eyebrow>
            </div>

            {/* Right */}
            <div className="max-w-[900px]">
              <h2
                className={`${font} text-[clamp(32px,10vw,72px)] font-light ${heading(
                  "leading-[1] sm:leading-[0.95] md:leading-[0.9]",
                  "leading-[1.35]",
                )} tracking-[-0.02em] sm:tracking-[-0.04em] md:tracking-[-0.06em] text-[var(--code-white)]`}
              >
                <RenderHeading spans={t.howWorks.heading} />
              </h2>

              <div
                className={`mt-6 sm:mt-8 md:mt-12 max-w-[680px] space-y-4 sm:space-y-6 ${font} text-[15px] leading-[1.55] text-[var(--mist)] sm:text-[16px] md:text-[18px] md:leading-[1.5]`}
              >
                {t.howWorks.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="border-t border-[var(--steel)] py-10 sm:py-12 md:py-24">
          <Eyebrow font={font}>{t.principles.eyebrow}</Eyebrow>
          <div>
            {t.principles.items.map((p) => (
              <div
                key={p.index}
                className="flex items-baseline gap-4 sm:gap-6 md:gap-8 border-t border-[var(--steel)] py-6 first:border-t-0 sm:py-8 md:py-14"
              >
                <span
                  className={`shrink-0 ${font} text-[12px] sm:text-[13px] tracking-[0.2em] text-[var(--slate-muted)]`}
                >
                  {p.index}
                </span>
                <p
                  className={`min-w-0 flex-1 ${font} text-[clamp(22px,3.5vw,44px)] font-light ${heading(
                    "leading-[1.15]",
                    "leading-[1.5]",
                  )} text-[var(--mist)]`}
                >
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Explore what we solve — divider link */}
        <div className=" border-[var(--steel)] py-8 sm:py-10 md:py-20">
          <ExploreLink
            label={t.exploreWhatWeSolve}
            href="/what-we-solve"
            font={font}
          />
        </div>

        {/* Explore the structure */}
        <div className="border-[var(--steel)] pt-10 sm:pt-12 md:pt-24">
          <h2
            className={`max-w-[1500px] ${font} text-[clamp(36px,10vw,120px)] font-light ${heading(
              "leading-[1.05] sm:leading-[1] md:leading-[0.999]",
              "leading-[1.35]",
            )} tracking-[-0.02em] sm:tracking-[-0.04em] md:tracking-[-0.06em] text-[var(--code-white)]`}
          >
            <RenderHeading spans={t.exploreStructure.heading} />
          </h2>
          <p
            className={`mt-6 sm:mt-8 max-w-[560px] ${font} text-[14px] leading-[1.6] text-[var(--mist)] sm:text-[16px]`}
          >
            {t.exploreStructure.paragraph}
          </p>
          <div className="mt-6 sm:mt-8 md:mt-10">
            <ExploreLink
              label={t.exploreStructure.startConversation}
              href="/contact"
              font={font}
            />
          </div>
        </div>
      </main>

      <Conversation />

      <Footer />
    </div>
  );
};

export default About;
