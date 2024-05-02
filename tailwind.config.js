/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          800: "#6E27D5",
          900: "#4D1B95",
          950: "#37146B",
        } 
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      },
      gridTemplateColumns: {
        sidebar: "300px auto",
        "sidebar-collapsed": "64px auto",
      },
    },
  },
  plugins: [],
}
