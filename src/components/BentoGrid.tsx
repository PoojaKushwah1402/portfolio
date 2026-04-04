'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const fade = (delay: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

const cardIn = (delay: number) => ({
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

const stackItems = [
  { name: 'React', detail: '5+ yrs · primary' },
  { name: 'Next.js', detail: '3+ yrs · primary' },
  { name: 'NestJS', detail: '3+ yrs · primary' },
  { name: 'Node', detail: '5+ yrs · primary' },
  { name: 'TypeScript', detail: '5+ yrs · daily' },
  { name: 'Python', detail: '3+ yrs · frequent' },
  { name: 'Go', detail: '1+ yr · startup' },
  { name: 'Angular', detail: '2+ yrs · startup' },
  { name: 'AWS', detail: '4+ yrs · primary' },
  { name: 'Docker', detail: '4+ yrs · daily' },
  { name: 'K8s', detail: '2+ yrs · infra' },
  { name: 'Terraform', detail: '2+ yrs · IaC' },
  { name: 'PostgreSQL', detail: '4+ yrs · primary' },
  { name: 'LangChain', detail: '1+ yr · AI' },
  { name: 'Pinecone', detail: '1+ yr · vectors' },
  { name: 'OpenAI', detail: '2+ yrs · AI' },
]

export default function BentoGrid() {
  const [hStack, setHStack] = useState<number | null>(null)

  return (
    <motion.div initial="hidden" animate="visible" className="max-w-[1400px] mx-auto">

      {/* ═══════════════ HERO CARD ═══════════════ */}
      <div className="p-3 md:p-4">
        <motion.div
          variants={cardIn(0)}
          className="bg-cream-bg rounded-card p-8 md:p-14 lg:p-20 relative overflow-hidden min-h-[70vh] md:min-h-[80vh] flex flex-col justify-between"
        >
          <div className="absolute top-6 right-6 md:top-10 md:right-14 lg:right-20">
            <span className="font-primary font-[900] text-[clamp(60px,12vw,180px)] leading-none text-cream-text/[0.04] select-none whitespace-nowrap">
              POOJA
            </span>
          </div>

          <div className="relative z-10">
            <p className="font-mono text-[10px] md:text-[11px] text-gold tracking-[0.15em] uppercase mb-6">
              Co-Founder · Macro Rides · Dubai
            </p>
          </div>

          <div className="relative z-10 max-w-3xl">
            <h1 className="font-primary font-[900] text-[clamp(32px,5.5vw,72px)] leading-[1.05] tracking-[-0.03em] text-cream-text mb-6">
              Give me a problem
              <br />no one wants
              <br />to touch.{' '}
              <span className="text-gold italic">I&apos;ll ship it.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] text-cream-muted max-w-lg mb-10 leading-relaxed">
              6+ years turning hard problems into running systems.
              Enterprise telecom → AI products → now building my own.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#work" className="inline-flex items-center gap-2 bg-cream-text text-cream-bg font-primary font-bold text-[13px] px-7 py-3.5 rounded-btn hover:bg-cream-text/85 transition-colors tracking-wide uppercase">
                See my work
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a href="mailto:pookus7790@gmail.com" className="inline-flex items-center gap-2 border-2 border-cream-text/20 text-cream-text font-primary font-bold text-[13px] px-7 py-3.5 rounded-btn hover:bg-cream-text hover:text-cream-bg transition-all tracking-wide uppercase">
                Let&apos;s talk
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 md:bottom-14 md:right-14">
            <span className="font-mono text-[10px] text-cream-muted/50">Based in Dubai, UAE</span>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════ ABOUT — open text, no card ═══════════════ */}
      <div className="px-6 md:px-16 lg:px-28 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 max-w-6xl">
          <motion.div variants={fade(0.1)} className="md:col-span-7">
            <p className="text-[16px] md:text-[18px] text-txt-body leading-[1.9]">
              I solve the problems nobody wants to touch. Started at{' '}
              <strong className="text-txt-primary font-semibold">Amdocs</strong>{' '}
              building telecom for millions, moved to{' '}
              <strong className="text-txt-primary font-semibold">analytics consulting</strong>{' '}
              at Bridgei2i, then scaled{' '}
              <strong className="text-txt-primary font-semibold">European e-commerce</strong>{' '}
              at group.one in Dubai — payments, AI recommendations, multi-region
              sharding, the works. Picked up{' '}
              <strong className="text-txt-primary font-semibold">Django, Go, Angular</strong>{' '}
              at a 3-person startup where I had to figure it out or we didn&apos;t ship.
              Now I&apos;m co-founding{' '}
              <strong className="text-txt-primary font-semibold">Macro Rides</strong>{' '}
              — every technical decision, mine.
            </p>
          </motion.div>

          <motion.div variants={fade(0.2)} className="md:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <div>
                <span className="font-primary font-[900] text-[52px] md:text-[64px] text-gold leading-none block">4.5×</span>
                <span className="font-mono text-[11px] text-txt-muted mt-1 block">faster · 6.7s → 1.2s</span>
              </div>
              <div>
                <span className="font-primary font-[900] text-[52px] md:text-[64px] text-txt-primary leading-none block">90%</span>
                <span className="font-mono text-[11px] text-txt-muted mt-1 block">test coverage · zero-bug releases</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'LinkedIn', href: 'https://www.linkedin.com/in/pooja-kushwah-b22584137/' },
                { name: 'GitHub', href: 'https://github.com/PoojaKushwah1402' },
                { name: 'Email', href: 'mailto:pookus7790@gmail.com' },
              ].map((s) => (
                <a key={s.name} href={s.href} target={s.name !== 'Email' ? '_blank' : undefined} rel={s.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="px-5 py-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-pill text-txt-secondary text-[13px] hover:border-gold/20 hover:text-gold transition-all"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════ WORK — featured as cards, rest as list ═══════════════ */}
      <div className="px-3 md:px-4" id="work">
        {/* Section label */}
        <motion.div variants={fade(0.15)} className="px-3 md:px-10 mb-8">
          <span className="font-mono text-[10px] text-gold uppercase tracking-[0.15em]">Selected Work</span>
        </motion.div>

        {/* Featured projects — cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
          {[
            {
              tag: 'Co-founded · Current', name: 'Macro Rides',
              desc: 'Mobility startup. Built entire platform from first commit — vendor management, booking, real-time availability, payments.',
              tech: 'NestJS · PostgreSQL · AWS · BullMQ', impactBig: '0→1', impactSmall: 'Live product',
            },
            {
              tag: 'group.one · Dubai', name: 'E-Commerce Platform',
              desc: 'End-to-end webshop for European markets. AI recommendations, MCP, Stripe/PayPal, multi-region sharding.',
              tech: 'React · CockroachDB · Docker · Stripe', impactBig: '90%', impactSmall: 'Test coverage',
            },
          ].map((p, i) => (
            <motion.div
              key={p.name}
              variants={cardIn(0.2 + i * 0.08)}
              className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-card p-7 md:p-10 gold-glow-top hover:border-[rgba(196,161,66,0.2)] hover:bg-[rgba(255,255,255,0.06)] transition-all group flex flex-col justify-between min-h-[240px]"
            >
              <div>
                <span className="font-mono text-[9px] text-gold uppercase tracking-[0.12em] block mb-4">{p.tag}</span>
                <h3 className="font-primary font-[900] text-[clamp(24px,3vw,34px)] text-txt-primary mb-4 tracking-[-0.02em]">{p.name}</h3>
                <p className="text-[14px] text-txt-secondary leading-relaxed">{p.desc}</p>
              </div>
              <div className="border-t border-[rgba(255,255,255,0.06)] pt-5 mt-6 flex items-end justify-between">
                <span className="font-mono text-[10px] text-txt-hint">{p.tech}</span>
                <div className="text-right">
                  <span className="font-primary font-[900] text-2xl text-gold block leading-none">{p.impactBig}</span>
                  <span className="font-mono text-[9px] text-txt-muted">{p.impactSmall}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other projects — magazine style rows */}
        <div className="mt-6 md:mt-10 px-3 md:px-6">
          {[
            { num: '03', name: 'AI Recommendation Engine', tag: 'ML', impact: '↑ Engagement', desc: 'AI-driven product discovery with MCP for dynamic, context-aware features.' },
            { num: '04', name: 'Performance Overhaul', tag: 'Perf', impact: '4.5× Faster', desc: '6-7s → under 2s. Systematic profiling, caching, lazy loading.' },
            { num: '05', name: 'Proxy Email System', tag: 'Infra', impact: 'Automated', desc: 'Proxy email with channel manager integrations.' },
            { num: '06', name: 'Calendar Sync (iCal)', tag: 'Integration', impact: '0 Double-bookings', desc: 'Bidirectional iCal sync across booking platforms.' },
            { num: '07', name: 'Google VR Integration', tag: 'VR', impact: 'Immersive UX', desc: 'Google VR for 360° property walkthroughs.' },
          ].map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative py-7 md:py-9 border-b border-[rgba(255,255,255,0.05)] first:border-t cursor-default"
            >
              {/* Background number — appears on hover */}
              <span className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 font-primary font-[900] text-[80px] md:text-[120px] leading-none text-transparent group-hover:text-[rgba(196,161,66,0.05)] transition-colors duration-500 select-none pointer-events-none">
                {p.num}
              </span>

              <div className="relative flex flex-col md:flex-row md:items-baseline gap-3 md:gap-0">
                {/* Number + Name */}
                <div className="md:w-[45%] flex items-baseline gap-4">
                  <span className="font-mono text-[11px] text-gold/40 group-hover:text-gold transition-colors duration-300">
                    {p.num}
                  </span>
                  <h4 className="font-primary font-[900] text-[22px] md:text-[28px] text-txt-secondary group-hover:text-txt-primary transition-colors duration-300 tracking-[-0.02em] leading-tight">
                    {p.name}
                  </h4>
                </div>

                {/* Description — slides right on hover */}
                <div className="md:w-[35%] md:pl-4">
                  <p className="text-[13px] text-txt-hint group-hover:text-txt-muted transition-colors duration-300 leading-relaxed md:group-hover:translate-x-1 md:transition-all md:duration-300">
                    {p.desc}
                  </p>
                </div>

                {/* Impact */}
                <div className="md:w-[20%] md:text-right">
                  <span className="font-mono text-[11px] text-gold/40 group-hover:text-gold transition-colors duration-300 tracking-wide">
                    {p.impact}
                  </span>
                </div>
              </div>

              {/* Gold underline — expands on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-px">
                <div className="h-full bg-gold/30 w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══════════════ STACK + CTA — cards ═══════════════ */}
      <div className="px-3 md:px-4 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
        {/* Stack card */}
        <motion.div
          variants={cardIn(0.4)}
          className="md:col-span-9 bg-card border border-card-border rounded-card p-7 md:p-10"
        >
          <span className="font-mono text-[9px] text-txt-muted uppercase tracking-[0.12em] block mb-8">
            Stack — hover to explore
          </span>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {stackItems.map((item, i) => (
              <div
                key={item.name}
                className="relative px-4 py-4 cursor-default"
                onMouseEnter={() => setHStack(i)}
                onMouseLeave={() => setHStack(null)}
              >
                <span className={`font-primary font-bold text-[16px] block transition-colors ${hStack === i ? 'text-gold' : 'text-[#8A8578]'}`}>
                  {item.name}
                </span>
                <motion.div
                  initial={false}
                  animate={{ height: hStack === i ? 'auto' : 0, opacity: hStack === i ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <span className="font-mono text-[9px] text-txt-hint block mt-1">{item.detail}</span>
                </motion.div>
                <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[rgba(255,255,255,0.03)] rounded-full overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{ scaleX: hStack === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gold origin-left"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA gold card */}
        <motion.a
          href="mailto:pookus7790@gmail.com"
          variants={cardIn(0.48)}
          className="md:col-span-3 bg-gradient-to-br from-gold via-gold-light to-gold-dark rounded-card p-7 md:p-10 flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform min-h-[240px]"
          whileHover={{ scale: 1.02 }}
        >
          <div>
            <h3 className="font-primary font-[900] text-[28px] text-page leading-tight mb-3">
              Let&apos;s
              <br />build.
            </h3>
            <p className="text-[11px] text-page/50">
              pookus7790@gmail.com
            </p>
          </div>
          <div className="flex justify-end">
            <div className="w-12 h-12 rounded-full bg-page/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-page" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </motion.a>
      </div>

      {/* ═══════════════ CONTACT — card ═══════════════ */}
      <div className="px-3 md:px-4 mt-3 md:mt-4">
        <motion.div
          variants={cardIn(0.55)}
          className="bg-card border border-card-border rounded-card p-8 md:p-14 lg:p-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div className="max-w-xl">
            <h2 className="font-primary font-medium text-[clamp(28px,4vw,52px)] leading-[1.1] tracking-[-0.02em] text-txt-primary mb-4">
              Building something
              <br />interesting<span className="text-gold font-light">?</span>
            </h2>
            <p className="text-[16px] text-txt-body leading-relaxed">
              I&apos;m always open to conversations about products,
              architecture, and ambitious ideas.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="mailto:pookus7790@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-page font-primary font-bold text-[13px] rounded-btn hover:bg-gold-light transition-colors">
              pookus7790@gmail.com
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/pooja-kushwah-b22584137/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-txt-secondary text-[13px] rounded-btn hover:border-gold/20 hover:text-gold transition-all">
              LinkedIn
            </a>
            <a href="https://github.com/PoojaKushwah1402" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-txt-secondary text-[13px] rounded-btn hover:border-gold/20 hover:text-gold transition-all">
              GitHub
            </a>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <div className="px-6 md:px-16 lg:px-28 py-6 border-t border-[rgba(255,255,255,0.04)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-txt-hint text-[11px]">
          <span>&copy; {new Date().getFullYear()} Pooja Kushwah</span>
          <div className="flex gap-8">
            <a href="mailto:pookus7790@gmail.com" className="hover:text-gold transition-colors">Email</a>
            <a href="https://www.linkedin.com/in/pooja-kushwah-b22584137/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">LinkedIn</a>
            <a href="https://github.com/PoojaKushwah1402" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
