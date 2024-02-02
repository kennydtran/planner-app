/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'br2': '#f2ded0',
        'softbr': '#bd9e8a',
        'matcha2': '#7e946a',
        'br': '#826857',
        'brback': '#d4c2b6',
        'brgray': '#b8a191'
      },
    },
  },
  plugins: [],
}

