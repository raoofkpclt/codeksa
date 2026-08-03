import React from 'react'
import NavbarNew from '../../components/user/NavbarNew'
import Footer from '../../components/user/Footer'
import Conversation from '../../components/user/Conversation'

interface EngagementTier {
  number: string
  title: string
  tagline: string
  bestFor: string
  addresses: string[]
  mayInclude: string[]
}

const tiers: EngagementTier[] = [
  {
    number: '01',
    title: 'CODE Essentials',
    tagline: 'One focused requirement. One defined scope.',
    bestFor: 'A specific project, deliverable or specialist need.',
    addresses: [
      'One contained requirement',
      'Limited internal specialist capacity',
      'A focused project or deliverable',
    ],
    mayInclude: [
      'One strategy',
      'One campaign',
      'One video',
      'One landing page',
      'One design requirement',
      'One defined creative or digital project',
    ],
  },
  {
    number: '02',
    title: 'Foundation',
    tagline: 'Build the right structure.',
    bestFor:
      'Businesses establishing or correcting strategic, brand, digital or marketing foundations.',
    addresses: [
      'Unclear priorities',
      'Inconsistent brand or messaging',
      'Reactive marketing',
      'Weak strategic or digital foundations',
    ],
    mayInclude: [
      'Business and marketing diagnostic',
      'Market and audience direction',
      'Brand positioning',
      'Marketing strategy',
      'Website direction',
      'Priority roadmap',
    ],
  },
  {
    number: '03',
    title: 'Growth',
    tagline: 'Scale with greater direction.',
    bestFor: 'Businesses ready to expand visibility, activity and performance.',
    addresses: [
      'Need for stronger visibility',
      'Expansion or market entry',
      'Disconnected campaigns and channels',
      'Limited measurement',
    ],
    mayInclude: [
      'Growth plan',
      'Campaigns',
      'Content',
      'Creative',
      'Paid media',
      'SEO',
      'Landing pages',
      'Reporting and optimisation',
    ],
  },
  {
    number: '04',
    title: 'Partnership',
    tagline: 'An embedded growth and marketing partner.',
    bestFor:
      'Businesses requiring ongoing strategy, coordination and execution.',
    addresses: [
      'Limited internal marketing capacity',
      'Several disconnected suppliers',
      'Need for continuous strategic direction',
      'Need for coordinated execution',
    ],
    mayInclude: [
      'Ongoing strategy',
      'Planning',
      'Campaign coordination',
      'Content and creative',
      'Digital performance',
      'Reporting',
      'Optimisation',
    ],
  },
  {
    number: '05',
    title: 'CODE Hub™',
    tagline: 'Optional add-on for selected engagements.',
    bestFor: 'Speak to a CODE representative to learn more.',
    addresses: ['Available where the engagement requires it.'],
    mayInclude: ['Details are shared through a CODE representative.'],
  },
]

const Engagement :React.FC= () => {
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

     <main className="mx-auto max-w-[1440px] px-6 pt-[168px] pb-32 md:px-16">
      {/* Hero */}
      
       <div className="mb-10 flex items-center gap-3 font-['Space_Grotesk',sans-serif] text-[11px] tracking-[0.24em] text-[var(--slate-muted)]">
          <a
            href="/"
            className="hover-glow uppercase transition-colors duration-200"
          >
            Home
          </a>
          <span>/</span>
          <span className="uppercase text-[var(--code-white)]">
            Engagement
          </span>
        </div>

        <p className="text-xs tracking-[0.3em] text-white/50 mb-10">
          ENGAGEMENT
        </p>
        <h1 className="max-w-[1100px] font-['Space_Grotesk',sans-serif] text-[clamp(72px,10vw,160px)] font-light leading-[0.9] tracking-[-0.06em] text-[var(--code-white)]">
  <span className="font-light">
    Different levels of engagement.
  </span>
  <br />
  <span className="font-bold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">
    One standard.
  </span>
</h1>
        <p className="mt-10 text-lg md:text-xl text-white/60 max-w-2xl">
          Every business requires a different level of strategic support.
          CODE engagements are scoped around business requirements, not
          generic packages.
        </p>
     
      </main>

      {/* Tiers */}
      <section>
        {tiers.map((tier, i) => (
          <div
            key={tier.number}
            className={`px-6 md:px-16 py-20 grid grid-cols-1 md:grid-cols-3 gap-10 ${
              i !== tiers.length - 1 ? 'border-b border-white/10' : ''
            }`}
          >
            <div>
              <p className="text-xs tracking-[0.3em] text-white/40 mb-6">
                {tier.number}
              </p>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                {tier.title}
              </h2>
              <p className="text-white/60 mb-10">{tier.tagline}</p>

              <p className="text-xs tracking-[0.3em] text-white/40 mb-3">
                BEST FOR
              </p>
              <p className="text-white/60 max-w-sm">{tier.bestFor}</p>
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] text-white/40 mb-6">
                ADDRESSES
              </p>
              <ul className="space-y-3">
                {tier.addresses.map((item) => (
                  <li key={item} className="text-white/80">
                    — {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] text-white/40 mb-6">
                MAY INCLUDE
              </p>
              <ul className="space-y-3">
                {tier.mayInclude.map((item) => (
                  <li key={item} className="text-white/80">
                    — {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Identify the level statement */}
      <section className="px-6 md:px-16 py-32 border-b border-white/10">
        <h2 className="max-w-[1200px] font-['Space_Grotesk',sans-serif] text-[clamp(72px,10vw,130px)] font-light leading-[0.999] tracking-[-0.06em] text-[var(--code-white)]">
  <span className="font-light">
    Identify the level of{" "}
  </span>

  <span className="font-light">
    engagement most useful {" "}
  </span>

  <span className="font-light">
    to the <span className="font-bold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]"> business.</span>
  </span>
</h2>
        <p className="mt-10 text-lg md:text-xl text-white/60 max-w-2xl">
          Each model is scoped around the business requirement, not a fixed
          package.
        </p>
      </section>

      {/* CTA */}
      <Conversation/>

      <Footer />
    </div>
  )
}

export default Engagement
