'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  byChar?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  inline?: boolean
  triggerOnView?: boolean
  once?: boolean
}

export default function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  byChar = false,
  as = 'span',
  inline = false,
  triggerOnView = true,
  once = true,
}: SplitTextProps) {
  const Tag = motion[as] as typeof motion.span
  const parts = byChar ? text.split('') : text.split(' ')

  const wordAnim = {
    initial: { y: '110%', opacity: 0 },
    animate: { y: '0%', opacity: 1 },
  }

  const content: ReactNode[] = parts.map((part, i) => (
    <span
      key={i}
      className="inline-block overflow-hidden align-bottom"
      style={{ lineHeight: 'inherit' }}
    >
      <motion.span
        initial={wordAnim.initial}
        {...(triggerOnView
          ? {
              whileInView: wordAnim.animate,
              viewport: { once, margin: '-10%' },
            }
          : { animate: wordAnim.animate })}
        transition={{
          delay: delay + i * stagger,
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="inline-block"
      >
        {part === ' ' ? ' ' : part}
      </motion.span>
      {!byChar && i < parts.length - 1 && ' '}
    </span>
  ))

  return (
    <Tag className={className} style={inline ? { display: 'inline' } : undefined}>
      {content}
    </Tag>
  )
}
