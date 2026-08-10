import React, { useState } from "react";
import NavbarNew from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import { Link } from "react-router-dom";
import Conversation from "../../components/user/Conversation";

const capabilities = [
  {
    number: "01",
    title: "Marketing Operations",
    description:
      "Design the structure connecting strategy, people, processes and measurement. Give marketing a way of working, not only a list of tasks.",
  },
  {
    number: "02",
    title: "Social Media Management",
    description:
      "Manage social presence through planned, consistent and brand-aligned content. Steady, intentional and on-brand.",
  },
  {
    number: "03",
    title: "Content Planning & Systems",
    description:
      "Create organised content frameworks supporting continuity, relevance and efficient execution. Move from ad-hoc output to a considered pipeline.",
  },
  {
    number: "04",
    title: "Integrated Campaign Management",
    description:
      "Coordinate campaign planning, creative delivery and performance across relevant channels. One campaign, executed as one.",
  },
  {
    number: "05",
    title: "Campaign Planning",
    description:
      "Structured visibility of planned campaigns, content and business priorities. Give leadership a clear view of what is coming and why.",
  },
  {
    number: "06",
    title: "Marketing Automation",
    description:
      "Introduce appropriate automation supporting consistency, efficiency and customer communication. Automate the repeatable so the team can focus on the meaningful.",
  },
  {
    number: "07",
    title: "CRM & Customer Journey Integration",
    description:
      "Connect relevant marketing and customer information to support stronger follow-up and lifecycle visibility. Turn interest into a relationship.",
  },
  {
    number: "08",
    title: "Applied AI in Marketing",
    description:
      "Apply AI responsibly where it improves speed, organisation or insight. Considered application, not novelty.",
  },
  {
    number: "09",
    title: "Performance Review & Optimisation",
    description:
      "Structured review rhythms supporting informed decisions and continuous improvement. Insight that informs the next move.",
  },
];

const outcomes = [
  { number: "01", title: "Clearer marketing direction" },
  { number: "02", title: "More consistent execution" },
  { number: "03", title: "Stronger internal coordination" },
  { number: "04", title: "Reduced operational friction" },
  { number: "05", title: "Stronger foundations for scale" },
];

const industries = [
  "Hospitality",
  "Retail",
  "Healthcare",
  "Industrial",
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
    number: "03",
    title: "Digital & Performance",
    href: "/what-we-solve/digital-performance",
  },
];

//  <span className={`${accentLine} group-hover:w-10 transition-all`} /> 
const accentLine =
  "w-6 h-px bg-[#8468FF] inline-block";

const MarketingOperationsSystems: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="bg-black text-white">
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

      {/* Breadcrumb */}

      <div className="max-w-[1600px] mx-auto px-6 md:px-16 pt-40 pb-10">
        <nav className="flex flex-wrap items-center gap-3 font-['Space_Grotesk',sans-serif] text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
          <Link
            to="/"
            className="hover-glow uppercase transition-colors duration-200"
          >
            Home
          </Link>

          <span className="text-white/20">/</span>

          <Link
            to="/what-we-solve"
            className="hover-glow uppercase transition-colors duration-200"
          >
            What We Solve
          </Link>

          <span className="text-white/20">/</span>

          <span className="text-white">Marketing Operations &amp; Systems</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-16 pb-32">
        <div className="text-xs tracking-[0.2em] text-white/40 uppercase mb-6">
          04&nbsp;&nbsp;&nbsp;
          <span className="text-indigo-300/80">
            Marketing Operations & Systems
          </span>
        </div>
        <h1 className="max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[clamp(72px,11vw,160px)] font-light leading-[0.9] tracking-[-0.06em] text-[var(--code-white)]">
          <span className="font-light">Structure before</span>
          <br />
          <span className="font-bold text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">scale.</span>
        </h1>
        <p className="mt-10 max-w-xl text-white/50 text-lg leading-relaxed">
          We turn marketing into a connected, repeatable operating rhythm.
        </p>
      </section>

      {/* The Business Challenge */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-16 py-28 border-t border-white/10">
        <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-24">
          <div className="text-xs tracking-[0.2em] text-white/40 uppercase h-fit">
            The Business Challenge
          </div>
          <div className="max-w-3xl space-y-10">
            <p className="text-2xl md:text-3xl leading-snug text-white">
              Marketing becomes difficult to scale when planning, execution and
              measurement operate separately. Activity increases, but coherence
              and control decrease.
            </p>
            <p className="text-white/50 text-lg leading-relaxed">
              CODE creates the structure that connects strategy, execution and
              continuous improvement.
            </p>
          </div>
        </div>
      </section>

      {/* How CODE Helps */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-16 py-28 border-t border-white/10">
        <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-24">
          <div className="text-xs tracking-[0.2em] text-white/40 uppercase h-fit">
            How CODE Helps
          </div>
          <p className="max-w-3xl text-2xl md:text-3xl leading-snug text-white/70">
            We design the operating structure that lets marketing move at pace
            without losing coherence —{" "}
            <span className="text-white font-medium">
              a rhythm of planning, execution and review the business can rely
              on.
            </span>
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-16 py-28 border-t border-white/10">
        <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-16 mb-16">
          <div className="text-xs tracking-[0.2em] text-white/40 uppercase h-fit">
            Capabilities
          </div>
          <h2 className="max-w-3xl text-4xl md:text-6xl leading-tight font-light">
            The disciplines{" "}
            <span className="font-semibold text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">this pathway connects.</span>
          </h2>
        </div>

        <div className="border-t border-white/10">
          {capabilities.map((cap, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={cap.number} className="border-b border-white/10">
                <button
                  onClick={() => toggle(index)}
                  className={`w-full flex items-center gap-8 py-10 text-left transition-colors duration-300 ${
                    isOpen ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  <span className="text-sm tracking-widest w-8 shrink-0">
                    {cap.number}
                  </span>
                  <span
                    className={`flex-1 font-light transition-all duration-300 ${
                      isOpen
                        ? "text-4xl md:text-6xl text-white"
                        : "text-2xl md:text-4xl"
                    }`}
                  >
                    {cap.title}
                  </span>
                  <span className="text-2xl w-8 text-right shrink-0 font-light">
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
                    <p className="max-w-2xl text-white/50 text-lg leading-relaxed pl-16 pb-10">
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
      <section className="max-w-[1600px] mx-auto px-6 md:px-16 py-28 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 lg:gap-24">
          {/* Left */}
          <div>
            <div className="font-['Space_Grotesk',sans-serif] text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
              Connected Outcomes
            </div>

            <h2 className="mt-8 font-['Space_Grotesk',sans-serif] text-[clamp(50px,3vw,60px)] font-light leading-[0.9] tracking-[-0.06em] text-white">
              What clients tend to <span className="font-bold text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">gain.</span>
            </h2>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <div className="w-full max-w-[720px] border-t border-white/10">
              {outcomes.map((outcome) => (
                <div
                  key={outcome.number}
                  className="flex items-center gap-8 py-10 border-b border-white/10"
                >
                  <span className="w-8 shrink-0 font-['Space_Grotesk',sans-serif] text-[12px] tracking-[0.2em] text-white/40">
                    {outcome.number}
                  </span>

                  <span className="font-['Space_Grotesk',sans-serif] text-[24px] md:text-[40px] font-light leading-[1.1] text-white/80">
                    {outcome.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- RELATED INDUSTRIES ---------------- */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-16 py-28 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-16">
          {/* Left */}
          <div>
            <p className="font-['Space_Grotesk',sans-serif] text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
              RELATED INDUSTRIES
            </p>

            <h2 className="mt-8 font-['Space_Grotesk',sans-serif] text-[clamp(50px,5vw,60px)] font-light leading-[0.9] tracking-[-0.06em] text-white">
              <span className="font-light">Where this</span>
              <br />
              <span className="font-light">
                pathway <span className="font-bold text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">applies.</span>
              </span>
            </h2>
          </div>

          {/* Right */}
          <div className="flex  items-center">
            <div className="flex flex-wrap gap-x-16 gap-y-8 max-w-[900px]">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="font-['Space_Grotesk',sans-serif] text-[22px] md:text-[28px] font-light leading-[1.2] tracking-[-0.03em] text-white/60 transition-colors duration-300 hover:text-white cursor-default"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Continue Through the System */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-16 py-28 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="text-xs tracking-[0.2em] text-white/40 uppercase">
            Continue Through The System
          </div>
          <h2 className="text-4xl md:text-6xl font-light">
            Other pathways. <span className="font-semibold text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">Same system.</span>
          </h2>
        </div>

        <div className="pt-24 border-white/10">
          {pathways.map((pathway) => (
            <a
              key={pathway.number}
              href={pathway.href}
              className="flex items-center gap-8 py-10 border-b border-white/10 group"
            >
              <span className="text-sm tracking-widest text-white/40 w-8 shrink-0">
                {pathway.number}
              </span>
              <span className="flex-1 text-3xl md:text-5xl font-light text-white/70 group-hover:text-white transition-colors">
                {pathway.title}
              </span>
              <span className="text-2xl text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all">
                →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Closing Statement */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-16 py-32 border-t border-white/10">
        <h2 className="max-w-[1300px] font-['Space_Grotesk',sans-serif] text-[clamp(72px,10vw,150px)] font-light leading-[0.999] tracking-[-0.06em] text-[var(--code-white)]">
          <span className="font-light">
            Create the structure required before marketing
          </span>

          <span className="font-light">
            activity <span className="font-bold text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">scales.</span>
          </span>
        </h2>
        <p className="mt-10 max-w-xl text-white/50 text-lg leading-relaxed">
          Planning, execution and review brought into one repeatable operating
          rhythm.
        </p>

        <div className="mt-20 flex flex-wrap items-center gap-10 md:gap-16">
  <a
    href="/what-we-solve/start-a-conversation"
    className="group flex items-center gap-4 font-['Space_Grotesk',sans-serif] text-[13px] font-medium uppercase tracking-[0.3em] text-white transition-colors"
  >
    <span>Discuss Your Marketing Operations</span>

<span className={`${accentLine} group-hover:w-10 transition-all`} />   </a>

  <a
    href="/engagements"
    className="group flex items-center gap-4 font-['Space_Grotesk',sans-serif] text-[13px] font-medium uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-white"
  >
    <span>Explore Our Engagements</span>

<span className={`${accentLine} group-hover:w-10 transition-all`} />   </a>
</div>
      </section>

      {/* Start a Conversation */}
      <Conversation/>

      <Footer />
    </div>
  );
};

export default MarketingOperationsSystems;
