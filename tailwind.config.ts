import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Pearl + Pacific Teal — lighter, fresher
        bg: '#FEFAF0',          // near-white with a warm hint
        cream: '#FFFCF6',
        'cream-dark': '#F0E5CA',
        ink: '#0A1014',         // cool near-black
        'ink-soft': '#1F2530',
        muted: '#6B7280',
        subtle: '#C4B894',
        accent: {
          DEFAULT: '#0E7C86',   // pacific teal
          light: '#2FA0AA',
          deep: '#064A52',
          dim: 'rgba(14, 124, 134, 0.1)',
          glow: 'rgba(14, 124, 134, 0.3)',
        },
        warm: '#D9953A',
        olive: '#5E7D3C',
        plum: '#4A2F4D',
        ember: '#C8502E',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'Cambria', 'Times', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
