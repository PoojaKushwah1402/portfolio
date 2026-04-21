'use client'

import { motion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'
import ProjectCard from '@/components/ui/ProjectCard'

const projects = [
  {
    index: '01',
    title: 'MACRO RIDES',
    label: 'Co-founder & CTO, Sep 2024 to present',
    description:
      'Built India’s first zone-based e-rickshaw platform from first commit. Rider app, driver app, WebSocket dispatch, OTP auth, Cashfree, Docker on AWS. Also: interviewed candidates, pitched investors, argued with payment APIs, ran the live ground test in Rohini with real riders.',
    tech: ['Product', 'Architecture', 'Hiring', 'Investors'],
    badge: '0 to 1',
    href: 'https://macrorides.in',
    tint: 'teal',
  },
  {
    index: '02',
    title: 'LIVJAZA',
    label: 'Senior FS, hospitality, Jan 2025 to present',
    description:
      'Dropped page load from 7-8 seconds to under 1. Built proxy email routing channel-manager-to-guest comms through the chat layer. No raw emails exposed. Implemented iCal sync across OTAs. Go and Django, both picked up on the job.',
    tech: ['Go', 'Django', 'AWS + Azure', 'Sentry'],
    badge: '8× faster',
    tint: 'amber',
  },
  {
    index: '03',
    title: 'GROUP.ONE',
    label: 'SW Engineer, e-commerce, 2022 to 2024',
    description:
      'End-to-end ownership on a webshop for hundreds of thousands of European shoppers. Payments (Stripe, PayPal), inventory, tax engine, user access controls, AI recommendations with MCP. Grew Jest coverage from near-zero to 90%. Zero-bug production.',
    tech: ['React', 'Node.js', 'Stripe', 'PayPal', 'MCP'],
    badge: '90% cov',
    tint: 'deepteal',
  },
  {
    index: '04',
    title: 'ROHINI GROUND TEST',
    label: 'Macro Rides, late 2024',
    description:
      'Real riders. Real rides. Free, on the house. Wore a high-vis vest in Delhi and validated the full booking and dispatch flow end to end on the ground. This is what pre-seed actually looks like. Not a pitch deck, a field test.',
    tech: ['iOS', 'Android', 'Humans'],
    badge: 'live',
    tint: 'ink',
  },
  {
    index: '05',
    title: 'AI ENGINE',
    label: 'MCP, group.one',
    description:
      'AI-driven product discovery using Model Context Protocol for context-aware features. Integrated Mixpanel, Hotjar, and GA for the full behaviour loop. Shipped across European markets, measurable lift in discoverability and engagement.',
    tech: ['OpenAI', 'MCP', 'LangChain', 'Mixpanel'],
    badge: 'engagement',
    tint: 'sand',
  },
  {
    index: '06',
    title: 'PROXY EMAIL',
    label: 'Infrastructure, Livjaza',
    description:
      'Architected a system intercepting messages between channel managers and guests. Centralised communication through the platform’s chat layer. No raw email addresses exposed, SMTP handled, routing rules, chat federation.',
    tech: ['Go', 'Django', 'SMTP'],
    badge: 'automated',
    tint: 'ember',
  },
]

export default function Work() {
  return (
    <section id="work" className="relative px-6 md:px-10 lg:px-16 py-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex items-baseline gap-3 mb-6"
        >
          <div className="h-px w-8 bg-accent" />
          <span className="font-display italic text-[15px] text-accent lowercase">
            selected rides.
          </span>
        </motion.div>

        <h2 className="font-display text-[clamp(56px,11vw,160px)] leading-[0.9] tracking-[-0.04em] text-ink mb-3">
          <SplitText text="SELECTED" stagger={0.05} as="span" />
        </h2>
        <h2 className="font-display italic text-[clamp(56px,11vw,160px)] leading-[0.9] tracking-[-0.04em] text-accent mb-10 md:mb-14">
          <SplitText text="work" stagger={0.08} delay={0.15} as="span" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.index} {...p} order={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
