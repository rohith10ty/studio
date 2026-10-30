/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        studio: {
          // Dark palette (https://colorhunt.co/palette/dbd8e35c5470352f442a2438)
          dark: {
            bg: '#2A2438',
            card: '#352F44',
            surface: '#3d364f',
            border: '#5C5470',
            text: '#DBD8E3',
            muted: '#9c95af',
            accent: '#7D7495',
          },
          // Light palette (https://colorhunt.co/palette/ebe2ccded6c1cfc6b1b7b09e)
          light: {
            bg: '#EBE2CC',
            card: '#DED6C1',
            surface: '#E5DEC8',
            border: '#CFC6B1',
            muted: '#B7B09E',
            text: '#2A2438',
            subtext: '#5C5470',
          }
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'studio-glow': '0 0 25px -5px rgba(219, 216, 227, 0.15)',
        'studio-subtle': '0 10px 30px -10px rgba(42, 36, 56, 0.08)',
        'studio-dark-float': '0 20px 40px -15px rgba(0, 0, 0, 0.45)',
        'studio-light-float': '0 20px 40px -15px rgba(183, 176, 158, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'like-bounce': 'likeBounce 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        likeBounce: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.35)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
