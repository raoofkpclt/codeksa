import React, { useEffect, useState } from "react";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import { Link } from "react-router-dom";
import Conversation from "../../components/user/Conversation";

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

interface Industry {
  index: string;
  slug: string; // stable, English routing key — independent of the translated title
  title: string;
  description: string;
  showExplore: boolean;
}

interface IndustriesCopy {
  breadcrumb: {
    home: string;
    current: string;
  };
  sectionLabel: string;
  hero: {
    plain: string;
    highlight: string;
    paragraph: string;
  };
  exploreLabel: string;
  industries: Industry[];
  discuss: {
    part1: string;
    part2: string;
    part3: string;
    highlight: string;
    paragraph: string;
    cta: string;
  };
}

const COPY: Record<Language, IndustriesCopy> = {
  en: {
    breadcrumb: {
      home: "Home",
      current: "Industries",
    },
    sectionLabel: "INDUSTRIES",
    hero: {
      plain: "The scope changes. ",
      highlight: "The standard does not.",
      paragraph:
        "CODE adapts its systems to the realities of each market, audience and business model.",
    },
    exploreLabel: "EXPLORE",
    industries: [
      {
        index: "01",
        slug: "automotive",
        title: "Automotive",
        description:
          "For car rentals, dealerships, workshops and automotive service businesses where trust, visibility and response speed shape customer decisions.",
        showExplore: true,
      },
      {
        index: "02",
        slug: "hospitality",
        title: "Hospitality",
        description:
          "For restaurants, cafés, food trucks and hospitality brands competing on memory, experience, convenience and local demand.",
        showExplore: true,
      },
      {
        index: "03",
        slug: "retail",
        title: "Retail",
        description:
          "For retail and commerce businesses requiring clearer brand presence, customer journeys and measurable campaigns.",
        showExplore: false,
      },
      {
        index: "04",
        slug: "professional-services",
        title: "Professional Services",
        description:
          "For service-led businesses where credibility, clarity and trust are central to growth.",
        showExplore: false,
      },
      {
        index: "05",
        slug: "real-estate",
        title: "Real Estate",
        description:
          "For property and real estate businesses requiring stronger positioning, visibility and lead quality.",
        showExplore: false,
      },
      {
        index: "06",
        slug: "healthcare",
        title: "Healthcare",
        description:
          "For healthcare and wellness businesses where clarity, trust and professional presentation matter.",
        showExplore: false,
      },
      {
        index: "07",
        slug: "construction",
        title: "Construction",
        description:
          "For construction and built-environment businesses requiring credibility, visibility and structured business development support.",
        showExplore: false,
      },
      {
        index: "08",
        slug: "industrial",
        title: "Industrial",
        description:
          "For industrial, manufacturing and supplier businesses requiring clearer market positioning and B2B communication.",
        showExplore: false,
      },
      {
        index: "09",
        slug: "growing-businesses",
        title: "Growing Businesses",
        description:
          "For SMEs and startups that need stronger foundations before increasing marketing activity.",
        showExplore: false,
      },
    ],
    discuss: {
      part1: "Discuss how CODE\u2019s ",
      part2: "system applies to ",
      part3: "your",
      highlight: "market.",
      paragraph:
        "Each industry brings a different set of customer expectations, decision drivers and competitive realities. CODE adapts the system accordingly.",
      cta: "DISCUSS YOUR INDUSTRY CONTEXT",
    },
  },

  ar: {
    breadcrumb: {
      home: "الرئيسية",
      current: "القطاعات",
    },
    sectionLabel: "القطاعات",
    hero: {
      plain: "يتغير نطاق العمل. ",
      highlight: "لا يتغير المعيار.",
      paragraph: "تُكيّف CODE أنظمتها وفق واقع كل سوق وجمهور ونموذج عمل.",
    },
    exploreLabel: "استكشف",
    industries: [
      {
        index: "01",
        slug: "automotive",
        title: "قطاع السيارات",
        description:
          "لشركات تأجير السيارات والمعارض والورش وشركات خدمات السيارات حيث تشكّل الثقة والظهور وسرعة الاستجابة قرار العميل.",
        showExplore: true,
      },
      {
        index: "02",
        slug: "hospitality",
        title: "قطاع الضيافة",
        description:
          "للمطاعم والمقاهي وعربات الطعام وعلامات الضيافة التي تتنافس على الذكرى والتجربة والراحة والطلب المحلي.",
        showExplore: true,
      },
      {
        index: "03",
        slug: "retail",
        title: "التجزئة",
        description:
          "لشركات التجزئة والتجارة التي تحتاج إلى حضور علامة أوضح ورحلة عميل وحملات قابلة للقياس.",
        showExplore: false,
      },
      {
        index: "04",
        slug: "professional-services",
        title: "الخدمات المهنية",
        description:
          "للشركات القائمة على الخدمات حيث تُعد المصداقية والوضوح والثقة محورًا أساسيًا للنمو.",
        showExplore: false,
      },
      {
        index: "05",
        slug: "real-estate",
        title: "العقار",
        description:
          "لشركات التطوير والعقار التي تحتاج إلى تموضع أقوى وظهور أوسع وجودة أعلى في العملاء المحتملين.",
        showExplore: false,
      },
      {
        index: "06",
        slug: "healthcare",
        title: "الرعاية الصحية",
        description:
          "لشركات الرعاية الصحية والعافية حيث يشكّل الوضوح والثقة والعرض الاحترافي أهمية بالغة.",
        showExplore: false,
      },
      {
        index: "07",
        slug: "construction",
        title: "المقاولات",
        description:
          "لشركات المقاولات والبيئة العمرانية التي تحتاج إلى مصداقية وظهور ودعم منظم لتطوير الأعمال.",
        showExplore: false,
      },
      {
        index: "08",
        slug: "industrial",
        title: "القطاع الصناعي",
        description:
          "للشركات الصناعية والتصنيعية والموردين الذين يحتاجون إلى تموضع أوضح في السوق وتواصل أقوى بين الشركات.",
        showExplore: false,
      },
      {
        index: "09",
        slug: "growing-businesses",
        title: "الشركات النامية",
        description:
          "للمنشآت الصغيرة والمتوسطة والشركات الناشئة التي تحتاج إلى بنية أقوى قبل زيادة النشاط التسويقي.",
        showExplore: false,
      },
    ],
    discuss: {
      part1: "ناقش كيف تنطبق منظومة CODE على ",
      part2: "",
      part3: "",
      highlight: "قطاعك.",
      paragraph:
        "يحمل كل قطاع مجموعة مختلفة من توقعات العملاء ومحركات القرار وواقع المنافسة. تُكيّف CODE منظومتها وفق ذلك.",
      cta: "ناقش سياق قطاعك",
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

const Industries: React.FC = () => {
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

      {/* Hero */}
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

        <p className="text-xs tracking-[0.3em] text-white/40 mb-5 sm:mb-6">
          {t.sectionLabel}
        </p>

        <h1
          className={`max-w-[1500px] ${fontClass} text-[44px] font-light ${heading(
            "leading-[1] sm:leading-[0.95] md:leading-[0.9]",
            "leading-[1.3]",
          )} tracking-[-0.02em] text-[var(--code-white)] sm:text-[64px] sm:tracking-[-0.04em] md:text-[clamp(72px,10vw,160px)] md:tracking-[-0.06em]`}
        >
          <span className="font-light">{t.hero.plain}</span>

          <span className="font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
            {t.hero.highlight}
          </span>
        </h1>

        <p className="mt-6 sm:mt-8 md:mt-10 max-w-[700px] text-white/50 text-sm leading-relaxed sm:text-base md:text-lg">
          {t.hero.paragraph}
        </p>
      </main>

      {/* Industries grid */}
      <section className="">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3">
          {t.industries.map((industry) => (
            <div
              key={industry.index}
              className="px-5 sm:px-8 md:px-10 lg:px-14 py-12 sm:py-16 md:py-20"
            >
              <span className="text-xs tracking-[0.2em] text-white/40">
                {industry.index}
              </span>

              <h2
                className={`mt-6 mb-4 text-2xl ${heading(
                  "leading-tight",
                  "leading-[1.4]",
                )} font-light sm:mt-8 sm:mb-6 sm:text-3xl md:text-[2.2rem] text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]`}
              >
                {industry.title}
              </h2>

              <p className="text-white/50 leading-relaxed max-w-xs text-[15px] sm:text-base">
                {industry.description}
              </p>

              {industry.showExplore && (
                <Link
                  to={`/${industry.slug}`}
                  className="mt-8 sm:mt-10 inline-flex items-center gap-3 text-[11px] sm:text-xs tracking-[0.2em] text-white/70 transition-colors group hover:text-white"
                >
                  {t.exploreLabel}
                  <span className="w-6 h-px bg-gradient-to-r bg-[#8468FF] transition-all group-hover:w-10" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Discuss your market */}
      <section className="border-t border-white/10 px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-36 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          <h2
            className={`max-w-[1200px] ${fontClass} text-[40px] font-light ${heading(
              "leading-[1.05] sm:leading-[0.95] md:leading-[0.9]",
              "leading-[1.35]",
            )} tracking-[-0.02em] text-[var(--code-white)] sm:text-[64px] sm:tracking-[-0.04em] md:text-[clamp(72px,10vw,130px)] md:tracking-[-0.06em]`}
          >
            <span className="font-light">{t.discuss.part1}</span>
            <span className="font-light">{t.discuss.part2}</span>
            <span className="font-light">
              {t.discuss.part3}{" "}
              <span className="font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
                {t.discuss.highlight}
              </span>
            </span>
          </h2>

          <p className="mt-6 sm:mt-8 md:mt-10 max-w-xl text-white/50 text-sm leading-relaxed sm:text-base md:text-lg">
            {t.discuss.paragraph}
          </p>

          <a
            href="/contact"
            className="mt-8 sm:mt-10 md:mt-14 flex flex-wrap items-center gap-3 text-[11px] sm:text-xs tracking-[0.2em] text-white/70 hover:text-white transition-colors group text-left"
          >
            {t.discuss.cta}
            <span className="w-8 h-px bg-gradient-to-r bg-[#8468FF] group-hover:w-12 transition-all" />
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <Conversation />

      <Footer />
    </div>
  );
};

export default Industries;
