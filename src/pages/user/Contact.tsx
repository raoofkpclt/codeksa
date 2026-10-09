import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import NavbarNew, { LANGUAGE_EVENT } from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

type Language = "en" | "ar";
const LANGUAGE_STORAGE_KEY = "code-language";

interface Option {
  value: string; // stored value — kept in English for backend/email consistency
  label: string; // displayed label — translated
}

interface FormState {
  name: string;
  company: string;
  jobTitle: string;
  businessEmail: string;
  mobileNumber: string;
  country: string;
  industry: string;
  relevantPathway: string;
  preferredEngagement: string;
  preferredContactMethod: string;
  howDidYouKnow: string;
  businessChallenge: string;
  shortMessage: string;
}

const initialState: FormState = {
  name: "",
  company: "",
  jobTitle: "",
  businessEmail: "",
  mobileNumber: "",
  country: "",
  industry: "",
  relevantPathway: "",
  preferredEngagement: "",
  preferredContactMethod: "",
  howDidYouKnow: "",
  businessChallenge: "",
  shortMessage: "",
};

const fieldBase =
  "w-full bg-transparent border-b border-white/15 focus:border-white/60 outline-none py-3 text-white placeholder:text-white/25 transition-colors";

const labelBase = "text-xs tracking-[0.2em] text-white/40";

const WHATSAPP_URL = "https://wa.me/966555922650";
const PHONE_TEL = "tel:+966555922650";
const PHONE_DISPLAY = "+966 55 592 2650";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const ENQUIRY_RECEIVING_EMAIL = import.meta.env.VITE_ENQUIRY_RECEIVING_EMAIL;

interface ContactCopy {
  breadcrumb: { home: string; current: string };
  sectionLabel: string;
  hero: { line1: string; line2: string; highlight: string; paragraph: string };
  quickContact: { email: string; whatsappCall: string };
  contactCard: {
    label: string;
    codeLine1: string;
    codeLine2: string;
    emailLabel: string;
    phoneLabel: string;
    whatsappOrCall: string;
  };
  modal: {
    label: string;
    title: string;
    paragraph: string;
    whatsapp: string;
    call: string;
  };
  form: {
    name: string;
    company: string;
    jobTitle: string;
    businessEmail: string;
    mobileNumber: string;
    country: string;
    industry: string;
    relevantPathway: string;
    preferredEngagement: string;
    preferredContactMethod: string;
    howDidYouKnow: string;
    businessChallenge: string;
    shortMessage: string;
    selectPlaceholder: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
  referralOptions: Option[];
  industryOptions: Option[];
  pathwayOptions: Option[];
  engagementOptions: Option[];
  contactMethodOptions: Option[];
}

const COPY: Record<Language, ContactCopy> = {
  en: {
    breadcrumb: { home: "HOME", current: "START A CONVERSATION" },
    sectionLabel: "START A CONVERSATION",
    hero: {
      line1: "Let's clarify what your",
      line2: "business needs",
      highlight: "next.",
      paragraph:
        "Start with a conversation about the challenge, the required outcome and the right place to begin.",
    },
    quickContact: { email: "EMAIL", whatsappCall: "WHATSAPP / CALL" },
    contactCard: {
      label: "CONTACT",
      codeLine1: "Client Enquiries",
      codeLine2: "Saudi Arabia · MENA",
      emailLabel: "EMAIL",
      phoneLabel: "PHONE / WHATSAPP",
      whatsappOrCall: "WhatsApp or call →",
    },
    modal: {
      label: "CONTACT",
      title: "How should we talk?",
      paragraph: "Choose WhatsApp or a phone call — same number either way.",
      whatsapp: "WHATSAPP",
      call: "CALL",
    },
    form: {
      name: "NAME",
      company: "COMPANY",
      jobTitle: "JOB TITLE",
      businessEmail: "BUSINESS EMAIL",
      mobileNumber: "MOBILE NUMBER",
      country: "COUNTRY",
      industry: "INDUSTRY",
      relevantPathway: "RELEVANT PATHWAY",
      preferredEngagement: "PREFERRED ENGAGEMENT",
      preferredContactMethod: "PREFERRED CONTACT METHOD",
      howDidYouKnow: "HOW DID YOU KNOW ABOUT US",
      businessChallenge: "BUSINESS CHALLENGE",
      shortMessage: "SHORT MESSAGE",
      selectPlaceholder: "Select...",
      send: "SEND ENQUIRY",
      sending: "SENDING…",
      success:
        "Thanks — your enquiry is on its way. We'll be in touch shortly.",
      error:
        "Something went wrong sending that. Please try again, or email us directly at",
    },
    referralOptions: [
      { value: "Google Search", label: "Google Search" },
      { value: "Social Media", label: "Social Media" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Referral", label: "Referral" },
      { value: "Event / Conference", label: "Event / Conference" },
      { value: "Other", label: "Other" },
    ],
    industryOptions: [
      { value: "Automotive", label: "Automotive" },
      { value: "Hospitality", label: "Hospitality" },
      { value: "Retail", label: "Retail" },
      { value: "Professional Services", label: "Professional Services" },
      { value: "Real Estate", label: "Real Estate" },
      { value: "Healthcare", label: "Healthcare" },
      { value: "Construction", label: "Construction" },
      { value: "Industrial", label: "Industrial" },
      { value: "Growing Businesses", label: "Growing Businesses" },
      { value: "Other", label: "Other" },
    ],
    pathwayOptions: [
      { value: "Not sure yet", label: "Not sure yet" },
      { value: "Strategy & Growth", label: "Strategy & Growth" },
      { value: "Brand & Creative", label: "Brand & Creative" },
      { value: "Digital & Performance", label: "Digital & Performance" },
      {
        value: "Marketing Operations & Systems",
        label: "Marketing Operations & Systems",
      },
    ],
    engagementOptions: [
      { value: "Not sure yet", label: "Not sure yet" },
      { value: "CODE Essentials", label: "CODE Essentials" },
      { value: "Foundation", label: "Foundation" },
      { value: "Growth", label: "Growth" },
      { value: "Partnership", label: "Partnership" },
    ],
    contactMethodOptions: [
      { value: "Email", label: "Email" },
      { value: "WhatsApp", label: "WhatsApp" },
      { value: "Phone call", label: "Phone call" },
    ],
  },

  ar: {
    breadcrumb: { home: "الرئيسية", current: "ابدأ محادثة" },
    sectionLabel: "ابدأ محادثة",
    hero: {
      line1: "لنوضّح ما تحتاجه منشأتك",
      line2: " ",
      highlight: "القادم.",
      paragraph:
        "ابدأ بمحادثة حول التحدي، والنتيجة المطلوبة، ونقطة البداية الصحيحة.",
    },
    quickContact: {
      email: "البريد الإلكتروني",
      whatsappCall: "واتساب / اتصال",
    },
    contactCard: {
      label: "التواصل",
      codeLine1: "استفسارات العملاء",
      codeLine2: "السعودية · دول الخليج",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "الهاتف / واتساب",
      whatsappOrCall: "← واتساب أو اتصال",
    },
    modal: {
      label: "التواصل",
      title: "كيف تفضل التحدث؟",
      paragraph: "اختر واتساب أو مكالمة هاتفية — نفس الرقم في الحالتين.",
      whatsapp: "واتساب",
      call: "اتصال",
    },
    form: {
      name: "الاسم",
      company: "اسم المنشأة",
      jobTitle: "المسمى الوظيفي",
      businessEmail: " البريد الإلكتروني",
      mobileNumber: "رقم الجوال",
      country: "العنوان الوطني",
      industry: "القطاع",
      relevantPathway: "الخدمة المطلوبة",
      preferredEngagement: "نموذج التعاقد المفضل",
      preferredContactMethod: "طريقة التواصل المفضلة",
      howDidYouKnow: "كيف تعرفت علينا",
      businessChallenge: "تحدي العمل",
      shortMessage: "رسالة مختصرة",
      selectPlaceholder: "اختر...",
      send: "إرسال الطلب",
      sending: "جارٍ الإرسال…",
      success: "شكرًا — استفسارك في طريقه إلينا. سنتواصل معك قريبًا.",
      error: "حدث خطأ أثناء الإرسال. حاول مرة أخرى، أو راسلنا مباشرة على",
    },
    referralOptions: [
      { value: "Google Search", label: "بحث Google" },
      { value: "Social Media", label: "وسائل التواصل الاجتماعي" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Referral", label: "توصية" },
      { value: "Event / Conference", label: "فعالية / مؤتمر" },
      { value: "Other", label: "أخرى" },
    ],
    industryOptions: [
      { value: "Automotive", label: "السيارات" },
      { value: "Hospitality", label: "الضيافة" },
      { value: "Retail", label: "التجزئة" },
      { value: "Professional Services", label: "الخدمات المهنية" },
      { value: "Real Estate", label: "العقارات" },
      { value: "Healthcare", label: "الرعاية الصحية" },
      { value: "Construction", label: "الإنشاءات" },
      { value: "Industrial", label: "الصناعة" },
      { value: "Growing Businesses", label: "الشركات النامية" },
      { value: "Other", label: "أخرى" },
    ],
    pathwayOptions: [
      { value: "Not sure yet", label: "غير متأكد بعد" },
      { value: "Strategy & Growth", label: "الاستراتيجية والنمو" },
      { value: "Brand & Creative", label: "العلامة التجارية والإبداع" },
      { value: "Digital & Performance", label: "الرقمنة والأداء" },
      {
        value: "Marketing Operations & Systems",
        label: "عمليات وأنظمة التسويق",
      },
    ],
    engagementOptions: [
      { value: "Not sure yet", label: "غير متأكد بعد" },
      { value: "CODE Essentials", label: "أساسيات CODE" },
      { value: "Foundation", label: "الأساس" },
      { value: "Growth", label: "النمو" },
      { value: "Partnership", label: "الشراكة" },
    ],
    contactMethodOptions: [
      { value: "Email", label: "البريد الإلكتروني" },
      { value: "WhatsApp", label: "واتساب" },
      { value: "Phone call", label: "مكالمة هاتفية" },
    ],
  },
};

interface ContactChoiceModalProps {
  open: boolean;
  onClose: () => void;
  copy: ContactCopy["modal"];
  fontClass: string;
}

const ContactChoiceModal: React.FC<ContactChoiceModalProps> = ({
  open,
  onClose,
  copy,
  fontClass,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-choice-title"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-sm bg-black border border-white/10 px-6 py-8 sm:px-8 sm:py-10 ${fontClass}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white/40 hover:text-white transition-colors text-xl leading-none"
        >
          &times;
        </button>

        <p className={labelBase}>{copy.label}</p>
        <h3
          id="contact-choice-title"
          className="mt-4 text-2xl sm:text-3xl font-light text-white"
        >
          {copy.title}
        </h3>
        <p className="mt-2 text-sm text-white/50 leading-relaxed">
          {copy.paragraph}
        </p>

        <div className="mt-8 space-y-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-between border border-white/15 px-5 py-4 text-white hover:border-white/40 hover:bg-white/[0.03] transition-colors"
          >
            <span>
              <span className="block text-xs tracking-[0.2em] text-white/40 mb-1">
                {copy.whatsapp}
              </span>
              <span className="block text-base sm:text-lg" dir="ltr">
                {PHONE_DISPLAY}
              </span>
            </span>
            <span className="text-violet-400 text-lg">&rarr;</span>
          </a>

          <a
            href={PHONE_TEL}
            onClick={onClose}
            className="flex items-center justify-between border border-white/15 px-5 py-4 text-white hover:border-white/40 hover:bg-white/[0.03] transition-colors"
          >
            <span>
              <span className="block text-xs tracking-[0.2em] text-white/40 mb-1">
                {copy.call}
              </span>
              <span className="block text-base sm:text-lg" dir="ltr">
                {PHONE_DISPLAY}
              </span>
            </span>
            <span className="text-violet-400 text-lg">&rarr;</span>
          </a>
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

const StartAConversation: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
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

  const autoResizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleChange =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleTextareaChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleChange(field)(e);
      autoResizeTextarea(e);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          ...form,
          reply_to: form.businessEmail,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
    }
  };

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
      <section className="px-5 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16 md:px-10 md:pt-40 md:pb-20 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs tracking-[0.2em] text-white/40 mb-8 sm:mb-12 md:mb-24">
            <span>{t.breadcrumb.home}</span>
            <span>/</span>
            <span className="text-white/70">{t.breadcrumb.current}</span>
          </div>

          <p className="text-xs tracking-[0.3em] text-white/40 mb-5 sm:mb-6">
            {t.sectionLabel}
          </p>

          <h1
            className={`max-w-[1050px] ${fontClass} text-[40px] font-light ${heading(
              "leading-[1.05] sm:leading-[0.95] md:leading-[0.9]",
              "leading-[1.35]",
            )} tracking-[-0.02em] text-[var(--code-white)] sm:text-[64px] sm:tracking-[-0.04em] md:text-[clamp(72px,10vw,160px)] md:tracking-[-0.06em]`}
          >
            <span className="font-light">{t.hero.line1}</span>

            <span className="font-light">
              {" "}
              {t.hero.line2}{" "}
              <span className="font-bold text-white transition-all duration-500 ease-out hover:text-[#8a6dff] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
                {t.hero.highlight}
              </span>
            </span>
          </h1>

          <p className="mt-6 sm:mt-8 md:mt-10 max-w-[700px] text-white/50 text-sm leading-relaxed sm:text-base md:text-lg">
            {t.hero.paragraph}
          </p>
        </div>
      </section>

      {/* Quick contact row */}
      <section className="">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="px-5 py-8 sm:px-6 sm:py-10  md:px-10 lg:px-16 border-white/10">
            <span className="inline-block w-6 h-px bg-[#8468FF] mb-4" />
            <p className={labelBase}>{t.quickContact.email}</p>

            <a
              href="mailto:info@codeksaofficial.com"
              dir="ltr"
              className="mt-3 block text-base break-words hover:text-white/70 transition-colors sm:text-lg md:text-xl"
            >
              info@codeksaofficial.com
            </a>
          </div>

          <div className="px-5 py-8 sm:px-6 sm:py-10 md:px-10 lg:px-16">
            <span className="inline-block w-6 h-px bg-[#8468FF] mb-4" />
            <p className={labelBase}>{t.quickContact.whatsappCall}</p>
            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="mt-3 flex items-center gap-3 text-base hover:text-white/70 transition-colors sm:text-lg md:text-xl"
              dir="ltr"
            >
              {PHONE_DISPLAY}
              <span className="text-violet-400 text-base sm:text-lg">
                &rarr;
              </span>
            </button>
          </div>
        </div>
      </section>

      <ContactChoiceModal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        copy={t.modal}
        fontClass={fontClass}
      />

      {/* Contact info + Form */}
      <section className=" border-white/10 px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32 lg:px-16">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,320px)_1fr] gap-10 sm:gap-12 md:gap-24">
          {/* Left: static contact card */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            <div>
              <p className={labelBase}>{t.contactCard.label}</p>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-white/40 mb-3">
                CODE
              </p>
              <p className="text-base sm:text-lg">{t.contactCard.codeLine1}</p>
              <p className="text-white/50 text-sm sm:text-base">
                {t.contactCard.codeLine2}
              </p>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-white/40 mb-3">
                {t.contactCard.emailLabel}
              </p>

              <a
                href="mailto:info@codeksaofficial.com"
                dir="ltr"
                className="text-base sm:text-lg hover:text-white/70 transition-colors break-words"
              >
                info@codeksaofficial.com
              </a>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-white/40 mb-3">
                {t.contactCard.phoneLabel}
              </p>
              <p className="text-base sm:text-lg" dir="ltr">
                {PHONE_DISPLAY}
              </p>
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="text-white/50 hover:text-white/80 transition-colors text-sm sm:text-base"
              >
                {t.contactCard.whatsappOrCall}
              </button>
            </div>
          </div>

          {/* Right: form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-10 sm:space-y-12 md:space-y-14"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 sm:gap-y-10">
              <div>
                <label className={labelBase} htmlFor="name">
                  {t.form.name} <span className="text-purple-400">*</span>
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={handleChange("name")}
                  className={`${fieldBase} mt-3`}
                />
              </div>

              <div>
                <label className={labelBase} htmlFor="company">
                  {t.form.company} <span className="text-purple-400">*</span>
                </label>
                <input
                  id="company"
                  required
                  value={form.company}
                  onChange={handleChange("company")}
                  className={`${fieldBase} mt-3`}
                />
              </div>

              <div>
                <label className={labelBase} htmlFor="jobTitle">
                  {t.form.jobTitle}
                </label>
                <input
                  id="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange("jobTitle")}
                  className={`${fieldBase} mt-3`}
                />
              </div>

              <div>
                <label className={labelBase} htmlFor="businessEmail">
                  {t.form.businessEmail}{" "}
                  <span className="text-purple-400">*</span>
                </label>
                <input
                  id="businessEmail"
                  type="email"
                  required
                  dir="ltr"
                  value={form.businessEmail}
                  onChange={handleChange("businessEmail")}
                  className={`${fieldBase} mt-3`}
                />
              </div>

              <div>
                <label className={labelBase} htmlFor="mobileNumber">
                  {t.form.mobileNumber}
                </label>
                <input
                  id="mobileNumber"
                  dir="ltr"
                  value={form.mobileNumber}
                  onChange={handleChange("mobileNumber")}
                  className={`${fieldBase} mt-3`}
                />
              </div>

              <div>
                <label className={labelBase} htmlFor="country">
                  {t.form.country}
                </label>
                <input
                  id="country"
                  value={form.country}
                  onChange={handleChange("country")}
                  className={`${fieldBase} mt-3`}
                />
              </div>

              <div>
                <label className={labelBase} htmlFor="industry">
                  {t.form.industry}
                </label>
                <input
                  id="industry"
                  list="industry-options"
                  value={form.industry}
                  onChange={handleChange("industry")}
                  className={`${fieldBase} mt-3`}
                />
                <datalist id="industry-options">
                  {t.industryOptions.map((option) => (
                    <option key={option.value} value={option.label} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className={labelBase} htmlFor="relevantPathway">
                  {t.form.relevantPathway}
                </label>
                <select
                  id="relevantPathway"
                  value={form.relevantPathway}
                  onChange={handleChange("relevantPathway")}
                  className={`${fieldBase} mt-3 appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    {t.form.selectPlaceholder}
                  </option>
                  {t.pathwayOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-black"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelBase} htmlFor="preferredEngagement">
                  {t.form.preferredEngagement}
                </label>
                <select
                  id="preferredEngagement"
                  value={form.preferredEngagement}
                  onChange={handleChange("preferredEngagement")}
                  className={`${fieldBase} mt-3 appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    {t.form.selectPlaceholder}
                  </option>
                  {t.engagementOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-black"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelBase} htmlFor="preferredContactMethod">
                  {t.form.preferredContactMethod}
                </label>
                <select
                  id="preferredContactMethod"
                  value={form.preferredContactMethod}
                  onChange={handleChange("preferredContactMethod")}
                  className={`${fieldBase} mt-3 appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    {t.form.selectPlaceholder}
                  </option>
                  {t.contactMethodOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-black"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelBase} htmlFor="howDidYouKnow">
                {t.form.howDidYouKnow}
              </label>
              <select
                id="howDidYouKnow"
                value={form.howDidYouKnow}
                onChange={handleChange("howDidYouKnow")}
                className={`${fieldBase} mt-3 appearance-none cursor-pointer`}
              >
                <option value="" disabled>
                  {t.form.selectPlaceholder}
                </option>
                {t.referralOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-black"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelBase} htmlFor="businessChallenge">
                {t.form.businessChallenge}{" "}
                <span className="text-purple-400">*</span>
              </label>
              <textarea
                id="businessChallenge"
                required
                rows={1}
                value={form.businessChallenge}
                onChange={handleTextareaChange("businessChallenge")}
                className={`${fieldBase} mt-3 overflow-hidden`}
              />
            </div>

            <div>
              <label className={labelBase} htmlFor="shortMessage">
                {t.form.shortMessage}
              </label>
              <textarea
                id="shortMessage"
                rows={1}
                value={form.shortMessage}
                onChange={handleTextareaChange("shortMessage")}
                className={`${fieldBase} mt-3 overflow-hidden`}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/80 hover:text-white transition-colors group disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "sending" ? t.form.sending : t.form.send}
                <span className="w-8 h-px bg-[#8468FF] group-hover:w-12 transition-all duration-300 ease-out" />
              </button>

              {status === "success" && (
                <p className="mt-4 text-sm text-emerald-400/90">
                  {t.form.success}
                </p>
              )}

              {status === "error" && (
                <p className="mt-4 text-sm text-red-400/90">
                  {t.form.error}{" "}
                  <a
                    href={`mailto:${ENQUIRY_RECEIVING_EMAIL}`}
                    dir="ltr"
                    className="underline hover:text-white transition-colors"
                  >
                    {ENQUIRY_RECEIVING_EMAIL}
                  </a>
                  .
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
      <Conversation />
      <Footer />
    </div>
  );
};

export default StartAConversation;
