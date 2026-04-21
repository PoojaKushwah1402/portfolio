'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

interface ProjectCardProps {
  index: string
  title: string
  label: string
  description: string
  tech: string[]
  badge: string
  href?: string
  tint?: string
  order?: number
}

const tints: Record<string, string> = {
  // Pearl + Pacific Teal palette cards
  teal: 'linear-gradient(135deg, #0E7C86 0%, #064A52 100%)',
  deepteal: 'linear-gradient(135deg, #064A52 0%, #032B31 100%)',
  amber: 'linear-gradient(135deg, #D9953A 0%, #B07425 100%)',
  ember: 'linear-gradient(135deg, #C8502E 0%, #8A3018 100%)',
  sand: 'linear-gradient(135deg, #E5C888 0%, #BFA357 100%)',
  ink: 'linear-gradient(135deg, #1F2530 0%, #0A1014 100%)',
  plum: 'linear-gradient(135deg, #4A2F4D 0%, #291A2E 100%)',
  olive: 'linear-gradient(135deg, #5E7D3C 0%, #3A5124 100%)',

  // backwards-compat aliases
  green: 'linear-gradient(135deg, #0E7C86 0%, #064A52 100%)',
  deepgreen: 'linear-gradient(135deg, #064A52 0%, #032B31 100%)',
}

export default function ProjectCard({
  index,
  title,
  label,
  description,
  tech,
  badge,
  href,
  tint = 'green',
  order = 0,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current || isMobile) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({ x: -(y - 0.5) * 8, y: (x - 0.5) * 8 })
  }

  const onLeave = () => setTilt({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const col = order % 3
  const slideDistance = col === 0 ? -180 : col === 2 ? 180 : 0
  const rotateFrom = col === 0 ? -4 : col === 2 ? 4 : 0

  const x = useTransform(scrollYProgress, [0, 1], [slideDistance, 0])
  const y = useTransform(scrollYProgress, [0, 1], [120, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.4, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [rotateFrom, 0])
  const clipInsetTop = useTransform(scrollYProgress, [0, 1], [80, 0])
  const clipPath = useMotionTemplate`inset(${clipInsetTop}% 0 0 0)`

  const bg = tints[tint] || tints.teal
  const isDark = !['amber', 'sand'].includes(tint)

  const innerTransform = `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`

  return (
    <motion.div
      ref={ref}
      style={{ x, y, scale, opacity, rotate, clipPath }}
      className="relative"
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            transform: innerTransform,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            background: bg,
          }}
          className="group relative block rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[3/4]"
          data-hover
        >
          <CardContent
            index={index}
            title={title}
            label={label}
            description={description}
            tech={tech}
            badge={badge}
            isDark={isDark}
            hasHref={true}
          />
        </a>
      ) : (
        <div
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            transform: innerTransform,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            background: bg,
          }}
          className="group relative block rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[3/4]"
          data-hover
        >
          <CardContent
            index={index}
            title={title}
            label={label}
            description={description}
            tech={tech}
            badge={badge}
            isDark={isDark}
            hasHref={false}
          />
        </div>
      )}
    </motion.div>
  )
}

function CardContent({
  index,
  title,
  label,
  description,
  tech,
  badge,
  isDark,
  hasHref,
}: {
  index: string
  title: string
  label: string
  description: string
  tech: string[]
  badge: string
  isDark: boolean
  hasHref: boolean
}) {
  return (
    <>
      <div
        className={`absolute -top-12 -right-10 font-display leading-none select-none pointer-events-none ${
          isDark ? 'text-cream/10' : 'text-ink/10'
        }`}
        style={{
          fontSize: 'clamp(240px, 40vw, 480px)',
          transform: 'translateZ(0)',
        }}
      >
        {index}
      </div>

      <div
        className={`absolute bottom-8 right-8 w-20 h-20 md:w-28 md:h-28 rounded-full border ${
          isDark ? 'border-cream/20' : 'border-ink/20'
        } blob`}
        style={{ transform: 'translateZ(20px)' }}
      />
      <div
        className={`absolute top-1/3 right-1/4 w-10 h-10 rounded-full ${
          isDark ? 'bg-cream/10' : 'bg-ink/10'
        }`}
        style={{ transform: 'translateZ(40px)' }}
      />

      <div
        className={`relative h-full flex flex-col justify-between p-7 md:p-10 ${
          isDark ? 'text-cream' : 'text-ink'
        }`}
        style={{ transform: 'translateZ(30px)' }}
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className={`font-mono text-[10px] tracking-[0.2em] ${
              isDark ? 'text-cream/60' : 'text-ink/60'
            }`}
          >
            {index}
          </span>
          <span
            className={`font-mono text-[10px] border px-3 py-1.5 tracking-wider uppercase ${
              isDark
                ? 'text-cream border-cream/40 bg-cream/10'
                : 'text-ink border-ink/40 bg-ink/10'
            }`}
          >
            {badge}
          </span>
        </div>

        <div>
          <p
            className={`font-mono text-[10px] tracking-wider mb-3 uppercase ${
              isDark ? 'text-cream/70' : 'text-ink/60'
            }`}
          >
            {label}
          </p>

          <h3
            className="font-display leading-[0.9] tracking-[-0.03em] mb-4"
            style={{
              fontSize: 'clamp(28px, 3.4vw, 52px)',
            }}
          >
            {title}
          </h3>

          <p
            className={`font-sans text-[13px] md:text-[14px] leading-relaxed mb-5 max-w-md ${
              isDark ? 'text-cream/80' : 'text-ink/75'
            }`}
          >
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className={`font-mono text-[10px] px-2.5 py-1 rounded-full border ${
                  isDark
                    ? 'text-cream/70 border-cream/20'
                    : 'text-ink/70 border-ink/20'
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {hasHref && (
        <div className="absolute top-7 right-20 md:top-10 md:right-24">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDark ? 'bg-cream text-ink' : 'bg-ink text-cream'
            } group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7V16" />
            </svg>
          </div>
        </div>
      )}
    </>
  )
}
