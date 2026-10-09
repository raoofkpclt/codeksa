import React, { useEffect, useState } from "react";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

interface EngagementTier {
  number: string;
  title: string;
  tagline: string;
  bestFor: string;
  addresses: string[];
  mayInclude: string[];
}

interface EngagementCopy {
  breadcrumb: {
    home: string;
    current: string;
  };
  sectionLabel: string;
  hero: {
    line1: string;
    highlight: string;
    paragraph: string;
  };
  columnLabels: {
    bestFor: string;
    addresses: string;
    mayInclude: string;
  };
  tiers: EngagementTier[];
  identify: {
    part1: string;
    part2: string;
    part3: string;
    highlight: string;
    paragraph: string;
  };
}

const COPY: Record<Language, EngagementCopy> = {
  en: {
    breadcrumb: {
      home: "Home",
      current: "Engagement",
    },
    sectionLabel: "ENGAGEMENT",
    hero: {
      line1: "Different levels of engagement.",
      highlight: "One standard.",
      paragraph:
        "Every business requires a different level of strategic support. CODE engagements are scoped around business requirements, not generic packages.",
    },
    columnLabels: {
      bestFor: "BEST FOR",
      addresses: "ADDRESSES",
      mayInclude: "MAY INCLUDE",
    },
    tiers: [
      {
        number: "01",
        title: "CODE Essentials",
        tagline: "One focused requirement. One defined scope.",
        bestFor: "A specific project, deliverable or specialist need.",
        addresses: [
          "One contained requirement",
          "Limited internal specialist capacity",
          "A focused project or deliverable",
        ],
        mayInclude: [
          "One strategy",
          "One campaign",
          "One video",
          "One landing page",
          "One design requirement",
          "One defined creative or digital project",
        ],
      },
      {
        number: "02",
        title: "Foundation",
        tagline: "Build the right structure.",
        bestFor:
          "Businesses establishing or correcting strategic, brand, digital or marketing foundations.",
        addresses: [
          "Unclear priorities",
          "Inconsistent brand or messaging",
          "Reactive marketing",
          "Weak strategic or digital foundations",
        ],
        mayInclude: [
          "Business and marketing diagnostic",
          "Market and audience direction",
          "Brand positioning",
          "Marketing strategy",
          "Website direction",
          "Priority roadmap",
        ],
      },
      {
        number: "03",
        title: "Growth",
        tagline: "Scale with greater direction.",
        bestFor:
          "Businesses ready to expand visibility, activity and performance.",
        addresses: [
          "Need for stronger visibility",
          "Expansion or market entry",
          "Disconnected campaigns and channels",
          "Limited measurement",
        ],
        mayInclude: [
          "Growth plan",
          "Campaigns",
          "Content",
          "Creative",
          "Paid media",
          "SEO",
          "Landing pages",
          "Reporting and optimisation",
        ],
      },
      {
        number: "04",
        title: "Partnership",
        tagline: "An embedded growth and marketing partner.",
        bestFor:
          "Businesses requiring ongoing strategy, coordination and execution.",
        addresses: [
          "Limited internal marketing capacity",
          "Several disconnected suppliers",
          "Need for continuous strategic direction",
          "Need for coordinated execution",
        ],
        mayInclude: [
          "Ongoing strategy",
          "Planning",
          "Campaign coordination",
          "Content and creative",
          "Digital performance",
          "Reporting",
          "Optimisation",
        ],
      },
      {
        number: "05",
        title: "CODE Hub™",
        tagline: "Optional add-on for selected engagements.",
        bestFor: "Speak to a CODE representative to learn more.",
        addresses: ["Available where the engagement requires it."],
        mayInclude: ["Details are shared through a CODE representative."],
      },
    ],
    identify: {
      part1: "Identify the level of ",
      part2: "engagement most useful ",
      part3: "to the",
      highlight: "business.",
      paragraph:
        "Each model is scoped around the business requirement, not a fixed package.",
    },
  },

  ar: {
    breadcrumb: {
      home: "الرئيسية",
      current: "مسارات التعاون",
    },
    sectionLabel: "مسارات التعاون",
    hero: {
      line1: "مستويات مختلفة من التعاقد.",
      highlight: "معيار واحد.",
      paragraph:
        "تحتاج كل شركة إلى مستوى مختلف من الدعم الاستراتيجي. تُحدَّد نماذج التعاقد مع CODE بناءً على متطلبات العمل، وليس وفق باقات عامة جاهزة.",
    },
    columnLabels: {
      bestFor: "الأنسب لـ",
      addresses: "يعالج",
      mayInclude: "قد يشمل",
    },
    tiers: [
      {
        number: "01",
        title: "CODE Essentials",
        tagline: "احتياج واحد مركّز. نطاق واحد محدّد.",
        bestFor: "مشروع أو مخرج أو احتياج تخصصي محدد.",
        addresses: [
          " احتياج واحد محدود",
          "قدرة داخلية محدودة على التخصص",
          "مشروع أو مخرج مركّز",
        ],
        mayInclude: [
          "استراتيجية واحدة",
          "حملة واحدة",
          "فيديو واحد",
          "صفحة هبوط واحدة",
          " احتياج واحد محدود",
          "مشروع إبداعي أو رقمي محدد",
        ],
      },
      {
        number: "02",
        title: "Foundation",
        tagline: "ابنِ البنية الصحيحة.",
        bestFor:
          "منشآت تُرسي أو تصحّح أسسها الاستراتيجية والعلامية والرقمية والتسويقية.",
        addresses: [
          "أولويات غير واضحة",
          " علامة أو رسائل غير متّسقة",
          " تسويق يعتمد على ردود الفعل",
          "أسس استراتيجية أو رقمية ضعيفة",
        ],
        mayInclude: [
          " تشخيص للعمل والتسويق",
          " توجيه للسوق والجمهور",
          "موضع العلامة",
          "استراتيجية التسويق",
          "توجيه الموقع الإلكتروني",
          " خريطة أولويات",
        ],
      },
      {
        number: "03",
        title: "Growth",
        tagline: "توسّع بتوجيه أكبر.",
        bestFor: "توسّع بتوجيه أكبر.",
        addresses: [
          "الحاجة إلى ظهور أقوى",
          " التوسّع أو دخول أسواق جديدة",
          "حملات وقنوات غير مترابطة",
          "قياس محدود",
        ],
        mayInclude: [
          "خطة نمو",
          "حملات",
          "محتوى",
          " إبداع",
          "إعلانات مدفوعة",
          "تحسين محركات البحث",
          "صفحات هبوط",
          "تقارير وتحسين",
        ],
      },
      {
        number: "04",
        title: "Partnership",
        tagline: "شريك نمو وتسويق ملحق بمنشأتك.",
        bestFor: "منشآت تحتاج استراتيجية وتنسيقًا وتنفيذًا مستمرين.",
        addresses: [
          "قدرة تسويقية داخلية محدودة",
          "عدة موردين غير مترابطين",
          "الحاجة إلى اتجاه استراتيجي مستمر",
          "الحاجة إلى تنفيذ منسق",
        ],
        mayInclude: [
          "استراتيجية مستمرة",
          "التخطيط",
          "تنسيق الحملات",
          " المحتوى والإبداع",
          "الأداء الرقمي",
          "التقارير",
          "التحسين",
        ],
      },
      {
        number: "05",
        title: "CODE Hub™",
        tagline: "إضافة اختيارية لمشاريع محددة.",
        bestFor: "تواصل مع أحد ممثلي CODE لمعرفة المزيد.",
        addresses: [" متاحة حيثما يتطلبها المشروع."],
        mayInclude: ["تُشارك التفاصيل عبر أحد ممثلي CODE."],
      },
    ],
    identify: {
      part1: "حدد مستوى ",
      part2: "التعاون الأنسب ",
      part3: " ",
      highlight: "لعملك.",
      paragraph: "كل مسار مصمّم حول احتياج العمل، لا حزمة ثابتة.",
    },
  },
};

const getInitialLanguage = (): "en" | "ar" => {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem("code-language");

  return saved === "ar" ? "ar" : "en";
};

const Engagement: React.FC = () => {
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
  const dash = dir === "rtl" ? "— " : "— ";

  return (
    <div
      dir={dir}
      lang={language}
      className={`min-h-screen bg-black text-white overflow-x-hidden ${fontClass}`}
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

      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 pt-[110px] sm:pt-[140px] md:pt-[168px] pb-16 sm:pb-24 md:pb-32 md:px-16">
        {/* Hero */}

        <div
          className={`mb-6 sm:mb-10 flex items-center gap-3 ${fontClass} text-[10px] sm:text-[11px] tracking-[0.24em] text-[var(--slate-muted)] flex-wrap`}
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

        <p className="text-xs tracking-[0.3em] text-white/50 mb-6 sm:mb-10">
          {t.sectionLabel}
        </p>
        <h1
          className={`max-w-[1100px] ${fontClass} text-[clamp(40px,10vw,160px)] font-light ${heading(
            "leading-[0.95] sm:leading-[0.9]",
            "leading-[1.3]",
          )} tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)]`}
        >
          <span className="font-light">{t.hero.line1}</span>
          <br />
          <span className="font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
            {t.hero.highlight}
          </span>
        </h1>
        <p className="mt-6 sm:mt-10 text-base sm:text-lg md:text-xl text-white/60 max-w-2xl">
          {t.hero.paragraph}
        </p>
      </main>

      {/* Tiers */}
      <section>
        {t.tiers.map((tier, i) => (
          <div
            key={tier.number}
            className={`px-4 sm:px-6 md:px-16 py-12 sm:py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 ${
              i !== t.tiers.length - 1 ? "border-b border-white/10" : ""
            }`}
          >
            <div>
              <p className="text-xs tracking-[0.3em] text-white/40 mb-4 sm:mb-6">
                {tier.number}
              </p>
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white transition-all duration-500 ease-out hover:text-[#8468FF] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)] ${
                  dir === "rtl" ? "leading-[1.3]" : ""
                }`}
              >
                {tier.title}
              </h2>
              <p className="text-white/60 mb-6 sm:mb-10">{tier.tagline}</p>

              <p className="text-xs tracking-[0.3em] text-white/40 mb-3">
                {t.columnLabels.bestFor}
              </p>
              <p className="text-white/60 max-w-sm">{tier.bestFor}</p>
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] text-white/40 mb-4 sm:mb-6">
                {t.columnLabels.addresses}
              </p>
              <ul className="space-y-3">
                {tier.addresses.map((item) => (
                  <li key={item} className="text-white/80 break-words">
                    {dash}
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] text-white/40 mb-4 sm:mb-6">
                {t.columnLabels.mayInclude}
              </p>
              <ul className="space-y-3">
                {tier.mayInclude.map((item) => (
                  <li key={item} className="text-white/80 break-words">
                    {dash}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Identify the level statement */}
      <section className="px-4 sm:px-6 md:px-16 py-16 sm:py-24 md:py-32 border-b border-white/10">
        <h2
          className={`max-w-[1200px] ${fontClass} text-[clamp(36px,10vw,130px)] font-light ${heading(
            "leading-[1.05] sm:leading-[0.999]",
            "leading-[1.35]",
          )} tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)]`}
        >
          <span className="font-light">{t.identify.part1}</span>
          <span className="font-light">{t.identify.part2}</span>
          <span className="font-light">
            {t.identify.part3}{" "}
            <span className="font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
              {" "}
              {t.identify.highlight}
            </span>
          </span>
        </h2>
        <p className="mt-6 sm:mt-10 text-base sm:text-lg md:text-xl text-white/60 max-w-2xl">
          {t.identify.paragraph}
        </p>
      </section>

      {/* CTA */}
      <Conversation />

      <Footer />
    </div>
  );
};

export default Engagement;
