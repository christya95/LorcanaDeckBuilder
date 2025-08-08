import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0b1e39',
        royal: '#2763d6',
        aurora: '#2dd4bf',
        gold: '#fcd34d',
        stardust: '#f8fafc',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        soft: '0 4px 6px rgba(0,0,0,0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.glass': {
          'background': 'rgba(255,255,255,0.1)',
          'backdrop-filter': 'blur(4px)',
          'border': '1px solid rgba(255,255,255,0.2)',
        },
      });
    }),
  ],
};
export default config;
