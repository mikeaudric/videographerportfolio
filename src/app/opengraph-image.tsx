import { ImageResponse } from 'next/og'
import { SITE_INFO } from '@/lib/constants'

// Image d'aperçu lors du partage du lien (WhatsApp, X, LinkedIn…)
export const alt = `${SITE_INFO.name} — ${SITE_INFO.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(135deg, #000000 0%, #1C2331 100%)',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 32, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: 4 }}>
          {SITE_INFO.role}
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 16 }}>{SITE_INFO.name}</div>
        <div style={{ fontSize: 36, color: '#d1d5db', marginTop: 24, maxWidth: 900 }}>
          Interviews, esport et contenus réseaux sociaux
        </div>
      </div>
    ),
    size
  )
}
