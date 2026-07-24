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
        // Регистр "код" — холодный почти-чёрный
        ink: {
          DEFAULT: "#0D0D0D",
          soft: "#17170F",
          line: "rgba(212, 255, 61, 0.08)",
        },
        // Регистр "дизайн" — тёплый почти-чёрный (та же темнота, другая температура —
        // регистры больше не различаются цветом фона, только оттенком черного)
        canvas: {
          DEFAULT: "#1A170F",
          soft: "#211D12",
        },
        // Текст на тёмном фоне (раньше "бумага" была фоном — теперь это просто
        // светлый текст, панели больше не светлые)
        paper: {
          DEFAULT: "#EDEAE0",
          soft: "#D8D4C4",
          line: "rgba(237, 234, 224, 0.1)",
        },
        graphite: "#C9C6B8", // вторичный светлый текст (на canvas-панелях)
        mist: "#8B9182", // приглушённый текст (комментарии/подписи)
        // Единственный акцент — кислотно-жёлтый. clay/cobalt указывают на один и тот
        // же цвет (яркий/приглушённый оттенок), чтобы не трогать разметку компонентов —
        // но по сути это один акцент, а не два.
        clay: {
          DEFAULT: "#D4FF3D",
          soft: "#AEBD5A",
        },
        cobalt: {
          DEFAULT: "#D4FF3D",
          soft: "#AEBD5A",
        },
        background: "#0D0D0D",
        foreground: "#EDEAE0",
        muted: "#8B9182",
        border: "rgba(212, 255, 61, 0.08)",
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
