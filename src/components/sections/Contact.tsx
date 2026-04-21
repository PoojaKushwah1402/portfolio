'use client'

import { motion } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 md:px-10 lg:px-16 py-10 md:py-14"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="bg-cream/75 backdrop-blur-md rounded-3xl p-6 md:p-10 lg:p-14 shadow-2xl shadow-ink/10 border border-ink/5">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 md:gap-3 mb-3 md:mb-4"
          >
            <span className="block w-10 md:w-12 h-[2px] bg-accent rounded-full" />
            <span className="font-display italic text-[13px] md:text-[14px] text-ink/50 tabular-nums leading-none">
              04
            </span>
            <span className="block w-1 h-1 rounded-full bg-accent" />
            <span className="font-display italic text-[19px] md:text-[22px] text-accent lowercase leading-none">
              end of the line.
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="md:col-span-7"
            >
              <h2 className="font-display text-[clamp(36px,5.5vw,78px)] leading-[1.05] tracking-[-0.03em] text-ink mb-5">
                Building something
                <br />
                <em className="text-accent">interesting?</em>
              </h2>

              <p className="font-sans text-[16px] md:text-[17px] leading-[1.7] text-ink/70 max-w-xl">
                I&apos;m always open to conversations about products, architecture,
                and ambitious ideas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="md:col-span-5 flex flex-col items-start md:items-end gap-5"
            >
              <MagneticButton
                as="a"
                href="mailto:pookus7790@gmail.com"
                strength={0.4}
                className="group inline-flex items-center gap-3 bg-ink hover:bg-accent text-cream font-sans font-medium text-sm px-8 py-4 rounded-full transition-colors shadow-xl shadow-accent/20"
              >
                Get in touch
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>

              <a
                href="mailto:pookus7790@gmail.com"
                className="font-sans text-sm text-ink/60 hover:text-accent transition-colors"
                data-hover
              >
                pookus7790@gmail.com
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-6">
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/poojakushwah1402' },
                { label: 'GitHub', href: 'https://github.com/PoojaKushwah1402' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-ink/60 hover:text-accent transition-colors"
                  data-hover
                >
                  <span className="font-sans text-[13px] relative">
                    {link.label}
                    <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent group-hover:w-full transition-all duration-400" />
                  </span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7V16" />
                  </svg>
                </a>
              ))}
            </div>
            <span className="font-display italic text-[13px] text-ink/40 lowercase">
              © {new Date().getFullYear()} pooja kushwah.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
