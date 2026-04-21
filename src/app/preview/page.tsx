import {
  Space_Grotesk,
  Bricolage_Grotesque,
  Archivo,
  Bebas_Neue,
  DM_Serif_Display,
  Playfair_Display,
  Anton,
  Rubik_Mono_One,
  Syne,
  Unbounded,
} from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700', '800'] })
const archivo = Archivo({ subsets: ['latin'], weight: ['100', '300', '400', '500', '600', '700', '800', '900'] })
const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] })
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: ['400'] })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })
const anton = Anton({ subsets: ['latin'], weight: ['400'] })
const rubik = Rubik_Mono_One({ subsets: ['latin'], weight: ['400'] })
const syne = Syne({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })
const unbounded = Unbounded({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700', '800', '900'] })

const options = [
  {
    n: '01',
    name: 'Space Grotesk',
    description: 'Geometric modern sans · clean & readable',
    font: spaceGrotesk,
    italic: false,
    hero: { size: 'text-[clamp(64px,12vw,180px)]', weight: 'font-bold', tracking: 'tracking-[-0.04em]' },
    accent: { weight: 'font-light', italic: false, tracking: 'tracking-[-0.04em]' },
  },
  {
    n: '02',
    name: 'Bricolage Grotesque',
    description: 'Variable · optical size · friendly & modern',
    font: bricolage,
    italic: false,
    hero: { size: 'text-[clamp(64px,12vw,180px)]', weight: 'font-extrabold', tracking: 'tracking-[-0.05em]' },
    accent: { weight: 'font-light', italic: false, tracking: 'tracking-[-0.03em]' },
  },
  {
    n: '03',
    name: 'Archivo',
    description: 'Technical & crisp · used by linear.app',
    font: archivo,
    italic: false,
    hero: { size: 'text-[clamp(64px,12vw,180px)]', weight: 'font-black', tracking: 'tracking-[-0.05em]' },
    accent: { weight: 'font-light', italic: false, tracking: 'tracking-[-0.03em]' },
  },
  {
    n: '04',
    name: 'Bebas Neue',
    description: 'Condensed caps · editorial poster energy',
    font: bebas,
    italic: false,
    hero: { size: 'text-[clamp(80px,15vw,240px)]', weight: 'font-normal', tracking: 'tracking-[0em]', caps: true },
    accent: { weight: 'font-normal', italic: false, tracking: 'tracking-[0em]' },
  },
  {
    n: '05',
    name: 'DM Serif Display',
    description: 'High-contrast serif · sharp & editorial',
    font: dmSerif,
    italic: false,
    hero: { size: 'text-[clamp(64px,12vw,180px)]', weight: 'font-normal', tracking: 'tracking-[-0.03em]' },
    accent: { weight: 'font-normal', italic: true, tracking: 'tracking-[-0.03em]' },
  },
  {
    n: '06',
    name: 'Playfair Display',
    description: 'Classic editorial serif · elegant',
    font: playfair,
    italic: false,
    hero: { size: 'text-[clamp(64px,12vw,180px)]', weight: 'font-black', tracking: 'tracking-[-0.04em]' },
    accent: { weight: 'font-normal', italic: true, tracking: 'tracking-[-0.03em]' },
  },
  {
    n: '07',
    name: 'Anton',
    description: 'Impact condensed · bold & loud',
    font: anton,
    italic: false,
    hero: { size: 'text-[clamp(80px,15vw,240px)]', weight: 'font-normal', tracking: 'tracking-[0em]', caps: true },
    accent: { weight: 'font-normal', italic: false, tracking: 'tracking-[0em]' },
  },
  {
    n: '08',
    name: 'Rubik Mono One',
    description: 'Monospace display · brutalist tech energy',
    font: rubik,
    italic: false,
    hero: { size: 'text-[clamp(50px,9vw,130px)]', weight: 'font-normal', tracking: 'tracking-[-0.02em]', caps: true },
    accent: { weight: 'font-normal', italic: false, tracking: 'tracking-[-0.02em]' },
  },
  {
    n: '09',
    name: 'Syne',
    description: 'Geometric display · contemporary agency vibe',
    font: syne,
    italic: false,
    hero: { size: 'text-[clamp(64px,12vw,180px)]', weight: 'font-extrabold', tracking: 'tracking-[-0.04em]' },
    accent: { weight: 'font-light', italic: false, tracking: 'tracking-[-0.03em]' },
  },
  {
    n: '10',
    name: 'Unbounded',
    description: 'Geometric rounded · distinctive & unusual',
    font: unbounded,
    italic: false,
    hero: { size: 'text-[clamp(64px,12vw,160px)]', weight: 'font-extrabold', tracking: 'tracking-[-0.04em]' },
    accent: { weight: 'font-light', italic: false, tracking: 'tracking-[-0.03em]' },
  },
]

export default function Preview() {
  return (
    <main className="min-h-screen bg-[#F5EDE0] text-[#1A1008]">
      <div className="px-6 md:px-12 lg:px-20 py-10 md:py-16 max-w-[1600px] mx-auto">
        <div className="mb-10 pb-8 border-b border-[#1A1008]/15">
          <p className="font-mono text-xs text-[#E15D2E] tracking-[0.25em] uppercase mb-3">
            Font Preview
          </p>
          <h1 className="font-sans font-bold text-3xl md:text-5xl tracking-tight mb-2">
            Pick a font
          </h1>
          <p className="text-[15px] text-[#1A1008]/60 max-w-xl">
            Same copy, ten different fonts. Reply with the number and I&apos;ll apply it across the site.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {options.map((opt) => {
            const heroCase = opt.hero.caps ? 'uppercase' : ''
            const accentCase = opt.hero.caps ? 'uppercase' : ''
            return (
              <section
                key={opt.n}
                className={`${opt.font.className} border-t border-[#1A1008]/10 pt-8`}
              >
                <div className="flex items-baseline justify-between mb-6 md:mb-8">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#E15D2E] tracking-[0.25em]">
                      {opt.n}
                    </span>
                    <h2 className="font-sans text-base md:text-lg font-semibold">
                      {opt.name}
                    </h2>
                  </div>
                  <span className="font-mono text-[10px] text-[#1A1008]/50 uppercase tracking-widest hidden md:block">
                    {opt.description}
                  </span>
                </div>

                {/* Hero treatment */}
                <div className="mb-6">
                  <h3
                    className={`${opt.hero.size} ${opt.hero.weight} ${opt.hero.tracking} ${heroCase} leading-[0.9]`}
                  >
                    Pooja{' '}
                    <span
                      className={`text-[#E15D2E] ${opt.accent.weight} ${opt.accent.italic ? 'italic' : ''} ${accentCase}`}
                    >
                      Kushwah.
                    </span>
                  </h3>
                </div>

                {/* Tagline */}
                <p className="font-sans text-xl md:text-2xl lg:text-3xl leading-tight tracking-tight max-w-4xl mb-4 text-[#1A1008]/85">
                  Give me a problem no one wants to touch.{' '}
                  <span className="text-[#E15D2E]">I&apos;ll ship it.</span>
                </p>

                {/* Sub */}
                <p className="font-sans text-[14px] text-[#1A1008]/60 max-w-xl">
                  7 years of code that doesn&apos;t fall over at 2am. Currently
                  co-founding Macro Rides + shipping at Livjaza.
                </p>

                {/* Small tagline showing body font */}
                <div className="mt-6 flex items-center gap-6 text-xs font-mono text-[#1A1008]/50 tracking-[0.2em] uppercase">
                  <span>7 yrs</span>
                  <span className="w-1 h-1 rounded-full bg-[#E15D2E]" />
                  <span>4 companies</span>
                  <span className="w-1 h-1 rounded-full bg-[#E15D2E]" />
                  <span>1 startup</span>
                </div>

                {/* Project card title preview */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                  <div className="bg-[#E15D2E] text-[#F5EDE0] p-6 rounded-2xl">
                    <span className="font-mono text-[10px] tracking-[0.2em] opacity-70 block mb-6">
                      Co-founder & CTO
                    </span>
                    <h4
                      className={`${opt.hero.weight} text-2xl md:text-3xl tracking-[-0.02em] leading-[0.95] ${heroCase}`}
                    >
                      Macro Rides
                    </h4>
                  </div>
                  <div className="bg-[#1A1008] text-[#F5EDE0] p-6 rounded-2xl">
                    <span className="font-mono text-[10px] tracking-[0.2em] opacity-70 block mb-6">
                      Infrastructure
                    </span>
                    <h4
                      className={`${opt.hero.weight} text-2xl md:text-3xl tracking-[-0.02em] leading-[0.95] ${heroCase}`}
                    >
                      Proxy Email
                    </h4>
                  </div>
                </div>
              </section>
            )
          })}
        </div>

        <div className="mt-20 pt-8 border-t border-[#1A1008]/15">
          <p className="font-mono text-[11px] text-[#1A1008]/50 uppercase tracking-[0.2em]">
            Back to main site:{' '}
            <a href="/" className="text-[#E15D2E] hover:underline ml-1">
              /
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
