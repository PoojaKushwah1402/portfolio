'use client'

const items = [
  'senior engineer',
  'co-founder',
  'CTO',
  'react native',
  'node.js',
  'aws + azure',
  'system design',
  'AI + MCP',
  'performance',
  'django',
  'go',
  'postgres',
  'websockets',
  'stripe',
  'rohini 2024',
  'dubai → eu',
]

export default function Marquee() {
  const track = [...items, ...items]

  return (
    <section
      aria-hidden
      className="marquee-container relative py-8 md:py-10 border-y border-ink/10 overflow-hidden bg-cream/50 backdrop-blur-md"
    >
      <div className="marquee-track flex items-center gap-10 md:gap-14 whitespace-nowrap will-change-transform">
        {track.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-10 md:gap-14">
            <span className="font-display italic text-4xl md:text-6xl lg:text-7xl text-ink lowercase">
              {item}
            </span>
            <span className="w-2.5 h-2.5 bg-accent rounded-full flex-shrink-0 blob" />
          </div>
        ))}
      </div>
    </section>
  )
}
