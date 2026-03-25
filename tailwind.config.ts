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
        parchment: {
          DEFAULT: "#FDF6EC",
          dark: "#F5E6CC",
        },
        bark: {
          DEFAULT: "#3D2B1F",
          light: "#5C4033",
          muted: "#8B7355",
        },
        gold: {
          DEFAULT: "#C8963E",
          light: "#E8C778",
          dark: "#A07830",
        },
        "sky-lavender": "#C8B8E8",
        "cloud-pink": "#F4C2D0",
        forest: {
          DEFAULT: "#2D5A3D",
          dark: "#1A3A28",
        },
        crystal: "#5B8FD4",
        "mist-blue": "#B8D4F0",
        chakra: {
          root: "#E05555",
          sacral: "#F0923E",
          solar: "#F0D03E",
          heart: "#5DBB63",
          throat: "#5B8FD4",
          "third-eye": "#8B5DC8",
          crown: "#D4B8F0",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        accent: ["var(--font-accent)", "cursive"],
      },
      boxShadow: {
        card: "0 2px 16px rgba(61, 43, 31, 0.08)",
        "card-hover":
          "0 8px 40px rgba(61, 43, 31, 0.12), 0 0 60px rgba(200, 150, 62, 0.06)",
        nav: "0 1px 4px rgba(61, 43, 31, 0.06)",
        "glow-gold-sm": "0 0 40px rgba(200, 150, 62, 0.15)",
        "glow-gold-md": "0 0 80px rgba(200, 150, 62, 0.2)",
        "glow-gold-lg": "0 0 120px rgba(200, 150, 62, 0.25)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;
