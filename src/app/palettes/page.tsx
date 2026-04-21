type Palette = {
  n: string
  name: string
  vibe: string
  bg: string
  ink: string
  accent: string
  cardDeep: string
  dark?: boolean
}

const lightPalettes: Palette[] = [
  {
    n: '01',
    name: 'Chalk + Electric Cyan',
    vibe: 'Bright · punchy · digital',
    bg: '#FAF5EB',
    ink: '#0A1214',
    accent: '#00B8D4',
    cardDeep: '#007A8C',
  },
  {
    n: '02',
    name: 'Pearl + Pacific Teal',
    vibe: 'Deep · refined · ocean at dusk',
    bg: '#FCF6EA',
    ink: '#0A1014',
    accent: '#0E7C86',
    cardDeep: '#064A52',
  },
  {
    n: '03',
    name: 'Cream + Neon Aqua',
    vibe: 'Lively · fresh · unmissable',
    bg: '#FBF5EC',
    ink: '#08100E',
    accent: '#14C6A8',
    cardDeep: '#087A66',
  },
  {
    n: '04',
    name: 'Snow + Deep Ocean',
    vibe: 'Moody · serious · editorial',
    bg: '#FDF9F0',
    ink: '#08101A',
    accent: '#0E4F66',
    cardDeep: '#062F3D',
  },
  {
    n: '05',
    name: 'Ivory + Seafoam Neon',
    vibe: 'Unusual · electric · standout',
    bg: '#FAF4E5',
    ink: '#08120E',
    accent: '#2DD4BF',
    cardDeep: '#0F766E',
  },
  {
    n: '06',
    name: 'Linen + Sky Cyan',
    vibe: 'Cool · airy · modern',
    bg: '#FAF3E2',
    ink: '#081014',
    accent: '#0891B2',
    cardDeep: '#055164',
  },
]

const darkPalettes: Palette[] = [
  {
    n: '07',
    name: 'Jet Black + Cyan Neon',
    vibe: 'Cyberpunk · loud · unforgettable',
    bg: '#0A0A0A',
    ink: '#F0F0F0',
    accent: '#00E5FF',
    cardDeep: '#00B2C6',
    dark: true,
  },
  {
    n: '08',
    name: 'Onyx + Lime Neon',
    vibe: 'Hacker · punchy · terminal',
    bg: '#0D0D0D',
    ink: '#F0F0F0',
    accent: '#9FFC3D',
    cardDeep: '#6BB128',
    dark: true,
  },
  {
    n: '09',
    name: 'Black + Hot Magenta',
    vibe: 'Fashion · bold · Y2K revival',
    bg: '#0A0A0A',
    ink: '#F0F0F0',
    accent: '#FF006E',
    cardDeep: '#B3004E',
    dark: true,
  },
  {
    n: '10',
    name: 'Midnight + Mint Neon',
    vibe: 'Fresh · modern · distinctive',
    bg: '#0B0F0E',
    ink: '#F0F0F0',
    accent: '#00FFB3',
    cardDeep: '#00B37D',
    dark: true,
  },
  {
    n: '11',
    name: 'Black + Electric Yellow',
    vibe: 'Loud · confident · high-voltage',
    bg: '#0A0A0A',
    ink: '#F5F5F5',
    accent: '#E5FF00',
    cardDeep: '#A8BF00',
    dark: true,
  },
  {
    n: '12',
    name: 'Charcoal + Hot Coral Neon',
    vibe: 'Alive · warm neon · editorial bold',
    bg: '#0F0D0C',
    ink: '#F5F0EA',
    accent: '#FF5C4C',
    cardDeep: '#B83626',
    dark: true,
  },
]

function Card({ p }: { p: Palette }) {
  return (
    <div
      style={{
        borderRadius: 24,
        overflow: 'hidden',
        border: p.dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
        backgroundColor: p.bg,
        boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ padding: '32px 28px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div
            style={{
              height: 1,
              width: 24,
              backgroundColor: p.dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
            }}
          />
          <span
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: 9,
              letterSpacing: '0.3em',
              color: p.dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)',
              textTransform: 'uppercase',
            }}
          >
            Sr Engineer · CTO
          </span>
        </div>

        <h2
          style={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: 58,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: p.ink,
            marginBottom: 16,
          }}
        >
          Pooja{' '}
          <span style={{ color: p.accent, fontStyle: 'italic' }}>Kushwah.</span>
        </h2>

        <p
          style={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: 18,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: p.ink,
            marginBottom: 18,
            maxWidth: 420,
          }}
        >
          Give me a problem no one wants to touch.{' '}
          <em style={{ color: p.accent }}>I&apos;ll ship it.</em>
        </p>

        <div style={{ display: 'flex', gap: 8 }}>
          <span
            style={{
              background: p.accent,
              color: p.bg,
              fontSize: 11,
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: 999,
            }}
          >
            Start the ride
          </span>
          <span
            style={{
              background: 'transparent',
              color: p.ink,
              fontSize: 11,
              fontWeight: 500,
              padding: '8px 16px',
              borderRadius: 999,
              border: `1px solid ${p.ink}`,
            }}
          >
            Say hi
          </span>
        </div>

        <div
          style={{
            marginTop: 22,
            background: `linear-gradient(135deg, ${p.accent} 0%, ${p.cardDeep} 100%)`,
            color: p.dark ? '#0A0A0A' : p.bg,
            padding: 18,
            borderRadius: 16,
          }}
        >
          <div
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: 9,
              letterSpacing: '0.25em',
              opacity: 0.8,
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            Co-founder · 2024
          </div>
          <h4
            style={{
              fontFamily: '"DM Serif Display", serif',
              fontSize: 24,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              marginBottom: 8,
            }}
          >
            MACRO RIDES
          </h4>
          <p style={{ fontSize: 11, opacity: 0.88, lineHeight: 1.5 }}>
            Built India&apos;s first zone-based e-rickshaw platform from first commit.
          </p>
        </div>
      </div>

      <div
        style={{
          padding: '18px 28px',
          borderTop: p.dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
          backgroundColor: p.dark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: 11,
                letterSpacing: '0.25em',
                color: p.accent,
              }}
            >
              {p.n}
            </span>
            <h3
              style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: 18,
                lineHeight: 1.1,
                color: p.ink,
              }}
            >
              {p.name}
            </h3>
          </div>
          <p
            style={{
              fontSize: 11,
              color: p.dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              marginTop: 2,
            }}
          >
            {p.vibe}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 4 }}>
          <div
            title={`bg ${p.bg}`}
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              backgroundColor: p.bg,
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          />
          <div
            title={`ink ${p.ink}`}
            style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: p.ink }}
          />
          <div
            title={`accent ${p.accent}`}
            style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: p.accent }}
          />
        </div>
      </div>
    </div>
  )
}

export default function Palettes() {
  return (
    <main style={{ backgroundColor: '#141414', minHeight: '100vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: 40, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <p
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: 11,
              letterSpacing: '0.25em',
              color: '#00E5FF',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Palette Preview · round 3
          </p>
          <h1
            style={{
              fontFamily: '"DM Serif Display", serif',
              fontSize: 48,
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#F0F0F0',
              marginBottom: 8,
            }}
          >
            Pick a palette
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(240,240,240,0.6)', maxWidth: 560, lineHeight: 1.6 }}>
            Light cream + cyan/ocean on top. Black + neon on bottom. Reply with
            the number.
          </p>
        </div>

        {/* Section 1: Light + Cyan/Ocean */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: 11,
                letterSpacing: '0.25em',
                color: '#00E5FF',
                textTransform: 'uppercase',
              }}
            >
              Light + Cyan/Ocean
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
              gap: 24,
            }}
          >
            {lightPalettes.map((p) => (
              <Card key={p.n} p={p} />
            ))}
          </div>
        </div>

        {/* Section 2: Black + Neon */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: 11,
                letterSpacing: '0.25em',
                color: '#FF006E',
                textTransform: 'uppercase',
              }}
            >
              Black + Neon
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
              gap: 24,
            }}
          >
            {darkPalettes.map((p) => (
              <Card key={p.n} p={p} />
            ))}
          </div>
        </div>

        <div style={{ marginTop: 48, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: 11,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Main site:{' '}
            <a href="/" style={{ color: '#00E5FF', marginLeft: 6, textDecoration: 'underline' }}>
              /
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
