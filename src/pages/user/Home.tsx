import React from "react";
import { Link } from "react-router-dom";
import NavbarNew from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

interface Pathway {
  index: string;
  label: string;
  title: string;
  highlight: string;
  description: string;
  href: string;
}

const pathways: Pathway[] = [
  {
    index: "01",
    label: "STRATEGY & GROWTH",
    title: "Direction before",
    highlight: "activity.",
    description:
      "We define where growth should come from—and build the structure to move towards it.",
    href: "/strategy-growth",
  },
  {
    index: "02",
    label: "BRAND & CREATIVE",
    title: "Meaning before",
    highlight: "visibility.",
    description: "We shape brands people understand, trust and remember.",
    href: "/brand-creative",
  },
  {
    index: "03",
    label: "DIGITAL & PERFORMANCE",
    title: "Presence with",
    highlight: "purpose.",
    description:
      "We connect digital experience, visibility and performance to measurable business outcomes.",
    href: "/digital-performance",
  },
  {
    index: "04",
    label: "MARKETING OPERATIONS & SYSTEMS",
    title: "Structure before",
    highlight: "scale.",
    description:
      "We turn marketing into a connected, repeatable operating rhythm.",
    href: "/marketing-operations-systems",
  },
];

interface StandardItem {
  index: string;
  title: string;
  description: string;
}

const standard: StandardItem[] = [
  {
    index: "01",
    title: "Business Before Activity",
    description:
      "We begin with the business requirement before recommending channels or deliverables.",
  },
  {
    index: "02",
    title: "Defined Scope",
    description:
      "Deliverables, responsibilities, assumptions, timing and fees are confirmed before work begins.",
  },
  {
    index: "03",
    title: "Connected Expertise",
    description:
      "The right strategic, creative, digital and operational capabilities are combined according to the requirement.",
  },
  {
    index: "04",
    title: "Structured Delivery",
    description:
      "Every engagement includes a named contact, agreed milestones and clear delivery standards.",
  },
];

interface Engagement {
  index: string;
  title: string;
  description: string;
}

const engagements: Engagement[] = [
  {
    index: "01",
    title: "CODE Essentials",
    description: "One focused requirement. One defined scope.",
  },
  {
    index: "02",
    title: "Foundation",
    description: "Build the right structure.",
  },
  {
    index: "03",
    title: "Growth",
    description: "Scale with greater direction.",
  },
  {
    index: "04",
    title: "Partnership",
    description: "An embedded growth and marketing partner.",
  },
];

const industries = [
  "Automotive",
  "Hospitality",
  "Retail",
  "Professional Services",
  "Real Estate",
  "Healthcare",
  "Construction",
  "Industrial",
  "Growing Businesses",
];

interface WorkItem {
  title: string;
}

const workItems: WorkItem[] = [
  { title: "Strategy" },
  { title: "Brand" },
  { title: "Digital" },
  { title: "Campaigns" },
  { title: "Marketing Operations" },
  { title: "Content & Production" },
];

const labelBase = "text-xs tracking-[0.2em] text-white/40";
const accentLine =
  "w-6 h-px bg-[#8468FF] inline-block";

const Home: React.FC = () => {
  return (
    <div className="bg-black text-white overflow-x-hidden">
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

      {/* Hero */}
      <section className="px-6 md:px-10 lg:px-16 pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="font-['Space_Grotesk',sans-serif] font-light text-[clamp(5rem,15vw,20rem)] leading-[0.999] tracking-[-0.08em]">
            The system
            <br />
            behind{" "}
            <span
              className="
    font-bold
    text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]
  "
            >
              growth.
            </span>
          </h1>

          <p className="mt-10 sm:mt-14 md:mt-20 font-['Space_Grotesk',sans-serif] max-w-xl text-base sm:text-lg leading-relaxed text-white/50">
            CODE connects strategy, brand, digital presence and marketing
            operations into structured systems for sustainable growth.
          </p>
          <div className="mt-10 md:mt-14 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-x-10 gap-y-6">
            <Link
              to="/contact"
              className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/80 hover:text-white transition-colors group"
            >
              START A CONVERSATION
              <span
                className={`${accentLine} group-hover:w-10 transition-all`}
              />
            </Link>

            <Link
              to="/what-we-solve"
              className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/50 hover:text-white/80 transition-colors group"
            >
              EXPLORE WHAT WE SOLVE
              <span
                className={`${accentLine} group-hover:w-10 transition-all`}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* What CODE does */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,440px)_1fr] gap-8 md:gap-20">
          <p className={labelBase}>WHAT CODE DOES</p>

          <div>
            <h2 className="font-light text-3xl sm:text-4xl md:text-6xl leading-[1.1] sm:leading-[1.05] tracking-tight max-w-3xl">
              Business growth needs more than{" "}
              <span
                className="font-semibold text-white
    transition-all
    duration-500
    ease-out
    hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]"
              >
                activity.
              </span>
            </h2>

            <p className="mt-8 md:mt-10 max-w-2xl text-white/50 text-base sm:text-lg leading-relaxed">
              Most businesses do not need more isolated marketing activity. They
              need clearer direction, stronger brand meaning, purposeful digital
              presence and a repeatable operating rhythm.
            </p>

            <p className="mt-6 max-w-2xl text-white/50 text-base sm:text-lg leading-relaxed">
              CODE helps businesses understand what needs to move, then builds
              the structure required to move it.
            </p>
          </div>
        </div>
      </section>

      {/* What we solve intro */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,440px)_1fr] gap-8 md:gap-20">
          <p className={labelBase}>WHAT WE SOLVE</p>

          <div>
            <div className="flex justify-start md:justify-end">
              <div className="w-full max-w-[650px] lg:max-w-[950px]">
                <h2 className="font-['Space_Grotesk',sans-serif] font-light text-[clamp(2.75rem,8vw,8rem)] leading-[0.95] sm:leading-[0.9] tracking-[-0.03em] sm:tracking-[-0.05em] break-words">
                  Four pathways.
                  <br />
                  <span
                    className="font-semibold text-white
    transition-all
    duration-500
    ease-out
    hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]"
                  >
                    One system.
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we solve */}
      <section className="border-white/10 px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto">
          {pathways.map((pathway) => (
            <Link
              key={pathway.index}
              to={pathway.href}
              className="group block border-t border-white/10 last:border-b py-10 sm:py-14 md:py-20"
            >
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-6 sm:mb-8">
                <span className="text-xs tracking-[0.2em] text-white/40 shrink-0">
                  {pathway.index}
                </span>
                <span className="text-xs tracking-[0.2em] text-white/40 break-words">
                  {pathway.label}
                </span>
              </div>

              <div className="flex items-center justify-center gap-8">
                <div className="w-full max-w-[1150px]">
                  <h3 className="font-['Space_Grotesk',sans-serif] font-light text-[clamp(2.5rem,7vw,8rem)] leading-[0.85] tracking-[-0.06em]">
                    {pathway.title}{" "}
                    <span className="font-semibold text-white
    transition-all
    duration-500
    ease-out
    hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">{pathway.highlight}</span>
                  </h3>

                  <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/50">
                    {pathway.description}
                  </p>
                </div>

                <span className="hidden md:block text-3xl text-violet-400 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* The CODE standard */}
      <section className="px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto flex flex-col justify-between">
          <p className={`${labelBase} self-start`}>THE CODE STANDARD</p>

          <h2 className="self-end text-right font-['Space_Grotesk',sans-serif] font-light text-3xl sm:text-4xl md:text-6xl leading-[1.05] tracking-[-0.04em]">
            Clear before work <span className="font-semibold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">begins.</span>
          </h2>
        </div>

        <div className="max-w-[1600px] mx-auto mt-12 sm:mt-20 grid grid-cols-1 md:grid-cols-2">
          {standard.map((item, i) => (
            <div
              key={item.index}
              className={`
                px-0 md:px-14 py-10 sm:py-14 md:py-16
                 
                ${i % 2 === 0 ? "md:pl-0" : ""}
                ${i === 0 ? "md:pl-0" : ""}
              `}
            >
              <span className="text-xs tracking-[0.2em] text-white/40">
                {item.index}
              </span>
              <h3 className="mt-4 sm:mt-6 mb-4 sm:mb-5 text-xl sm:text-2xl md:text-3xl font-light">
                {item.title}
              </h3>
              <p className="text-white/50 leading-relaxed max-w-md text-sm sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Engagements */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto grid min-h-[40vh] grid-cols-1 md:grid-cols-[250px_1fr]">
          {/* Top Left */}
          <div className="flex items-start">
            <p className={labelBase}>ENGAGEMENTS</p>
          </div>

          {/* Center Right */}
          <div className="flex items-center justify-between">
            <h2 className="max-w-4xl  font-['Space_Grotesk',sans-serif] font-light text-3xl sm:text-4xl md:text-6xl leading-[1.05] tracking-[-0.04em]">
              Different levels of engagement.
              <br />
              <span className="font-semibold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">One standard.</span>
            </h2>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {engagements.map((item, i) => (
            <div
              key={item.index}
              className={`
                px-6 md:px-10 py-10 sm:py-12 md:py-14
               
                ${i % 2 === 0 ? "" : ""}
                ${
                  i !== engagements.length - 1
                    ? " md:border-white/10"
                    : ""
                }
              `}
            >
              <span className="text-xs tracking-[0.2em] text-white/40">
                {item.index}
              </span>
              <h3 className="mt-4 sm:mt-6 mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold   text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
                {item.title}
              </h3>
              <p className="text-white/50 leading-relaxed text-sm sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-[1600px] mx-auto mt-12 sm:mt-16">
          <Link
            to="/engagements"
            className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/70 hover:text-white transition-colors group w-fit"
          >
            EXPLORE OUR ENGAGEMENTS
            <span className={`${accentLine} group-hover:w-10 transition-all`} />
          </Link>
        </div>
      </section>

      {/* Industries */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto">
          <div className="max-w-[1600px] mx-auto grid min-h-[50vh] grid-cols-1 md:grid-cols-[250px_1fr]">
            {/* Top Left */}
            <div className="flex items-start">
              <p className={labelBase}>INDUSTRIES</p>
            </div>

            {/* Center Right */}
            <div className="flex items-center justify-between">
              <h2 className="max-w-5xl text font-['Space_Grotesk',sans-serif] font-light text-3xl sm:text-4xl md:text-6xl leading-[1.05] tracking-[-0.04em]">
                Built for businesses where clarity, trust and{" "}
                <span className="font-semibold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">execution matter.</span>
              </h2>
            </div>
          </div>
          <div className="mt-10 sm:mt-16 flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-4 sm:gap-y-6">
            {industries.map((industry) =>
              industry === "Automotive" || industry === "Hospitality" ? (
                <Link
                  key={industry}
                  to={industry}
                  className="text-xs sm:text-xl md:text-xl font-light text-white/70 hover:text-white transition-colors"
                >
                  {industry}
                </Link>
              ) : (
                <span
                  key={industry}
                  className="text-xs sm:text-xl md:text-xl font-light text-white/70 cursor-default"
                >
                  {industry}
                </span>
              ),
            )}
          </div>

          <div className="mt-10 sm:mt-16">
            <Link
              to="/industries"
              className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/70 hover:text-white transition-colors group w-fit"
            >
              EXPLORE INDUSTRIES
              <span
                className={`${accentLine} group-hover:w-10 transition-all`}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto grid min-h-[50vh] grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Top Left */}
          <div className="flex items-start">
            <p className={labelBase}>SELECTED WORK</p>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center items-end">
            <div className="max-w-4xl">
              <h2 className=" font-['Space_Grotesk',sans-serif] font-light text-3xl sm:text-4xl md:text-6xl leading-[1.05] tracking-[-0.04em]">
                Selected <span className="font-semibold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">work.</span>
              </h2>

              <p className="mt-8  text-white/50 text-base sm:text-lg leading-relaxed">
                Selected work is being prepared for publication. Until then,
                CODE presents its capabilities through defined pathways,
                engagement models and structured working standards.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {workItems.map((item, i) => (
            <div
              key={item.title}
              className={`
                px-6 md:px-10 lg:px-14 py-10 sm:py-14 md:py-16
                
                ${i % 2 === 0 ? "" : ""}
                ${(i + 1) % 3 !== 0 ? "" : ""}
              `}
            >
              <span className="text-xs tracking-[0.2em] text-white/40">
                IN PREPARATION
              </span>
              <h3 className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-light">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <Conversation />

      <Footer />
    </div>
  );
};

export default Home;
