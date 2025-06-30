// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}", // Important pour scanner vos composants
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    // Ajoutez d'autres chemins si vous avez des fichiers HTML/JS/TS en dehors de ces répertoires
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3B82F6', // Equivalent à blue-500
        'accent': '#7F1D1D', // red-900
        'white': '#FFFFFF',
      },
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}