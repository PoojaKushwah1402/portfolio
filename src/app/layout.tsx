import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const instrumentSerif = localFont({
  src: [
    {
      path: '../fonts/InstrumentSerif-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/InstrumentSerif-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-instrument-serif',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pooja Kushwah — Co-Founder & Technical Lead',
  description:
    'I build products that ship, systems that scale, and companies that last. Co-Founder & Technical Lead with 6+ years shipping production systems across AI, full-stack, cloud, and e-commerce.',
  keywords: [
    'Pooja Kushwah',
    'Technical Lead',
    'Co-Founder',
    'Full Stack Engineer',
    'Macro Rides',
  ],
  authors: [{ name: 'Pooja Kushwah' }],
  openGraph: {
    title: 'Pooja Kushwah — Co-Founder & Technical Lead',
    description:
      'I build products that ship, systems that scale, and companies that last.',
    url: 'https://poojakushwah.com',
    siteName: 'Pooja Kushwah',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pooja Kushwah — Co-Founder & Technical Lead',
    description:
      'I build products that ship, systems that scale, and companies that last.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans bg-bg text-text-primary antialiased grain">
        {children}
      </body>
    </html>
  )
}
