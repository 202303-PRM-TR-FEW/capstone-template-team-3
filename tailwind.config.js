/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        krona: ['Krona One', 'sans-serif']
      },
      colors: {
        "theme": "rgb(212, 238, 38)",
        "accent": "rgb(250, 250, 250)"
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
