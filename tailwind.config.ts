import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        page: '#0A0A0C',
        card: '#131316',
        cream: {
          bg: '#F0EBE3',
          text: '#1A1917',
          muted: '#8A8578',
        },
        gold: {
          DEFAULT: '#C4A142',
          light: '#D4B45A',
          dark: '#B8932E',
        },
        txt: {
          primary: '#E8E2DA',
          secondary: '#7A7871',
          muted: '#5A5850',
          hint: '#4A4840',
          body: '#9A9590',
        },
        status: '#3DB06C',
        'card-border': 'rgba(255,255,255,0.04)',
        'glass-border': 'rgba(255,255,255,0.07)',
        'glass-bg': 'rgba(255,255,255,0.04)',
      },
      fontFamily: {
        primary: ['var(--font-vietnam)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      borderRadius: {
        card: '16px',
        btn: '8px',
        pill: '12px',
      },
    },
  },
  plugins: [],
}

export default config
