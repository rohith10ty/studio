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
          muted: 'var(--studio-muted)',
          text: 'var(--studio-text)',
          subtext: 'var(--studio-subtext)',
          accent: 'var(--studio-accent)',
          btn: {
            bg: 'var(--studio-contrast-btn-bg)',
            text: 'var(--studio-contrast-btn-text)',
          }
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'studio-subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'studio-modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
