import React, { useState } from "react";
import NavbarNew from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

const capabilities = [
  {
    number: "01",
    title: "Website Strategy & Experience",
    description:
      "Plan and create digital experiences that communicate clearly, build confidence and support business objectives. Design the journey before the interface.",
  },
  {
    number: "02",
    title: "Website Design & Development",
    description:
      "Design and develop responsive, structured and scalable websites aligned with the brand and customer journey. Built to perform and built to last.",
  },
  {
    number: "03",
    title: "Search Engine Optimisation",
    description:
      "Improve organic visibility through technical foundations, relevant content and sustainable search practices. Long-term visibility, not short-term tactics.",
  },
  {
    number: "04",
    title: "Local Search & Google Business Profile",
    description:
      "Strengthen visibility for businesses serving customers within specific cities, regions or locations. Meet demand where it happens.",
  },
  {
    number: "05",
    title: "Paid Media",
    description:
      "Plan, launch and optimise targeted advertising across relevant digital platforms. Investment aligned to intent, audience and stage of decision.",
  },
  {
    number: "06",
    title: "Campaign Landing Pages",
    description:
      "Create focused digital destinations connecting campaign messaging, customer intent and conversion. Give every campaign a place designed to convert.",
  },
  {
    number: "07",
    title: "Analytics & Measurement",
    description:
      "Build clearer visibility of customer behaviour, digital performance and business-relevant outcomes. Measure what matters, not what is easy.",
  },
  {
    number: "08",
    title: "Conversion Optimisation",
    description:
      "Identify and improve friction points affecting customer action and digital performance. Refine the moments where decisions are made.",
  },
  {
    number: "09",
    title: "Digital Customer Journeys",
    description:
      "Connect relevant digital touchpoints into clearer paths from discovery to consideration and action. One journey, not many disconnected steps.",
  },
];

const outcomes = [
  { number: "01", title: "Stronger digital visibility" },
  { number: "02", title: "Clearer customer journeys" },
  { number: "03", title: "More measurable marketing performance" },
  { number: "04", title: "Better-informed optimisation" },
];

const industries = [
  "Retail",
  "Hospitality",
  "Healthcare",
  "Automotive",
  "Real Estate",
  "Professional Services",
];

const pathways = [
  {
    number: "01",
    title: "Strategy & Growth",
    href: "/what-we-solve/strategy-growth",
  },
  {
    number: "02",
    title: "Brand & Creative",
    href: "/what-we-solve/brand-creative",
  },
  {
    number: "04",
    title: "Marketing Operations & Systems",
    href: "/what-we-solve/marketing-operations-systems",
  },
];

//  <span className={`${accentLine} group-hover:w-10 transition-all`} />
const accentLine =
  "w-6 h-px bg-[#8468FF] inline-block";

const DigitalPerformance: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

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
      <NavbarNew />

      {/* Breadcrumb */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 pt-24 sm:pt-32 md:pt-40 pb-6 sm:pb-10">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs tracking-[0.2em] text-white/40 uppercase">
          <span>Home</span>
          <span className="text-white/20">/</span>
          <span>What We Solve</span>
          <span className="text-white/20">/</span>
          <span className="text-white">Digital & Performance</span>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 pb-16 sm:pb-24 md:pb-32">
        <div className="text-xs tracking-[0.2em] text-white/40 uppercase mb-4 sm:mb-6">
          03&nbsp;&nbsp;&nbsp;
          <span className="text-[var(--code-purple)]  ">Digital & Performance</span>
        </div>
        <h1 className="max-w-full md:max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[clamp(40px,10vw,160px)] font-light leading-[0.95] sm:leading-[0.9] tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words">
          <span className="font-light ">Presence with </span>

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
            purpose.
          </span>
        </h1>
        <p className="mt-8 sm:mt-14 md:mt-24 max-w-xl text-white/50 text-base sm:text-lg leading-relaxed">
          We connect digital experience, visibility and performance to
          measurable business outcomes.
        </p>
      </section>

      {/* The Business Challenge */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 sm:gap-8 md:gap-24">
          <div className="text-xs tracking-[0.2em] text-white/40 uppercase h-fit">
            The Business Challenge
          </div>
          <div className="max-w-3xl space-y-6 sm:space-y-8 md:space-y-10">
            <p className="text-xl sm:text-2xl md:text-3xl leading-snug text-white">
              A digital presence is valuable only when customers can find it,
              understand it and act on it. Disconnected websites, search
              activity, advertising and analytics make performance harder to
              understand and improve.
            </p>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed">
              CODE brings digital touchpoints together around a clearer
              customer journey and measurable commercial purpose.
            </p>
          </div>
        </div>
      </section>

      {/* How CODE Helps */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 sm:gap-8 md:gap-24">
          <div className="text-xs tracking-[0.2em] text-white/40 uppercase h-fit">
            How CODE Helps
          </div>
          <p className="max-w-3xl text-xl sm:text-2xl md:text-3xl leading-snug text-white/70">
            We treat digital as a connected system —{" "}
            <span className="text-white font-medium">
              where experience, discovery and measurement work together to
              move customers with intent rather than compete for their
              attention in isolation.
            </span>
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="grid min-h-0 md:min-h-[280px] grid-cols-1 md:grid-cols-[280px_1fr] gap-6 sm:gap-8 md:gap-16">
          {/* Left */}
          <div className="flex items-start">
            <p className="font-['Space_Grotesk',sans-serif] text-xs uppercase tracking-[0.2em] text-white/40">
              Capabilities
            </p>
          </div>

          {/* Right */}
          <div className="flex items-start">
            <h2 className="max-w-full md:max-w-[1100px] font-['Space_Grotesk',sans-serif] text-[clamp(28px,5vw,52px)] font-light leading-[1.1] sm:leading-[0.999] tracking-[-0.02em] sm:tracking-[0.02em] text-white break-words">
              <span className="font-light">The disciplines </span>

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
        </div>

        <div className="mt-8 sm:mt-10 md:mt-0 border-t border-white/10">
          {capabilities.map((cap, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={cap.number} className="border-b border-white/10">
                <button
                  onClick={() => toggle(index)}
                  className={`w-full flex items-center gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8 md:py-10 text-left transition-colors duration-300 ${
                    isOpen ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  <span className="text-xs sm:text-sm tracking-widest w-6 sm:w-8 shrink-0">
                    {cap.number}
                  </span>
                  <span
                    className={`flex-1 font-light transition-all duration-300 break-words ${
                      isOpen
                        ? "text-2xl sm:text-4xl md:text-6xl text-white"
                        : "text-lg sm:text-2xl md:text-4xl"
                    }`}
                  >
                    {cap.title}
                  </span>
                  <span className="text-xl sm:text-2xl w-6 sm:w-8 text-right shrink-0 font-light">
                    {isOpen ? "×" : "+"}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl text-white/50 text-sm sm:text-base md:text-lg leading-relaxed pl-10 sm:pl-14 md:pl-16 pr-2 pb-6 sm:pb-8 md:pb-10">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Connected Outcomes */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 sm:gap-10 md:gap-24">
          {/* Left */}
          <div>
            <div className="text-xs tracking-[0.2em] text-white/40 uppercase mb-4 sm:mb-6">
              Connected Outcomes
            </div>

            <h2 className="mt-4 sm:mt-6 font-serif-display text-[24px] leading-tight sm:text-[32px] md:text-[42px]">
              {" "}
              What clients tend to{" "}
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
              </span>{" "}
            </h2>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <div className="w-full max-w-[700px] border-t border-white/10">
              {outcomes.map((outcome) => (
                <div
                  key={outcome.number}
                  className="flex items-center gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8 md:py-10 border-b border-white/10"
                >
                  <span className="w-6 sm:w-8 shrink-0 font-['Space_Grotesk',sans-serif] text-xs sm:text-sm tracking-[0.2em] text-white/40">
                    {outcome.number}
                  </span>

                  <span className="font-['Space_Grotesk',sans-serif] text-[19px] sm:text-[28px] md:text-[42px] font-light leading-[1.15] sm:leading-[1.1] text-white/80">
                    {outcome.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Industries */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 sm:gap-8 md:gap-16">
          <div>
            <div className="text-xs tracking-[0.2em] text-white/40 uppercase mb-4 sm:mb-6">
              Related Industries
            </div>
            <h2 className="max-w-full md:max-w-[900px] font-['Space_Grotesk',sans-serif] text-[clamp(32px,7vw,90px)] font-light leading-[0.95] sm:leading-[0.9] tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words">
              <span className="font-light">Where this </span>

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
          <div className="flex flex-wrap gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-4 sm:gap-y-6 content-start">
            {industries.map((industry) => (
              <span
                key={industry}
                className="text-lg sm:text-xl md:text-2xl font-light text-white/60 hover:text-white transition-colors cursor-default"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Continue Through the System */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 pt-14 sm:pt-20 md:pt-28 pb-20 sm:pb-28 md:pb-48 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 sm:gap-10 lg:gap-24">
          {/* Left */}
          <div className="flex items-start">
            <div className="font-['Space_Grotesk',sans-serif] text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
              Continue Through The System
            </div>
          </div>

          {/* Right */}
          <div className="flex items-start lg:items-end justify-start lg:justify-end">
            <h2 className="max-w-full lg:max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[clamp(32px,8vw,64px)] font-light leading-[0.95] sm:leading-[0.9] tracking-[-0.04em] sm:tracking-[-0.06em] text-white break-words">
              <span className="font-light">Other pathways. </span>

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
                Same system.
              </span>
            </h2>
          </div>
        </div>

        <div className="border-t mt-10 sm:mt-16 md:mt-24 border-white/10">
          {pathways.map((pathway) => (
            <a
              key={pathway.number}
              href={pathway.href}
              className="flex items-center gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8 md:py-10 border-b border-white/10 group"
            >
              <span className="text-xs sm:text-sm tracking-widest text-white/40 w-6 sm:w-8 shrink-0">
                {pathway.number}
              </span>
              <span className="flex-1 text-xl sm:text-3xl md:text-5xl font-light text-white/70 group-hover:text-white transition-colors break-words">
                {pathway.title}
              </span>
              <span className="text-xl sm:text-2xl shrink-0 text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all">
                →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Closing Statement */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-16 sm:py-24 md:py-32 border-t border-white/10">
        <h2 className="max-w-full md:max-w-[1100px] font-['Space_Grotesk',sans-serif] text-[clamp(32px,10vw,130px)] font-light leading-[0.95] sm:leading-[0.9] tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words">
          <span className="font-light">Connect digital </span>

          <span className="font-light">presence to the </span>

          <span className="font-light">journey customers </span>

          <span className="font-light">
            actually{" "}
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
              take.
            </span>
          </span>
        </h2>
        <p className="mt-6 sm:mt-8 md:mt-10 max-w-xl text-white/50 text-base sm:text-lg leading-relaxed">
          Experience, discovery and measurement designed to work together,
          not compete for attention.
        </p>

        <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-6 sm:gap-10 md:gap-16">
          <a
            href="/contact"
            className="group flex items-center gap-4 font-['Space_Grotesk',sans-serif] text-[11px] sm:text-[13px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white transition-colors"
          >
            <span>Discuss Your Digital Performance</span>

            <span className={`${accentLine} group-hover:w-10 transition-all`} />
          </a>

          <a
            href="/engagements"
            className="group flex items-center gap-4 font-['Space_Grotesk',sans-serif] text-[11px] sm:text-[13px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/50 transition-colors hover:text-white"
          >
            <span>Explore Our Engagements</span>

            <span className={`${accentLine} group-hover:w-10 transition-all`} />
          </a>
        </div>
      </section>

      {/* Start a Conversation */}
      <Conversation />

      <Footer />
    </div>
  );
};

export default DigitalPerformance;
