'use client'

import { motion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

type Note = {
  numeral: string
  title: string
  stat: string
  statUnit: string
  line: string
  body: string
  coords: string
  stamp: string
  tint: 'teal' | 'olive' | 'warm' | 'plum'
  rotate: number
}

const notes: Note[] = [
  {
    numeral: 'I',
    title: 'Roller coasters',
    stat: '47',
    statUnit: 'rides logged',
    line: 'The name of this site is not a metaphor.',
    body: "If there's a track, a drop, and a chance of G-forces, I'm in line. I've ridden more coasters than I've shipped projects. Debatable whether that's a flex.",
    coords: '28.47°N · 81.47°W',
    stamp: 'orlando, 2024',
    tint: 'teal',
    rotate: -1.5,
  },
  {
    numeral: 'II',
    title: 'Trekking',
    stat: '14k',
    statUnit: 'ft summited',
    line: 'Silence, altitude, no wifi. Perfect.',
    body: 'I hike to places where the notification icon finally shuts up. The best debugging happens at 3,500m, where nothing connects back to Slack and the only thing pinging you is oxygen.',
    coords: '30.73°N · 79.07°E',
    stamp: 'uttarakhand, 2023',
    tint: 'olive',
    rotate: 1.2,
  },
  {
    numeral: 'III',
    title: 'Travel',
    stat: '11',
    statUnit: 'countries, zero souvenirs',
    line: 'Mostly for the food. Let’s be honest.',
    body: 'Countries collected: losing count. Souvenir policy: none. Food policy: eat what the locals eat, even when my stomach files a formal objection.',
    coords: '35.68°N · 139.65°E',
    stamp: 'tokyo, 2024',
    tint: 'warm',
    rotate: -1,
  },
  {
    numeral: 'IV',
    title: 'Adventure',
    stat: '3',
    statUnit: 'jumps, 1 waiver each',
    line: 'Rafting, paragliding, whatever has a waiver.',
    body: 'If I have to sign a document saying "I understand the risks", I probably want to try it. Favorite jump: Pokhara, 1,500m. Favorite raft: Rishikesh, class III.',
    coords: '28.20°N · 83.98°E',
    stamp: 'pokhara, 2023',
    tint: 'plum',
    rotate: 1.8,
  },
]

const tintBorder: Record<Note['tint'], string> = {
  teal: 'border-accent/50 hover:border-accent',
  olive: 'border-olive/50 hover:border-olive',
  warm: 'border-warm/60 hover:border-warm',
  plum: 'border-plum/50 hover:border-plum',
}

const tintText: Record<Note['tint'], string> = {
  teal: 'text-accent',
  olive: 'text-olive',
  warm: 'text-warm',
  plum: 'text-plum',
}

const tintBarBg: Record<Note['tint'], string> = {
  teal: 'bg-accent',
  olive: 'bg-olive',
  warm: 'bg-warm',
  plum: 'bg-plum',
}

// Alternating slide-in directions per card (left, right, left, right)
const slideFrom = [-140, 140, -140, 140]

export default function OffTheClock() {
  return (
    <section
      id="play"
      className="relative px-6 md:px-10 lg:px-16 py-10 md:py-14"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5 md:gap-3 mb-3 md:mb-4"
        >
          <span className="block w-10 md:w-12 h-[2px] bg-accent rounded-full" />
          <span className="font-display italic text-[13px] md:text-[14px] text-ink/50 tabular-nums leading-none">
            03
          </span>
          <span className="block w-1 h-1 rounded-full bg-accent" />
          <span className="font-display italic text-[19px] md:text-[22px] text-accent lowercase leading-none">
            off-duty.
          </span>
        </motion.div>

        <h2 className="font-display text-[clamp(40px,7vw,110px)] leading-[0.9] tracking-[-0.04em] text-ink mb-3">
          <SplitText text="When I&apos;m" stagger={0.05} as="span" />
        </h2>
        <h2 className="font-display italic text-[clamp(40px,7vw,110px)] leading-[0.9] tracking-[-0.04em] text-accent mb-6 md:mb-8">
          <SplitText text="not shipping." stagger={0.07} delay={0.2} as="span" />
        </h2>

        {/* Field notes meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mb-10 md:mb-14"
        >
          <span className="font-display italic text-[14px] text-ink/55">
            field notes, loosely arranged.
          </span>
          <span className="flex-1 h-px bg-ink/10" />
          <span className="font-display italic text-[13px] text-ink/40">
            since 2018.
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
          {notes.map((n, i) => (
            <motion.article
              key={n.title}
              initial={{ opacity: 0, x: slideFrom[i], rotate: n.rotate * 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: n.rotate }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 1,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ rotate: 0, y: -10, scale: 1.015 }}
              className={`group relative rounded-2xl border ${tintBorder[n.tint]} bg-cream/40 backdrop-blur-md p-6 md:p-7 pt-12 overflow-hidden shadow-[0_2px_20px_rgba(10,16,20,0.05)] transition-[border-color,transform,box-shadow] duration-500 hover:bg-cream/70 hover:shadow-[0_12px_40px_rgba(10,16,20,0.12)]`}
              data-hover
            >
              {/* Top colored strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${tintBarBg[n.tint]}`}
              />

              {/* Giant faded roman numeral watermark */}
              <span
                className={`pointer-events-none absolute -top-4 -right-3 font-display italic text-[140px] leading-none ${tintText[n.tint]} opacity-[0.1] select-none`}
              >
                {n.numeral}
              </span>

              {/* Small numeral index */}
              <span
                className={`absolute top-5 left-6 font-display italic text-[13px] ${tintText[n.tint]}`}
              >
                {n.numeral.toLowerCase()}.
              </span>

              {/* Rotated stamp */}
              <div
                className={`absolute top-4 right-5 rotate-[8deg] border ${tintBorder[n.tint].split(' ')[0]} rounded-full px-2.5 py-1 bg-cream/85 backdrop-blur-sm opacity-85 group-hover:opacity-100 transition-opacity`}
              >
                <span
                  className={`font-display italic text-[10.5px] ${tintText[n.tint]} leading-none`}
                >
                  {n.stamp}
                </span>
              </div>

              {/* Content — each text block gets a subtle cream underlay for legibility
                   while the card itself stays transparent to the coaster */}
              <div className="relative">
                <h3 className="font-display text-[clamp(26px,2.6vw,34px)] leading-[0.95] tracking-[-0.02em] text-ink mb-4 drop-shadow-[0_1px_0_rgba(254,250,240,0.8)]">
                  {n.title}
                </h3>

                {/* Big stat */}
                <div className="flex items-baseline gap-2 mb-5">
                  <span
                    className={`font-display text-[clamp(40px,5vw,56px)] leading-none tracking-[-0.03em] ${tintText[n.tint]} tabular-nums`}
                  >
                    {n.stat}
                  </span>
                  <span className="font-display italic text-[13px] text-ink/70 leading-tight">
                    {n.statUnit}.
                  </span>
                </div>

                <p className="font-display italic text-[16px] md:text-[17px] leading-[1.25] text-ink mb-4 drop-shadow-[0_1px_0_rgba(254,250,240,0.7)]">
                  {n.line}
                </p>

                <p className="font-sans text-[13px] leading-relaxed text-ink/80 mb-5 drop-shadow-[0_1px_0_rgba(254,250,240,0.7)]">
                  {n.body}
                </p>

                {/* Footer: coordinates */}
                <div className="flex items-center gap-2 pt-3 border-t border-ink/15">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${tintBarBg[n.tint]}`}
                  />
                  <span className="font-sans text-[11px] tabular-nums text-ink/65">
                    {n.coords}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
