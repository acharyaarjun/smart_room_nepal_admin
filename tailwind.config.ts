import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        skin: "#0085DF",
        primary: "#3085df",
        secondary: "#2c266d",
        danger: "#dc3545",
        warning: "#ffc107",
        success: "#198754",
        darkbg: "#202936",
        graybg: "#1c1d22",
        lightgray: "#B5B7C8",
        hardgray: "#252F4A",
        bordercolor: "#1f212a",
        graycolor: "#636674",
        bluecolor: "#1b84ff",
        "form-background": "#f9f9f9",
        "dark-form-background": "#27324a",
        "form-background-focus": "#f1f1f4",
        "form-color": "#4b5675",
        "dark-form-background-focus": "#27324a",
        "dark-form-color": "#636674",
      },
      boxShadow: {
        customShadow: "0px 3px 4px 0px rgba(0, 0, 0, 0.03)",
        card: "0px 0px 5px 0px rgba(0, 0, 0, 0.09)",
        "forum-card": "0px 0px 15px rgba(0, 0, 0, 0.1)",
      },
      borderColor: {
        light: "#F1F1F4",
        dark: "#2a2c36",
      },
    },
  },
  plugins: [],
} satisfies Config;
