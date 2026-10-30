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
          bg: 'var(--studio-bg)',
          card: 'var(--studio-card)',
          surface: 'var(--studio-surface)',
          border: 'var(--studio-border)',
          divider: 'var(--studio-divider)',
          text: 'var(--studio-text)',
          muted: 'var(--studio-muted)',
          btn: {
            bg: 'var(--studio-btn-bg)',
            text: 'var(--studio-btn-text)',
          }
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'studio-card': 'var(--studio-shadow)',
        'studio-modal': '0 25px 60px -15px rgba(0, 0, 0, 0.45)',
      }
    },
  },
  plugins: [],
}
