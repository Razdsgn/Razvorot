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
        // Colors read straight from the CSS custom properties in
        // app/styles/variables.css (one place to retune the palette).
        // Uses the rgb(var(--x-rgb) / <alpha-value>) pattern — required
        // for Tailwind's opacity modifiers (e.g. `border-foreground/20`)
        // to work with CSS-variable-backed colors.
        background: "rgb(var(--background-rgb) / <alpha-value>)",
        foreground: "rgb(var(--foreground-rgb) / <alpha-value>)",
        primary: "rgb(var(--foreground-rgb) / <alpha-value>)",
        secondary: "rgb(var(--accent-rgb) / <alpha-value>)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        border: "var(--line)",
        card: "rgb(var(--card-rgb) / <alpha-value>)",
      },
      fontFamily: {
        // Instrument Serif (thin, high-contrast, dramatic italic) carries
        // every heading/number on the site — reads far more editorial on
        // a dark background than a heavier text serif would. Inter stays
        // for body copy, labels and UI chrome.
        heading: ["var(--font-instrument-serif)", "Instrument Serif", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      fontSize: {
        hero: [
          "clamp(3.5rem,11vw,9.5rem)",
          { lineHeight: "0.95", fontWeight: "400", letterSpacing: "-0.02em" },
        ],
        section: [
          "clamp(3rem,8vw,7rem)",
          { lineHeight: "1.05", fontWeight: "400", letterSpacing: "-0.01em" },
        ],
        "stat-lg": [
          "clamp(2.75rem,5.5vw,4.5rem)",
          { lineHeight: "1.1", fontWeight: "400", letterSpacing: "-0.01em" },
        ],
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
