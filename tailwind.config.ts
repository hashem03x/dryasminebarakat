import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
    },
    extend: {
      colors: {
        ivory: "#F7F4EE",
        paper: "#FCFBF8",
        ink: {
          DEFAULT: "#201F1B",
          soft: "#514F48",
          faint: "#8A8779",
        },
        sage: {
          DEFAULT: "#5B6852",
          dark: "#414B3B",
          light: "#8B9680",
          pale: "#E4E7DC",
        },
        sand: {
          DEFAULT: "#D9D0BE",
          light: "#EEE9DD",
          dark: "#B9AD92",
        },
        line: "#DED6C4",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["clamp(2.75rem, 5vw + 1rem, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(2.25rem, 3.5vw + 1rem, 3.75rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.75rem, 2vw + 1rem, 2.5rem)", { lineHeight: "1.15" }],
      },
      maxWidth: {
        container: "1320px",
        prose: "38rem",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "10px",
        full: "999px",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(32, 31, 27, 0.06)",
        soft: "0 8px 30px rgba(32, 31, 27, 0.08)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
