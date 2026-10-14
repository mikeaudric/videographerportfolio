import type { Metadata } from 'next'
import { SITE_INFO } from '@/lib/constants'
import './globals.css'

const title = `${SITE_INFO.name} — ${SITE_INFO.role}`

export const metadata: Metadata = {
  title,
  description: SITE_INFO.description,
  openGraph: {
    title,
    description: SITE_INFO.description,
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: SITE_INFO.description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
