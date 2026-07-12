import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Pooja Kushwah · Senior Software Engineer · Full-Stack & AI · Dubai'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0d1a28 0%, #08090C 55%, #08090C 100%)',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <div style={{ width: 12, height: 12, borderRadius: 99, background: '#22B8E6' }} />
          <div style={{ fontSize: 26, color: 'rgba(234,238,243,0.75)', fontWeight: 600 }}>
            Senior Software Engineer · Co-founder at Macro Rides · Dubai
          </div>
        </div>
        <div style={{ fontSize: 130, fontWeight: 800, color: '#EAEEF3', lineHeight: 0.95, letterSpacing: '-2px' }}>POOJA</div>
        <div style={{ fontSize: 130, fontWeight: 800, color: '#22B8E6', lineHeight: 0.95, letterSpacing: '-2px' }}>KUSHWAH</div>
        <div style={{ fontSize: 30, color: 'rgba(234,238,243,0.85)', marginTop: 34, display: 'flex' }}>
          Give me a problem no one wants to touch. I&apos;ll ship it.
        </div>
        <div style={{ position: 'absolute', bottom: 44, left: 80, fontSize: 22, color: 'rgba(234,238,243,0.55)', display: 'flex', gap: 30 }}>
          <span>7+ years shipping</span>
          <span>·</span>
          <span>500K+ users served</span>
          <span>·</span>
          <span>poojakushwah.com</span>
        </div>
      </div>
    ),
    size
  )
}
