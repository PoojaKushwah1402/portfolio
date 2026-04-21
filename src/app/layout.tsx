import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pooja Kushwah · Senior Software Engineer, Co-founder & CTO',
  description:
    'Senior Software Engineer and Co-founder/CTO at Macro Rides. 7 years turning hard problems into running systems.',
  keywords: [
    'Pooja Kushwah',
    'Software Engineer',
    'CTO',
    'Co-founder',
    'Macro Rides',
  ],
  authors: [{ name: 'Pooja Kushwah' }],
  openGraph: {
    title: 'Pooja Kushwah · Senior Software Engineer, Co-founder & CTO',
    description: 'Give me a problem no one wants to touch. I will ship it.',
    url: 'https://poojakushwah.com',
    siteName: 'Pooja Kushwah',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pooja Kushwah · Senior Software Engineer, Co-founder & CTO',
    description: 'Give me a problem no one wants to touch. I will ship it.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-bg text-ink font-sans">
        {children}
      </body>
    </html>
  )
}
