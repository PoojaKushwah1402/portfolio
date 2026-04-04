import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Space_Mono } from 'next/font/google'
import './globals.css'

const vietnam = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-vietnam',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pooja Kushwah — Co-Founder & Technical Lead',
  description:
    'Co-Founder at Macro Rides. 6+ years building AI-driven products, scalable platforms, and cloud infrastructure.',
  keywords: ['Pooja Kushwah', 'Technical Lead', 'Co-Founder', 'Macro Rides'],
  authors: [{ name: 'Pooja Kushwah' }],
  openGraph: {
    title: 'Pooja Kushwah — Co-Founder & Technical Lead',
    description: 'Co-Founder at Macro Rides. 6+ years building AI-driven products, scalable platforms, and cloud infrastructure.',
    url: 'https://poojakushwah.com',
    siteName: 'Pooja Kushwah',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pooja Kushwah — Co-Founder & Technical Lead',
    description: 'Co-Founder at Macro Rides. 6+ years building AI-driven products, scalable platforms, and cloud infrastructure.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${vietnam.variable} ${spaceMono.variable}`}>
      <body suppressHydrationWarning className="font-primary bg-page text-txt-primary antialiased">
        {children}
      </body>
    </html>
  )
}
