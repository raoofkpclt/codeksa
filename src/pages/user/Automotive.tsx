import React from "react";
import NavbarNew from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

const relevantFor = [
  "Car rental companies",
  "Car dealerships",
  "Auto services",
  "Workshops",
  "Specialist automotive businesses",
];

const systemParts = [
  "Google Business Profile",
  "Local search visibility",
  "Fleet or service presentation",

  "Brand credibility",
  "Website or landing page experience",
  "Social media structure",

  "Campaign planning",
  "Review and trust signals",
  "WhatsApp and enquiry pathways",

  "Performance reporting",
];

//  <span className={`${accentLine} group-hover:w-10 transition-all`} />
const accentLine =
  "w-6 h-px bg-[#8468FF] inline-block";

const Automotive: React.FC = () => {
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
          <a
            href="/"
            className="hover-glow uppercase transition-colors duration-200 flex items-center gap-2 sm:gap-3"
          >
            <span>Home</span>
            <span className="text-white/20">/</span>
          </a>
          <a
            href="/industries"
            className="hover-glow uppercase transition-colors duration-200 flex items-center gap-2 sm:gap-3"
          >
            <span>Industries</span>
            <span className="text-white/20">/</span>
          </a>

          <span className="text-white">Automotive</span>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 pb-14 sm:pb-20 md:pb-32">
        <div className="text-xs tracking-[0.2em] text-white/40 uppercase mb-4 sm:mb-6">
          Automotive
        </div>
        <h1 className="max-w-full md:max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[clamp(36px,11vw,160px)] font-light leading-[0.95] sm:leading-[0.9] tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words">
          <span className="font-light">Automotive,</span>
          <br />
          <span
            className="font-bold text-white
    transition-all
    duration-500
    ease-out
    hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]"
          >
            structured.
          </span>
        </h1>
        <p className="mt-6 sm:mt-8 md:mt-10 max-w-xl text-white/50 text-base sm:text-lg leading-relaxed">
          Automotive businesses are often judged before the customer calls,
          visits or books.
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
              A customer may compare vehicle presentation, reviews, response
              routes, pricing clarity, location information and overall
              professionalism within seconds.
            </p>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed">
              CODE helps automotive businesses strengthen the system behind
              visibility, trust and customer action.
            </p>
          </div>
        </div>
      </section>

      {/* Relevant For */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 sm:gap-8 md:gap-24">
          <div className="text-xs tracking-[0.2em] text-white/40 uppercase h-fit">
            Relevant For
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-5 md:gap-x-16 md:gap-y-8">
            {relevantFor.map((item) => (
              <span
                key={item}
                className="text-lg sm:text-2xl md:text-4xl font-light text-white/70 hover:text-white transition-colors cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* What CODE May Connect */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-14 sm:py-16 md:py-28 border-t border-white/10">
        <div className="grid min-h-0 sm:min-h-[150px] grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 sm:gap-8 md:gap-16">
          {/* Left */}
          <div className="flex items-start">
            <p className="font-['Space_Grotesk',sans-serif] text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
              What CODE May Connect
            </p>
          </div>

          {/* Right */}
          <div className="flex items-start lg:items-end justify-start lg:justify-end">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-light leading-tight break-words">
              {" "}
              The parts that make{" "}
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
                the system.
              </span>{" "}
            </h2>
          </div>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-10 sm:pt-12 md:pt-24 text-center">
          {systemParts.map((part) => (
            <div
              key={part}
              className=" py-8 sm:py-10 md:py-16 px-2  "
            >
              <span className="text-base sm:text-lg md:text-2xl font-light text-white/70">
                {part}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Statement */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 py-16 sm:py-20 md:py-32 border-t border-white/10">
        <h2 className="max-w-full md:max-w-[1500px] font-['Space_Grotesk',sans-serif] text-[clamp(32px,10vw,130px)] font-light leading-[1.05] sm:leading-[0.999] tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words">
          <span className="font-light">
            Strengthen the system behind visibility, trust and{" "}
            <span
              className="font-bold text-white
    transition-all
    duration-500
    ease-out
    hover:text-[#8468FF]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]"
            >
              customer action.
            </span>
          </span>
        </h2>
        <p className="mt-6 sm:mt-8 md:mt-10 max-w-xl text-white/50 text-base sm:text-lg leading-relaxed">
          From Google Business Profile to enquiry pathways, CODE connects the
          moments that shape an automotive customer&rsquo;s decision.
        </p>

        <div className="mt-10 sm:mt-12 md:mt-20 flex flex-wrap items-center gap-6 sm:gap-10">
          <a
            href="/contact"
            className="group flex items-center gap-4 font-['Space_Grotesk',sans-serif] text-[11px] sm:text-[13px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white transition-colors"
          >
            <span>Discuss Your Automotive Business</span>

            <span className={`${accentLine} group-hover:w-10 transition-all`} />{" "}
          </a>
        </div>
      </section>

      {/* Start a Conversation */}
      <Conversation />

      <Footer />
    </div>
  );
};

export default Automotive;
