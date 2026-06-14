/** @type {import('tailwindcss').Config} */
// Tailwind powers ONLY the 2025 page. Content is scoped to its files so the
// utility classes (and the romantic design tokens below) never leak into the
// hand-written landing / 2023 / 2024 pages.
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/2025/**/*.{astro,html,js,ts}",
    "./src/components/year2025/**/*.{astro,html,js,ts}",
  ],
  // These reveal classes are added at runtime by the page's scroll script, so
  // Tailwind can't see them in the markup. Force-generate them.
  safelist: [
    "animate-fade-up",
    "animate-fade-in",
    "animate-slide-in-left",
    "animate-slide-in-right",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        rose: {
          DEFAULT: "hsl(var(--rose))",
          light: "hsl(var(--rose-light))",
          dark: "hsl(var(--rose-dark))",
        },
        cream: "hsl(var(--cream))",
        gold: "hsl(var(--gold))",
        burgundy: "hsl(var(--burgundy))",
      },
      backgroundImage: {
        "gradient-romantic": "var(--gradient-romantic)",
        "gradient-sunset": "var(--gradient-sunset)",
        "gradient-text": "var(--gradient-text)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        glow: "var(--shadow-glow)",
        deep: "var(--shadow-deep)",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        script: ["Dancing Script", "cursive"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-100px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(100px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        confetti: {
          "0%": { transform: "translateY(-100vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "10%, 30%": { transform: "scale(1.1)" },
          "20%": { transform: "scale(0.95)" },
        },
      },
      animation: {
        "fade-up": "fade-up 1s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in": "fade-in 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in-left": "slide-in-left 1s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in-right": "slide-in-right 1s cubic-bezier(0.4, 0, 0.2, 1)",
        float: "float 6s ease-in-out infinite",
        confetti: "confetti 3s ease-in-out forwards",
        heartbeat: "heartbeat 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
