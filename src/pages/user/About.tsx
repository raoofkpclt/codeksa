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
------------------------------------------------------------------- */

const PRINCIPLES = [
  { index: "01", text: "Structure before decoration." },
  { index: "02", text: "Clarity before complexity." },
  { index: "03", text: "Outcomes before activity." },
  { index: "04", text: "Intelligence before assumption." },
  { index: "05", text: "Consistency before volume." },
  { index: "06", text: "Premium is quiet." },
];

const ExploreLink = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    className="hover-glow group inline-flex items-center gap-4 font-['Space_Grotesk',sans-serif] text-[12px] font-medium uppercase tracking-[0.28em] text-[var(--mist)] transition-colors duration-200"
  >
    {label}
    <span className="h-px w-10 bg-[var(--code-purple)] transition-all duration-300 group-hover:w-16 group-hover:bg-[var(--violet-glow)]" />
  </a>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-8 block font-['Space_Grotesk',sans-serif] text-[11px] font-medium uppercase tracking-[0.30em] text-[var(--slate-muted)]">
    {children}
  </span>
);

const About = () => {
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

        .glow-text {
          color: var(--violet-glow);
          text-shadow: 0 0 22px rgba(155, 131, 255, 0.55);
        }
      `}</style>

      <NavbarNew />

      <main className="mx-auto max-w-[1440px] px-6 pt-[168px] pb-32 md:px-16">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-3 font-['Space_Grotesk',sans-serif] text-[11px] tracking-[0.24em] text-[var(--slate-muted)]">
          <a href="/" className="hover-glow uppercase transition-colors duration-200">
            Home
          </a>
          <span>/</span>
          <span className="uppercase text-[var(--code-white)]">About</span>
        </div>

        {/* Hero */}
        <Eyebrow>About Code</Eyebrow>
        <h1 className="font-['Space_Grotesk',sans-serif] text-[clamp(48px,8vw,104px)] leading-[1.05]">
          <span className="font-light text-[var(--code-white)]">
            Built for structured
          </span>
          <br />
          <span className="glow-text font-bold">growth.</span>
        </h1>
        <p className="mt-10 max-w-[620px] font-['Space_Grotesk',sans-serif] text-[17px] leading-[1.6] text-[var(--mist)]">
          CODE is a Business Growth &amp; Marketing Operations company
          headquartered in Jeddah, Saudi Arabia. We help businesses move
          beyond disconnected activity by connecting strategy, brand, digital
          presence, marketing operations, creative execution and measurement
          into structured systems for sustainable growth.
        </p>

        {/* Why CODE exists */}
        <div className="mt-20 border-t border-[var(--steel)] py-16 md:py-24">
          <Eyebrow>Why Code Exists</Eyebrow>
          <h2 className="max-w-[900px] font-['Space_Grotesk',sans-serif] text-[clamp(32px,5vw,64px)] leading-[1.15]">
            <span className="font-light text-[var(--code-white)]">
              Most businesses do not lack activity.{" "}
            </span>
            <span className="font-bold text-[var(--code-white)]">
              They lack connection.
            </span>
          </h2>
          <div className="mt-12 max-w-[640px] space-y-6 font-['Space_Grotesk',sans-serif] text-[16px] leading-[1.6] text-[var(--mist)]">
            <p>A campaign may be active without being aligned.</p>
            <p>A brand may be visible without being understood.</p>
            <p>
              A website may exist without supporting the customer journey.
            </p>
            <p>
              A marketing team may work hard without operating from a clear
              system.
            </p>
            <p className="text-[var(--code-white)]">
              CODE exists to bring these parts together.
            </p>
          </div>
        </div>

        {/* What CODE is */}
        <div className="border-t border-[var(--steel)] py-16 md:py-24">
          <Eyebrow>What Code Is</Eyebrow>
          <h2 className="max-w-[900px] font-['Space_Grotesk',sans-serif] text-[clamp(32px,5vw,64px)] leading-[1.15]">
            <span className="font-light text-[var(--code-white)]">
              A strategic business partner, not a service{" "}
            </span>
            <span className="font-bold text-[var(--code-white)]">list.</span>
          </h2>
          <div className="mt-12 max-w-[640px] space-y-6 font-['Space_Grotesk',sans-serif] text-[16px] leading-[1.6] text-[var(--mist)]">
            <p>
              CODE is not positioned as a social media agency, design studio,
              production house, branding agency, website company or
              media-buying agency.
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

        {/* How CODE works */}
        <div className="border-t border-[var(--steel)] py-16 md:py-24">
          <Eyebrow>How Code Works</Eyebrow>
          <h2 className="max-w-[900px] font-['Space_Grotesk',sans-serif] text-[clamp(32px,5vw,64px)] leading-[1.15]">
            <span className="font-light text-[var(--code-white)]">
              Founder-led. Specialist-enabled.{" "}
            </span>
            <span className="font-bold text-[var(--code-white)]">
              System-driven.
            </span>
          </h2>
          <div className="mt-12 max-w-[640px] space-y-6 font-['Space_Grotesk',sans-serif] text-[16px] leading-[1.6] text-[var(--mist)]">
            <p>
              CODE combines strategic direction, structured delivery and
              selected specialist capability according to each engagement.
            </p>
            <p>
              The model allows CODE to remain focused, flexible and
              quality-controlled while building the right structure around
              each business requirement.
            </p>
          </div>
        </div>

        {/* Principles */}
        <div className="border-t border-[var(--steel)] py-16 md:py-24">
          <Eyebrow>Principles</Eyebrow>
          <div>
            {PRINCIPLES.map((p) => (
              <div
                key={p.index}
                className="flex items-baseline gap-8 border-t border-[var(--steel)] py-10 first:border-t-0 md:py-14"
              >
                <span className="font-['Space_Grotesk',sans-serif] text-[13px] tracking-[0.2em] text-[var(--slate-muted)]">
                  {p.index}
                </span>
                <p className="font-['Space_Grotesk',sans-serif] text-[clamp(24px,3.5vw,44px)] font-light leading-[1.15] text-[var(--mist)]">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Explore what we solve — divider link */}
        <div className="border-t border-[var(--steel)] py-16 md:py-20">
          <ExploreLink label="Explore What We Solve" href="/what-we-solve" />
        </div>

        {/* Explore the structure */}
        <div className="border-t border-[var(--steel)] pt-16 md:pt-24">
          <h2 className="max-w-[900px] font-['Space_Grotesk',sans-serif] text-[clamp(36px,5.5vw,72px)] leading-[1.1]">
            <span className="font-light text-[var(--code-white)]">
              Explore the structure behind CODE&rsquo;s{" "}
            </span>
            <span className="glow-text font-bold">work.</span>
          </h2>
          <p className="mt-8 max-w-[560px] font-['Space_Grotesk',sans-serif] text-[16px] leading-[1.6] text-[var(--mist)]">
            Every engagement begins with clarifying the business requirement,
            the required outcome and the right place to begin.
          </p>
          <div className="mt-10">
            <ExploreLink
              label="Start a Conversation"
              href="/start-a-conversation"
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
