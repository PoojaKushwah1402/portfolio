'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Play', href: '#play', id: 'play' },
  { label: 'Stack', href: '#stack', id: 'stack' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export default function Nav() {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['hero', 'about', 'work', 'play', 'stack', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0% -55% 0%', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-bg/60 backdrop-blur-md' : ''
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 lg:px-16 h-16 md:h-20">
        {/* Brand — author signature */}
        <a
          href="#top"
          className="group font-display text-[18px] md:text-[22px] leading-none text-ink hover:text-accent transition-colors tracking-tight"
        >
          Pooja Kushwah<span className="text-accent">.</span>
        </a>

        {/* Right nav with active indicator */}
        <div className="flex items-center gap-6 md:gap-10">
          {links.map((link) => {
            const isActive = active === link.id
            return (
              <a
                key={link.href}
                href={link.href}
                className="group relative flex items-center gap-2 py-2"
                data-hover
              >
                <motion.span
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="w-1.5 h-1.5 rounded-full bg-accent"
                />
                <span
                  className={`font-sans font-medium text-[13px] md:text-[14px] transition-colors ${
                    isActive
                      ? 'text-accent'
                      : 'text-ink/70 group-hover:text-ink'
                  }`}
                >
                  {link.label}
                </span>
              </a>
            )
          })}
        </div>
      </nav>
    </motion.header>
  )
}
