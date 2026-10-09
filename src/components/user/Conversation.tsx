import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LANGUAGE_EVENT } from "./NavbarNew";

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

interface ConversationCopy {
  label: string;
  headingLine1: string;
  headingLine2: string;
  paragraph: string;
  cta: string;
}

const COPY: Record<Language, ConversationCopy> = {
  en: {
    label: "START A CONVERSATION",
    headingLine1: "Let's clarify",
    headingLine2: "what your business needs",
    paragraph:
      "Start with a conversation about the challenge, the required outcome and the right place to begin.",
    cta: "next.",
  },
  // ar: {
  //   label: "ابدأ الحديث معنا",
  //   headingLine1: "لنوضّح معًا",
  //   headingLine2: "ما تحتاجه أعمالك",
  //   paragraph:
  //     "ابدأ بحديث حول التحدي، والنتيجة المطلوبة، والنقطة الصحيحة للانطلاق.",
  //   cta: "التالي.",
  // },

  ar: {
    label: "ابدأ الحديث معنا",
    headingLine1: "لنحدّد ما يحتاجه عملك ",
    headingLine2: "في الخطوة القادمة.", bold: true ,
    paragraph:
      "ابدأ بحديث حول التحدي، والنتيجة المطلوبة، والنقطة الصحيحة للانطلاق.",
    cta: "",
  },
};

const Conversation: React.FC = () => {
  const [language, setLanguage] = useState<Language>("en");
  const dir = language === "ar" ? "rtl" : "ltr";
  const fontClass =
    language === "ar" ? "font-['Alexandria',sans-serif]" : "font-['Space_Grotesk',sans-serif]";

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
    <div dir={dir} lang={language}>
      {/* CTASection */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-36">
        <div className="group max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-12">
          <div>
            <p className="text-xs tracking-[0.2em] text-white/40 mb-8 sm:mb-10">
              {t.label}
            </p>

            <Link to="/contact">
              <h2
                className={`
                  max-w-[1400px]
                  ${fontClass}
                  text-[clamp(72px,10vw,130px)]
                  font-light
                  ${heading("leading-[0.9]", "leading-[1.3]")}
                  tracking-[-0.06em]
                  text-white
                  transition-all
                  duration-500
                  group-hover:text-[#8468FF]
                  group-hover:scale-[1.01]
                  group-hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]
                `}
              >
                <span>{t.headingLine1}</span>
                <br />
                <span>{t.headingLine2}</span>
              </h2>
            </Link>

            <p className="mt-8 sm:mt-10 max-w-md text-white/50 text-base sm:text-lg leading-relaxed">
              {t.paragraph}
            </p>
          </div>

          <div className="md:pt-2">
            <Link
              to="/contact"
              className={`
                inline-block
                font-bold
                ${fontClass}
                text-[clamp(3.5rem,13vw,6rem)]
                ${heading("leading-none", "leading-[1.3]")}
                text-white
                transition-all
                duration-500
                group-hover:text-[#8468FF]
                group-hover:scale-[1.01]
                group-hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]
              `}
            >
              {t.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Conversation;
