import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg': 'var(--bg)',
        'term': 'var(--term)',
        'line': 'var(--line)',
        'txt': 'var(--txt)',
        'mut': 'var(--mut)',
        'amb': 'var(--amb)',
        'amb-hi': 'var(--amb-hi)',
        'cy': 'var(--cy)',
        'ok': 'var(--ok)',
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Config
