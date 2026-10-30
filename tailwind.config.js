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
          canvas: 'var(--studio-canvas)',
          sidebar: 'var(--studio-sidebar)',
          card: 'var(--studio-card)',
          cardAlt: 'var(--studio-card-alt)',
          chip: 'var(--studio-chip)',
          border: 'var(--studio-border)',
          borderStrong: 'var(--studio-border-strong)',
          text: 'var(--studio-text)',
          subtext: 'var(--studio-subtext)',
          muted: 'var(--studio-subtext)',
          btn: {
            bg: 'var(--studio-btn-bg)',
            text: 'var(--studio-btn-text)',
            dark: 'var(--studio-btn-dark)',
            darkText: 'var(--studio-btn-dark-text)',
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
