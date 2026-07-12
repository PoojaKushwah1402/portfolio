'use client'

import MountainJourney from '@/components/3d/MountainJourney'
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

/* ─── palette + type ─── */
const BG = '#08090C'
const INK = '#EAEEF3'
const MUTE = '#7C8695'
const ACCENT = '#22B8E6'
const disp = "'Anton', 'Arial Narrow', sans-serif"
const grot = "'Space Grotesk Variable', 'Inter Variable', sans-serif"
const sans = "'Inter Variable', system-ui, sans-serif"
const ease = [0.16, 1, 0.3, 1] as const
const MEGA: React.CSSProperties = { fontFamily: disp, textTransform: 'uppercase', letterSpacing: '-0.005em', lineHeight: 0.84, margin: 0, fontWeight: 400 }
const label: React.CSSProperties = { fontFamily: grot, fontWeight: 600, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase' }

/* ─── content, from the résumé ─── */
const PROJECTS = [
  {
    n: '01', t: 'Livjaza', r: 'Senior Full Stack Engineer', p: '2026 → now', b: '7-8s → <500ms', stat: '<500ms',
    logo: '/logos/livjaza.svg',
    grad: 'linear-gradient(135deg,#E4569B 0%,#5E002F 100%)',
    tag: 'hospitality tech · property + channel management · Dubai',
    d: 'A property and channel-management platform, rebuilt for speed and AI.',
    hi: [
      'Cut page load from 7-8s to under 500ms via SSR, code splitting, profiling',
      'AI property search: LLM APIs into a Next.js SSR frontend',
      'AI-driven dynamic pricing dashboard in React + Recharts',
      'ForumPay crypto payments; led cloud migration Azure → AWS',
    ],
    tech: ['Next.js', 'Node.js', 'Go', 'Django', 'AWS'],
  },
  {
    n: '02', t: 'Macro Rides', r: 'Co-founder & CTO', p: '2025 → now', b: '0 → 1', stat: '0→1',
    logo: '/logos/macrorides.jpg',
    grad: 'linear-gradient(135deg,#41A566 0%,#0C331D 100%)',
    tag: 'e-rickshaw ride-hailing · DPIIT recognised · Delhi',
    d: 'India-focused e-rickshaw ride-hailing, built and shipped from absolute zero.',
    hi: [
      'Full MVP: React Native rider + driver apps on Node.js / PostgreSQL',
      'Real-time WebSocket dispatch, Redis caching, deployed on AWS',
      'Delhi Mobility Intelligence, a public dashboard on real transit data',
      'Cashfree, Maps API, SMS OTP; validated with real riders before any funding',
    ],
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'WebSocket', 'AWS'],
  },
  {
    n: '03', t: 'group.one', r: 'Software Engineer', p: '2022 → 2025', b: '500K+ users', stat: '500K+',
    logo: '/logos/groupone.png',
    grad: 'linear-gradient(135deg,#E6B23A 0%,#4E3007 100%)',
    tag: 'AI-powered SaaS · website builder + e-commerce · Europe',
    d: 'AI-powered website builder and e-commerce serving European markets at scale.',
    hi: [
      'React + TypeScript apps for 500K+ users across Europe (SSR / SSG)',
      'LLM APIs + Model Context Protocol (MCP) for context-aware AI, in prod',
      'Payments (Stripe, PayPal), inventory, tax engine, automation',
      'Zero-bug release cycle with TDD; grew Jest coverage to 90%',
    ],
    tech: ['React', 'TypeScript', 'MCP', 'Stripe', 'Jest'],
  },
  {
    n: '04', t: 'BRIDGEi2i', r: 'Software Engineer', p: '2021 → 2022', b: 'analytics', stat: 'DATA',
    logo: '/logos/bridgei2i.jpg',
    grad: 'linear-gradient(135deg,#9B5FE8 0%,#2E1160 100%)',
    tag: 'AI-driven analytics consulting · now part of Accenture · India',
    d: 'Data-heavy dashboards and interactive visualisations for enterprise clients.',
    hi: [
      'Data-heavy React dashboards and interactive visualisations',
      'Analytics pipelines with permission-driven data access',
    ],
    tech: ['React', 'D3.js', 'Analytics'],
  },
  {
    n: '05', t: 'Amdocs', r: 'Associate Software Engineer', p: '2019 → 2021', b: 'where it started', stat: '2019',
    logo: '/logos/amdocs.png',
    grad: 'linear-gradient(135deg,#EE7A50 0%,#6E1436 100%)',
    tag: 'global telecom software · enterprise · India',
    d: 'Cloud-native telecom platforms for global enterprise clients. Where the foundations were laid.',
    hi: [
      'Built React frontends and Node.js backend services for telecom platforms',
      'Shipped features across billing, CRM and service orchestration',
      'Enterprise-grade delivery for global clients, first years of production discipline',
    ],
    tech: ['React', 'Node.js', 'CRM', 'Telecom'],
  },
] as const

const TRAJECTORY: [string, string, string][] = [
  ['2026 → now', 'Livjaza', 'Senior Full Stack · Dubai'],
  ['2025 → now', 'Macro Rides', 'Co-founder & CTO · Delhi'],
  ['2022 → 2025', 'group.one', 'AI SaaS · Europe'],
  ['2021 → 2022', 'BRIDGEi2i', 'AI analytics'],
  ['2019 → 2021', 'Amdocs', 'Telecom · React + Node'],
]

const ACHIEVEMENTS: [string, string][] = [
  ['TOP 5', 'ELITE React.js Challenge · 200+ companies'],
  ['GSF', "Founders Academy · 2026 cohort"],
  ['DPIIT', 'Recognised startup · Amity incubator'],
  ['DAILY', 'Claude Code + Cursor, in the loop'],
]

const LEAD: [string, string][] = [
  ['0 → 1 product', 'MVP to real users, no funding needed first'],
  ['Engineering leadership', 'direction, standards, delivery'],
  ['System architecture', 'design end-to-end, own the calls'],
  ['AI in production', 'LLMs + MCP shipped, not demoed'],
  ['Speed', '7-8s → <500ms; rapid prototyping'],
  ['Full ownership', 'architecture through to deployment'],
]

const CATS: [string, string[]][] = [
  ['Frontend', ['React', 'Next.js', 'TypeScript', 'Redux', 'Zustand', 'TanStack Query', 'React Native']],
  ['Backend', ['Node.js', 'Express', 'NestJS', 'Django', 'Go', 'GraphQL', 'WebSockets']],
  ['AI / LLMs', ['OpenAI', 'LangChain', 'MCP', 'Gemini', 'Pinecone', 'Claude Code', 'Cursor']],
  ['Data viz', ['D3.js', 'Recharts', 'Chart.js', 'Mapbox GL', 'H3.js', 'Real-time']],
  ['Databases', ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'DynamoDB']],
  ['Cloud / DevOps', ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD']],
]
const CORE = new Set(['React', 'Next.js', 'TypeScript', 'Node.js', 'Go', 'MCP', 'OpenAI', 'Gemini', 'PostgreSQL', 'AWS', 'React Native', 'Mapbox GL'])
const FLOW = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Go', 'MCP', 'OpenAI', 'Gemini', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Mapbox GL', 'React Native', 'Stripe']

const UN = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`
const PLAY = [
  { img: UN('1506905925346-21bda4d32df4'), tag: 'Happiest at altitude', meta: 'trekking · hiking · the hills', title: 'Outdoors', desc: 'Give me a trail, some altitude and zero signal. The higher and colder it gets, the happier I am. Most of my best thinking happens somewhere on a climb, far from a keyboard.' },
  { img: UN('1506744038136-46273834b3fb'), tag: 'Always somewhere new', meta: '11 countries · zero plans', title: 'Explore', desc: 'Eleven countries in and counting, usually with no plan at all. I travel to get pleasantly lost, wander into valleys like this one, and come back with stories nobody asked for.' },
  { img: UN('1543466835-00a7907e9de1'), tag: 'Certified dog mom', meta: 'animal lover · veggie', title: 'Dog mom', desc: "Full-time animal lover, certified dog mom. It's also exactly why I'm vegetarian: it is very hard to eat something you would much rather cuddle. Every dog I meet is my new best friend." },
  { img: UN('1521673252667-e05da380b252'), tag: 'If it has a waiver, yes', meta: 'skydive · bungee · coasters', title: 'Adventure', desc: 'If it needs a signed waiver, sign me up. Skydiving, bungee, roller coasters, the whole menu. The three seconds of pure freefall are worth every second of the queue.' },
  { img: UN('1534438327276-14e5300c3a48'), tag: 'Strong, not sorry', meta: 'gym · lifting · reps', title: 'Workout', desc: 'Lifting heavy things and putting them back down, on repeat. It clears my head better than coffee ever could, and carrying all the groceries in one trip is the real prize.' },
  { img: UN('1544551763-46a013bb70d5'), tag: 'Happiest underwater', meta: 'swim · dive · water sports', title: 'Water', desc: 'Anything involving water and a slight chance of chaos gets a yes. Scuba, jet skis, swimming until my arms give up. The ocean is the one place my phone truly cannot follow me.' },
  { img: UN('1546519638-68e109498ffc'), tag: 'Competitive to a fault', meta: 'badminton · football · hoops', title: 'Games', desc: 'Competitive to a fault, and not sorry about it. Badminton, football, basketball, whatever gets everyone off the couch. I play everything, and I play to win, even against children.' },
  { img: UN('1441974231531-c6227db76b6e'), tag: 'Windows down', meta: 'long drives · green routes', title: 'Long drives', desc: 'An open green road, a good playlist, and hours of going nowhere in particular. Windows down through forest routes like this one is genuinely my happiest place on four wheels.' },
  { img: UN('1489599849927-2ee91cede3ba'), tag: 'One more episode', meta: 'shows · snacks · 2am', title: 'Binge', desc: "The other kind of marathon. Snacks in position, lights off, and 'just one more episode' negotiated well past 2am. I will finish a whole season before I admit I was tired." },
  { img: UN('1514525253161-7a46d19cd819'), tag: 'Last one off the floor', meta: 'parties · dancing · loud music', title: 'Parties', desc: "Good people, loud music, and a dance floor. I'm reliably the one shouting 'one more song' until the lights come on. Work hard, dance harder, no exceptions." },
  { img: UN('1513104890138-7c749659a591'), tag: 'Always hungry', meta: 'pizza · pasta · street food', title: 'Foodie', desc: 'Half the reason I travel at all. Proper Italian pizza, fresh pasta, street food from carts with questionable hygiene and incredible flavour. I will try absolutely everything once.' },
  { img: UN('1541364983171-a8ba01e95cfc'), tag: 'Professional napper', meta: 'sleep · blanket · reset', title: 'Recharge', desc: 'And when all of that stops? This is me. Wrapped in a blanket, glasses on, judging the world quietly. I sleep like it is a competitive sport and I am going for gold.' },
]

const NAV: [string, string][] = [['The receipts', 'work'], ['My story', 'about'], ['The toolkit', 'stack'], ['Off the clock', 'play'], ['Say hi', 'contact']]

/* ─── motion helpers ─── */
function Reveal({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.92, y: 34 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: '-12% 0px' }} transition={{ duration: 0.85, ease, delay }} style={style}>
      {children}
    </motion.div>
  )
}
function FromRight({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, x: 130 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.9, ease, delay }} style={style}>
      {children}
    </motion.div>
  )
}

/* clean, human eyebrow — small cyan dot + sentence case (no tracked caps) */
function Tag({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, ...style }}>
      <span style={{ width: 7, height: 7, borderRadius: 999, background: ACCENT, flexShrink: 0 }} />
      <span style={{ fontFamily: grot, fontWeight: 600, fontSize: 13.5, color: 'rgba(234,238,243,0.74)' }}>{children}</span>
    </div>
  )
}

function LinkedInIcon() {
  return (<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>)
}
function GitHubIcon() {
  return (<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58l-.01-2.03c-3.34.72-4.04-1.62-4.04-1.62-.55-1.38-1.34-1.75-1.34-1.75-1.08-.75.09-.73.09-.73 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.1-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22l-.01 3.29c0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/></svg>)
}

/* ─── nav ─── */
function Nav({ goto, active }: { goto: (id: string) => void; active: string }) {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'clamp(16px,2.4vh,26px) clamp(20px,4vw,60px)', pointerEvents: 'none' }}>
      <button onClick={() => goto('top')} data-hover style={{ pointerEvents: 'auto', background: 'none', border: 0, cursor: 'pointer', fontFamily: grot, fontWeight: 700, fontSize: 14, letterSpacing: '0.05em', color: INK }}>
        POOJA <span style={{ color: ACCENT }}>KUSHWAH</span>
      </button>
      <div style={{ pointerEvents: 'auto', display: 'flex', gap: 'clamp(18px,2vw,36px)', alignItems: 'center' }}>
        {NAV.map(([l, id]) => (
          <button key={id} onClick={() => goto(id)} data-hover style={{ position: 'relative', background: 'none', border: 0, cursor: 'pointer', fontFamily: grot, fontWeight: 600, fontSize: 13, color: active === id ? ACCENT : 'rgba(234,238,243,0.82)', padding: '4px 1px', transition: 'color .3s' }}>
            {l}
            {active === id && <motion.span layoutId="nav-underline" style={{ position: 'absolute', left: 0, right: 0, bottom: -3, height: 2, borderRadius: 2, background: ACCENT }} transition={{ duration: 0.35, ease }} />}
          </button>
        ))}
      </div>
    </nav>
  )
}

/* ─── hero ─── */
const CURRENTLY = [
  'reachable. always. especially for the complex problems.',
  'building, breaking, fixing, shipping.',
  'shipping at Macro Rides.',
  'turning AI demos into production systems.',
  'always up for a coffee and a good chat.',
  'probably planning the next trek.',
]
const HERO_STATS: [string, string][] = [
  ['7+', 'years shipping'],
  ['5', 'companies'],
  ['1', 'startup co-founded'],
  ['500K+', 'users served'],
]
function Hero() {
  const [time, setTime] = useState('')
  const [mi, setMi] = useState(0)
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dubai' })
    setTime(fmt())
    const a = setInterval(() => setTime(fmt()), 15000)
    const b = setInterval(() => setMi((x) => (x + 1) % CURRENTLY.length), 3400)
    return () => { clearInterval(a); clearInterval(b) }
  }, [])

  return (
    <section id="top" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(80px,10vh,110px) clamp(20px,4vw,60px) clamp(50px,7vh,80px)' }}>
      <div style={{ position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }} style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 'clamp(10px,1.6vh,18px)', marginLeft: 4 }}>
          <Tag>Senior Software Engineer · Co-founder at Macro Rides</Tag>
          <span style={{ fontFamily: grot, fontWeight: 600, fontSize: 13, color: MUTE }}>Dubai, UAE · {time || '··:··'} local</span>
        </motion.div>
        <h1 style={{ margin: 0 }}>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <motion.span initial={{ y: '108%' }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.15 }} style={{ ...MEGA, display: 'block', fontSize: 'clamp(74px,16.5vw,280px)' }}>Pooja</motion.span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <motion.span initial={{ y: '108%' }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.3 }} className="pk-sheen" style={{ ...MEGA, display: 'block', fontSize: 'clamp(74px,16.5vw,280px)', color: ACCENT }}>Kushwah</motion.span>
          </span>
        </h1>
      </div>

      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} style={{ marginTop: 'clamp(18px,2.6vh,30px)', marginLeft: 4, maxWidth: '34ch', fontFamily: sans, fontSize: 'clamp(17px,1.7vw,24px)', fontWeight: 500, lineHeight: 1.3, color: INK }}>
        Give me a problem no one wants to touch. <span style={{ color: ACCENT }}>I&apos;ll ship it.</span>
      </motion.p>

      {/* currently — the live rotator */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }} style={{ marginTop: 'clamp(16px,2.4vh,26px)', marginLeft: 4, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 34, height: 1.5, background: ACCENT, flexShrink: 0 }} />
        <span style={{ fontFamily: grot, fontWeight: 600, fontSize: 'clamp(13px,1.05vw,15px)', color: MUTE, flexShrink: 0 }}>currently,</span>
        <span style={{ position: 'relative', height: 22, overflow: 'hidden', flex: 1, minWidth: 0 }}>
          <AnimatePresence mode="wait">
            <motion.span key={mi} initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -22, opacity: 0 }} transition={{ duration: 0.5, ease }}
              style={{ position: 'absolute', left: 0, fontFamily: sans, fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(14px,1.2vw,17.5px)', lineHeight: '22px', color: 'rgba(234,238,243,0.88)', whiteSpace: 'nowrap' }}>
              {CURRENTLY[mi]}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.div>

      {/* the receipts, up front */}
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.8 }} style={{ marginTop: 'clamp(26px,4.2vh,46px)', marginLeft: 4, display: 'flex', gap: 'clamp(26px,3.6vw,64px)', flexWrap: 'wrap' }}>
        {HERO_STATS.map(([n, l]) => (
          <div key={l}>
            <div style={{ ...MEGA, fontSize: 'clamp(30px,3.2vw,52px)', color: ACCENT }}>{n}</div>
            <div style={{ fontFamily: grot, fontWeight: 600, fontSize: 'clamp(11.5px,0.9vw,13px)', color: 'rgba(234,238,243,0.66)', marginTop: 5 }}>{l}</div>
          </div>
        ))}
      </motion.div>

      {/* quiet scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }} style={{ position: 'absolute', bottom: 'clamp(20px,3.5vh,34px)', left: '50%', transform: 'translateX(-50%)' }}>
        <motion.span animate={{ y: [0, 7, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} style={{ display: 'inline-block', color: 'rgba(234,238,243,0.55)', fontSize: 18 }}>↓</motion.span>
      </motion.div>
    </section>
  )
}

/* ─── kinetic marquee ─── */
function Marquee({ items, accent = false, dur = 30 }: { items: string[]; accent?: boolean; dur?: number }) {
  return (
    <div style={{ position: 'relative', borderTop: '1px solid rgba(234,238,243,0.1)', borderBottom: '1px solid rgba(234,238,243,0.1)', padding: 'clamp(10px,1.8vh,20px) 0', overflow: 'hidden', background: accent ? ACCENT : 'rgba(9,12,18,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
      <div style={{ display: 'inline-flex', whiteSpace: 'nowrap', animation: `pk-marquee ${dur}s linear infinite` }}>
        {[0, 1].map((k) => (
          <span key={k} aria-hidden={k === 1} style={{ display: 'inline-flex', flexShrink: 0 }}>
            {items.map((w, i) => (
              <span key={`${k}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
                <span style={{ ...MEGA, fontSize: 'clamp(22px,4vw,52px)', color: accent ? BG : INK, padding: '0 clamp(16px,2.4vw,38px)' }}>{w}</span>
                <span style={{ color: accent ? BG : ACCENT, fontSize: 'clamp(12px,1.4vw,20px)' }}>✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── work: horizontal filmstrip ─── */
function WorkPanel({ p, i, n, progress }: { p: (typeof PROJECTS)[number]; i: number; n: number; progress: MotionValue<number> }) {
  const c = n > 1 ? i / (n - 1) : 0
  const step = n > 1 ? 1 / (n - 1) : 1
  const scale = useTransform(progress, [c - step, c, c + step], [0.9, 1, 0.9])
  const [hover, setHover] = useState(false)
  return (
    <motion.article
      onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)} data-hover
      whileHover={{ y: -8 }} transition={{ duration: 0.35, ease }}
      style={{ scale, position: 'relative', flexShrink: 0, width: '62vw', maxWidth: 1000, height: '74vh', marginRight: '4vw', borderRadius: 24, overflow: 'hidden', background: p.grad, color: '#fff', boxShadow: '0 40px 90px -40px rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.18)' }}>
      {/* light + texture */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 85% 8%, rgba(255,255,255,0.22), transparent 55%)' }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.028) 0 1.5px, transparent 1.5px 13px)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(2,8,16,0.38) 100%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', right: '-2%', bottom: '-14%', ...MEGA, fontSize: 'clamp(240px,30vw,500px)', color: 'rgba(255,255,255,0.1)', lineHeight: 0.7, pointerEvents: 'none' }}>{p.n}</div>

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(26px,3vw,50px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <img src={p.logo} alt={`${p.t} logo`} style={{ height: 42, width: 'auto', minWidth: 42, maxWidth: 126, background: '#fff', padding: 5, borderRadius: 11, objectFit: 'contain', border: '1px solid rgba(255,255,255,0.35)', boxShadow: '0 4px 18px rgba(0,0,0,0.3)' }} />
            <span style={{ fontFamily: grot, fontWeight: 700, fontSize: 12.5, color: '#fff', background: 'rgba(2,8,16,0.32)', border: '1px solid rgba(255,255,255,0.3)', padding: '7px 14px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>{p.r}</span>
            <span style={{ fontFamily: grot, fontWeight: 600, fontSize: 12.5, color: 'rgba(255,255,255,0.85)' }}>{p.p}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ ...MEGA, fontSize: 'clamp(30px,3.2vw,56px)', color: '#fff', textShadow: '0 2px 30px rgba(0,0,0,0.35)' }}>{p.stat}</div>
            <div style={{ fontFamily: grot, fontWeight: 600, fontSize: 11, color: 'rgba(255,255,255,0.72)', marginTop: 3 }}>{p.b}</div>
          </div>
        </div>

        <div>
          <h3 style={{ ...MEGA, fontSize: 'clamp(40px,6vw,116px)', marginBottom: 10, textShadow: '0 4px 40px rgba(0,0,0,0.25)' }}>{p.t}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ width: 26, height: 1.5, background: 'rgba(255,255,255,0.65)', flexShrink: 0 }} />
            <span style={{ fontFamily: grot, fontWeight: 600, fontSize: 12.5, color: 'rgba(255,255,255,0.88)' }}>{p.tag}</span>
          </div>
          <p style={{ fontFamily: sans, fontSize: 'clamp(14px,1.3vw,19px)', fontWeight: 500, lineHeight: 1.4, color: 'rgba(255,255,255,0.97)', maxWidth: '42ch', margin: 0 }}>{p.d}</p>

          {/* key points — always visible so the content reads without hovering */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.28)', marginTop: 16, paddingTop: 13 }}>
            {p.hi.slice(0, hover ? p.hi.length : 2).map((h) => (
              <div key={h} style={{ display: 'flex', gap: 10, padding: '4px 0', fontFamily: sans, fontSize: 'clamp(12.5px,1vw,15px)', lineHeight: 1.42, color: 'rgba(255,255,255,0.95)' }}>
                <span style={{ color: 'rgba(255,255,255,0.75)' }}>·</span>{h}
              </div>
            ))}
            {!hover && p.hi.length > 2 && <div style={{ fontFamily: grot, fontWeight: 600, fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>hover for {p.hi.length - 2} more +</div>}
          </div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 14 }}>
            {p.tech.map((tt) => <span key={tt} style={{ fontFamily: grot, fontWeight: 600, fontSize: 11.5, color: '#fff', background: 'rgba(2,8,16,0.3)', border: '1px solid rgba(255,255,255,0.32)', padding: '6px 13px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>{tt}</span>)}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function Work() {
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.max(0, Math.min(PROJECTS.length - 1, Math.round(v * (PROJECTS.length - 1))))))
  const n = PROJECTS.length
  const pitch = 66, startX = 19
  const endX = -((n - 1) * pitch) + startX
  const x = useTransform(scrollYProgress, [0, 1], [`${startX}vw`, `${endX}vw`])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="work" ref={track} style={{ position: 'relative', height: `${n * 55}vh`, background: 'rgba(8,10,15,0.5)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 'clamp(74px,10vh,104px)', left: 'clamp(20px,4vw,60px)', right: 'clamp(20px,4vw,60px)', zIndex: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
          <div>
            <Tag style={{ marginBottom: 8 }}>Selected work</Tag>
            <div style={{ ...MEGA, fontSize: 'clamp(30px,4.6vw,64px)' }}>The receipts</div>
          </div>
          <span style={{ fontFamily: grot, fontWeight: 600, fontSize: 13, color: MUTE }}>scroll to move&nbsp;&nbsp;{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
        </div>

        <motion.div style={{ display: 'flex', alignItems: 'center', x, willChange: 'transform' }}>
          {PROJECTS.map((p, i) => <WorkPanel key={p.t} p={p} i={i} n={n} progress={scrollYProgress} />)}
        </motion.div>

        <div style={{ position: 'absolute', bottom: 'clamp(30px,5vh,52px)', left: 'clamp(20px,4vw,60px)', right: 'clamp(20px,4vw,60px)', zIndex: 5 }}>
          <div style={{ height: 3, background: 'rgba(234,238,243,0.12)', borderRadius: 3, overflow: 'hidden' }}>
            <motion.div style={{ width: bar, height: '100%', background: ACCENT }} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── about: zoom statement + slide-in ─── */
function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.55], [0.82, 1.14])
  const x = useTransform(scrollYProgress, [0, 0.55], ['0vw', '-3vw'])

  return (
    <section id="about" ref={ref} style={{ position: 'relative', padding: 'clamp(70px,11vh,120px) clamp(20px,4vw,60px)', background: 'rgba(9,12,18,0.6)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', overflow: 'hidden' }}>
      <Reveal><Tag style={{ marginBottom: 'clamp(14px,2vh,24px)' }}>The driver</Tag></Reveal>

      {/* zooming statement — grows from the left as you scroll through */}
      <motion.h2 style={{ scale, x, transformOrigin: 'left center', ...MEGA, fontSize: 'clamp(46px,10vw,220px)' }}>
        I build what<br />engineers <span style={{ color: ACCENT }}>avoid.</span>
      </motion.h2>

      {/* content that flies in from the right */}
      <div style={{ position: 'relative', marginTop: 'clamp(34px,6vh,72px)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(28px,5vw,80px)', alignItems: 'start' }}>
        <Reveal>
          <p style={{ fontFamily: sans, fontSize: 'clamp(17px,1.7vw,26px)', fontWeight: 500, lineHeight: 1.5, color: INK, maxWidth: '24ch', margin: 0 }}>
            Then I <span style={{ color: ACCENT }}>ship it.</span> E-commerce to 500K+ European shoppers. A frontend from 7-8 seconds to under half a second. An e-rickshaw platform running real rides in Delhi before a rupee of funding.
          </p>
        </Reveal>
        <FromRight>
          <Tag style={{ marginBottom: 16 }}>The trajectory</Tag>
          {TRAJECTORY.map(([y, l, s]) => (
            <motion.div key={l} whileHover={{ x: 6 }} transition={{ duration: 0.3, ease }} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: 'clamp(11px,1.6vh,16px) 0', borderTop: '1px solid rgba(234,238,243,0.12)' }}>
              <span style={{ fontFamily: grot, fontWeight: 700, fontSize: 'clamp(12px,0.95vw,14px)', color: ACCENT, minWidth: 'clamp(88px,7.5vw,116px)', flexShrink: 0 }}>{y}</span>
              <span style={{ ...MEGA, fontSize: 'clamp(22px,2.4vw,42px)' }}>{l}</span>
              <span style={{ ...label, fontSize: 10, color: MUTE, marginLeft: 'auto', textAlign: 'right', letterSpacing: '0.12em' }}>{s}</span>
            </motion.div>
          ))}
        </FromRight>
      </div>

      {/* achievements band */}
      <div style={{ marginTop: 'clamp(40px,7vh,80px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 1, background: 'rgba(234,238,243,0.1)', border: '1px solid rgba(234,238,243,0.1)' }}>
        {ACHIEVEMENTS.map(([t, s], i) => (
          <motion.div key={t} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: i * 0.08 }} whileHover={{ backgroundColor: 'rgba(34,184,230,0.06)' }} style={{ background: BG, padding: 'clamp(22px,3.6vh,40px) clamp(20px,2.4vw,34px)' }}>
            <div style={{ ...MEGA, fontSize: 'clamp(32px,3.6vw,60px)', color: ACCENT }}>{t}</div>
            <div style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.4, color: 'rgba(234,238,243,0.66)', marginTop: 8 }}>{s}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ─── stack: interactive split — hover a category, its tools appear large ─── */
function Stack() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const headScale = useTransform(scrollYProgress, [0, 0.35], [0.86, 1.06])
  const headX = useTransform(scrollYProgress, [0, 0.35], ['0vw', '-2vw'])
  const [act, setAct] = useState(0)
  const items = CATS[act][1]

  return (
    <section id="stack" ref={ref} style={{ position: 'relative', padding: 'clamp(70px,11vh,120px) clamp(20px,4vw,60px)', background: 'linear-gradient(180deg, rgba(9,12,18,0.58), rgba(11,20,32,0.72))', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', overflow: 'hidden' }}>
      <Reveal><Tag style={{ marginBottom: 12 }}>What I bring</Tag></Reveal>
      <motion.h2 style={{ scale: headScale, x: headX, transformOrigin: 'left center', ...MEGA, fontSize: 'clamp(48px,9vw,180px)' }}>Lead. Architect. <span style={{ color: ACCENT }}>Ship.</span></motion.h2>

      {/* interactive split: category list ↔ its tools shown large */}
      <div style={{ marginTop: 'clamp(34px,6vh,64px)', display: 'grid', gridTemplateColumns: 'minmax(0,0.85fr) minmax(0,1.15fr)', gap: 'clamp(24px,4vw,72px)', alignItems: 'start' }}>
        <div>
          {CATS.map(([cat], i) => {
            const on = act === i
            return (
              <button key={cat} onMouseEnter={() => setAct(i)} onFocus={() => setAct(i)} onClick={() => setAct(i)} data-hover
                style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', textAlign: 'left', background: 'none', border: 0, borderTop: '1px solid rgba(234,238,243,0.12)', padding: 'clamp(12px,1.8vh,20px) 0', cursor: 'pointer' }}>
                <span style={{ fontFamily: grot, fontWeight: 700, fontSize: 12, color: on ? ACCENT : MUTE, width: 22 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ ...MEGA, fontSize: 'clamp(26px,3.4vw,54px)', color: on ? INK : 'rgba(234,238,243,0.3)', transition: 'color .3s' }}>{cat}</span>
                <motion.span animate={{ opacity: on ? 1 : 0, x: on ? 0 : -10 }} transition={{ duration: 0.25 }} style={{ marginLeft: 'auto', color: ACCENT, fontSize: 22 }}>→</motion.span>
              </button>
            )
          })}
        </div>

        <div style={{ minHeight: 'clamp(240px,42vh,380px)' }}>
          <AnimatePresence mode="wait">
            <motion.div key={act} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.4, ease }}>
              <div style={{ fontFamily: grot, fontWeight: 600, fontSize: 13, color: MUTE, marginBottom: 'clamp(16px,2.4vh,26px)' }}>{items.length} tools, in production</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(10px,1.4vw,18px) clamp(16px,2vw,30px)' }}>
                {items.map((tt, k) => (
                  <motion.span key={tt} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + k * 0.04, duration: 0.4, ease }}
                    style={{ ...MEGA, fontSize: 'clamp(22px,2.8vw,46px)', color: CORE.has(tt) ? ACCENT : 'rgba(234,238,243,0.9)', lineHeight: 1 }}>{tt}</motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* how I lead — clean editorial columns, no boxes */}
      <div style={{ marginTop: 'clamp(44px,8vh,88px)' }}>
        <Reveal><Tag style={{ marginBottom: 20 }}>How I lead</Tag></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 'clamp(18px,2.4vw,40px)' }}>
          {LEAD.map(([t, s], i) => (
            <Reveal key={t} delay={(i % 3) * 0.05}>
              <div style={{ borderTop: `1.5px solid ${ACCENT}55`, paddingTop: 14 }}>
                <div style={{ fontFamily: grot, fontWeight: 700, fontSize: 12, color: ACCENT, marginBottom: 8 }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ ...MEGA, fontSize: 'clamp(19px,1.7vw,27px)', marginBottom: 6 }}>{t}</div>
                <div style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.45, color: 'rgba(234,238,243,0.6)' }}>{s}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── play: airy outlined gallery card; framed duotone photo, caption on the border, hover story panel ─── */
function PlayTile({ item }: { item: (typeof PLAY)[number] }) {
  const chips = item.meta.split('·').map((c) => c.trim())
  return (
    <motion.article data-hover initial="r" whileHover="h" animate="r"
      variants={{ r: { borderColor: 'rgba(234,238,243,0.16)' }, h: { borderColor: ACCENT } }} transition={{ duration: 0.35, ease }}
      style={{ position: 'relative', height: '100%', border: '1px solid rgba(234,238,243,0.16)', borderRadius: 26, background: 'transparent', padding: 'clamp(18px,1.7vw,26px)', cursor: 'pointer' }}>
      {/* framed photo — floats inside the outlined card with real air around it */}
      <div style={{ position: 'relative', height: '100%', borderRadius: 12, overflow: 'hidden' }}>
        <motion.img src={item.img} alt={item.title} variants={{ r: { scale: 1.04, filter: 'grayscale(0.5) brightness(0.66)' }, h: { scale: 1.1, filter: 'grayscale(0) brightness(1)' } }} transition={{ duration: 0.65, ease }} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <motion.div variants={{ r: { opacity: 0.4 }, h: { opacity: 0 } }} transition={{ duration: 0.5, ease }} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(16,48,72,0.5), rgba(8,20,32,0.6))', mixBlendMode: 'multiply' }} />

        {/* hover: translucent story panel slides up inside the frame — photo stays visible through it */}
        <motion.div variants={{ r: { y: '101%' }, h: { y: '0%' } }} transition={{ duration: 0.45, ease }}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3, background: 'rgba(8,13,20,0.45)', backdropFilter: 'blur(7px)', WebkitBackdropFilter: 'blur(7px)', borderTop: `1.5px solid ${ACCENT}`, padding: 'clamp(14px,1.3vw,20px)' }}>
          <div style={{ fontFamily: grot, fontWeight: 700, fontSize: 'clamp(14px,1.15vw,17px)', color: ACCENT, marginBottom: 8, textShadow: '0 1px 10px rgba(6,10,16,0.8)' }}>{item.tag}</div>
          <p style={{ fontFamily: sans, fontWeight: 500, fontSize: 'clamp(13.5px,1.05vw,15.5px)', lineHeight: 1.55, color: '#F4F8FC', margin: '0 0 12px', maxWidth: '46ch', textShadow: '0 1px 10px rgba(6,10,16,0.85)' }}>{item.desc}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {chips.map((c) => <span key={c} style={{ fontFamily: grot, fontWeight: 600, fontSize: 11, color: '#F4F8FC', border: '1px solid rgba(244,248,252,0.4)', padding: '4px 11px', borderRadius: 999, background: 'rgba(8,13,20,0.35)' }}>{c}</span>)}
          </div>
        </motion.div>
      </div>

      {/* caption sitting ON the border line, bottom-right — title only */}
      <div style={{ position: 'absolute', right: 26, bottom: -18, background: '#0a0e15', padding: '6px 16px', zIndex: 4 }}>
        <motion.span variants={{ r: { color: '#EAEEF3' }, h: { color: ACCENT } }} transition={{ duration: 0.3 }} style={{ fontFamily: grot, fontWeight: 700, fontSize: 'clamp(14px,1.1vw,17px)', letterSpacing: '0.02em' }}>{item.title}</motion.span>
      </div>
    </motion.article>
  )
}

/* Stack freezes at its last screen; the Play panel then sweeps in from the top-left OVER it (scroll-driven, full-screen), then scrolls on as a normal section */
function StackPlay() {
  const stackWrap = useRef<HTMLDivElement>(null)
  const [stackTop, setStackTop] = useState<number | null>(null)
  useEffect(() => {
    const el = stackWrap.current
    if (!el) return
    const measure = () => setStackTop(Math.min(0, window.innerHeight - el.offsetHeight))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  const probe = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: probe, offset: ['start start', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 0.85], ['-112%', '0%'])

  return (
    <div style={{ position: 'relative' }}>
      {/* stack pins at its last screen while the panel covers it */}
      <div ref={stackWrap} style={{ position: stackTop === null ? 'relative' : 'sticky', top: stackTop ?? 0, zIndex: 1 }}>
        <Stack />
      </div>

      <section id="play" style={{ position: 'relative', zIndex: 6, marginTop: '-100vh', pointerEvents: 'none' }}>
        {/* probe: measures the 100vh entrance window that overlaps the frozen stack */}
        <div ref={probe} aria-hidden style={{ position: 'absolute', top: 0, left: 0, width: 1, height: '100vh' }} />
        <div style={{ position: 'sticky', top: 0 }}>
          <motion.div style={{ x, pointerEvents: 'auto', minHeight: '100vh', background: '#0a0e15', borderRight: '1px solid rgba(34,184,230,0.25)', padding: 'clamp(80px,12vh,130px) clamp(20px,4vw,60px) clamp(70px,10vh,120px)' }}>
            <Tag style={{ marginBottom: 14 }}>Off the clock</Tag>
            <h2 style={{ ...MEGA, fontSize: 'clamp(40px,7vw,120px)', marginBottom: 'clamp(10px,2vh,18px)' }}>Who I am when<br />I&apos;m <span style={{ color: ACCENT }}>not shipping.</span></h2>
            <p style={{ fontFamily: sans, fontSize: 'clamp(14px,1.2vw,17px)', lineHeight: 1.5, color: 'rgba(234,238,243,0.62)', maxWidth: '52ch', marginBottom: 'clamp(30px,5vh,52px)' }}>Turns out I have a whole personality outside the terminal. Hover any of these.</p>
            <div className="play-mosaic">
              {PLAY.map((item) => <div key={item.title}><PlayTile item={item} /></div>)}
            </div>
          </motion.div>
        </div>
        {/* entrance scroll distance */}
        <div style={{ height: '100vh' }} />
      </section>
    </div>
  )
}

/* ─── contact ─── */
function InstagramIcon() {
  return (<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.8.31-1.47.72-2.14 1.4A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.4 2.14a5.9 5.9 0 0 0 2.13 1.4c.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.14-1.4 5.9 5.9 0 0 0 1.4-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.4-2.14A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z"/></svg>)
}
function MailIcon() {
  return (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m3 6 9 7 9-7" /></svg>)
}

const SOCIALS: { label: string; handle: string; href: string; Icon: () => React.JSX.Element }[] = [
  { label: 'LinkedIn', handle: 'poojakushwah1402', href: 'https://www.linkedin.com/in/poojakushwah1402/', Icon: LinkedInIcon },
  { label: 'GitHub', handle: 'PoojaKushwah1402', href: 'https://github.com/PoojaKushwah1402', Icon: GitHubIcon },
  { label: 'Instagram', handle: '@pooja', href: 'https://www.instagram.com/', Icon: InstagramIcon },
  { label: 'Email', handle: 'pookus7790@gmail.com', href: 'mailto:pookus7790@gmail.com', Icon: MailIcon },
]

/* full-width social row that floods cyan on hover */
function SocialRow({ s }: { s: (typeof SOCIALS)[number] }) {
  const I = s.Icon
  return (
    <motion.a href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" data-hover initial="r" whileHover="h" animate="r"
      style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16, padding: 'clamp(17px,2.4vh,24px) clamp(14px,1.2vw,20px)', borderTop: '1px solid rgba(234,238,243,0.12)', textDecoration: 'none', overflow: 'hidden', cursor: 'pointer' }}>
      {/* cyan flood */}
      <motion.span aria-hidden variants={{ r: { y: '101%' }, h: { y: '0%' } }} transition={{ duration: 0.4, ease }} style={{ position: 'absolute', inset: 0, background: ACCENT }} />
      <motion.span variants={{ r: { color: '#EAEEF3' }, h: { color: BG } }} transition={{ duration: 0.3 }} style={{ position: 'relative', display: 'inline-flex' }}><I /></motion.span>
      <motion.span variants={{ r: { color: '#EAEEF3' }, h: { color: BG } }} transition={{ duration: 0.3 }} style={{ position: 'relative', ...MEGA, fontSize: 'clamp(22px,2.2vw,36px)' }}>{s.label}</motion.span>
      <motion.span variants={{ r: { color: MUTE, x: 0 }, h: { color: BG, x: -6 } }} transition={{ duration: 0.3 }} style={{ position: 'relative', marginLeft: 'auto', fontFamily: grot, fontWeight: 600, fontSize: 'clamp(12px,1vw,14px)' }}>{s.handle}</motion.span>
      <motion.span variants={{ r: { opacity: 0.5, x: -6, color: ACCENT }, h: { opacity: 1, x: 0, color: BG } }} transition={{ duration: 0.3 }} style={{ position: 'relative', fontSize: 'clamp(18px,1.6vw,24px)', lineHeight: 1 }}>↗</motion.span>
    </motion.a>
  )
}
/* message composer — opens the visitor's mail app today; swap handleSend to a Slack webhook later */
function QuickMessage() {
  const [msg, setMsg] = useState('')
  const [from, setFrom] = useState('')
  const send = () => {
    if (!msg.trim()) return
    const subject = encodeURIComponent('Hi Pooja — from your portfolio')
    const body = encodeURIComponent(`${msg.trim()}\n\n— reply to: ${from.trim() || 'no email left'}`)
    window.location.href = `mailto:pookus7790@gmail.com?subject=${subject}&body=${body}`
  }
  return (
    <div>
      <textarea className="pk-input" data-hover rows={3} placeholder="Type your message here..." value={msg} onChange={(e) => setMsg(e.target.value)} style={{ marginBottom: 10 }} />
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <input className="pk-input" data-hover type="email" placeholder="Your email, so I can reply" value={from} onChange={(e) => setFrom(e.target.value)} style={{ flex: '1 1 200px' }} />
        <motion.button onClick={send} data-hover whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}
          style={{ fontFamily: grot, fontWeight: 700, fontSize: 14, color: BG, background: ACCENT, border: 0, borderRadius: 12, padding: '13px 26px', cursor: 'pointer', opacity: msg.trim() ? 1 : 0.55 }}>
          Send →
        </motion.button>
      </div>
      <div style={{ fontFamily: grot, fontWeight: 600, fontSize: 11, color: MUTE, marginTop: 10 }}>Opens in your mail app, lands straight in my inbox. Slack quick-chat coming soon.</div>
    </div>
  )
}

function Contact() {
  return (
    <section id="contact" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(90px,12vh,140px) clamp(20px,4vw,60px)' }}>
      <div style={{ width: '100%', maxWidth: 1500, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(14px,2.4vh,26px)' }}>
            <span style={{ position: 'relative', width: 8, height: 8 }}>
              <span className="status-pulse" style={{ position: 'absolute', inset: 0, borderRadius: 999, background: ACCENT, opacity: 0.6 }} />
              <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: ACCENT }} />
            </span>
            <span style={{ fontFamily: grot, fontWeight: 600, fontSize: 13.5, color: 'rgba(234,238,243,0.8)' }}>Always up for a good chat, coffee included</span>
          </div>
        </Reveal>

        {/* headline — reliable reveal, no overflow clip */}
        <Reveal delay={0.05}>
          <h2 className="pk-sheen" style={{ ...MEGA, fontSize: 'clamp(80px,17vw,300px)', color: ACCENT, lineHeight: 0.8 }}>Say hi.</h2>
        </Reveal>

        <div style={{ marginTop: 'clamp(30px,5.5vh,64px)', display: 'grid', gridTemplateColumns: 'minmax(0,1.02fr) minmax(0,0.98fr)', gap: 'clamp(34px,5vw,90px)', alignItems: 'start' }}>
          {/* quick message — chat-style composer */}
          <Reveal delay={0.1}>
            <div style={{ position: 'relative', border: '1px solid rgba(234,238,243,0.16)', borderRadius: 22, padding: 'clamp(20px,2vw,30px)', background: 'rgba(9,13,19,0.6)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
              {/* her opener bubble */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 'clamp(16px,2.2vh,22px)' }}>
                <span style={{ display: 'grid', placeItems: 'center', width: 38, height: 38, borderRadius: 999, background: ACCENT, color: BG, fontFamily: grot, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>PK</span>
                <div>
                  <div style={{ background: 'rgba(234,238,243,0.07)', border: '1px solid rgba(234,238,243,0.12)', borderRadius: '4px 16px 16px 16px', padding: '12px 16px', fontFamily: sans, fontSize: 14.5, lineHeight: 1.5, color: INK, maxWidth: '42ch' }}>
                    Building something interesting? Tell me about it. A hard problem, a wild idea, or honestly just a good coffee and a chat. I&apos;m in.
                  </div>
                  <div style={{ fontFamily: grot, fontWeight: 600, fontSize: 11, color: MUTE, marginTop: 6 }}>Pooja · usually replies same day</div>
                </div>
              </div>
              <QuickMessage />
              {/* caption on the border, matching the gallery tiles */}
              <div style={{ position: 'absolute', right: 24, bottom: -14, background: '#0a0e15', padding: '4px 14px', borderRadius: 6 }}>
                <span style={{ fontFamily: grot, fontWeight: 700, fontSize: 13, color: ACCENT }}>Quick message</span>
              </div>
            </div>
          </Reveal>

          {/* socials — rows that flood cyan */}
          <FromRight delay={0.15}>
            <div style={{ borderBottom: '1px solid rgba(234,238,243,0.12)' }}>
              {SOCIALS.map((s) => <SocialRow key={s.label} s={s} />)}
            </div>
          </FromRight>
        </div>

        <div style={{ marginTop: 'clamp(48px,8vh,96px)', paddingTop: 22, borderTop: '1px solid rgba(234,238,243,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <span style={{ fontFamily: grot, fontWeight: 600, fontSize: 12, color: MUTE }}>© 2026 Pooja Kushwah · Dubai, UAE</span>
          <motion.button onClick={() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })} data-hover whileHover={{ color: ACCENT, y: -3 }} transition={{ duration: 0.25 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: '1px solid rgba(234,238,243,0.22)', borderRadius: 999, padding: '10px 18px', fontFamily: grot, fontWeight: 600, fontSize: 12.5, color: INK, cursor: 'pointer' }}>
            Back to top ↑
          </motion.button>
        </div>
      </div>
    </section>
  )
}

/* ─── orchestrator ─── */
export default function PortfolioExperience() {
  const lenisRef = useRef<Lenis | null>(null)
  const [active, setActive] = useState('top')

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, touchMultiplier: 1.6 })
    lenisRef.current = lenis
    let raf = 0
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenisRef.current = null }
  }, [])

  useEffect(() => {
    const ids = ['top', 'work', 'about', 'stack', 'play', 'contact']
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }) }, { rootMargin: '-45% 0px -45% 0px' })
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const goto = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    // play overlaps the frozen stack by 100vh; land where the panel is fully in
    const offset = id === 'play' ? window.innerHeight : 0
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'relative', background: BG, color: INK, fontFamily: sans }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}><MountainJourney /></div>
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(90deg, rgba(8,9,12,0.82) 0%, rgba(8,9,12,0.34) 52%, rgba(8,9,12,0.06) 100%)' }} />

      <Nav goto={goto} active={active} />

      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <Work />
        <About />
        <Marquee items={FLOW} accent dur={42} />
        <StackPlay />
        <Contact />
      </main>
    </div>
  )
}
