import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colors read straight from the CSS custom properties in
        // app/styles/variables.css (one place to retune the palette).
        // Uses the rgb(var(--x-rgb) / <alpha-value>) pattern — required
        // for Tailwind's opacity modifiers (e.g. `border-ink/20`) to work
        // with CSS-variable-backed colors.
        background: "rgb(var(--background-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        border: "var(--line)",
        panel: "rgb(var(--panel-rgb) / <alpha-value>)",
        "panel-ink": "rgb(var(--panel-ink-rgb) / <alpha-value>)",
        "panel-muted": "var(--panel-muted)",
        "panel-line": "var(--panel-line)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-ink": "var(--accent-ink)",
      },
      fontFamily: {
        // Single-family type system (à la Suisse Int'l on the reference
        // site) — Inter carries both the oversized display headlines and
        // the body copy. Scale + weight create the hierarchy, not a font
        // swap.
        heading: ["var(--font-inter)", "Inter", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      fontSize: {
        hero: [
          "clamp(2.75rem,8.5vw,8rem)",
          { lineHeight: "0.98", fontWeight: "700", letterSpacing: "-0.03em" },
        ],
        display: [
          "clamp(2.25rem,6vw,5.25rem)",
          { lineHeight: "1.04", fontWeight: "700", letterSpacing: "-0.025em" },
        ],
        h3: [
          "clamp(1.5rem,2.4vw,2rem)",
          { lineHeight: "1.15", fontWeight: "600", letterSpacing: "-0.01em" },
        ],
        "stat-lg": [
          "clamp(2.5rem,5vw,4rem)",
          { lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.02em" },
        ],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      maxWidth: {
        container: "var(--container)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        marquee: "marquee 32s linear infinite",
        "marquee-reverse": "marquee-reverse 32s linear infinite",
        "spin-slow": "spin 16s linear infinite",
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
