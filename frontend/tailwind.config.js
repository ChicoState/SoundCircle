/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        periwinkle: '#b3c2f2ff',
        slateBlue: '#735cddff',
        mauveine: '#9000b3ff',
        purple: '#7e007bff',
        blackBean: '#37000aff',
      },
    },
  },
  plugins: [],
}