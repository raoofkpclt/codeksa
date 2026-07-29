import React from 'react'
import NavbarNew from '../../components/user/NavbarNew'
import Footer from '../../components/user/Footer'

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
        <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] font-light tracking-tight max-w-5xl">
          Different levels of engagement.{' '}
          <span className="font-semibold">One standard.</span>
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
        <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] font-light tracking-tight max-w-5xl">
          Identify the level of engagement most useful to the{' '}
          <span className="font-semibold">business.</span>
        </h2>
        <p className="mt-10 text-lg md:text-xl text-white/60 max-w-2xl">
          Each model is scoped around the business requirement, not a fixed
          package.
        </p>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-32">
        <p className="text-xs tracking-[0.3em] text-white/50 mb-16">
          START A CONVERSATION
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <h2 className="text-5xl md:text-7xl font-light leading-[1.05] max-w-2xl">
            Let's clarify what your business needs
          </h2>
          <span className="text-5xl md:text-7xl font-semibold">next.</span>
        </div>
        <p className="mt-10 text-lg text-white/60 max-w-xl">
          Start with a conversation about the challenge, the required outcome
          and the right place to begin.
        </p>
      </section>

      <Footer />
    </div>
  )
}

export default Engagement
