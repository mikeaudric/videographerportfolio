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
          justifyContent: 'space-between',
          padding: 72,
          background: '#0b0b0b',
          color: '#f2f2ef',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#7d7d78' }}>
          <span>SÉQUENCE — PORTFOLIO</span>
          <span style={{ color: '#ff4a1c' }}>● REC</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 120, fontWeight: 700, lineHeight: 0.9, textTransform: 'uppercase' }}>
          <span>{SITE_INFO.name}</span>
          <span style={{ color: '#7d7d78' }}>{SITE_INFO.role}</span>
        </div>
        <div style={{ display: 'flex', height: 6, background: '#262626', position: 'relative' }}>
          <div style={{ width: '62%', height: 6, background: '#ff4a1c' }} />
        </div>
      </div>
    ),
    size
  )
}
