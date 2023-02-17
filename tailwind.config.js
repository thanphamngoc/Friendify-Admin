/* eslint-disable no-undef */
const { slate } = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: slate[800],
        secondary: slate[500],
        'primary-hover': slate[400]
      }
    },
  },
  plugins: [],
};
