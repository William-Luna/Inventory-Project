/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,ejs,css}",
    "./views/**/*.ejs", "./views/items/"],
  theme: {
    extend: {
      animation: {
        "fade": "fadeOut 1s ease-in-out",
      },

      keyframes: (theme) => ({
        fadeOut: {
          "0%": { color: theme("colors.transparent") },
          "100%": { color: theme("colors.white") },
        },
      }),
    }
  },
  plugins: [],
}
