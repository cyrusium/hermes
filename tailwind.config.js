/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        text: "#f5f5f7",
        "text-200": "#b7beca",
        "text-900": "#1d1d1f",
        primary: "#2057d7",
        "primary-100": "#265cd9",
        "primary-400": "#1d4ec0",
        secondary: "#4781eb",
        "secondary-100": "#5e90ed",
        accent: "#56c900",
        "accent-800": "#66a932",
        "accent-100": "#e5861a",
        background: "#daebfe",

        "text/dark": "#f5f5f7",
        "text-200/dark": "#b8b8c6",
        "text-300/dark": "#808099",
        "primary/dark": "#17345e",
        "primary-200/dark": "#235090",
        "secondary/dark": "#1a273b",
        "secondary-200/dark": "#273b59",
        "secondary-400/dark": "#142e52",
        "accent/dark": "#3acc65",
        "accent-900/dark": "#1a6531",
        "accent-100/dark": "#e5861a",
        "background/dark": "#1d1d1f",
      },
      keyframes: () => ({
        slide: {
          "0%": {
            transform: "translateX(75%);",
            opacity: "0%",
          },
          "100%": {
            transform: "translateX(0);",
            opacity: "100%",
          },
        },
        exit: {
          "0%": {
            opacity: "100%",
          },
          "100%": {
            opacity: "0%",
          },
        },
        "open-filter": {
          "0%": {
            transform: "translateY(-9rem);",
          },
          "100%": {
            transform: "translateY(0);",
          },
        },
        "close-filter": {
          "0%": {
            transform: "translateY(9rem);",
          },
          "100%": {
            transform: "translateY(0);",
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
};
