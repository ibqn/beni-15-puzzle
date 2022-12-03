/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        four: "repeat(4, 80px)",
      },
      gridTemplateRows: {
        four: "repeat(4, 80px)",
      },
      colors: {
        cornsilk: "cornsilk",
        dimgray: "dimgray",
      },
    },
  },
  plugins: [],
};
