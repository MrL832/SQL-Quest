/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(34, 211, 238, 0.08), 0 18px 80px rgba(8, 145, 178, 0.18)',
      },
    },
  },
  plugins: [],
}
