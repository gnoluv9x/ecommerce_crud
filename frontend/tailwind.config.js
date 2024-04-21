module.exports = {
  purge: ["./public/index.html", "./src/*.js", "./src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
