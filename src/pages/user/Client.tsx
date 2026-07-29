import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import userClientService from '../../service/firebaseService/userClientService'
import type { Client } from '../../utils/types'
import NavbarNew from '../../components/user/NavbarNew'
import Footer from '../../components/user/Footer'

/* ---------------------------------------------------------
   Reveal — subtle fade-up on scroll entry
--------------------------------------------------------- */
const Reveal = ({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  as?: React.ElementType
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}


const accentLine =
  'w-6 h-px bg-gradient-to-r from-fuchsia-400 to-violet-500 inline-block'

const initialsOf = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

/* ---------------------------------------------------------
   ClientCard
--------------------------------------------------------- */
const ClientCard = ({ client }: { client: Client }) => {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <Link to={`/clientWorks/${client.id}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors">
        {client.logo && !imgFailed ? (
          <img
            src={client.logo}
            alt={client.name}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/[0.03] text-4xl font-light text-white/30">
            {initialsOf(client.name)}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 right-0 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 px-6 py-6">
          {client.sector && (
            <p className="text-xs tracking-[0.2em] text-white/50 mb-2">
              {client.sector.toUpperCase()}
            </p>
          )}
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg md:text-xl font-light text-white">
              {client.name}
            </h3>
            <span className="text-violet-400 text-lg transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

const CardSkeleton = () => (
  <div className="aspect-[4/3] border border-white/10 bg-white/[0.02] animate-pulse" />
)

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [activeSector, setActiveSector] = useState('All')

  useEffect(() => {
    let cancelled = false

    const loadClients = async () => {
      setLoading(true)
      setErrorMsg(null)

      try {
        const data = await userClientService.getClients()
        if (!cancelled) setClients(data)
      } catch (error) {
        console.error('Load Clients:', error)
        if (!cancelled) setErrorMsg('Unable to load clients.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadClients()
    return () => {
      cancelled = true
    }
  }, [])

  const sectors: string[] = [
  "All",
  ...Array.from(
    new Set(
      clients
        .map((c) => c.sector)
        .filter((sector): sector is string => Boolean(sector))
    )
  ),
];
  const filtered =
    activeSector === 'All'
      ? clients
      : clients.filter((c) => c.sector === activeSector)

  return (
    <div className="bg-black text-white">
      <NavbarNew />

      {/* Hero */}
      <section className="px-6 md:px-10 lg:px-16 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/40 mb-16 md:mb-24">
            <span>HOME</span>
            <span>/</span>
            <span className="text-white/70">CLIENTS</span>
          </div>

          <p className="text-xs tracking-[0.3em] text-white/40 mb-6">CLIENTS</p>

          <h1 className="font-light text-[13vw] leading-[0.95] md:text-[6.5vw] md:leading-[0.95] tracking-tight max-w-6xl">
            Organisations inside <span className="font-semibold">the system.</span>
          </h1>

          <p className="mt-10 max-w-xl text-white/50 text-lg leading-relaxed">
            Select any organisation to view the engagement: the problem, the
            system built and the result.
          </p>
        </div>
      </section>

      {/* Sector filter + grid */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto">
          {sectors.length > 1 && !loading && !errorMsg && (
            <Reveal className="flex flex-wrap gap-x-8 gap-y-4 mb-16">
              {sectors.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSector(s)}
                  className={`text-xs tracking-[0.2em] transition-colors pb-2 border-b ${
                    activeSector === s
                      ? 'text-white border-violet-400'
                      : 'text-white/40 border-transparent hover:text-white/70'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </Reveal>
          )}

          {errorMsg && (
            <Reveal className="border border-white/10 py-16 text-center">
              <p className="text-white/50">{errorMsg}</p>
            </Reveal>
          )}

          {!errorMsg && loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/10">
              {Array.from({ length: 8 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}

          {!errorMsg && !loading && filtered.length === 0 && (
            <Reveal className="border border-white/10 py-16 text-center">
              <p className="text-white/50">
                No clients found
                {activeSector !== 'All' ? ` in ${activeSector}` : ''}.
              </p>
            </Reveal>
          )}

          {!errorMsg && !loading && filtered.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((client, i) => (
                <Reveal key={client.id} delay={(i % 8) * 40}>
                  <ClientCard client={client} />
                </Reveal>
              ))}
            </div>
          )}
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
              One conversation to establish whether CODE is the right
              structure for your growth. No obligation. No hard pitch.
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

export default ClientsPage
