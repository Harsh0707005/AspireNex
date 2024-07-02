/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': {'max': '576px'},
      },
      colors: {
        'golden': 'rgb(244 239 233)',
        'button-blue': 'rgb(67 138 206)',
        'button-dark-blue': 'rgb(60 128 220)'
      },
      backgroundImage: {
        'heroImage': 'url("heroImage.jpeg")'
      }
    },
  },
  plugins: [],
}