/** @type {import('tailwindcss').Config} */
module.exports = {
  // specify which files apply tailwind CSS
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: { opacity: ['disabled'] },
  },
  plugins: [],
}
