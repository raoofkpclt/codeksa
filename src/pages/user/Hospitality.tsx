import React from "react";
import NavbarNew from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";


const accentLine =
  "w-6 h-px bg-[#8468FF] inline-block";


const relevantFor = [
  "Restaurants",
  "Cafés",
  "Food trucks",
  "Hospitality groups",
  "Local food businesses",
];

const systemParts = [
  "Brand atmosphere",
  "Menu clarity",
  "Google Maps visibility",
  "Reviews",
  "Food photography",
  "Content planning",
  "Local campaigns",
  "Social media presence",
  "Customer journey",
  "Repeat visit opportunities",
];

const Hospitality: React.FC = () => {
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
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 pt-28 sm:pt-32 md:pt-40 pb-6 sm:pb-10">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs tracking-[0.2em] text-white/40 uppercase">
          <span>Home</span>
          <span className="text-white/20">/</span>
          <span>Industries</span>
          <span className="text-white/20">/</span>
          <span className="text-white">Hospitality</span>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 pb-16 sm:pb-24 md:pb-32">
        <div className="text-xs tracking-[0.2em] text-white/40 uppercase mb-4 sm:mb-6">
          Hospitality
        </div>
        <h1 className="max-w-full md:max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[clamp(40px,11vw,160px)] font-light leading-[0.95] sm:leading-[0.9] tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words">
          <span className="font-light">Hospitality,</span>
          <br />
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
            structured.
          </span>
        </h1>
        <p className="mt-6 sm:mt-8 md:mt-10 max-w-xl text-white/50 text-base sm:text-lg leading-relaxed">
          Food and hospitality businesses do not compete only on taste.
        </p>
      </section>

      {/* The Business Challenge */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-16 sm:py-20 md:py-28 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 sm:gap-10 md:gap-24">
          <div className="text-xs tracking-[0.2em] text-white/40 uppercase h-fit">
            The Business Challenge
          </div>
          <div className="max-w-3xl space-y-6 sm:space-y-8 md:space-y-10">
            <p className="text-xl sm:text-2xl md:text-3xl leading-snug text-white">
              They compete on memory, experience, convenience, visibility and
              the customer&rsquo;s confidence before arrival.
            </p>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed">
              CODE helps hospitality businesses connect brand presence, local
              discovery, content, reviews and customer experience into a
              clearer growth system.
            </p>
          </div>
          <div className="text-xs tracking-[0.2em] text-white/40 uppercase h-fit mt-2 md:mt-0">
            Relevant For
          </div>
          <div className="max-w-3xl flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-5 md:gap-x-10 md:gap-y-6">
            {relevantFor.map((item) => (
              <span
                key={item}
                className="font-['Space_Grotesk',sans-serif] text-lg sm:text-2xl md:text-3xl font-light text-white/70 hover:text-white transition-colors cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="hidden md:block" />
        </div>
      </section>

      {/* What CODE May Connect */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-16 sm:py-20 md:py-28 border-t border-white/10">
        <div className="grid min-h-[80px] sm:min-h-[120px] grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-16 lg:mb-20">
          {/* Left */}
          <div className="flex items-start">
            <p className="font-['Space_Grotesk',sans-serif] text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
              What CODE May Connect
            </p>
          </div>

          {/* Right */}
          <div className="flex items-end">
            <h2 className="max-w-full lg:max-w-[900px] font-['Space_Grotesk',sans-serif] text-[clamp(28px,5vw,64px)] font-light leading-[1.05] sm:leading-[0.999] tracking-[-0.03em] sm:tracking-[-0.06em] text-white break-words">
              The parts that make{" "}
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
                the system.
              </span>
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-l border-t border-white/10">
          {systemParts.map((part) => (
            <div
              key={part}
              className="border-r border-b border-white/10 px-6 sm:px-8 py-8 sm:py-10 md:py-12 flex items-center justify-center text-center transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <span className="font-['Space_Grotesk',sans-serif] text-center text-base sm:text-xl md:text-[28px] font-light tracking-[-0.02em] sm:tracking-[-0.03em] text-white/80">
                {part}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Statement */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-16 sm:py-24 md:py-32 border-t border-white/10">
        <h2 className="max-w-full md:max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[clamp(36px,10vw,130px)] font-light leading-[0.95] sm:leading-[0.9] tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words">
          <span className="font-light">
            Connect brand memory, local discovery and customer{" "}
          </span>
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
            experience.
          </span>
        </h2>
        <p className="mt-6 sm:mt-8 md:mt-10 max-w-xl text-white/50 text-base sm:text-lg leading-relaxed">
          Food and hospitality businesses win on memory and confidence. CODE
          connects brand, content, reviews and journey into one system.
        </p>

        <div className="mt-12 sm:mt-16 md:mt-20 flex items-center">
          <a
            href="/contact"
            className="group flex items-center gap-4 font-['Space_Grotesk',sans-serif] text-[11px] sm:text-[13px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white transition-colors"
          >
            <span>Discuss Your Hospitality Business</span>
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

export default Hospitality;
