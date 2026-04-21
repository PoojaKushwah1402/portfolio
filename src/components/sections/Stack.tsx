'use client'

import { motion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

const daily = [
  'React Native',
  'Node.js',
  'PostgreSQL',
  'AWS',
  'OpenAI',
  'Stripe',
]

const alsoFluent = [
  'React', 'Next.js', 'TypeScript', 'Python', 'Go', 'Django',
  'NestJS', 'Redux', 'Tailwind', 'WebSockets', 'GraphQL',
  'Redis', 'MongoDB', 'CockroachDB', 'DynamoDB',
  'Docker', 'Kubernetes', 'Terraform', 'Azure', 'GCP',
  'LangChain', 'MCP', 'Pinecone', 'Hugging Face',
  'Cashfree', 'PayPal', 'JWT', 'OAuth',
  'Sentry', 'Prometheus', 'Grafana', 'ELK', 'Mixpanel',
]

export default function Stack() {
  return (
    <section id="stack" className="relative px-6 md:px-10 lg:px-16 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">
        <div className="bg-cream/75 backdrop-blur-md rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl shadow-ink/5 border border-ink/5">

          {/* Founder statement, not a category list */}
          <h2 className="font-display text-[clamp(30px,5vw,72px)] leading-[1.1] tracking-[-0.03em] text-ink mb-10 max-w-4xl">
            <SplitText text="Right now I'm shipping with" stagger={0.04} as="span" />{' '}
            <em className="text-accent">
              <SplitText text="six things." stagger={0.06} delay={0.25} as="span" />
            </em>
          </h2>

          {/* Daily stack as big typography, not a list of chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20"
          >
            <div className="flex flex-wrap gap-x-8 gap-y-3 items-baseline">
              {daily.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="font-display text-[clamp(32px,5vw,60px)] leading-[1] tracking-[-0.02em] text-ink hover:text-accent transition-colors cursor-default"
                  data-hover
                >
                  {item}
                  {i < daily.length - 1 && (
                    <span className="text-accent/60 ml-8">/</span>
                  )}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Narrative prose — reads like a founder wrote it, not a resume */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pt-10 border-t border-ink/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="md:col-span-7"
            >
              <h3 className="font-display text-[clamp(22px,2.8vw,36px)] leading-[1.15] tracking-[-0.02em] text-ink mb-5">
                I&apos;ve also shipped production code in{' '}
                <em className="text-accent">everything below.</em>
              </h3>

              <p className="font-sans text-[15px] md:text-[16px] leading-[1.9] text-ink/75">
                {alsoFluent.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.02 }}
                    whileHover={{ color: '#0E7C86' }}
                    className="inline-block hover:text-accent transition-colors cursor-default mr-2"
                    data-hover
                  >
                    {t}{i < alsoFluent.length - 1 ? ',' : '.'}
                  </motion.span>
                ))}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="md:col-span-5 space-y-6 md:pl-8 md:border-l border-ink/10"
            >
              <div>
                <p className="font-display text-[20px] md:text-[22px] leading-[1.3] text-ink mb-2">
                  <em className="text-accent">Tools serve the problem.</em>
                </p>
                <p className="font-sans text-[14px] leading-[1.7] text-ink/70">
                  When the problem changes, the stack changes. I was building
                  with MCP before most engineers had heard of it. Go and Django
                  came together in a week because the problem called for both.
                  Any language is a week away.
                </p>
              </div>

              <div>
                <p className="font-display text-[20px] md:text-[22px] leading-[1.3] text-ink mb-2">
                  <em className="text-accent">Every tool here has shipped.</em>
                </p>
                <p className="font-sans text-[14px] leading-[1.7] text-ink/70">
                  Deployed, broken at 3am, fixed, watched real users run. I
                  know which of these are worth betting a company on and which
                  are just hype.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
