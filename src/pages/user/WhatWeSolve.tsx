import React, { useEffect, useRef, useState } from "react";
import NavbarNew from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";



const PATHWAYS = [
  {
    index: "01",
    category: "Strategy & Growth",
    headlinePlain: "Direction before ",
    headlineBold: "activity.",
    body: "We clarify where growth should come from and build the strategic structure required to move towards it.",
    exploreLabel: "Explore Strategy & Growth",
    href: "/strategy-growth",
  },
  {
    index: "02",
    category: "Brand & Creative",
    headlinePlain: "Meaning before ",
    headlineBold: "visibility.",
    body: "We build brands people can understand, trust and remember — then translate them into consistent experiences.",
    exploreLabel: "Explore Brand & Creative",
    href: "/brand-creative",
  },
  {
    index: "03",
    category: "Digital & Performance",
    headlinePlain: "Presence with ",
    headlineBold: "purpose.",
    body: "We connect digital experience, visibility and performance to measurable business outcomes.",
    exploreLabel: "Explore Digital & Performance",
    href: "/digital-performance",
  },
  {
    index: "04",
    category: "Marketing Operations & Systems",
    headlinePlain: "Structure before ",
    headlineBold: "scale.",
    body: "We turn marketing into a connected, repeatable operating rhythm.",
    exploreLabel: "Explore Marketing Operations",
    href: "/marketing-operations-systems",
  },
];

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

const PathwaySection = ({
  item,
  active,
}: {
  item: (typeof PATHWAYS)[number];
  active: boolean;
}) => (
  <div
    className={`border-t border-[var(--steel)] py-10 sm:py-16 transition-opacity duration-500 md:py-24 ${
      active ? "opacity-100" : "opacity-45"
    }`}
  >
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
      <span className="font-['Space_Grotesk',sans-serif] text-[12px] sm:text-[13px] tracking-[0.2em] text-[var(--slate-muted)]">
        {item.index}
      </span>
      <span
        className={`font-['Space_Grotesk',sans-serif] text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.30em] transition-colors duration-500 ${
          active ? "text-[var(--code-purple)]" : "text-[var(--slate-muted)]"
        }`}
      >
        {item.category}
      </span>
    </div>

    <h2
      className={`mt-5 sm:mt-8 font-['Space_Grotesk',sans-serif] text-[32px] leading-[1.12] sm:text-[44px] sm:leading-[1.1] md:text-[clamp(48px,6vw,72px)] md:leading-[1.08] transition-colors duration-500 ${
        active ? "text-[var(--code-white)]" : "text-[var(--slate-muted)]"
      }`}
    >
      <span className="font-light">{item.headlinePlain}</span>
      <span className="font-bold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">{item.headlineBold}</span>
    </h2>

    <p className="mt-5 sm:mt-8 max-w-[560px] font-['Space_Grotesk',sans-serif] text-[14px] sm:text-[16px] leading-[1.6] text-[var(--mist)]">
      {item.body}
    </p>

    <div className="mt-8 sm:mt-10">
      <ExploreLink label={item.exploreLabel} href={item.href} />
    </div>
  </div>
);

const WhatWeSolve: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.index ?? 0,
            );
            setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

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

      <main className="mx-auto max-w-[1440px] px-5 pt-28 pb-20 sm:px-8 sm:pt-32 sm:pb-24 md:px-16 md:pt-[168px] md:pb-32">
        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center gap-3 font-['Space_Grotesk',sans-serif] text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.24em] text-[var(--slate-muted)] md:mb-10">
          <a
            href="/"
            className="hover-glow uppercase transition-colors duration-200"
          >
            Home
          </a>
          <span>/</span>
          <span className="uppercase text-[var(--code-white)]">
            What We Solve
          </span>
        </div>

        {/* PageHero */}
        <span className="mb-6 block font-['Space_Grotesk',sans-serif] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.30em] text-[var(--slate-muted)] md:mb-8">
          What We Solve
        </span>

        <h1 className="font-['Space_Grotesk',sans-serif] text-[44px] font-light leading-[1] tracking-[-0.02em] sm:text-[64px] sm:leading-[0.95] sm:tracking-[-0.04em] md:text-[clamp(88px,9vw,160px)] md:leading-[0.88] md:tracking-[-0.08em]">
          <span className="text-[var(--code-white)]">Four pathways.</span>
          <br />
          <span className="font-bold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">One system.</span>
        </h1>
        <p className="mt-6 max-w-[620px] font-['Space_Grotesk',sans-serif] text-[15px] leading-[1.6] text-[var(--mist)] sm:mt-8 sm:text-[16px] md:mt-10 md:text-[17px]">
          CODE connects the disciplines required to help a business move with
          more clarity, consistency and measurable direction.
        </p>

        {/* Pathways */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          {PATHWAYS.map((item, i) => (
            <div
              key={item.index}
              data-index={i}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
            >
              <PathwaySection item={item} active={activeIndex === i} />
            </div>
          ))}
        </div>

        {/* Page-specific closing statement */}
        <div className="border-t border-[var(--steel)] pt-12 sm:pt-16 md:pt-24">
          <h2 className="max-w-[1100px] font-['Space_Grotesk',sans-serif] text-[36px] font-light leading-[1.1] tracking-[-0.02em] text-[var(--code-white)] sm:text-[56px] sm:leading-[1.05] sm:tracking-[-0.04em] md:text-[clamp(72px,10vw,160px)] md:leading-[0.999] md:tracking-[-0.08em]">
  Start with the pathway closest to your current business{" "}
  <span className="font-bold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">requirement.</span>
</h2>
          <p className="mt-5 max-w-[560px] font-['Space_Grotesk',sans-serif] text-[14px] leading-[1.6] text-[var(--mist)] sm:mt-6 sm:text-[16px]">
            Each pathway can begin as a focused engagement or as part of a wider
            system, depending on what the business needs first.
          </p>
          <div className="mt-8 sm:mt-10">
            <ExploreLink
              label="Start a Conversation"
              href="/contact"
            />
          </div>
        </div>
      </main>

      {/* CTASection */}
      

      <Conversation />

      <Footer />
    </div>
  );
};

export default WhatWeSolve;
