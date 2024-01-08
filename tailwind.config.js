/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'br2': '#f2ded0',
        'softbr': '#d4b39d',
        'matcha2': '#7e946a',
        'br': '#9c7a64'
      },
    },
  },
  plugins: [],
}

