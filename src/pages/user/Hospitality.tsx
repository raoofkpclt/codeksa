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
        <div className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/40 uppercase">
          <span>Home</span>
          <span className="text-white/20">/</span>
          <span>Industries</span>
          <span className="text-white/20">/</span>
          <span className="text-white">Hospitality</span>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-16 pb-32">
        <div className="text-xs tracking-[0.2em] text-white/40 uppercase mb-6">
          Hospitality
        </div>
        <h1 className="max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[clamp(72px,11vw,160px)] font-light leading-[0.9] tracking-[-0.06em] text-[var(--code-white)]">
          <span className="font-light">Hospitality,</span>
          <br />
          <span className="font-bold text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">structured.</span>
        </h1>
        <p className="mt-10 max-w-xl text-white/50 text-lg leading-relaxed">
          Food and hospitality businesses do not compete only on taste.
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
              They compete on memory, experience, convenience, visibility and
              the customer&rsquo;s confidence before arrival.
            </p>
            <p className="text-white/50 text-lg leading-relaxed">
              CODE helps hospitality businesses connect brand presence, local
              discovery, content, reviews and customer experience into a clearer
              growth system.
            </p>
          </div>
          <div className="text-xs tracking-[0.2em] text-white/40 uppercase h-fit">
            Relevant For
          </div>
          <div className="max-w-3xl flex flex-wrap items-center gap-x-10 gap-y-6">
            {relevantFor.map((item) => (
              <span
                key={item}
                className="font-['Space_Grotesk',sans-serif] text-2xl md:text-3xl font-light text-white/70 hover:text-white transition-colors cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="hidden md:block" />
        </div>
      </section>

      {/* What CODE May Connect */}
      <section className="max-w-[14300px] mx-auto px-6 md:px-16 py-28 border-t border-white/10">
        <div className="grid min-h-[120px] grid-cols-1 lg:grid-cols-[420px_1fr] gap-16 mb-20">
          {/* Left */}
          <div className="flex items-start">
            <p className="font-['Space_Grotesk',sans-serif] text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
              What CODE May Connect
            </p>
          </div>

          {/* Right */}
          <div className="flex items-end ">
            <h2 className="max-w-[900px]  font-['Space_Grotesk',sans-serif] text-[clamp(50px,5vw,20px)] font-light leading-[0.999] tracking-[-0.06em] text-white">
              The parts that make{" "}
              <span className="font-bold text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">the system.</span>
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid pt-24 md:grid-cols-3  border-l border-white/10">
          {systemParts.map((part) => (
            <div
              key={part}
              className="border-r border-t border-b border-white/10 px-8 py-12 transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <span className="font-['Space_Grotesk',sans-serif] text-center text-[18px] md:text-[28px] font-light tracking-[-0.03em] text-white/80">
                {part}
              </span>
            </div>
          ))}
        </div>
      </section>
      {/* Closing Statement */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-16 py-32 border-t border-white/10">
        <h2 className="max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[clamp(72px,10vw,130px)] font-light leading-[0.9] tracking-[-0.06em] text-[var(--code-white)]">
          <span className="font-light">
            Connect brand memory, local discovery and customer
          </span>

          <span className="font-bold text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">experience.</span>
        </h2>
        <p className="mt-10 max-w-xl text-white/50 text-lg leading-relaxed">
          Food and hospitality businesses win on memory and confidence. CODE
          connects brand, content, reviews and journey into one system.
        </p>

        <div className="mt-20 flex items-center">
  <a
    href="/what-we-solve/start-a-conversation"
    className="group flex items-center gap-4 font-['Space_Grotesk',sans-serif] text-[13px] font-medium uppercase tracking-[0.3em] text-white transition-colors"
  >
    <span>Discuss Your Hospitality Business</span>

  <span className={`${accentLine} group-hover:w-10 transition-all`} /> 
  </a>
</div>
      </section>

      {/* Start a Conversation */}
      <Conversation/>

      <Footer />
    </div>
  );
};

export default Hospitality;
