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

   RESPONSIVE PASS (content/colors/type-scale intent untouched):
     - pt-[168px] under the fixed nav was flat on every screen; now
       steps pt-24 -> sm:pt-28 -> md:pt-32 -> lg:pt-[168px].
     - Hero h1 and the closing statement both used
       clamp(72px,10vw,…) — a 72px floor is already too large on a
       360px phone. Both now start smaller (44px / 40px) and step up
       through sm/md before landing on the original clamp at lg, which
       still resolves to the same desktop size.
     - Each step's huge title used clamp(64px,8vw,120px) — same
       problem, floors at 64px on mobile. Now steps 40px -> sm:56px ->
       md: the original clamp.
     - Step body copy, and the "every engagement includes" tiles,
       start a size smaller on phones and step up at sm/md.
     - Two invalid Tailwind utilities ("gap-" with no value, used on
       the includes grid and its columns) were silently ignored by
       Tailwind; replaced with explicit gap-0 so the collapsed-border
       tile look is intentional rather than accidental, and the tile
       padding now steps down on mobile.
     - Breadcrumb/eyebrows wrap instead of risking overflow, and the
       root wrapper gets overflow-x-hidden as a safety net against the
       hover glow/drop-shadow effects.
     - All existing md:/lg: values are unchanged, so tablet and desktop
       layout stays pixel-identical to before.
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
    className="group inline-flex items-center gap-3 sm:gap-4 font-['Space_Grotesk',sans-serif] text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.28em] !text-white hover:!text-white focus:!text-white active:!text-white transition-all duration-300 ease-out"
  >
    <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
      {label}
    </span>

    <span className="h-px w-8 sm:w-10 bg-[#8468FF] transition-all duration-300 ease-out group-hover:w-14 sm:group-hover:w-16" />
  </a>
);

const HowWeWork = () => {
  return (
    <div className="min-h-screen bg-black text-[var(--mist)] overflow-x-hidden">
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

      <main className="mx-auto max-w-[1440px] px-5 pt-24 pb-20 sm:px-6 sm:pt-28 sm:pb-24 md:px-16 md:pt-32 md:pb-32 lg:pt-[168px]">
        {/* Breadcrumb */}
        <div className="mb-6 sm:mb-8 md:mb-10 flex flex-wrap items-center gap-3 font-['Space_Grotesk',sans-serif] text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.24em] text-[var(--slate-muted)]">
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
        <span className="mb-5 sm:mb-6 md:mb-8 block font-['Space_Grotesk',sans-serif] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.30em] text-[var(--slate-muted)]">
          How We Work
        </span>

        <h1 className="max-w-[1100px] font-['Space_Grotesk',sans-serif] text-[44px] leading-[1] tracking-[-0.02em] sm:text-[64px] sm:leading-[0.95] sm:tracking-[-0.04em] md:text-[clamp(72px,10vw,160px)] md:leading-[0.9] md:tracking-[-0.06em]">
  <span className="font-light text-[var(--code-white)]">
    Clarity before
  </span>
  <br />
  <span className="font-bold text-[var(--code-white)]  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
    execution.
  </span>
</h1>

        <p className="mt-6 sm:mt-8 md:mt-10 max-w-[680px] font-['Space_Grotesk',sans-serif] text-[15px] leading-[1.6] text-[var(--mist)] sm:text-[16px] md:text-[17px]">
          CODE begins with the business requirement before recommending
          channels, deliverables or activity. The process is designed to
          reduce ambiguity, protect quality and connect every engagement to a
          clear outcome.
        </p>

        {/* Steps */}
        <div className="mt-14 sm:mt-16 md:mt-24">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.index}>
              {i > 0 && <DiagonalDivider />}
              <div className="py-12 sm:py-16 md:py-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 sm:gap-8 md:gap-16">
  {/* Left Side */}
  <div>
    <div className="flex items-baseline gap-4">
      <span className="font-['Space_Grotesk',sans-serif] text-[12px] sm:text-[13px] tracking-[0.2em] text-[var(--slate-muted)]">
        {step.index}
      </span>

      <span className="font-['Space_Grotesk',sans-serif] text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.30em] text-[var(--code-purple)]">
        Step
      </span>
    </div>
  </div>

  {/* Right Side */}
  <div>
    <h2 className="font-['Space_Grotesk',sans-serif] text-[40px] font-light leading-[1] tracking-[-0.02em] text-[var(--code-white)] sm:text-[56px] sm:leading-[0.95] sm:tracking-[-0.04em] md:text-[clamp(64px,8vw,120px)] md:leading-[0.9] md:tracking-[-0.06em] text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)] ">
      {step.title}
    </h2>

    <p className="mt-5 sm:mt-6 md:mt-8 max-w-[720px] font-['Space_Grotesk',sans-serif] text-[15px] leading-[1.6] text-[var(--mist)] sm:text-[16px] sm:leading-[1.65] md:text-[18px] md:leading-[1.7]">
      {step.body}
    </p>
  </div>
</div>
            </React.Fragment>
          ))}
        </div>

        {/* What every engagement includes */}
        <div className="border-t border-[var(--steel)] pt-12 sm:pt-16 md:pt-24">
          <span className="mb-5 sm:mb-6 md:mb-8 block font-['Space_Grotesk',sans-serif] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.30em] text-[var(--slate-muted)]">
            What Every Engagement Includes
          </span>

          <div className="flex justify-end items-end ">
  <h2 className="max-w-[900px]  font-['Space_Grotesk',sans-serif] text-[28px] font-light leading-[1.2] tracking-[-0.02em] text-[var(--code-white)] sm:text-[36px] sm:tracking-[-0.03em] md:text-[clamp(30px,4.5vw,52px)] md:tracking-[-0.04em]">
    <span className="font-light">
      Common ground across every
    </span>{" "}
    <span className="font-bold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">CODE engagement.</span>
  </h2>
</div>

          <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 gap-0 border-t border-[var(--steel)]  md:grid-cols-2">
  {[INCLUDES_LEFT, INCLUDES_RIGHT].map((list, index) => (
    <div key={index} className="flex flex-col gap-0">
      {list.map((item) => (
        <div
          key={item}
          className="group  border border-[var(--steel)] bg-[var(--graphite)] px-5 py-5 transition-all duration-300 sm:px-6 sm:py-6 md:px-8 md:py-7"
        >
          <span className="font-['Space_Grotesk',sans-serif] text-[17px] font-normal leading-[1.3] text-[var(--mist)] transition-colors group-hover:text-white sm:text-[19px] md:text-[22px]">
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
          <h2 className="max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[40px] font-light leading-[1.05] tracking-[-0.02em] text-[var(--code-white)] sm:text-[64px] sm:leading-[0.95] sm:tracking-[-0.04em] md:text-[clamp(72px,10vw,130px)] md:leading-[0.9] md:tracking-[-0.06em]">
  <span className="font-light">
    Define the right structure{" "}
  </span>

  <span className="font-light">
    before execution <span className="font-bold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">begins.</span>
  </span>
</h2>
          <p className="mt-6 sm:mt-8 max-w-[620px] font-['Space_Grotesk',sans-serif] text-[14px] leading-[1.6] text-[var(--mist)] sm:text-[16px]">
            Every CODE engagement opens with a short conversation to clarify
            the requirement, the outcome and the right structure to support
            it.
          </p>

          <div className="mt-8 sm:mt-10 md:mt-12">
            <ExploreLink label="Discuss Your Business" href="/contact" />
          </div>
        </div>
      </main>
      <Conversation/>

      <Footer />
    </div>
  );
};

export default HowWeWork;
