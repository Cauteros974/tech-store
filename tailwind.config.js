const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        // ... (shadcn colors)
        primary: {
          DEFAULT: "#007BFF",
          foreground: "#FFFFFF",
        },
        // ...
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans], 
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}