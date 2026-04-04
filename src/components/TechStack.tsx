'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stack: Record<string, string[]> = {
  Languages: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Bash'],
  Frontend: ['React', 'Next.js', 'Angular', 'Tailwind', 'Framer Motion', 'Redux', 'React Native'],
  Backend: ['Node.js', 'NestJS', 'Microservices', 'BullMQ', 'Serverless', 'REST', 'GraphQL'],
  'AI & ML': ['OpenAI', 'LangChain', 'Hugging Face', 'MCP', 'Pinecone', 'PyTorch'],
  Databases: ['PostgreSQL', 'MongoDB', 'Redis', 'DynamoDB', 'CosmosDB', 'CockroachDB'],
  Infrastructure: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
}

export default function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="stack" className="py-20 md:py-32 section-padding">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-heading mb-4"
        >
          Stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-muted text-sm mb-14 md:mb-20"
        >
          Not everything I&apos;ve touched — the things I&apos;d pick again tomorrow.
        </motion.p>

        <div className="space-y-10 md:space-y-12">
          {Object.entries(stack).map(([category, items], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * ci }}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline"
            >
              <h3 className="md:col-span-3 text-xs text-text-muted uppercase tracking-wider">
                {category}
              </h3>
              <div className="md:col-span-9 flex flex-wrap gap-x-5 gap-y-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
