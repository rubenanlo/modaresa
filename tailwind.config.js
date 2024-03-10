/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      clash: ["Clash Display", "sans-serif"],
    },
    extend: {
      screens: {
        "4xl": "2020px",
        "3xl": "1800px",
        "2xl": "1500px",
        "desktop-sm": "1251px",
        "desktop-md": "1351px",
      },
      colors: {
        blue: {
          primary: "#8173FE",
          secondary: "#EFEFFF",
        },
        green: {
          primary: "#A7FBC2",
        },
        gray: {
          primary: "#F0F0F0",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
