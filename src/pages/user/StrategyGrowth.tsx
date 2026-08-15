import React, { useState } from "react";
import NavbarNew from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

/**
 * StrategyGrowth page
 * ---------------------------------------------------------
 * Recreates the "Strategy & Growth" pathway page exactly as
 * shown in the reference screenshots (CODE Operating System).
 *
 * Fonts used (add to your index.html <head>, or import in CSS):
 *
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
 *
 * Fraunces -> large serif display headings ("Direction before activity.")
 * Inter    -> nav, eyebrows, breadcrumbs, body copy, list labels
 * ---------------------------------------------------------
 */

const accentLine =
  "w-6 h-px bg-[#8468FF] inline-block";

const CAPABILITIES = [
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
];

const OUTCOMES = [
  { number: "01", text: "Clearer business and marketing priorities" },
  { number: "02", text: "Stronger alignment between activity and growth" },
  { number: "03", text: "Better-informed market decisions" },
  { number: "04", text: "More focused use of resources" },
];

const INDUSTRIES_ROW_1 = [
  "Automotive",
  "Hospitality",
  "Healthcare",
  "Industrial",
  "Construction",
  "Retail",
];
const INDUSTRIES_ROW_2 = ["Real Estate", "Professional Services"];

const OTHER_PATHWAYS = [
  { number: "02", title: "Brand & Creative" },
  { number: "03", title: "Digital & Performance" },
  { number: "04", title: "Marketing Operations & Systems" },
];

const eyebrow =
  "text-[10px] sm:text-[11px] tracking-[0.24em] sm:tracking-[0.28em] uppercase text-neutral-500 font-medium";

const StrategyGrowth: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(1); // "02" open by default, matching screenshots

  return (
    <>
      <NavbarNew />

      <div className="min-h-screen bg-[#0a0a0b] text-white font-inter selection:bg-violet-300 selection:text-black overflow-x-hidden">
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

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

        <main className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
          {/* ---------------- BREADCRUMB ---------------- */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-24 sm:pt-36 md:pt-40 text-[10px] sm:text-[11px] tracking-[0.2em] text-neutral-500">
            <a href="/" className="hover-glow uppercase transition-colors duration-200">
              <span>HOME</span>
            </a>

            <span>/</span>
            <a href="/what-we-solve" className="hover-glow uppercase transition-colors duration-200">
              <span>WHAT WE SOLVE</span>
            </a>

            <span>/</span>
            <span className="font-semibold text-white">STRATEGY &amp; GROWTH</span>
          </div>

          {/* ---------------- HERO ---------------- */}
          <section className="pb-16 pt-10 sm:pb-24 sm:pt-16 md:pb-28 md:pt-24">
            <div className="flex items-center gap-3 text-[12px] sm:text-[13px] tracking-[0.2em] sm:tracking-[0.25em]">
              <span className="text-neutral-500">01</span>
              <span className="text-violet-300">STRATEGY &amp; GROWTH</span>
            </div>

            <h1 className="max-w-full md:max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[clamp(40px,10vw,160px)] font-light leading-[0.95] sm:leading-[0.9] tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words">
              <span className="font-light">Direction before </span>

              <span
                className="font-bold text-white
    transition-all
    duration-500
    ease-out
    hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]"
              >
                activity.
              </span>
            </h1>

            <p className="mt-6 sm:mt-8 md:mt-10 max-w-xl text-[15px] sm:text-[17px] leading-relaxed text-neutral-400">
              We clarify where growth should come from and build the strategic
              structure required to move towards it.
            </p>
          </section>

          {/* ---------------- BUSINESS CHALLENGE ---------------- */}
          <section className="grid grid-cols-1 gap-6 sm:gap-8 border-t border-white/10 py-12 sm:py-16 md:grid-cols-[220px_1fr] md:gap-16 md:py-20">
            <p className={eyebrow}>THE BUSINESS CHALLENGE</p>

            <div className="max-w-3xl space-y-6 sm:space-y-8 md:space-y-10">
              <p className="font-serif-display text-[21px] leading-snug text-neutral-100 sm:text-[26px] md:text-[30px]">
                Activity can create movement without creating progress.
                Businesses often invest in marketing, expansion or new ideas
                before defining where growth should come from, who it should
                reach or how success will be measured.
              </p>
              <p className="max-w-2xl text-[14px] sm:text-[15px] leading-relaxed text-neutral-500">
                CODE brings business priorities, market understanding and
                marketing direction into one connected growth framework.
              </p>
            </div>
          </section>

          {/* ---------------- HOW CODE HELPS ---------------- */}
          <section className="grid grid-cols-1 gap-6 sm:gap-8 border-t border-white/10 py-12 sm:py-16 md:grid-cols-[220px_1fr] md:gap-16 md:py-20">
            <p className={eyebrow}>HOW CODE HELPS</p>

            <p className="max-w-3xl font-serif-display text-[21px] leading-snug text-neutral-100 sm:text-[26px] md:text-[30px]">
              We work alongside leadership to translate ambition into a clear,
              prioritised structure —{" "}
              <span className="font-semibold text-white">
                one that connects business objectives, market reality and the
                marketing decisions required to move forward.
              </span>
            </p>
          </section>

          {/* ---------------- CAPABILITIES ---------------- */}
          <section className="border-t border-white/10 py-12 sm:py-16 md:py-20">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-[220px_1fr] md:gap-16">
              <p className={eyebrow}>CAPABILITIES</p>
              <h2 className="max-w-2xl font-serif-display text-[26px] leading-tight sm:text-[34px] md:text-[42px]">
                The disciplines{" "}
                <span
                  className="font-bold text-white
    transition-all
    duration-500
    ease-out
    hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]"
                >
                  this pathway connects.
                </span>
              </h2>
            </div>

            <div className="mt-10 sm:mt-16 border-t border-white/10">
              {CAPABILITIES.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={item.number} className="border-b border-white/10">
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      className="flex w-full items-start justify-between gap-3 sm:gap-6 py-6 sm:py-8 text-left"
                    >
                      <div className="flex items-baseline gap-3 sm:gap-6 md:gap-10">
                        <span className="w-6 sm:w-8 shrink-0 text-[12px] sm:text-[13px] text-neutral-500">
                          {item.number}
                        </span>
                        <span
                          className={`font-serif-display text-[19px] leading-tight transition-colors sm:text-[30px] md:text-[42px] break-words ${
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
                      <p className="max-w-2xl pb-8 sm:pb-10 pl-9 sm:pl-14 md:pl-[104px] text-[14px] sm:text-[15px] leading-relaxed text-neutral-500">
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
              <p className={eyebrow}>CONNECTED OUTCOMES</p>
              <h2 className="mt-4 sm:mt-6 font-serif-display text-[26px] leading-tight sm:text-[34px] md:text-[42px]">
                What clients tend
                <br />
                to{" "}
                <span
                  className="font-semibold text-white
    transition-all
    duration-500
    ease-out
    hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]"
                >
                  gain.
                </span>
              </h2>
            </div>

            <div className="border-t border-white/10">
              {OUTCOMES.map((o) => (
                <div
                  key={o.number}
                  className="flex items-baseline gap-4 sm:gap-8 border-b border-white/10 py-6 sm:py-8"
                >
                  <span className="w-5 sm:w-6 shrink-0 text-[12px] sm:text-[13px] text-neutral-500">
                    {o.number}
                  </span>
                  <span className="font-serif-display text-[19px] text-neutral-200 sm:text-[26px] md:text-[30px]">
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
              <p className={eyebrow}>RELATED INDUSTRIES</p>

              <h2 className="mt-6 sm:mt-8 font-['Space_Grotesk',sans-serif] text-[clamp(32px,8vw,72px)] font-light leading-[0.95] sm:leading-[0.9] tracking-[-0.04em] sm:tracking-[-0.06em] text-white break-words">
                <span className="font-light">Where this</span>
                <br />
                <span className="font-light">
                  pathway{" "}
                  <span
                    className="font-bold text-white
    transition-all
    duration-500
    ease-out
    hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]"
                  >
                    applies.
                  </span>
                </span>
              </h2>
            </div>

            {/* Right */}
            <div className="flex flex-col justify-center gap-6 sm:gap-8 md:gap-10">
              <div className="flex flex-wrap gap-x-6 sm:gap-x-10 md:gap-x-12 gap-y-4 sm:gap-y-6">
                {INDUSTRIES_ROW_1.map((industry) => (
                  <span
                    key={industry}
                    className="font-['Space_Grotesk',sans-serif] text-[15px] sm:text-[18px] text-white/70 hover:text-white transition-colors"
                  >
                    {industry}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-6 sm:gap-x-10 md:gap-x-12 gap-y-4 sm:gap-y-6">
                {INDUSTRIES_ROW_2.map((industry) => (
                  <span
                    key={industry}
                    className="font-['Space_Grotesk',sans-serif] text-[15px] sm:text-[18px] text-white/70 hover:text-white transition-colors"
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
              <p className={eyebrow}>CONTINUE THROUGH THE SYSTEM</p>
              <h2 className="font-serif-display text-left md:text-right text-[26px] leading-tight sm:text-[34px] md:text-[42px]">
                Other pathways.{" "}
                <span
                  className="font-semibold text-white
    transition-all
    duration-500
    ease-out
    hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]"
                >
                  Same system.
                </span>
              </h2>
            </div>

            <div className="mt-10 sm:mt-16 border-t border-white/10">
              {OTHER_PATHWAYS.map((p) => (
                <a
                  href="#"
                  key={p.number}
                  className="group flex items-center justify-between gap-4 border-b border-white/10 py-6 sm:py-10 transition-colors"
                >
                  <div className="flex items-baseline gap-3 sm:gap-6 md:gap-10">
                    <span className="w-6 sm:w-8 text-[12px] sm:text-[13px] text-neutral-500">
                      {p.number}
                    </span>
                    <span className="font-serif-display text-[19px] text-neutral-400 transition-colors group-hover:text-white sm:text-[30px] md:text-[42px] break-words">
                      {p.title}
                    </span>
                  </div>
                  <span className="text-xl sm:text-2xl shrink-0 text-neutral-500 transition-transform group-hover:translate-x-1 group-hover:text-white">
                    &rarr;
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* ---------------- CLOSING CTA (new section) ---------------- */}
          <section className="border-white/10 py-16 sm:py-20 md:py-24">
            <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-full md:max-w-[1500px] font-['Space_Grotesk',sans-serif] text-[clamp(32px,10vw,130px)] font-light leading-[1.05] sm:leading-[0.999] tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words">
                <span className="font-light">Clarify where growth </span>
                <span className="font-light">should come from </span>
                <span className="font-light">
                  before increasing{" "}
                  <span
                    className="font-bold text-white
    transition-all
    duration-500
    ease-out
    hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]"
                  >
                    activity.
                  </span>
                </span>
              </h2>
            </div>
            <div>
              <p className="mt-8 sm:mt-12 max-w-[720px] font-['Space_Grotesk',sans-serif] text-[16px] sm:text-[18px] font-light leading-[1.6] sm:leading-[1.75] tracking-[-0.01em] sm:tracking-[-0.02em] text-white/55">
                Business direction, market understanding and marketing
                decisions brought into one connected framework.
              </p>
            </div>

            <div className="mt-10 sm:mt-16 flex flex-col gap-5 sm:gap-6 border-white/10 pt-8 sm:pt-10 sm:flex-row sm:items-center sm:gap-12">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.24em] text-white transition-opacity hover:opacity-70"
              >
                Discuss your growth direction
                <span className={`${accentLine} group-hover:w-10 transition-all`} />
              </a>
              <a
                href="/engagements"
                className="group inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.24em] text-white transition-opacity hover:opacity-70"
              >
                Explore our engagements
                <span className={`${accentLine} group-hover:w-10 transition-all`} />
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
