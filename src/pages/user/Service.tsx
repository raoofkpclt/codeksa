import React, { useEffect, useRef, useState } from "react";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

interface ServiceItem {
  index: string;
  category: string;
  body: string;
  left: string[];
  right: string[];
}

interface ServiceCopy {
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
  services: ServiceItem[];
  closing: {
    plain: string;
    highlight: string;
    paragraph: string;
    ctaLabel: string;
  };
}

const COPY: Record<Language, ServiceCopy> = {
  en: {
    breadcrumb: {
      home: "Home",
      current: "Services",
    },
    sectionLabel: "Services",
    hero: {
      plain: "Capabilities connected by ",
      highlight: "one system.",
      paragraph:
        "CODE services are not isolated outputs. They are capabilities connected around business direction, brand clarity, digital performance and operational structure.",
    },
    services: [
      {
        index: "01",
        category: "Strategy",
        body: "Strategic direction for businesses that need clearer growth priorities, market understanding and a practical route forward.",
        left: [
          "Marketing Strategy",
          "Market & Competitive Research",
          "Campaign Strategy",
        ],
        right: ["Business Growth Strategy", "Go-to-Market Planning"],
      },
      {
        index: "02",
        category: "Brand",
        body: "Brand systems that help businesses become easier to understand, recognise, trust and remember.",
        left: ["Brand Strategy", "Brand Identity", "Brand Guidelines"],
        right: ["Brand Positioning", "Verbal Identity", "Campaign Creative"],
      },
      {
        index: "03",
        category: "Digital",
        body: "Digital presence built around customer journeys, visibility, measurement and business outcomes.",
        left: [
          "Website Strategy",
          "Search Engine Optimisation",
          "Google Business Profile",
          "Landing Pages",
        ],
        right: [
          "Website Design & Development",
          "Local Search",
          "Paid Media",
          "Analytics",
        ],
      },
      {
        index: "04",
        category: "Marketing Operations",
        body: "The structure required to plan, coordinate, publish, measure and improve marketing activity.",
        left: [
          "Social Media Management",
          "Campaign Planning",
          "CRM & Customer Journey Integration",
        ],
        right: [
          "Content Planning",
          "Marketing Automation",
          "Performance Review & Optimisation",
        ],
      },
      {
        index: "05",
        category: "Content & Production",
        body: "Purposeful creative and production assets developed to support brand communication, campaigns and platform-specific execution.",
        left: ["Content Creative", "Videography", "Short-form Video"],
        right: ["Photography", "Motion Graphics", "Campaign Assets"],
      },
      {
        index: "06",
        category: "CODE Hub™",
        body: "An add-on for selected engagements. Speak to a CODE representative to learn more.",
        left: [],
        right: [],
      },
    ],
    closing: {
      plain: "Start with the business ",
      highlight: "requirement.",
      paragraph:
        "The right service depends on the challenge, the required outcome and the structure already in place.",
      ctaLabel: "Start a Conversation",
    },
  },

  ar: {
    breadcrumb: {
      home: "الرئيسية",
      current: "الخدمات",
    },
    sectionLabel: "الخدمات",
    hero: {
      plain: "قدرات يربطها ",
      highlight: "نظام واحد.",
      paragraph:
        "خدمات CODE ليست مخرجات منفصلة، بل قدرات مترابطة حول اتجاه العمل، ووضوح العلامة، والأداء الرقمي، والبنية التشغيلية.",
    },
    services: [
      {
        index: "01",
        category: "الاستراتيجية",
        body: "توجيه استراتيجي للمنشآت التي تحتاج إلى أولويات نمو أوضح، وفهم أعمق للسوق، ومسار عملي للمضي قدمًا.",
        left: [
          "استراتيجية الحملات",
          "دراسة السوق والمنافسين",
          "استراتيجية الحملات",
        ],
        right: ["استراتيجية نمو الأعمال", "التخطيط لدخول السوق"],
      },
      {
        index: "02",
        category: "العلامة",
        body: "أنظمة علامة تجارية تجعل المنشأة أسهل في الفهم والتمييز والثقة والتذكّر.",
        left: ["استراتيجية العلامة ", "الهوية البصرية", "دليل العلامة "],
        right: ["تموضع العلامة ", "الهوية اللفظية", "المحتوى الإبداعي للحملات"],
      },
      {
        index: "03",
        category: "الحضور الرقمي",
        body: "حضور رقمي مبني حول رحلة العميل، والظهور، والقياس، والنتائج التجارية.",
        left: [
          "استراتيجية الموقع الإلكتروني",
          "تحسين محركات البحث",
          "ملف Google للأعمال",
          "صفحات الهبوط",
        ],
        right: [
          "تصميم وتطوير المواقع",
          "البحث المحلي",
          "الإعلانات المدفوعة",
          "التحليلات",
        ],
      },
      {
        index: "04",
        category: "إدارة التسويق",
        body: "الأنظمة والعمليات اللازمة لتخطيط الأنشطة التسويقية وتنفيذها وقياس أدائها وتطويرها.",
        left: [
          "إدارة وسائل التواصل الاجتماعي",
          "تخطيط الحملات",
          "أتمتة التسويق",
        ],
        right: [
          "تخطيط الحملات",
          "تكامل إدارة علاقات العملاء ورحلة العميل",
          "قياس الأداء والتحسين",
        ],
      },
      {
        index: "05",
        category: "المحتوى والإنتاج",
        body: "أصول إبداعية وإنتاجية هادفة تدعم التواصل بالعلامة، والحملات، والتنفيذ المخصّص لكل منصة.",
        left: ["المحتوى الإبداعي", "تصوير الفيديو", "فيديوهات قصيرة"],
        right: ["التصوير الفوتوغرافي", "الموشن جرافيك", "أصول الحملات"],
      },
      {
        index: "06",
        category: "CODE Hub™",
        body: "إضافة اختيارية لمشاريع محددة. تواصل مع أحد ممثلي CODE لمعرفة المزيد.",
        left: [],
        right: [],
      },
    ],
    closing: {
      plain: "ابدأ من ",
      highlight: " احتياج العمل.",
      paragraph:
        "الخدمة المناسبة تعتمد على التحدي، والنتيجة المطلوبة، والبنية القائمة بالفعل.",
      ctaLabel: "ابدأ محادثة",
    },
  },
};

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

interface ServiceSectionProps {
  item: ServiceItem;
  active: boolean;
  fontClass: string;
  dir: "rtl" | "ltr";
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  item,
  active,
  fontClass,
  dir,
}) => {
  // Arabic display type needs noticeably looser line-height than the tight
  // Latin values, or ascenders/descenders from adjacent lines touch.
  const heading = (enLeading: string, arLeading: string) =>
    dir === "rtl" ? arLeading : enLeading;

  return (
    <div
      className={`border-t border-[var(--steel)] py-14 sm:py-20 md:py-28 transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-45"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 sm:gap-12 lg:gap-28">
        {/* LEFT */}
        <div className="flex flex-col">
          <span
            className={`${fontClass} text-[12px] sm:text-[13px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[var(--slate-muted)]`}
          >
            {item.index}
          </span>

          <h2
            className={`mt-6 sm:mt-8 ${fontClass} text-[32px] font-light ${heading(
              "leading-[1] sm:leading-[0.98] md:leading-[0.95]",
              "leading-[1.3]",
            )} tracking-[-0.02em] sm:text-[42px] sm:tracking-[-0.03em] md:text-[clamp(42px,3vw,64px)] md:tracking-[-0.05em] transition-colors duration-500 ${
              active ? "text-[var(--code-white)]" : "text-[var(--slate-muted)]"
            } text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]`}
          >
            {item.category}
          </h2>
        </div>

        {/* RIGHT */}
        <div className="max-w-[820px]">
          <p
            className={`${fontClass} text-[16px] leading-[1.6] text-[var(--mist)] sm:text-[18px] sm:leading-[1.7] md:text-[20px] md:leading-[1.75]`}
          >
            {item.body}
          </p>

          {(item.left.length > 0 || item.right.length > 0) && (
            <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-x-10 sm:gap-x-16 md:gap-x-20 gap-y-4 sm:gap-y-5">
              <ul className="space-y-3 sm:space-y-4">
                {item.left.map((i) => (
                  <li
                    key={i}
                    className={`${fontClass} text-[15px] text-[var(--code-white)] sm:text-[16px] md:text-[17px] ${
                      dir === "rtl" ? "leading-[1.4]" : ""
                    }`}
                  >
                    {i}
                  </li>
                ))}
              </ul>

              <ul className="space-y-3 sm:space-y-4">
                {item.right.map((i) => (
                  <li
                    key={i}
                    className={`${fontClass} text-[15px] text-[var(--code-white)] sm:text-[16px] md:text-[17px] ${
                      dir === "rtl" ? "leading-[1.4]" : ""
                    }`}
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getInitialLanguage = (): "en" | "ar" => {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem("code-language");

  return saved === "ar" ? "ar" : "en";
};

const Service: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.index ?? 0,
            );
            setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const t = COPY[language];

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

        .glow-text {
          color: var(--violet-glow);
          text-shadow: 0 0 22px rgba(155, 131, 255, 0.55);
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
          className={`max-w-[1400px] ${fontClass} text-[44px] font-light ${heading(
            "leading-[1] sm:leading-[0.95] md:leading-[0.9]",
            "leading-[1.3]",
          )} tracking-[-0.02em] text-[var(--code-white)] sm:text-[64px] sm:tracking-[-0.04em] md:text-[clamp(72px,10vw,160px)] md:tracking-[-0.06em]`}
        >
          <span className="font-light">{t.hero.plain}</span>
          <span className="font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
            {t.hero.highlight}
          </span>
        </h1>

        <p
          className={`mt-6 sm:mt-8 md:mt-10 max-w-[620px] ${fontClass} text-[15px] leading-[1.6] text-[var(--mist)] sm:text-[16px] md:text-[17px]`}
        >
          {t.hero.paragraph}
        </p>

        {/* Services */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          {t.services.map((item, i) => (
            <div
              key={item.index}
              data-index={i}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
            >
              <ServiceSection
                item={item}
                active={activeIndex === i}
                fontClass={fontClass}
                dir={dir}
              />
            </div>
          ))}
        </div>

        {/* Page-specific closing statement */}
        <div className="border-t border-[var(--steel)] pt-12 sm:pt-16 md:pt-24">
          <h2
            className={`max-w-[1400px] ${fontClass} text-[44px] font-light ${heading(
              "leading-[1] sm:leading-[0.95] md:leading-[0.9]",
              "leading-[1.3]",
            )} tracking-[-0.02em] text-[var(--code-white)] sm:text-[64px] sm:tracking-[-0.04em] md:text-[clamp(72px,11vw,160px)] md:tracking-[-0.06em]`}
          >
            <span className="font-light">{t.closing.plain}</span>
            <span className="font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
              {t.closing.highlight}
            </span>
          </h2>
          <p
            className={`mt-5 sm:mt-6 max-w-[560px] ${fontClass} text-[14px] leading-[1.6] text-[var(--mist)] sm:text-[16px]`}
          >
            {t.closing.paragraph}
          </p>
          <div className="mt-8 sm:mt-10">
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

export default Service;
