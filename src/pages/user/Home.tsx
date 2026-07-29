import React from 'react'
import { Link } from 'react-router-dom'
import NavbarNew from '../../components/user/NavbarNew'
import Footer from '../../components/user/Footer'

interface Pathway {
  index: string
  label: string
  title: string
  highlight: string
  description: string
  href: string
}

const pathways: Pathway[] = [
  {
    index: '01',
    label: 'STRATEGY & GROWTH',
    title: 'Direction before',
    highlight: 'activity.',
    description:
      'We define where growth should come from—and build the structure to move towards it.',
    href: '/what-we-solve/strategy-growth',
  },
  {
    index: '02',
    label: 'BRAND & CREATIVE',
    title: 'Meaning before',
    highlight: 'visibility.',
    description: 'We shape brands people understand, trust and remember.',
    href: '/what-we-solve/brand-creative',
  },
  {
    index: '03',
    label: 'DIGITAL & PERFORMANCE',
    title: 'Presence with',
    highlight: 'purpose.',
    description:
      'We connect digital experience, visibility and performance to measurable business outcomes.',
    href: '/what-we-solve/digital-performance',
  },
  {
    index: '04',
    label: 'MARKETING OPERATIONS & SYSTEMS',
    title: 'Structure before',
    highlight: 'scale.',
    description: 'We turn marketing into a connected, repeatable operating rhythm.',
    href: '/what-we-solve/marketing-operations-systems',
  },
]

interface StandardItem {
  index: string
  title: string
  description: string
}

const standard: StandardItem[] = [
  {
    index: '01',
    title: 'Business Before Activity',
    description:
      'We begin with the business requirement before recommending channels or deliverables.',
  },
  {
    index: '02',
    title: 'Defined Scope',
    description:
      'Deliverables, responsibilities, assumptions, timing and fees are confirmed before work begins.',
  },
  {
    index: '03',
    title: 'Connected Expertise',
    description:
      'The right strategic, creative, digital and operational capabilities are combined according to the requirement.',
  },
  {
    index: '04',
    title: 'Structured Delivery',
    description:
      'Every engagement includes a named contact, agreed milestones and clear delivery standards.',
  },
]

interface Engagement {
  index: string
  title: string
  description: string
}

const engagements: Engagement[] = [
  {
    index: '01',
    title: 'CODE Essentials',
    description: 'One focused requirement. One defined scope.',
  },
  {
    index: '02',
    title: 'Foundation',
    description: 'Build the right structure.',
  },
  {
    index: '03',
    title: 'Growth',
    description: 'Scale with greater direction.',
  },
  {
    index: '04',
    title: 'Partnership',
    description: 'An embedded growth and marketing partner.',
  },
]

const industries = [
  'Automotive',
  'Hospitality',
  'Retail',
  'Professional Services',
  'Real Estate',
  'Healthcare',
  'Construction',
  'Industrial',
  'Growing Businesses',
]

interface WorkItem {
  title: string
}

const workItems: WorkItem[] = [
  { title: 'Strategy' },
  { title: 'Brand' },
  { title: 'Digital' },
  { title: 'Campaigns' },
  { title: 'Marketing Operations' },
  { title: 'Content & Production' },
]

const labelBase = 'text-xs tracking-[0.2em] text-white/40'
const accentLine =
  'w-6 h-px bg-gradient-to-r from-fuchsia-400 to-violet-500 inline-block'

const Home: React.FC = () => {
  return (
    <div className="bg-black text-white">
      <NavbarNew />

      {/* Hero */}
      <section className="px-6 md:px-10 lg:px-16 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="font-light text-[13vw] leading-[0.95] md:text-[6.5vw] md:leading-[0.95] tracking-tight">
            The system
            <br />
            behind <span className="font-semibold">growth.</span>
          </h1>

          <p className="mt-10 max-w-xl text-white/50 text-lg leading-relaxed">
            CODE connects strategy, brand, digital presence and marketing
            operations into structured systems for sustainable growth.
          </p>

          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6">
            <Link
              to="/start-a-conversation"
              className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/80 hover:text-white transition-colors group"
            >
              START A CONVERSATION
              <span className={`${accentLine} group-hover:w-10 transition-all`} />
            </Link>

            <Link
              to="/what-we-solve"
              className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/50 hover:text-white/80 transition-colors group"
            >
              EXPLORE WHAT WE SOLVE
              <span className="w-6 h-px bg-white/30 inline-block group-hover:w-10 transition-all" />
            </Link>
          </div>
        </div>
      </section>

      {/* What CODE does */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,240px)_1fr] gap-10 md:gap-20">
          <p className={labelBase}>WHAT CODE DOES</p>

          <div>
            <h2 className="font-light text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl">
              Business growth needs more than <span className="font-semibold">activity.</span>
            </h2>

            <p className="mt-10 max-w-2xl text-white/50 text-lg leading-relaxed">
              Most businesses do not need more isolated marketing activity. They
              need clearer direction, stronger brand meaning, purposeful digital
              presence and a repeatable operating rhythm.
            </p>

            <p className="mt-6 max-w-2xl text-white/50 text-lg leading-relaxed">
              CODE helps businesses understand what needs to move, then builds
              the structure required to move it.
            </p>
          </div>
        </div>
      </section>

      {/* What we solve */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto">
          <p className={labelBase}>WHAT WE SOLVE</p>

          <h2 className="mt-8 font-light text-[11vw] leading-[0.95] md:text-[4.5vw] md:leading-[0.95] tracking-tight">
            Four pathways.
            <br />
            <span className="font-semibold">One system.</span>
          </h2>
        </div>

        <div className="max-w-[1600px] mx-auto mt-20">
          {pathways.map((pathway) => (
            <Link
              key={pathway.index}
              to={pathway.href}
              className="group block border-t border-white/10 last:border-b py-14 md:py-20"
            >
              <div className="flex items-baseline gap-6 mb-8">
                <span className="text-xs tracking-[0.2em] text-white/40">
                  {pathway.index}
                </span>
                <span className="text-xs tracking-[0.2em] text-violet-400">
                  {pathway.label}
                </span>
              </div>

              <div className="flex items-start justify-between gap-8">
                <h3 className="font-light text-4xl md:text-6xl leading-[1.05] tracking-tight">
                  {pathway.title}
                  <br />
                  <span className="font-semibold text-violet-400 drop-shadow-[0_0_24px_rgba(167,139,250,0.5)]">
                    {pathway.highlight}
                  </span>
                </h3>

                <span className="hidden md:block text-violet-400 text-3xl mt-4 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all">
                  &rarr;
                </span>
              </div>

              <p className="mt-8 max-w-xl text-white/50 text-lg leading-relaxed">
                {pathway.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* The CODE standard */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto">
          <p className={labelBase}>THE CODE STANDARD</p>

          <h2 className="mt-8 font-light text-4xl md:text-6xl leading-[1.05] tracking-tight">
            Clear before work <span className="font-semibold">begins.</span>
          </h2>
        </div>

        <div className="max-w-[1600px] mx-auto mt-20 grid grid-cols-1 md:grid-cols-2">
          {standard.map((item, i) => (
            <div
              key={item.index}
              className={`
                px-0 md:px-14 py-14 md:py-16
                border-t border-white/10
                ${i % 2 === 0 ? 'md:border-r md:pl-0' : ''}
                ${i === 0 ? 'md:pl-0' : ''}
              `}
            >
              <span className="text-xs tracking-[0.2em] text-white/40">
                {item.index}
              </span>
              <h3 className="mt-6 mb-5 text-2xl md:text-3xl font-light">
                {item.title}
              </h3>
              <p className="text-white/50 leading-relaxed max-w-md">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Engagements */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto">
          <p className={labelBase}>ENGAGEMENTS</p>

          <h2 className="mt-8 font-light text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-4xl">
            Different levels of engagement. <span className="font-semibold">One standard.</span>
          </h2>
        </div>

        <div className="max-w-[1600px] mx-auto mt-20 grid grid-cols-1 md:grid-cols-4">
          {engagements.map((item, i) => (
            <div
              key={item.index}
              className={`
                px-6 md:px-10 py-12 md:py-14
                border-t border-white/10
                ${i !== engagements.length - 1 ? 'md:border-r md:border-white/10' : ''}
              `}
            >
              <span className="text-xs tracking-[0.2em] text-white/40">
                {item.index}
              </span>
              <h3 className="mt-6 mb-4 text-2xl font-semibold">{item.title}</h3>
              <p className="text-white/50 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-[1600px] mx-auto mt-16">
          <Link
            to="/engagements"
            className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/70 hover:text-white transition-colors group w-fit"
          >
            EXPLORE OUR ENGAGEMENTS
            <span className={`${accentLine} group-hover:w-10 transition-all`} />
          </Link>
        </div>
      </section>

      {/* Industries */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto">
          <p className={labelBase}>INDUSTRIES</p>

          <h2 className="mt-8 font-light text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-4xl">
            Built for businesses where clarity, trust and{' '}
            <span className="font-semibold">execution matter.</span>
          </h2>

          <div className="mt-16 flex flex-wrap gap-x-12 gap-y-6">
            {industries.map((industry) => (
              <Link
                key={industry}
                to="/industries"
                className="text-2xl md:text-3xl font-light text-white/70 hover:text-white transition-colors"
              >
                {industry}
              </Link>
            ))}
          </div>

          <div className="mt-16">
            <Link
              to="/industries"
              className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/70 hover:text-white transition-colors group w-fit"
            >
              EXPLORE INDUSTRIES
              <span className={`${accentLine} group-hover:w-10 transition-all`} />
            </Link>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto">
          <p className={labelBase}>SELECTED WORK</p>

          <h2 className="mt-8 font-light text-4xl md:text-6xl leading-[1.05] tracking-tight">
            Selected <span className="font-semibold">work.</span>
          </h2>

          <p className="mt-10 max-w-2xl text-white/50 text-lg leading-relaxed">
            Selected work is being prepared for publication. Until then, CODE
            presents its capabilities through defined pathways, engagement
            models and structured working standards.
          </p>
        </div>

        <div className="max-w-[1600px] mx-auto mt-20 grid grid-cols-1 md:grid-cols-3">
          {workItems.map((item, i) => (
            <div
              key={item.title}
              className={`
                px-6 md:px-10 lg:px-14 py-14 md:py-16
                border-t border-white/10
                ${(i + 1) % 3 !== 0 ? 'md:border-r md:border-white/10' : ''}
              `}
            >
              <span className="text-xs tracking-[0.2em] text-white/40">
                IN PREPARATION
              </span>
              <h3 className="mt-6 text-3xl md:text-4xl font-light">
                {item.title}
              </h3>
            </div>
          ))}
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
              Start with a conversation about the challenge, the required
              outcome and the right place to begin.
            </p>

            <Link
              to="/start-a-conversation"
              className="mt-14 flex items-center gap-3 text-xs tracking-[0.2em] text-white/70 hover:text-white transition-colors group w-fit"
            >
              START A CONVERSATION
              <span className={`${accentLine} group-hover:w-10 transition-all`} />
            </Link>
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

export default Home
