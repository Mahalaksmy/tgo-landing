/** Colores ligados a las variables de tema definidas en src/index.css (bloques [data-view]). */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          strong: "rgb(var(--primary-strong) / <alpha-value>)",
          soft: "rgb(var(--primary-soft) / <alpha-value>)",
          fg: "rgb(var(--on-primary) / <alpha-value>)",
        },
        branch: {
          agriculture: "rgb(var(--branch-agriculture) / <alpha-value>)",
          organizational: "rgb(var(--branch-organizational) / <alpha-value>)",
        },
        deep: {
          DEFAULT: "rgb(var(--deep) / <alpha-value>)",
          fg: "rgb(var(--on-deep) / <alpha-value>)",
          muted: "rgb(var(--deep-muted) / <alpha-value>)",
          accent: "rgb(var(--deep-accent) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ['"Clash Display"', '"Geist"', "system-ui", "sans-serif"],
        sans: ['"Geist"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
