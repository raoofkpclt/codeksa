import React, { type ReactNode, useState } from 'react';
import Footer from '../../components/user/Footer';
import NavbarNew from '../../components/user/NavbarNew';
import Conversation from '../../components/user/Conversation';


const capabilities = [
  {
    num: '01',
    title: 'Brand Strategy',
    text: 'Define the role, direction and long-term meaning of the brand. Establish the foundation every creative decision can be anchored to.',
  },
  {
    num: '02',
    title: 'Brand Positioning',
    text: 'Clarify what the brand stands for, who it serves and why it should be chosen. Give the business a distinct place in the mind of its customers.',
  },
  {
    num: '03',
    title: 'Brand Identity',
    text: 'Develop or refine the visual system representing the business consistently and distinctively. Design an identity that scales across formats, teams and time.',
  },
  {
    num: '04',
    title: 'Verbal Identity & Messaging',
    text: 'Create a clear language system for how the brand communicates across audiences and channels. Turn tone and message into a repeatable craft.',
  },
  {
    num: '05',
    title: 'Brand Guidelines',
    text: 'Build practical standards supporting consistency across internal teams, agencies and future applications. Protect the brand as it grows.',
  },
  {
    num: '06',
    title: 'Campaign Creative',
    text: 'Translate strategic campaign ideas into distinctive visual and communication systems. Move from concept to a campaign that behaves as one.',
  },
  {
    num: '07',
    title: 'Content Creative',
    text: 'Develop intentional creative assets designed around the platform, audience and communication objective. Every asset earns its place.',
  },
  {
    num: '08',
    title: 'Photography & Videography',
    text: "Create purposeful visual content aligned with the brand's identity, market and customer experience. Original imagery, produced to a considered standard.",
  },
  {
    num: '09',
    title: 'Motion & Visual Storytelling',
    text: 'Use motion design and visual narratives to explain ideas and strengthen communication. Bring depth and rhythm to how the brand moves.',
  },
];

const outcomes = [
  { num: '01', text: 'Clearer brand meaning' },
  { num: '02', text: 'Stronger recognition' },
  { num: '03', text: 'Greater communication consistency' },
  { num: '04', text: 'More coherent customer experiences' },
];

const industries = [
  'Hospitality',
  'Retail',
  'Real Estate',
  'Automotive',
  'Healthcare',
  'Professional Services',
];

const otherPathways = [
  { num: '01', title: 'Strategy & Growth' },
  { num: '03', title: 'Digital & Performance' },
  { num: '04', title: 'Marketing Operations & Systems' },
];
interface EyebrowProps {
  children: ReactNode;
}

function Eyebrow({ children }: EyebrowProps) {
  return (
    <p className="text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500 uppercase mb-4 sm:mb-6">
      {children}
    </p>
  );
}
interface Capability {
  num: string;
  title: string;
  text: string;
}

interface AccordionRowProps {
  item: Capability;
  isOpen: boolean;
  onToggle: () => void;
}
function AccordionRow({ item, isOpen, onToggle }: AccordionRowProps) {
  return (
    <div className="border-t border-neutral-800 last:border-b">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 sm:gap-8 py-6 sm:py-10 text-left group"
      >
        <div className="flex items-baseline gap-3 sm:gap-6 md:gap-10 min-w-0">
          <span className="text-xs sm:text-sm text-neutral-500 tabular-nums pt-2 shrink-0">
            {item.num}
          </span>
          <span className="text-xl sm:text-3xl md:text-5xl font-light text-neutral-200 group-hover:text-white transition-colors leading-tight sm:leading-none break-words">
            {item.title}
          </span>
        </div>
        <span className="text-xl sm:text-2xl text-neutral-400 shrink-0 pt-1 w-6 text-center">
          {isOpen ? '\u00D7' : '+'}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: isOpen ? '500px' : '0px' }}
      >
        <p className="pl-8 sm:pl-[5.75rem] pr-4 sm:pr-10 pb-8 sm:pb-10 text-neutral-400 text-base sm:text-lg leading-relaxed max-w-2xl">
          {item.text}
        </p>
      </div>
    </div>
  );
}


const accentLine =
  "w-6 h-px bg-[#8468FF] inline-block";

const BrandCreative: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(2);

  return (
    <>

      <NavbarNew />

      <div className="min-h-screen bg-black text-white font-inter selection:bg-violet-300 selection:text-black overflow-x-hidden">
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



        <main className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
          {/* ---------------- BREADCRUMB ---------------- */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-24 sm:pt-36 md:pt-40 text-[10px] sm:text-[11px] tracking-[0.2em] text-neutral-500">

            <a href="/" className="hover-glow uppercase transition-colors duration-200"><span>HOME</span></a>
            <span>/</span>
            <a href="/what-we-solve" className="hover-glow uppercase transition-colors duration-200">
              <span>WHAT WE SOLVE</span>
            </a>

            <span>/</span>
            <span className="font-semibold text-white">BRAND &amp; CREATIVE</span>
          </div>

          {/* Hero */}
          <section className="pb-16 sm:pb-28 md:pb-40 pt-10 sm:pt-16 md:pt-24">
            <div className="flex items-center gap-3 mb-6 sm:mb-10">
              <span className="text-sm text-neutral-500 tabular-nums">02</span>
              <span className="text-sm tracking-[0.2em] text-[var(--code-purple)] uppercase">
                Brand & Creative
              </span>
            </div>
            <h1 className="max-w-full md:max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[clamp(40px,11vw,160px)] font-light leading-[1] sm:leading-[0.999] tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words">
              <span className="font-light">Meaning before </span>

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
                visibility.
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed">
              We build brands people can understand, trust and remember — then
              translate them into consistent experiences.
            </p>
          </section>

          {/* Business challenge */}
          <section className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 sm:gap-16 pb-16 sm:pb-28 md:pb-40 border-t border-neutral-800 pt-10 sm:pt-16">
            <Eyebrow>The business challenge</Eyebrow>
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl text-neutral-200 leading-snug mb-6 sm:mb-8 max-w-3xl">
                Visibility creates attention, but attention alone does not build
                preference. When positioning, identity and communication are
                disconnected, customers may see a business without understanding
                why it matters.
              </p>
              <p className="text-neutral-500 text-base sm:text-lg max-w-2xl">
                CODE connects strategy, identity, messaging and creative
                execution into one coherent brand system.
              </p>
            </div>
          </section>

          {/* How CODE helps */}
          <section className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 sm:gap-16 pb-16 sm:pb-28 md:pb-40 border-t border-neutral-800 pt-10 sm:pt-16">
            <Eyebrow>How CODE helps</Eyebrow>
            <p className="text-xl sm:text-2xl md:text-3xl text-neutral-200 leading-snug max-w-3xl">
              We shape the meaning of the brand first, then design the visual,
              verbal and experiential system that carries that meaning
              consistently across every customer moment.
            </p>
          </section>

          {/* Capabilities */}
          <section className="pb-16 sm:pb-28 md:pb-40 border-t border-neutral-800 pt-10 sm:pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 sm:gap-16 mb-4">
              <Eyebrow>Capabilities</Eyebrow>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight max-w-3xl">
                The disciplines{" "}
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
                  this pathway connects.
                </span>
              </h2>
            </div>
            <div>
              {capabilities.map((item, i) => (
                <AccordionRow
                  key={item.num}
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </section>

          {/* Connected outcomes */}
          <section className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 sm:gap-16 pb-16 sm:pb-28 md:pb-40 border-neutral-800 pt-10 sm:pt-16">
            <div>
              <Eyebrow>Connected outcomes</Eyebrow>
              <h2 className="mt-4 sm:mt-6 font-serif-display text-[26px] leading-tight sm:text-[34px] md:text-[42px]">
                What clients tend
                <br />
                to{" "}
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
                </span>
              </h2>
            </div>
            <div>
              {outcomes.map((o) => (
                <div
                  key={o.num}
                  className="flex items-baseline gap-4 sm:gap-8 py-6 sm:py-10 border-t border-neutral-800 last:border-b"
                >
                  <span className="text-xs sm:text-sm text-neutral-500 tabular-nums shrink-0">
                    {o.num}
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl text-neutral-200 font-light">
                    {o.text}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Related industries */}

          <section className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 sm:gap-16 pb-16 sm:pb-28 md:pb-40 border-t border-neutral-800 pt-10 sm:pt-16">
            <div>
              <Eyebrow>Related industries</Eyebrow>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
                Where this
                <br />
                pathway{" "}
                <span
                  className="font-medium text-white
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
              </h2>
            </div>
            <div className="flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-4 sm:gap-y-6 content-start">
              {industries.map((ind) => (
                <span
                  key={ind}
                  className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-light"
                >
                  {ind}
                </span>
              ))}
            </div>
          </section>

          {/* Other pathways */}
          <section className="pb-16 sm:pb-28 md:pb-40 border-neutral-800 pt-10 sm:pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 sm:gap-16 mb-4">
              <Eyebrow>Continue through the system</Eyebrow>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
                Other pathways.{" "}
                <span
                  className="font-medium text-white
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
            <div>
              {otherPathways.map((p) => (
                <a
                  key={p.num}
                  href="#"
                  className="flex items-center justify-between gap-4 py-6 sm:py-10 border-t border-neutral-800 last:border-b group"
                >
                  <div className="flex items-baseline gap-3 sm:gap-6 md:gap-10 min-w-0">
                    <span className="text-xs sm:text-sm text-neutral-500 tabular-nums shrink-0">
                      {p.num}
                    </span>
                    <span className="text-xl sm:text-3xl md:text-5xl font-light text-neutral-300 group-hover:text-white transition-colors break-words">
                      {p.title}
                    </span>
                  </div>
                  <span className="text-xl sm:text-2xl shrink-0 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all">
                    &#8594;
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="pb-20 sm:pb-32 border-t border-neutral-800 pt-10 sm:pt-16">
            <h2 className="max-w-full md:max-w-[1200px] font-['Space_Grotesk',sans-serif] text-[clamp(34px,12vw,130px)] font-light leading-[1.05] sm:leading-[0.999] tracking-[-0.04em] sm:tracking-[-0.06em] text-[var(--code-white)] break-words">
              <span className="font-light">Clarify what the </span>

              <span className="font-light">brand should mean </span>

              <span className="font-light">
                before increasing{" "}
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
                  visibility.
                </span>
              </span>
            </h2>
            <p className="mt-8 sm:mt-12 max-w-[760px] font-['Space_Grotesk',sans-serif] text-[17px] sm:text-[20px] md:text-[24px] font-light leading-[1.6] sm:leading-[1.8] tracking-[-0.01em] sm:tracking-[-0.02em] text-white/55">
              Positioning, identity, messaging and creative execution
              shaped into one coherent brand system.
            </p>
            <div className="mt-10 sm:mt-16 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-6 sm:gap-10 md:gap-16">
              <a
                href="/contact"
                className="group flex items-center gap-4 font-['Space_Grotesk',sans-serif] text-[11px] sm:text-[13px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white transition-colors"
              >
                <span>Discuss your brand</span>

                <span className={`${accentLine} group-hover:w-10 transition-all`} />
              </a>

              <a
                href="/engagements"
                className="group flex items-center gap-4 font-['Space_Grotesk',sans-serif] text-[11px] sm:text-[13px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/50 transition-colors hover:text-white"
              >
                <span>Explore our engagements</span>

                <span className={`${accentLine} group-hover:w-10 transition-all`} />
              </a>
            </div>
          </section>
          <Conversation />
        </main>
        <Footer />
      </div>
    </>

  );
};

export default BrandCreative;
