import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'avastar': "url('../public/avastar_poster.png')",
      },
    },
  },
  plugins: [],
}
module.exports = {
  theme: {
    extend: {
      backgroundOpacity: {
         '10': '0.1',
         '20': '0.2',
          '95': '0.95',
      }
    }
  }
}
export default config
