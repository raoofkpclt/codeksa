import React from "react";
import NavbarNew from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

/* ------------------------------------------------------------------
   CODE — How We Work  (/how-we-work)

   Structure (per "Website Reference v3" + live preview):
     PageHero      — breadcrumb, eyebrow, "Clarity before execution.",
                     supporting sentence.
     4x StepBlock  — 01–04, "STEP" eyebrow (CODE Purple), huge title
                     (Decode / Architect / Deploy / Optimise), body.
                     Hairline divider + a faint diagonal signal line
                     between steps.
     Engagement    — "WHAT EVERY ENGAGEMENT INCLUDES" eyebrow,
       standard      Light+Bold headline, 7-item two-column list.
     Closing       — "Define the right structure before execution
       statement     begins." + supporting line + "Discuss Your
                     Business" text CTA.

   Single type family (Space Grotesk) throughout, per the v3 doc.
------------------------------------------------------------------- */

const STEPS = [
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
];

const INCLUDES = [
  "Named CODE contact",
  "Defined scope",
  "Confirmed responsibilities",
  "Agreed milestones",
  "Clear delivery standards",
  "Structured communication",
  "A regular strategic review rhythm",
];

/* Split into a 4/3 two-column layout, alternating left/right — matches
   the live preview (left: 1,3,5,7 · right: 2,4,6). */
const INCLUDES_LEFT = INCLUDES.filter((_, i) => i % 2 === 0);
const INCLUDES_RIGHT = INCLUDES.filter((_, i) => i % 2 === 1);

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

const ExploreLink = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    className="hover-glow group inline-flex items-center gap-4 font-['Space_Grotesk',sans-serif] text-[12px] font-medium uppercase tracking-[0.28em] text-[var(--mist)] transition-colors duration-200"
  >
    {label}
    <span className="h-px w-10 bg-[var(--code-purple)] transition-all duration-300 group-hover:w-16 group-hover:bg-[var(--violet-glow)]" />
  </a>
);

const HowWeWork = () => {
  return (
    <div className="min-h-screen bg-black text-[var(--mist)]">
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

        * { font-synthesis: none; }

        .hover-glow:hover {
          color: var(--violet-glow) !important;
          text-shadow: 0 0 14px rgba(155, 131, 255, 0.55);
        }
      `}</style>

      <NavbarNew />

      <main className="mx-auto max-w-[1440px] px-6 pt-[168px] pb-32 md:px-16">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-3 font-['Space_Grotesk',sans-serif] text-[11px] tracking-[0.24em] text-[var(--slate-muted)]">
          <a
            href="/"
            className="hover-glow uppercase transition-colors duration-200"
          >
            Home
          </a>
          <span>/</span>
          <span className="uppercase text-[var(--code-white)]">
            How We Work
          </span>
        </div>

        {/* PageHero */}
        <span className="mb-8 block font-['Space_Grotesk',sans-serif] text-[11px] font-medium uppercase tracking-[0.30em] text-[var(--slate-muted)]">
          How We Work
        </span>

        <h1 className="max-w-[900px] font-['Space_Grotesk',sans-serif] text-[clamp(48px,8vw,96px)] leading-[1.05] text-[var(--code-white)]">
          <span className="font-light">Clarity before</span>
          <br />
          <span className="font-bold">execution.</span>
        </h1>

        <p className="mt-10 max-w-[680px] font-['Space_Grotesk',sans-serif] text-[17px] leading-[1.6] text-[var(--mist)]">
          CODE begins with the business requirement before recommending
          channels, deliverables or activity. The process is designed to
          reduce ambiguity, protect quality and connect every engagement to a
          clear outcome.
        </p>

        {/* Steps */}
        <div className="mt-24">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.index}>
              {i > 0 && <DiagonalDivider />}
              <div className="py-16 md:py-20">
                <div className="flex items-baseline gap-4">
                  <span className="font-['Space_Grotesk',sans-serif] text-[13px] tracking-[0.2em] text-[var(--slate-muted)]">
                    {step.index}
                  </span>
                  <span className="font-['Space_Grotesk',sans-serif] text-[12px] font-medium uppercase tracking-[0.30em] text-[var(--code-purple)]">
                    Step
                  </span>
                </div>

                <h2 className="mt-6 font-['Space_Grotesk',sans-serif] text-[clamp(40px,6.5vw,80px)] font-bold leading-[1.05] text-[var(--code-white)]">
                  {step.title}
                </h2>

                <p className="mt-8 max-w-[720px] font-['Space_Grotesk',sans-serif] text-[16px] leading-[1.6] text-[var(--mist)]">
                  {step.body}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* What every engagement includes */}
        <div className="border-t border-[var(--steel)] pt-16 md:pt-24">
          <span className="mb-8 block font-['Space_Grotesk',sans-serif] text-[11px] font-medium uppercase tracking-[0.30em] text-[var(--slate-muted)]">
            What Every Engagement Includes
          </span>

          <h2 className="max-w-[900px] font-['Space_Grotesk',sans-serif] text-[clamp(30px,4.5vw,52px)] leading-[1.2] text-[var(--code-white)]">
            <span className="font-light">Common ground across every </span>
            <span className="font-bold">CODE</span>
            <br />
            <span className="font-bold">engagement.</span>
          </h2>

          <div className="mt-20 grid grid-cols-1 gap-x-16 gap-y-14 border-t border-[var(--steel)] pt-16 md:grid-cols-2">
            <div className="flex flex-col gap-14">
              {INCLUDES_LEFT.map((item) => (
                <span
                  key={item}
                  className="font-['Space_Grotesk',sans-serif] text-[22px] font-normal leading-[1.3] text-[var(--mist)]"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-14">
              {INCLUDES_RIGHT.map((item) => (
                <span
                  key={item}
                  className="font-['Space_Grotesk',sans-serif] text-[22px] font-normal leading-[1.3] text-[var(--mist)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-24 border-t border-[var(--steel)] pt-16 md:mt-32 md:pt-24">
          <h2 className="max-w-[900px] font-['Space_Grotesk',sans-serif] text-[clamp(34px,5.5vw,64px)] leading-[1.15] text-[var(--code-white)]">
            <span className="font-light">
              Define the right structure before execution{" "}
            </span>
            <span className="font-bold">begins.</span>
          </h2>

          <p className="mt-8 max-w-[620px] font-['Space_Grotesk',sans-serif] text-[16px] leading-[1.6] text-[var(--mist)]">
            Every CODE engagement opens with a short conversation to clarify
            the requirement, the outcome and the right structure to support
            it.
          </p>

          <div className="mt-12">
            <ExploreLink label="Discuss Your Business" href="/start-a-conversation" />
          </div>
        </div>
      </main>
      <Conversation/>

      <Footer />
    </div>
  );
};

export default HowWeWork;
