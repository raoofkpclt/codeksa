import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  TrendingUp,
  Target,
  LineChart,
  Layers,
} from "lucide-react";

/* ---------------------------------------------------------
   CODE — Logomark
   Steel "C" + open-corner frame, per Logo System v1.0
   Flat/white version — approved for website headers & UI.
--------------------------------------------------------- */
const Logo = ({ size = 34 }) => {
  const s = 100;
  const cx = 50, cy = 50, r = 26, sw = 13;
  // "C" arc: gap on the right, ~80deg opening
  const startAngle = -220;
  const endAngle = 40;
  const toRad = (a) => (a * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const corner = 18; // ~20% of frame edge
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-label="CODE logo">
      <path
        d={`M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2}`}
        stroke="#E8E8ED"
        strokeWidth={sw}
        strokeLinecap="butt"
      />
      {/* open-corner frame */}
      {[
        [8, 8, corner, 0, 0, corner],
        [92, 8, -corner, 0, 0, corner],
        [8, 92, corner, 0, 0, -corner],
        [92, 92, -corner, 0, 0, -corner],
      ].map(([x, y, dx1, dy1, dx2, dy2], i) => (
        <path
          key={i}
          d={`M ${x + dx1} ${y + dy1} L ${x} ${y} L ${x + dx2} ${y + dy2}`}
          stroke="#8B5CF6"
          strokeWidth="2.5"
          strokeLinecap="square"
        />
      ))}
    </svg>
  );
};

/* ---------------------------------------------------------
   Reveal — fade-up on scroll entry (400ms, ease-out, no bounce)
--------------------------------------------------------- */
const Reveal = ({ children, delay = 0, as: Tag = "div", className = "" }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "reveal--shown" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

/* ---------------------------------------------------------
   Open-corner Frame — structural container, per Frame System
--------------------------------------------------------- */
const Frame = ({ children, accent = false, className = "" }) => (
  <div className={`frame ${accent ? "frame--accent" : ""} ${className}`}>
    <span className="frame__corner frame__corner--tl" />
    <span className="frame__corner frame__corner--tr" />
    <span className="frame__corner frame__corner--bl" />
    <span className="frame__corner frame__corner--br" />
    <div className="frame__inner">{children}</div>
  </div>
);

const Eyebrow = ({ index, children }) => (
  <div className="eyebrow">
    {index ? <span className="eyebrow__index">{index}</span> : null}
    <span>{children}</span>
  </div>
);

/* ---------------------------------------------------------
   Nav — "Dynamic Island" style floating capsule
--------------------------------------------------------- */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Method", href: "#method" },
    { label: "Work", href: "#work" },
    { label: "Clients", href: "#clients" },
  ];

  return (
    <>
      <nav className={`island ${scrolled ? "island--compact" : ""} ${open ? "island--open" : ""}`}>
        <div className="island__row">
          <a href="#top" className="island__brand" onClick={() => setOpen(false)}>
            <Logo size={22} />
            <span className="island__wordmark">CODE</span>
          </a>

          <div className="island__links">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="island__link">
                {l.label}
              </a>
            ))}
          </div>

          <a href="#contact" className="island__cta">
            <span>Begin Engagement</span>
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </a>

          <button
            className="island__toggle"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
          </button>
        </div>

        {open && (
          <div className="island__menu">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="island__menu-link" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#contact" className="island__menu-cta" onClick={() => setOpen(false)}>
              Begin Engagement <ArrowRight size={15} strokeWidth={1.75} />
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

/* ---------------------------------------------------------
   Ambient arc — signature glow line from the brand covers
--------------------------------------------------------- */
const ArcGlow = ({ className = "" }) => (
  <svg
    className={`arc-glow ${className}`}
    viewBox="0 0 1400 800"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="arcLine" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
        <stop offset="55%" stopColor="#8B5CF6" stopOpacity="0.55" />
        <stop offset="78%" stopColor="#C4B5FD" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
      </linearGradient>
      <filter id="arcBlur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
    <path
      d="M -50 780 C 350 720, 650 520, 950 260 S 1350 -40, 1500 -120"
      stroke="url(#arcLine)"
      strokeWidth="2"
      fill="none"
      filter="url(#arcBlur)"
    />
  </svg>
);

/* ---------------------------------------------------------
   Page sections
--------------------------------------------------------- */
const Hero = () => (
  <header className="hero" id="top">
    <ArcGlow />
    <div className="hero__noise" />
    <div className="shell hero__content">
      <Reveal className="hero__tag">
        <span className="tag-pill">STRATEGIC MARKETING CONSULTANCY</span>
      </Reveal>
      <Reveal delay={80} as="h1" className="hero__headline">
        MARKETING,
        <br />
        ENGINEERED —
        <br />
        NOT IMPROVISED.
      </Reveal>
      <Reveal delay={160} className="hero__sub">
        CODE builds structured growth systems for organisations that have
        outgrown fragmented campaigns — grounded in data, architected for
        compounding results.
      </Reveal>
      <Reveal delay={240} className="hero__actions">
        <a href="#contact" className="btn btn--primary">
          BEGIN YOUR ENGAGEMENT <ArrowUpRight size={16} strokeWidth={1.75} />
        </a>
        <a href="#method" className="btn btn--secondary">
          VIEW THE METHOD
        </a>
      </Reveal>
    </div>
    <div className="hero__baseline">
      <span className="hero__baseline-track" />
    </div>
  </header>
);

const Positioning = () => (
  <section className="section">
    <div className="shell">
      <Reveal as="p" className="positioning">
        Most organisations invest in marketing without a coherent
        system — <span className="positioning__accent">CODE exists to replace fragmented effort
        with measurable architecture.</span>
      </Reveal>
    </div>
  </section>
);

const SERVICES = [
  {
    icon: Target,
    name: "Brand Strategy",
    desc: "Positioning systems built on evidence, not instinct.",
  },
  {
    icon: TrendingUp,
    name: "Performance Marketing",
    desc: "Paid acquisition engineered for measurable return.",
  },
  {
    icon: Layers,
    name: "Content Systems",
    desc: "Editorial frameworks that compound authority over time.",
  },
  {
    icon: LineChart,
    name: "Data & Analytics",
    desc: "Attribution models that reveal what is actually working.",
  },
];

const Services = () => (
  <section className="section" id="services">
    <div className="shell">
      <Reveal>
        <Eyebrow index="01">SERVICES</Eyebrow>
      </Reveal>
      <Reveal as="h2" delay={60} className="section-title">
        WHAT WE BUILD
      </Reveal>
      <div className="services-grid">
        {SERVICES.map(({ icon: Icon, name, desc }, i) => (
          <Reveal key={name} delay={100 + i * 60} className="service-card">
            <Icon size={22} strokeWidth={1.5} className="service-card__icon" />
            <h3 className="service-card__name">{name}</h3>
            <p className="service-card__desc">{desc}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const STAGES = [
  { n: "01", name: "Decode", desc: "We map the market, the audience, and the competitive terrain before a single asset is built." },
  { n: "02", name: "Architect", desc: "Strategy becomes structure — channels, messaging systems, measurement frameworks." },
  { n: "03", name: "Deploy", desc: "Campaigns launch inside the system — coordinated, never isolated." },
  { n: "04", name: "Optimise", desc: "Data drives iteration. Every cycle compounds the last." },
];

const Methodology = () => (
  <section className="section" id="method">
    <div className="shell">
      <Reveal>
        <Eyebrow index="02">METHODOLOGY</Eyebrow>
      </Reveal>
      <Reveal as="h2" delay={60} className="section-title">
        THE FOUR-STAGE FRAMEWORK
      </Reveal>
      <div className="stages">
        {STAGES.map((s, i) => (
          <React.Fragment key={s.n}>
            <Reveal delay={100 + i * 70} className="stage">
              <span className="stage__n">{s.n}</span>
              <h3 className="stage__name">{s.name}</h3>
              <p className="stage__desc">{s.desc}</p>
            </Reveal>
            {i < STAGES.length - 1 && (
              <div className="stage__arrow" aria-hidden="true">
                <ArrowRight size={18} strokeWidth={1.5} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

const STATS = [
  { value: "3.2×", label: "Average pipeline growth within 6 months" },
  { value: "40+", label: "Engagements delivered since 2021" },
  { value: "92%", label: "Client retention rate" },
];

const CLIENT_SECTORS = [
  "SAAS PLATFORMS",
  "FINTECH",
  "D2C RETAIL",
  "HEALTH-TECH",
  "B2B INDUSTRIAL",
  "PROFESSIONAL SERVICES",
];

const Clients = () => (
  <section className="section" id="clients">
    <div className="shell">
      <Reveal>
        <Eyebrow index="03">SOCIAL PROOF</Eyebrow>
      </Reveal>
      <Reveal as="h2" delay={60} className="section-title">
        OUTCOMES, NOT ANECDOTES
      </Reveal>

      <div className="stats-grid">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={100 + i * 70}>
            <Frame accent={i === 1} className="stat-frame">
              <span className="stat-frame__value">{s.value}</span>
              <span className="stat-frame__label">{s.label}</span>
            </Frame>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} className="client-strip">
        <span className="client-strip__label">TRUSTED ACROSS</span>
        <div className="client-strip__list">
          {CLIENT_SECTORS.map((c) => (
            <span key={c} className="client-strip__item">{c}</span>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

const WORK = [
  {
    sector: "SAAS PLATFORM",
    title: "Repositioning a category-creator",
    result: "+156% qualified pipeline in two quarters",
  },
  {
    sector: "D2C RETAIL",
    title: "Rebuilding the acquisition funnel",
    result: "38% reduction in blended CAC",
  },
  {
    sector: "FINTECH",
    title: "Structuring content into a system",
    result: "4.1× organic traffic in twelve months",
  },
];

const Work = () => (
  <section className="section" id="work">
    <div className="shell">
      <Reveal>
        <Eyebrow index="04">SELECTED WORK</Eyebrow>
      </Reveal>
      <Reveal as="h2" delay={60} className="section-title">
        SYSTEMS IN PRACTICE
      </Reveal>
      <div className="work-grid">
        {WORK.map((w, i) => (
          <Reveal key={w.title} delay={100 + i * 70} className="work-card">
            <span className="work-card__sector">{w.sector}</span>
            <h3 className="work-card__title">{w.title}</h3>
            <div className="work-card__rule" />
            <span className="work-card__result">{w.result}</span>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const CTAClose = () => (
  <section className="cta-close" id="contact">
    <ArcGlow className="arc-glow--cta" />
    <div className="shell cta-close__content">
      <Reveal as="h2" className="cta-close__headline">
        LET'S BUILD THE SYSTEM.
      </Reveal>
      <Reveal delay={80} className="cta-close__sub">
        One conversation to establish whether CODE is the right structure
        for your growth. No obligation. No hard pitch.
      </Reveal>
      <Reveal delay={160}>
        <a href="mailto:hello@codeksa.com" className="btn btn--primary">
          BEGIN YOUR ENGAGEMENT <ArrowUpRight size={16} strokeWidth={1.75} />
        </a>
      </Reveal>
      <Reveal delay={220} className="cta-close__contact">
        hello@codeksa.com &nbsp;·&nbsp; Riyadh, KSA
      </Reveal>
    </div>

    <footer className="footer">
      <div className="shell footer__row">
        <a href="#top" className="footer__brand">
          <Logo size={20} />
          <span>CODE</span>
        </a>
        <span className="footer__meta">© {new Date().getFullYear()} CODE — Strategic Marketing Consultancy</span>
      </div>
    </footer>
  </section>
);

/* ---------------------------------------------------------
   Root
--------------------------------------------------------- */
const Home = () => {
  return (
    <div className="code-site">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .code-site {
          --bg: #0B0B0F;
          --surface: #111116;
          --border: #1C1C24;
          --accent: #8B5CF6;
          --accent-soft: rgba(139, 92, 246, 0.35);
          --text: #E8E8ED;
          --muted: #6B6B7A;
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          position: relative;
          overflow-x: hidden;
        }
        .code-site * { box-sizing: border-box; }
        .code-site a { color: inherit; text-decoration: none; }

        .shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 80px;
        }
        @media (max-width: 780px) {
          .shell { padding: 0 24px; }
        }

        .reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 400ms ease-out, transform 400ms ease-out;
        }
        .reveal--shown { opacity: 1; transform: translateY(0); }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          border: 1px solid var(--accent-soft);
          padding: 6px 12px;
          border-radius: 2px;
        }
        .eyebrow__index { color: var(--muted); }

        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          font-size: clamp(28px, 4vw, 42px);
          line-height: 1.1;
          margin: 20px 0 64px;
          max-width: 720px;
        }

        /* ---------- Dynamic Island Nav ---------- */
        .island {
          position: fixed;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          background: rgba(17, 17, 22, 0.82);
          backdrop-filter: blur(16px);
          border: 1px solid var(--border);
          border-radius: 999px;
          transition: all 420ms cubic-bezier(0.32, 0.72, 0, 1);
          width: min(720px, 92vw);
          overflow: hidden;
        }
        .island--compact {
          width: min(560px, 90vw);
          top: 14px;
          border-color: var(--accent-soft);
          box-shadow: 0 8px 30px rgba(0,0,0,0.45);
        }
        .island__row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 10px 10px 18px;
        }
        .island__brand {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .island__wordmark {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.06em;
        }
        .island__links {
          display: flex;
          align-items: center;
          gap: 26px;
          margin: 0 auto;
          padding-left: 12px;
        }
        .island__link {
          font-size: 13px;
          color: var(--muted);
          font-weight: 500;
          transition: color 200ms ease;
          white-space: nowrap;
        }
        .island__link:hover { color: var(--text); }
        .island__cta {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--text);
          color: var(--bg);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid var(--accent);
          white-space: nowrap;
          transition: all 200ms ease;
        }
        .island__cta:hover { box-shadow: 0 0 0 3px var(--accent-soft); }
        .island__toggle {
          display: none;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text);
          border-radius: 999px;
          width: 36px;
          height: 36px;
          align-items: center;
          justify-content: center;
        }
        .island__menu {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 4px 14px 16px;
        }
        .island__menu-link {
          padding: 12px 8px;
          font-size: 14px;
          color: var(--text);
          border-top: 1px solid var(--border);
        }
        .island__menu-cta {
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--text);
          color: var(--bg);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 12px;
          border-radius: 999px;
        }

        @media (max-width: 780px) {
          .island { width: 90vw; }
          .island__links, .island__cta { display: none; }
          .island__toggle { display: flex; }
        }

        /* ---------- Buttons ---------- */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 16px 26px;
          border-radius: 4px;
          transition: all 200ms ease;
        }
        .btn--primary {
          background: var(--bg);
          color: var(--text);
          border: 1px solid var(--accent);
        }
        .btn--primary:hover { border-color: #C4B5FD; box-shadow: 0 0 0 3px var(--accent-soft); }
        .btn--secondary {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
        }
        .btn--secondary:hover { border-color: var(--accent); }

        /* ---------- Hero ---------- */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 120px;
          overflow: hidden;
        }
        .hero__noise {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 20% 10%, rgba(139,92,246,0.06), transparent 55%);
          pointer-events: none;
        }
        .arc-glow {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .hero__content { position: relative; z-index: 1; }
        .tag-pill {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--accent);
          border: 1px solid var(--accent-soft);
          padding: 7px 14px;
          border-radius: 2px;
        }
        .hero__headline {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.01em;
          font-size: clamp(40px, 7vw, 88px);
          line-height: 1.05;
          margin: 28px 0 28px;
        }
        .hero__sub {
          font-size: 17px;
          line-height: 1.6;
          color: var(--muted);
          max-width: 520px;
          margin-bottom: 44px;
        }
        .hero__actions { display: flex; gap: 16px; flex-wrap: wrap; }
        .hero__baseline {
          position: relative;
          z-index: 1;
          margin-top: 60px;
        }
        .hero__baseline-track {
          display: block;
          height: 1px;
          width: 100%;
          background: var(--border);
        }

        /* ---------- Sections ---------- */
        .section { padding: 120px 0; border-bottom: 1px solid var(--border); }
        .positioning {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: clamp(24px, 3.4vw, 38px);
          line-height: 1.35;
          color: var(--muted);
          max-width: 900px;
        }
        .positioning__accent { color: var(--text); }

        /* ---------- Services ---------- */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
        }
        .service-card {
          background: var(--surface);
          padding: 32px 26px;
          min-height: 190px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .service-card__icon { color: var(--accent); }
        .service-card__name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .service-card__desc { font-size: 14px; color: var(--muted); line-height: 1.6; }

        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .services-grid { grid-template-columns: 1fr; }
        }

        /* ---------- Methodology ---------- */
        .stages {
          display: flex;
          align-items: stretch;
          gap: 20px;
        }
        .stage {
          flex: 1;
          border-top: 1.5px solid var(--border);
          padding-top: 24px;
        }
        .stage__n {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--accent);
          letter-spacing: 0.1em;
        }
        .stage__name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 19px;
          margin: 12px 0 12px;
        }
        .stage__desc { font-size: 14px; color: var(--muted); line-height: 1.6; }
        .stage__arrow {
          display: flex;
          align-items: flex-start;
          padding-top: 20px;
          color: var(--muted);
        }
        @media (max-width: 860px) {
          .stages { flex-direction: column; gap: 32px; }
          .stage__arrow { display: none; }
        }

        /* ---------- Frame ---------- */
        .frame { position: relative; }
        .frame__inner { padding: 40px 32px; }
        .frame__corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: var(--border);
        }
        .frame--accent .frame__corner { border-color: var(--accent); }
        .frame__corner--tl { top: 0; left: 0; border-top: 1.5px solid; border-left: 1.5px solid; }
        .frame__corner--tr { top: 0; right: 0; border-top: 1.5px solid; border-right: 1.5px solid; }
        .frame__corner--bl { bottom: 0; left: 0; border-bottom: 1.5px solid; border-left: 1.5px solid; }
        .frame__corner--br { bottom: 0; right: 0; border-bottom: 1.5px solid; border-right: 1.5px solid; }

        /* ---------- Stats / Clients ---------- */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 80px;
        }
        .stat-frame { text-align: left; display: flex; flex-direction: column; gap: 10px; }
        .stat-frame__value {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 44px;
          color: var(--text);
        }
        .stat-frame__label { font-size: 13px; color: var(--muted); line-height: 1.5; max-width: 220px; }
        @media (max-width: 780px) {
          .stats-grid { grid-template-columns: 1fr; }
        }

        .client-strip {
          border-top: 1px solid var(--border);
          padding-top: 32px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 24px 40px;
        }
        .client-strip__label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--muted);
        }
        .client-strip__list { display: flex; flex-wrap: wrap; gap: 28px 36px; }
        .client-strip__item {
          font-size: 13px;
          letter-spacing: 0.04em;
          color: var(--muted);
          font-weight: 500;
        }

        /* ---------- Work ---------- */
        .work-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .work-card {
          border: 1px solid var(--border);
          padding: 32px 26px;
          background: var(--surface);
          display: flex;
          flex-direction: column;
          min-height: 220px;
        }
        .work-card__sector {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--accent);
        }
        .work-card__title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 19px;
          line-height: 1.35;
          margin: 16px 0 auto;
        }
        .work-card__rule { height: 1px; background: var(--border); margin: 24px 0 16px; }
        .work-card__result { font-size: 14px; color: var(--muted); }
        @media (max-width: 900px) {
          .work-grid { grid-template-columns: 1fr; }
        }

        /* ---------- CTA Close ---------- */
        .cta-close {
          position: relative;
          padding: 140px 0 0;
          overflow: hidden;
        }
        .arc-glow--cta { opacity: 0.7; }
        .cta-close__content { position: relative; z-index: 1; text-align: center; }
        .cta-close__headline {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          font-size: clamp(32px, 5.5vw, 60px);
          line-height: 1.1;
          max-width: 780px;
          margin: 0 auto 24px;
        }
        .cta-close__sub {
          color: var(--muted);
          font-size: 16px;
          max-width: 480px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }
        .cta-close__content .btn { margin: 0 auto; }
        .cta-close__contact {
          display: block;
          margin-top: 28px;
          font-size: 13px;
          color: var(--muted);
          letter-spacing: 0.04em;
        }

        .footer {
          position: relative;
          z-index: 1;
          margin-top: 120px;
          border-top: 1px solid var(--border);
          padding: 28px 0;
        }
        .footer__row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer__brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.06em;
        }
        .footer__meta { font-size: 12px; color: var(--muted); }
      `}</style>

      <Nav />
      <Hero />
      <Positioning />
      <Services />
      <Methodology />
      <Clients />
      <Work />
      <CTAClose />
    </div>
  );
};

export default Home;
