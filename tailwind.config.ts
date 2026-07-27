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
        background: "#EEEEEE",
        foreground: "#000000",
        primary: "#000000",
        secondary: "#D5F74C",
        muted: "#888888",
        border: "rgba(0, 0, 0, 0.08)",
        card: "#FFFFFF",
      },
      fontFamily: {
        heading: ["var(--font-inter-tight)", "Inter Tight", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3.5rem,11vw,9rem)", { lineHeight: "0.95", fontWeight: "600" }],
        section: ["clamp(3rem,8vw,7rem)", { lineHeight: "1.1", fontWeight: "600" }],
        "stat-lg": ["clamp(2.5rem,5vw,4rem)", { lineHeight: "1.2", fontWeight: "700" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
