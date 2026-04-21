'use client'

import { useRef, ReactNode, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  as?: 'button' | 'a' | 'div'
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  as = 'div',
  href,
  target,
  rel,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 180, damping: 18, mass: 0.4 })

  const handleMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mx.set((e.clientX - cx) * strength)
    my.set((e.clientY - cy) * strength)
  }

  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const style = { x: sx, y: sy }

  if (as === 'a' && href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={style}
        className={className}
        onClick={onClick}
        data-hover
      >
        {children}
      </motion.a>
    )
  }

  if (as === 'button') {
    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={style}
        className={className}
        onClick={onClick}
        data-hover
      >
        {children}
      </motion.button>
    )
  }

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      className={className}
      onClick={onClick}
      data-hover
    >
      {children}
    </motion.div>
  )
}
