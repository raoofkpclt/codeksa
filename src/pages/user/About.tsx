import React from "react";
import NavbarNew from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

/* ------------------------------------------------------------------
   CODE — About  (/about)

   Matches the visual system used on /what-we-solve:
     - Space Grotesk throughout
     - Same CSS custom properties (charcoal / steel / mist / code-purple / violet-glow)
     - Same breadcrumb, eyebrow, ExploreLink, and glow-text treatment
     - Shared <Conversation /> closing section + <Footer />

   RESPONSIVE PASS (content/colors/type-scale intent untouched):
     - The top padding under the fixed nav was a flat 168px on every
       screen, eating ~40% of the viewport height on phones. Now steps
       pt-24 -> sm:pt-28 -> md:pt-32 -> lg:pt-[168px], landing on the
       exact same 168px at desktop widths.
     - Letter-spacing on the big display headings (tracking-[-0.06em]/
       [-0.08em]) is very tight relative to a small mobile column width,
       so it now relaxes on small screens and tightens back up at md/lg
       to the original values.
     - Eyebrow labels and the breadcrumb now step font-size/tracking
       down a notch on mobile and wrap instead of overflowing.
     - Body copy (text-[17px]/[18px]) now starts a touch smaller on
       phones and steps up to the original sizes at sm/md so line
       lengths stay comfortable on narrow columns.
     - Principle rows get a min-w-0/flex-1 on the text so the clamp()
       heading text wraps inside its column instead of pushing width.
     - Root wrapper gets overflow-x-hidden as a safety net against the
       glow/hover drop-shadows causing horizontal scroll on mobile.
     - All existing md:/lg: values are unchanged, so tablet and desktop
       layout stays pixel-identical to before.
------------------------------------------------------------------- */

const PRINCIPLES = [
  { index: "01", text: "Structure before decoration." },
  { index: "02", text: "Clarity before complexity." },
  { index: "03", text: "Outcomes before activity." },
  { index: "04", text: "Intelligence before assumption." },
  { index: "05", text: "Consistency before volume." },
  { index: "06", text: "Premium is quiet." },
];

// const accentLine =
//   "w-6 h-px bg-[#8468FF] inline-block";

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
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-4 sm:mb-5 md:mb-8 block font-['Space_Grotesk',sans-serif] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.30em] text-[var(--slate-muted)]">
    {children}
  </span>
);

const About = () => {
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
        <div className="mb-5 sm:mb-6 md:mb-10 flex flex-wrap items-center gap-3 font-['Space_Grotesk',sans-serif] text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.24em] text-[var(--slate-muted)]">
          <a href="/" className="hover-glow uppercase transition-colors duration-200">
            Home
          </a>
          <span>/</span>
          <span className="uppercase text-[var(--code-white)]">About</span>
        </div>

        {/* Hero */}
        <Eyebrow>About Code</Eyebrow>
       <h1 className="max-w-[2000px] font-['Space_Grotesk',sans-serif] text-[clamp(44px,11vw,180px)] font-light leading-[0.98] tracking-[-0.02em] text-[var(--code-white)] sm:leading-[0.92] sm:tracking-[-0.05em] md:leading-[0.88] md:tracking-[-0.08em]">
  <span className="font-light">
    Built for structured
  </span>
<br />
  <span className="font-bold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
    growth.
  </span>
</h1>
        <p className="mt-5 sm:mt-6 md:mt-10 max-w-[620px] font-['Space_Grotesk',sans-serif] text-[15px] leading-[1.6] text-[var(--mist)] sm:text-[16px] md:text-[17px]">
          CODE is a Business Growth &amp; Marketing Operations company
          headquartered in Jeddah, Saudi Arabia. We help businesses move
          beyond disconnected activity by connecting strategy, brand, digital
          presence, marketing operations, creative execution and measurement
          into structured systems for sustainable growth.
        </p>

        {/* Why CODE exists */}
       <div className="mt-10 sm:mt-12 md:mt-20 border-t border-[var(--steel)] py-10 sm:py-12 md:py-24">
  <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 sm:gap-8 lg:gap-24">
    {/* Left (Empty) */}
    <div className="flex">
      <Eyebrow>Why Code Exists</Eyebrow>
    </div>

    {/* Right */}
    <div className="max-w-[900px]">
      <h2 className="font-['Space_Grotesk',sans-serif] text-[clamp(32px,10vw,72px)] font-light leading-[1] tracking-[-0.02em] text-[var(--code-white)] sm:leading-[0.95] sm:tracking-[-0.04em] md:leading-[0.9] md:tracking-[-0.06em]">
        <span className="font-light">
          Most businesses do{" "}
        </span>
 
        <span className="font-light">
          not lack activity.{" "}
        </span>

        <span className="font-bold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
          They lack connection.
        </span>
      </h2>

      <div className="mt-6 sm:mt-8 md:mt-12 max-w-[680px] space-y-4 sm:space-y-6 font-['Space_Grotesk',sans-serif] text-[15px] leading-[1.55] text-[var(--mist)] sm:text-[16px] md:text-[18px] md:leading-[1.5]">
        <p>A campaign may be active without being aligned.</p>

        <p>A brand may be visible without being understood.</p>

        <p>
          A website may exist without supporting the customer journey.
        </p>

        <p>
          A marketing team may work hard without operating from a clear
          system.
        </p>

        <p className="text-[var(--code-white)] font-medium">
          CODE exists to bring these parts together.
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
      <Eyebrow>What Code Is</Eyebrow>
    </div>

    {/* Right */}
    <div className="max-w-[900px]">
      <h2 className="font-['Space_Grotesk',sans-serif] text-[clamp(32px,10vw,72px)] font-light leading-[1.02] tracking-[-0.02em] text-[var(--code-white)] sm:leading-[1] sm:tracking-[-0.04em] md:leading-[0.999] md:tracking-[-0.06em]">
        <span className="font-light">
          A strategic business{" "}
        </span>
       
        <span className="font-light">
          partner, not a service{" "}
        </span>
   
        <span className="font-bold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
          list.
        </span>
      </h2>

      <div className="mt-6 sm:mt-8 md:mt-12 max-w-[680px] space-y-4 sm:space-y-6 font-['Space_Grotesk',sans-serif] text-[15px] leading-[1.55] text-[var(--mist)] sm:text-[16px] md:text-[18px] md:leading-[1.5]">
        <p>
          CODE is not positioned as a social media agency, design studio,
          production house, branding agency, website company or media-buying
          agency.
        </p>

        <p>Those are capabilities.</p>

        <p>They are not the identity of CODE.</p>

        <p>
          CODE works at the intersection of business understanding,
          marketing systems, creative execution and measurable
          performance.
        </p>
      </div>
    </div>
  </div>
</div>

        {/* How CODE works */}
        <div className="border-t border-[var(--steel)] py-10 sm:py-12 md:py-24">
  <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 sm:gap-8 lg:gap-24">
    {/* Left */}
    <div className="flex">
      <Eyebrow>How Code Works</Eyebrow>
    </div>

    {/* Right */}
    <div className="max-w-[900px]">
      <h2 className="font-['Space_Grotesk',sans-serif] text-[clamp(32px,10vw,72px)] font-light leading-[1] tracking-[-0.02em] text-[var(--code-white)] sm:leading-[0.95] sm:tracking-[-0.04em] md:leading-[0.9] md:tracking-[-0.06em]">
        <span className="font-light">
          Founder-led.{" "}
        </span>
       
        <span className="font-light">
          Specialist-enabled.{" "}
        </span>
        
        <span className="font-bold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
          System-driven.
        </span>
      </h2>

      <div className="mt-6 sm:mt-8 md:mt-12 max-w-[680px] space-y-4 sm:space-y-6 font-['Space_Grotesk',sans-serif] text-[15px] leading-[1.55] text-[var(--mist)] sm:text-[16px] md:text-[18px] md:leading-[1.5]">
        <p>
          CODE combines strategic direction, structured delivery and selected
          specialist capability according to each engagement.
        </p>

        <p>
          The model allows CODE to remain focused, flexible and
          quality-controlled while building the right structure around each
          business requirement.
        </p>
      </div>
    </div>
  </div>
</div>
        {/* Principles */}
        <div className="border-t border-[var(--steel)] py-10 sm:py-12 md:py-24">
          <Eyebrow>Principles</Eyebrow>
          <div>
            {PRINCIPLES.map((p) => (
              <div
                key={p.index}
                className="flex items-baseline gap-4 sm:gap-6 md:gap-8 border-t border-[var(--steel)] py-6 first:border-t-0 sm:py-8 md:py-14"
              >
                <span className="shrink-0 font-['Space_Grotesk',sans-serif] text-[12px] sm:text-[13px] tracking-[0.2em] text-[var(--slate-muted)]">
                  {p.index}
                </span>
                <p className="min-w-0 flex-1 font-['Space_Grotesk',sans-serif] text-[clamp(22px,3.5vw,44px)] font-light leading-[1.15] text-[var(--mist)]">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Explore what we solve — divider link */}
        <div className=" border-[var(--steel)] py-8 sm:py-10 md:py-20">
          <ExploreLink label="Explore What We Solve" href="/what-we-solve" />
          
        </div>

        {/* Explore the structure */}
        <div className="border-[var(--steel)] pt-10 sm:pt-12 md:pt-24">
          <h2 className="max-w-[1500px] font-['Space_Grotesk',sans-serif] text-[clamp(36px,10vw,120px)] font-light leading-[1.05] tracking-[-0.02em] text-[var(--code-white)] sm:leading-[1] sm:tracking-[-0.04em] md:leading-[0.999] md:tracking-[-0.06em]">
  <span className="font-light">
    Explore the{" "}
  </span>
  
  <span className="font-light">
    structure behind{" "}
  </span>
 
  <span className="font-light">
    CODE&rsquo;s <span className="font-bold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">work.</span>
  </span>
</h2>
          <p className="mt-6 sm:mt-8 max-w-[560px] font-['Space_Grotesk',sans-serif] text-[14px] leading-[1.6] text-[var(--mist)] sm:text-[16px]">
            Every engagement begins with clarifying the business requirement,
            the required outcome and the right place to begin.
          </p>
          <div className="mt-6 sm:mt-8 md:mt-10">
            <ExploreLink
              label="Start a Conversation"
              href="/contact"
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
