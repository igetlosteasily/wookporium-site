import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Festival/Psychedelic Chic Color Palette
        primary: {
          DEFAULT: "#00F0FF", // Electric Cyan
          dark: "#00A3CC",
          light: "#66F6FF",
        },
        secondary: {
          DEFAULT: "#FF00AA", // Neon Magenta
          dark: "#B30077",
          light: "#FF66CC",
        },
        accent: {
          DEFAULT: "#B026FF", // Electric Purple
          dark: "#7B1ADD",
          light: "#CB66FF",
        },
        "deep-bg": "#0A0A0F",
        "surface-dark": "#16161D",
        "surface-light": "rgba(255, 255, 255, 0.05)",
        "warm-white": "#FDF8F3", // Keeping for legacy text
        "dark-brown": "#120B1A", // Darkened for text
        cream: "#2A1A3A",
      },
      fontFamily: {
        header: ['"Playfair Display"', "serif"],
        body: ["Lato", "sans-serif"],
        accent: ['"Dancing Script"', "cursive"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      // Backdrop filter utilities for glassmorphism
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "10px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
      },
      backdropSaturate: {
        0: "0",
        50: "0.5",
        100: "1",
        150: "1.5",
        180: "1.8",
        200: "2",
      },
    },
  },
  plugins: [],
};

export default config;
