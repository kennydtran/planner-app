/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matcha': '#a0b682',
        'softbr': '#d99b77',
        'br': '#73655d',
        'lightbr': '#f2ded0'
      },
    },
  },
  plugins: [],
}

