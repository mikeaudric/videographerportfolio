import type { Metadata } from 'next'
import { Archivo, Archivo_Narrow, IBM_Plex_Mono } from 'next/font/google'
import { SITE_INFO } from '@/lib/constants'
import './globals.css'

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' })
const archivoNarrow = Archivo_Narrow({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-archivo-narrow' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex-mono' })

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
    <html lang="fr" className={`scroll-smooth ${archivo.variable} ${archivoNarrow.variable} ${plexMono.variable}`}>
      <body className="bg-ink text-paper font-sans antialiased">{children}</body>
    </html>
  )
}
