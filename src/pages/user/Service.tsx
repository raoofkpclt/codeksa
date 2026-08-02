import React, { useEffect, useRef, useState } from "react";
import NavbarNew from "../../components/user/NavbarNew";
import Footer from "../../components/user/Footer";
import Conversation from "../../components/user/Conversation";

/* ------------------------------------------------------------------
   CODE — Services  (/services)

   Rebuilt to match the /what-we-solve visual system exactly:
     - Same CSS custom properties (--charcoal / --steel / --code-purple / --mist)
     - Same breadcrumb, PageHero, scroll-spy SectionBlock pattern
     - Same ExploreLink / glow-text treatment
     - Shared <Conversation /> closing block + <Footer />
------------------------------------------------------------------- */

const SERVICES = [
  {
    index: "01",
    category: "Strategy",
    
    headlineBold: "Strategy",
    body: "Strategic direction for businesses that need clearer growth priorities, market understanding and a practical route forward.",
    left: ["Marketing Strategy", "Market & Competitive Research", "Campaign Strategy"],
    right: ["Business Growth Strategy", "Go-to-Market Planning"],
  },
  {
    index: "02",
    category: "Brand",
    // headlinePlain: "Meaning before ",
    headlineBold: "Brand",
    body: "Brand systems that help businesses become easier to understand, recognise, trust and remember.",
    left: ["Brand Strategy", "Brand Identity", "Brand Guidelines"],
    right: ["Brand Positioning", "Verbal Identity", "Campaign Creative"],
  },
  {
    index: "03",
    category: "Digital",
    // headlinePlain: "Presence with ",
    headlineBold: "Digital.",
    body: "Digital presence built around customer journeys, visibility, measurement and business outcomes.",
    left: ["Website Strategy", "Search Engine Optimisation", "Google Business Profile", "Landing Pages"],
    right: ["Website Design & Development", "Local Search", "Paid Media", "Analytics"],
  },
  {
    index: "04",
    category: "Marketing Operations",
    // headlinePlain: "Structure before ",
    headlineBold: "Marketing Operations",
    body: "The structure required to plan, coordinate, publish, measure and improve marketing activity.",
    left: ["Social Media Management", "Campaign Planning", "CRM & Customer Journey Integration"],
    right: ["Content Planning", "Marketing Automation", "Performance Review & Optimisation"],
  },
  {
    index: "05",
    category: "Content & Production",
    // headlinePlain: "Craft with ",
    headlineBold: "Content & Production",
    body: "Purposeful creative and production assets developed to support brand communication, campaigns and platform-specific execution.",
    left: ["Content Creative", "Videography", "Short-form Video"],
    right: ["Photography", "Motion Graphics", "Campaign Assets"],
  },
  {
    index: "06",
    category: "CODE Hub™",
    // headlinePlain: "Optional, when the ",
    headlineBold: "CODE Hub",
    body: "An add-on for selected engagements. Speak to a CODE representative to learn more.",
    left: [],
    right: [],
  },
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

const ServiceSection = ({
  item,
  active,
}: {
  item: (typeof SERVICES)[number];
  active: boolean;
}) => (
  <div
  className={`border-t border-[var(--steel)] py-20 md:py-28 transition-opacity duration-500 ${
    active ? "opacity-100" : "opacity-45"
  }`}
>
  <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-16 lg:gap-28">
    {/* LEFT */}
    <div className="flex flex-col">
      <span className="font-['Space_Grotesk',sans-serif] text-[13px] uppercase tracking-[0.25em] text-[var(--slate-muted)]">
        {item.index}
      </span>

      <h2
        className={`mt-8 font-['Space_Grotesk',sans-serif] text-[clamp(42px,3vw,64px)] font-light leading-[0.95] tracking-[-0.05em] transition-colors duration-500 ${
          active
            ? "text-[var(--code-white)]"
            : "text-[var(--slate-muted)]"
        }`}
      >
        {item.category}
      </h2>
    </div>

    {/* RIGHT */}
    <div className="max-w-[820px]">
      <p className="font-['Space_Grotesk',sans-serif] text-[20px] leading-[1.75] text-[var(--mist)]">
        {item.body}
      </p>

      {(item.left.length > 0 || item.right.length > 0) && (
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-5">
          <ul className="space-y-4">
            {item.left.map((i) => (
              <li
                key={i}
                className="font-['Space_Grotesk',sans-serif] text-[17px] text-[var(--code-white)]"
              >
                {i}
              </li>
            ))}
          </ul>

          <ul className="space-y-4">
            {item.right.map((i) => (
              <li
                key={i}
                className="font-['Space_Grotesk',sans-serif] text-[17px] text-[var(--code-white)]"
              >
                {i}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
</div>
);

const Service :React.FC = () => {
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
          <span className="uppercase text-[var(--code-white)]">Services</span>
        </div>

        {/* PageHero */}
        <span className="mb-8 block font-['Space_Grotesk',sans-serif] text-[11px] font-medium uppercase tracking-[0.30em] text-[var(--slate-muted)]">
          Services
        </span>

        <h1 className="max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[clamp(72px,10vw,160px)] font-light leading-[0.9] tracking-[-0.06em] text-[var(--code-white)]">
  <span className="font-light">
    Capabilities connected by {" "}
  </span>

  <span className="font-bold">
    one system.
  </span>
</h1>

        <p className="mt-10 max-w-[620px] font-['Space_Grotesk',sans-serif] text-[17px] leading-[1.6] text-[var(--mist)]">
          CODE services are not isolated outputs. They are capabilities
          connected around business direction, brand clarity, digital
          performance and operational structure.
        </p>

        {/* Services */}
        <div className="mt-20">
          {SERVICES.map((item, i) => (
            <div
              key={item.index}
              data-index={i}
              ref={(el) => {(sectionRefs.current[i] = el)}}
            >
              <ServiceSection item={item} active={activeIndex === i} />
            </div>
          ))}
        </div>

        {/* Page-specific closing statement */}
        <div className="border-t border-[var(--steel)] pt-16 md:pt-24">
          <h2 className="max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[clamp(72px,11vw,160px)] font-light leading-[0.9] tracking-[-0.06em] text-[var(--code-white)]">
  <span className="font-light">
    Start with the business{" "}
  </span>

  <span className="font-bold ">
    requirement.
  </span>
</h2>
          <p className="mt-6 max-w-[560px] font-['Space_Grotesk',sans-serif] text-[16px] leading-[1.6] text-[var(--mist)]">
            The right service depends on the challenge, the required outcome
            and the structure already in place.
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

export default Service;
