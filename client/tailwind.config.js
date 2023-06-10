/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        sidenav_slide: "slide 1s forward"
      },
      keyframes: {
        slide: {
          "100%": { transform: "translate-x-full" }
        }
      },
      fontFamily: {
        poppins: ["Poppins"]
      },
      colors: {
        light: "#DDE6ED",
        semi_light: "#9DB2BF",
        semi_bold: "#526D82",
        bold: "#27374D"
      }
    }
  },
  plugins: []
};
