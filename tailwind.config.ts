import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Регистр "код" — тёмный, тёплый чёрный (не чистый #000/#0a0a0a)
        ink: {
          DEFAULT: "#131310",
          soft: "#1B1B16",
          line: "rgba(233, 228, 216, 0.09)",
        },
        // Регистр "дизайн" — тёплая бумага
        paper: {
          DEFAULT: "#E9E4D8",
          soft: "#F2EEE4",
          line: "rgba(19, 19, 16, 0.1)",
        },
        graphite: "#55534A", // основной текст на бумаге
        mist: "#9CA39A", // приглушённый текст на чёрном (комментарии/подписи)
        clay: {
          DEFAULT: "#9C6B3F", // акцент дизайн-трека
          soft: "#C79A6C",
        },
        cobalt: {
          DEFAULT: "#3D5AFE", // акцент код-трека
          soft: "#7C90FF",
        },
        // Совместимость со старыми классами, используемыми в компонентах
        background: "#131310",
        foreground: "#E9E4D8",
        muted: "#9CA39A",
        border: "rgba(233, 228, 216, 0.1)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "scale-in": "scaleIn 0.6s ease-out",
        shimmer: "shimmer 2s infinite",
        caret: "caret 1.1s step-end infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        caret: {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
