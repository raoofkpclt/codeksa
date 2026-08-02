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

const Automotive: React.FC = () => {
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
          <a
            href="/"
            className="hover-glow uppercase transition-colors duration-200"
          >
            <span>Home</span>
            <span className="text-white/20">/</span>
          </a>
          <a
            href="/industries"
            className="hover-glow uppercase transition-colors duration-200"
          >
            <span>Industries</span>
            <span className="text-white/20">/</span>
          </a>

          <span className="text-white">Automotive</span>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-16 pb-32">
        <div className="text-xs tracking-[0.2em] text-white/40 uppercase mb-6">
          Automotive
        </div>
        <h1 className="max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[clamp(72px,11vw,160px)] font-light leading-[0.9] tracking-[-0.06em] text-[var(--code-white)]">
          <span className="font-light">Automotive,</span>
          <br />
          <span className="font-bold">structured.</span>
        </h1>
        <p className="mt-10 max-w-xl text-white/50 text-lg leading-relaxed">
          Automotive businesses are often judged before the customer calls,
          visits or books.
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
              A customer may compare vehicle presentation, reviews, response
              routes, pricing clarity, location information and overall
              professionalism within seconds.
            </p>
            <p className="text-white/50 text-lg leading-relaxed">
              CODE helps automotive businesses strengthen the system behind
              visibility, trust and customer action.
            </p>
          </div>
        </div>
      </section>

      {/* Relevant For */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-16 py-28 border-t border-white/10">
        <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-24">
          <div className="text-xs tracking-[0.2em] text-white/40 uppercase h-fit">
            Relevant For
          </div>
          <div className="flex flex-wrap gap-x-16 gap-y-8">
            {relevantFor.map((item) => (
              <span
                key={item}
                className="text-2xl md:text-4xl font-light text-white/70 hover:text-white transition-colors cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* What CODE May Connect */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-16 py-28 border-t border-white/10">
        <div className="grid min-h-[150px] grid-cols-1 lg:grid-cols-[420px_1fr] gap-16">
          {/* Left */}
          <div className="flex items-start">
            <p className="font-['Space_Grotesk',sans-serif] text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
              What CODE May Connect
            </p>
          </div>

          {/* Right */}
          <div className="flex items-end justify-end">
            <h2 className="text-4xl md:text-6xl font-light">
              {" "}
              The parts that make{" "}
              <span className="font-semibold">the system.</span>{" "}
            </h2>
          </div>
        </div>
        <div className="grid pt-24 text-center md:grid-cols-3  border-white/10">
          {systemParts.map((part) => (
            <div
              key={part}
              className="py-10 md:py-16 px-2 border-b md:border-r border-white/10 last:border-r-0"
            >
              <span className="text-s md:text-2xl font-light text-white/70">
                {part}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Statement */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-16 py-32 border-t border-white/10">
        <h2 className="max-w-[1500px] font-['Space_Grotesk',sans-serif] text-[clamp(72px,10vw,130px)] font-light leading-[0.999] tracking-[-0.06em] text-[var(--code-white)]">
          <span className="font-light">
            Strengthen the system behind visibility, trust and{" "}
            <span className="font-bold">customer action.</span>
          </span>
        </h2>
        <p className="mt-10 max-w-xl text-white/50 text-lg leading-relaxed">
          From Google Business Profile to enquiry pathways, CODE connects the
          moments that shape an automotive customer&rsquo;s decision.
        </p>

        <div className="mt-20 flex flex-wrap items-center gap-10">
  <a
    href="/what-we-solve/start-a-conversation"
    className="group flex items-center gap-4 font-['Space_Grotesk',sans-serif] text-[13px] font-medium uppercase tracking-[0.3em] text-white transition-colors"
  >
    <span>Discuss Your Automotive Business</span>

    <span className="h-px w-10 bg-gradient-to-r from-fuchsia-400 to-violet-500 transition-all duration-300 group-hover:w-16" />
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
