/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        // Core wedding palette
        primary: '#014331', // deep green
        accent: '#b47868', // warm rose
        cream: '#fffdf4', // soft cream

        // Expanded semantic palette (light + rich accents)
        secondary: '#0b5e4a', // deeper teal-green
        blush: '#f4c2c2', // soft pink
        peach: '#fec89a', // warm peach
        gold: '#d4af37', // metallic gold
        sage: '#a3b18a', // muted green
        lavender: '#c4b5fd', // gentle purple
        sky: '#7dd3fc', // light blue
        navy: '#1e3a8a', // deep blue
        slate: '#64748b', // slate gray
      },
      fontFamily: {
        display: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        body: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
};