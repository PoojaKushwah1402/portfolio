import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#08090C',
        ink: '#EAEEF3',
        muted: '#7C8695',
        accent: '#22B8E6',
      },
      fontFamily: {
        display: ['Anton', 'Arial Narrow', 'sans-serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        mono: ['"Space Grotesk Variable"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
