'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const areas = [
  {
    title: 'AI-Powered Products',
    body: 'Recommendation engines, MCP integrations, LLM-driven features that move real metrics. OpenAI, LangChain, Hugging Face, Pinecone.',
  },
  {
    title: 'Full-Stack Architecture',
    body: 'React and Next.js frontends. NestJS microservices. Queue-driven workflows with BullMQ. APIs that don\'t fall over.',
  },
  {
    title: 'Cloud & DevOps',
    body: 'Multi-cloud deployments across AWS, Azure, and GCP. Docker, Kubernetes, Terraform. The infrastructure that keeps things running at 3am.',
  },
  {
    title: 'Data at Scale',
    body: 'Sharding strategies for multi-region databases. PostgreSQL, MongoDB, CockroachDB, DynamoDB. Vector DBs for AI, relational for business logic.',
  },
  {
    title: 'Payments & Commerce',
    body: 'End-to-end payment flows with Stripe and PayPal. Tax engines, inventory management. Code where bugs mean chargebacks.',
  },
  {
    title: 'Performance',
    body: 'Took a frontend from 6-7 second load times to under 2 seconds. Profiling, caching, lazy loading — systematic, not guesswork.',
  },
]

export default function Expertise() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="expertise" className="py-20 md:py-32 section-padding">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-heading mb-16 md:mb-24 max-w-3xl"
        >
          I work across the stack — from the database schema to the deploy button.
          <span className="text-text-muted"> Here&apos;s where I spend most of my time.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-16">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
            >
              <h3 className="text-text-primary font-medium text-base mb-3 flex items-baseline gap-3">
                <span className="text-accent text-xs font-mono">{String(i + 1).padStart(2, '0')}</span>
                {area.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {area.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
