import React from 'react'
import NavbarNew from '../../components/user/NavbarNew'
import Footer from '../../components/user/Footer'

interface Industry {
  index: string
  title: string
  description: string
  showExplore: boolean
}

const industries: Industry[] = [
  {
    index: '01',
    title: 'Automotive',
    description:
      'For car rentals, dealerships, workshops and automotive service businesses where trust, visibility and response speed shape customer decisions.',
    showExplore: true,
  },
  {
    index: '02',
    title: 'Hospitality',
    description:
      'For restaurants, cafés, food trucks and hospitality brands competing on memory, experience, convenience and local demand.',
    showExplore: true,
  },
  {
    index: '03',
    title: 'Retail',
    description:
      'For retail and commerce businesses requiring clearer brand presence, customer journeys and measurable campaigns.',
    showExplore: true,
  },
  {
    index: '04',
    title: 'Professional Services',
    description:
      'For service-led businesses where credibility, clarity and trust are central to growth.',
    showExplore: true,
  },
  {
    index: '05',
    title: 'Real Estate',
    description:
      'For property and real estate businesses requiring stronger positioning, visibility and lead quality.',
    showExplore: true,
  },
  {
    index: '06',
    title: 'Healthcare',
    description:
      'For healthcare and wellness businesses where clarity, trust and professional presentation matter.',
    showExplore: true,
  },
  {
    index: '07',
    title: 'Construction',
    description:
      'For construction and built-environment businesses requiring credibility, visibility and structured business development support.',
    showExplore: true,
  },
  {
    index: '08',
    title: 'Industrial',
    description:
      'For industrial, manufacturing and supplier businesses requiring clearer market positioning and B2B communication.',
    showExplore: true,
  },
  {
    index: '09',
    title: 'Growing Businesses',
    description:
      'For SMEs and startups that need stronger foundations before increasing marketing activity.',
    showExplore: true,
  },
]

const Industries: React.FC = () => {
  return (
    <div className="bg-black text-white">
      <style>{`
        :root {
          --slate-muted: #7D7D86;
          --code-white: #FFFFFF;
          --violet-glow: #9B83FF;
        }

        .hover-glow:hover {
          color: var(--violet-glow) !important;
          text-shadow: 0 0 14px rgba(155, 131, 255, 0.55);
        }
      `}</style>

      <NavbarNew />

      {/* Hero */}
      <main className="mx-auto max-w-[1440px] px-6 pt-[168px] pb-32 md:px-16">
{/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-3 font-['Space_Grotesk',sans-serif] text-[11px] tracking-[0.24em] text-[var(--slate-muted)]">
          <a href="/" className="hover-glow uppercase transition-colors duration-200">
            Home
          </a>
         <span>/</span>
          <span className="uppercase text-[var(--code-white)]">Industries</span>
        </div>
      
        
        
          <p className="text-xs tracking-[0.3em] text-white/40 mb-6">INDUSTRIES</p>

          <h1 className="font-light text-[13vw] leading-[0.95] md:text-[6.5vw] md:leading-[0.95] tracking-tight">
            The scope
            <br />
            changes. <span className="font-semibold">The</span>
            <br className="hidden md:block" />
            <span className="font-semibold">standard does not.</span>
          </h1>

          <p className="mt-10 max-w-md text-white/50 text-lg leading-relaxed">
            CODE adapts its systems to the realities of each market, audience and
            business model.
          </p>
        
     
      </main>

      {/* Industries grid */}
      <section className="border-t border-white/10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3">
          {industries.map((industry, i) => (
            <div
              key={industry.index}
              className={`
                px-6 md:px-10 lg:px-14 py-16 md:py-20
                border-b border-white/10
                ${(i + 1) % 3 !== 0 ? 'md:border-r md:border-white/10' : ''}
              `}
            >
              <span className="text-xs tracking-[0.2em] text-white/40">
                {industry.index}
              </span>

              <h2 className="mt-8 mb-6 text-3xl md:text-[2.2rem] font-light leading-tight">
                {industry.title}
              </h2>

              <p className="text-white/50 leading-relaxed max-w-xs">
                {industry.description}
              </p>

              {industry.showExplore && (
                <button className="mt-10 flex items-center gap-3 text-xs tracking-[0.2em] text-white/70 hover:text-white transition-colors group">
                  EXPLORE
                  <span className="w-6 h-px bg-gradient-to-r from-fuchsia-400 to-violet-500 group-hover:w-10 transition-all" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Discuss your market */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-24 md:py-36">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="font-light text-[11vw] leading-[0.95] md:text-[5.2vw] md:leading-[0.95] tracking-tight max-w-5xl">
            Discuss how CODE&rsquo;s
            <br />
            system applies to
            <br />
            your <span className="font-semibold">market.</span>
          </h2>

          <p className="mt-10 max-w-xl text-white/50 text-lg leading-relaxed">
            Each industry brings a different set of customer expectations, decision
            drivers and competitive realities. CODE adapts the system accordingly.
          </p>

          <button className="mt-14 flex items-center gap-3 text-xs tracking-[0.2em] text-white/70 hover:text-white transition-colors group">
            DISCUSS YOUR INDUSTRY CONTEXT
            <span className="w-8 h-px bg-gradient-to-r from-fuchsia-400 to-violet-500 group-hover:w-12 transition-all" />
          </button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-24 md:py-36">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          <div>
            <p className="text-xs tracking-[0.2em] text-white/40 mb-10">
              START A CONVERSATION
            </p>

            <h2 className="font-light text-[11vw] leading-[0.95] md:text-[4.8vw] md:leading-[0.95] tracking-tight max-w-xl">
              Let&rsquo;s clarify
              <br />
              what your
              <br />
              business needs
            </h2>

            <p className="mt-10 max-w-md text-white/50 text-lg leading-relaxed">
              Start with a conversation about the challenge, the required outcome
              and the right place to begin.
            </p>
          </div>

          <div className="md:pt-2">
            <span className="font-bold text-[13vw] md:text-[5vw] leading-none">
              next.
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Industries
