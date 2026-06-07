import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          DEFAULT: '#f0a500',
          dim: 'rgba(240,165,0,0.10)',
          border: 'rgba(240,165,0,0.22)',
        },
        sky: {
          DEFAULT: '#38bdf8',
          dim: 'rgba(56,189,248,0.09)',
          border: 'rgba(56,189,248,0.22)',
        },
        surface: {
          DEFAULT: '#0d1117',
          2: '#161b22',
          deep: '#060810',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Config
