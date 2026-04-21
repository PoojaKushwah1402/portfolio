'use client'

export default function SvgFilters() {
  return (
    <svg
      aria-hidden
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Subtle liquid distortion — default state */}
        <filter id="distort" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves="2"
            seed="3"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="15s"
              values="0.012 0.02; 0.02 0.015; 0.012 0.02"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
        </filter>

        {/* Stronger on hover */}
        <filter id="distort-strong" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="2" seed="7">
            <animate
              attributeName="baseFrequency"
              dur="8s"
              values="0.02 0.03; 0.04 0.02; 0.02 0.03"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="16" />
        </filter>

        {/* Gooey blob filter — merges elements */}
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          />
        </filter>
      </defs>
    </svg>
  )
}
