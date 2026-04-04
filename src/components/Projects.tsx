'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  {
    title: 'Macro Rides',
    label: 'Co-Founded · Current',
    brief: 'Mobility startup. Built the entire technical platform from first commit to production — vendor management, booking flow, real-time availability, payments.',
    detail: 'Made every technical decision from database schema to deployment pipeline. React, NestJS, PostgreSQL, Prisma, BullMQ on AWS.',
    impact: 'Live product with real vendors and customers.',
  },
  {
    title: 'E-Commerce Platform',
    label: 'group.one · Dubai',
    brief: 'End-to-end webshop for a European hosting company. Stripe and PayPal integrations, AI-powered product recommendations, MCP for intelligent product discovery.',
    detail: 'Multi-region database sharding with CockroachDB. 90% test coverage. React, NestJS, Docker.',
    impact: 'Serving customers across multiple European markets.',
  },
  {
    title: 'AI Recommendation Engine',
    label: 'Machine Learning',
    brief: 'Built an ML-driven product discovery system using embeddings and vector similarity search. Integrated with user behavior data for personalized suggestions.',
    detail: 'Python, OpenAI, Pinecone, LangChain, Hugging Face. Added MCP for conversational product discovery.',
    impact: 'Measurable increase in engagement and conversion.',
  },
  {
    title: 'Performance Overhaul',
    label: '6-7s → 1-2s',
    brief: 'Took a complex Angular application from 6-7 second load times to under 2 seconds. Systematic profiling, not guesswork.',
    detail: 'Code splitting, lazy loading, tree shaking, caching strategies, image optimization. Restructured the entire build pipeline.',
    impact: 'User retention improved significantly.',
  },
  {
    title: 'Proxy Email Infrastructure',
    label: 'Early-Stage Startup',
    brief: 'Anonymous communication layer for a property booking platform. Routes messages through anonymized addresses without exposing personal emails.',
    detail: 'Built with Node.js, AWS SES, DynamoDB. Handles attachments, bounce handling, spam filtering, and channel manager integrations.',
    impact: 'Thousands of messages across multiple booking channels.',
  },
  {
    title: 'Calendar Sync Engine',
    label: 'Early-Stage Startup',
    brief: 'Bidirectional iCal sync across multiple booking platforms to prevent double bookings. Handles conflict resolution with near-real-time polling.',
    detail: 'Node.js, iCal protocol, PostgreSQL. Webhook support for instant updates.',
    impact: 'Zero double-booking incidents after deployment.',
  },
  {
    title: 'Analytics Dashboards',
    label: 'Data Engineering',
    brief: 'Role-based analytics platform with configurable data pipelines and interactive visualizations. Executives got summaries, analysts got drill-downs.',
    detail: 'React, Python, D3.js, PostgreSQL. Real-time aggregation and custom report builder.',
    impact: 'Reporting went from days to real-time.',
  },
  {
    title: 'Google VR Integration',
    label: 'Innovation',
    brief: 'Immersive 360-degree property walkthroughs using Google VR SDK. Built the viewer, handled media processing, optimized for mobile.',
    detail: 'Google VR SDK, JavaScript, WebGL, Android Studio.',
    impact: 'Differentiated feature that reduced unnecessary site visits.',
  },
]

function Project({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group border-b border-border py-8 md:py-10"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8"
      >
        <h3 className="font-serif text-2xl md:text-3xl text-text-primary group-hover:text-accent transition-colors flex-shrink-0">
          {project.title}
        </h3>
        <span className="text-text-muted text-xs md:text-sm flex-shrink-0">
          {project.label}
        </span>
        <span className="hidden md:block flex-1 border-b border-border/50 mb-1.5" />
        <svg
          className={`w-4 h-4 text-text-muted transition-transform flex-shrink-0 ${open ? 'rotate-45' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="pt-5 md:pl-0 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="md:col-span-2">
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              {project.brief}
            </p>
            <p className="text-text-muted text-sm leading-relaxed">
              {project.detail}
            </p>
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Impact</p>
            <p className="text-sm text-text-primary">{project.impact}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="work" className="py-20 md:py-32 section-padding">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-heading mb-4"
        >
          Selected work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-text-muted text-sm mb-12 md:mb-16"
        >
          Things that made it to production. Click to expand.
        </motion.p>

        <div className="border-t border-border">
          {projects.map((p, i) => (
            <Project key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
