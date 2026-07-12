import type { Metadata } from 'next'
import './globals.css'

const SITE = 'https://poojakushwah.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Pooja Kushwah · Senior Software Engineer · Full-Stack & AI · Dubai',
    template: '%s · Pooja Kushwah',
  },
  description:
    'Pooja Kushwah is a Senior Software Engineer and Co-founder of Macro Rides, based in Dubai. 7+ years building full-stack and AI products with React, Next.js, Node.js, Go and AWS — from a 500K+ user platform in Europe to a ride-hailing startup in Delhi.',
  keywords: [
    'Pooja Kushwah',
    'Pooja Kushwah portfolio',
    'Pooja Kushwah developer',
    'Pooja Kushwah Dubai',
    'Senior Software Engineer Dubai',
    'Full Stack Developer Dubai',
    'AI Engineer Dubai',
    'React developer',
    'Next.js developer',
    'Node.js engineer',
    'Macro Rides',
    'Macrorides co-founder',
    'Livjaza engineer',
  ],
  authors: [{ name: 'Pooja Kushwah', url: SITE }],
  creator: 'Pooja Kushwah',
  publisher: 'Pooja Kushwah',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Pooja Kushwah · Senior Software Engineer · Full-Stack & AI',
    description:
      'Give me a problem no one wants to touch. I will ship it. 7+ years, 5 companies, 1 startup co-founded, 500K+ users served.',
    url: SITE,
    siteName: 'Pooja Kushwah',
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pooja Kushwah · Senior Software Engineer · Full-Stack & AI',
    description:
      'Give me a problem no one wants to touch. I will ship it. 7+ years, 5 companies, 1 startup co-founded, 500K+ users served.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Pooja Kushwah',
  url: SITE,
  jobTitle: 'Senior Software Engineer',
  description:
    'Senior Software Engineer and Co-founder of Macro Rides. 7+ years of full-stack and AI engineering across React, Next.js, Node.js, Go and AWS.',
  address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
  worksFor: [
    { '@type': 'Organization', name: 'Livjaza' },
    { '@type': 'Organization', name: 'Macro Rides', url: 'https://macrorides.in' },
  ],
  alumniOf: [
    { '@type': 'Organization', name: 'group.one' },
    { '@type': 'Organization', name: 'BRIDGEi2i Analytics Solutions' },
    { '@type': 'Organization', name: 'Amdocs' },
    { '@type': 'CollegeOrUniversity', name: 'Pune University' },
  ],
  knowsAbout: [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Go', 'Python',
    'AI engineering', 'LLM integration', 'Model Context Protocol',
    'PostgreSQL', 'AWS', 'System design', 'React Native',
  ],
  sameAs: [
    'https://www.linkedin.com/in/poojakushwah1402/',
    'https://github.com/PoojaKushwah1402',
    'https://www.instagram.com/pjk1402/',
  ],
  email: 'mailto:pookus7790@gmail.com',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Pooja Kushwah',
  url: SITE,
  description: 'Portfolio of Pooja Kushwah, Senior Software Engineer in Dubai.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-bg text-ink font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        {children}
      </body>
    </html>
  )
}
