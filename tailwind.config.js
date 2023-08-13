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
        krona: ['Krona One', 'sans-serif'],
        mulish: ['Mulish', 'sans-serif']
      },
      colors: {
        "theme": "rgb(212, 238, 38)",
        "accent": "rgb(250, 250, 250)",
        "accent-black": "#0a0a0a",
        "calender-header":"#111",
        "ranged-day":"rgb(212, 238, 38, 0.5)",
        "hover-days":"rgb(136, 136, 136, 0.425)"
      },
      borderColor:{
        'white':'#ffffff',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
