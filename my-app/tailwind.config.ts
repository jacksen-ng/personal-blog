import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'handwriting': ['Caveat', 'Dancing Script', 'Kalam', 'Pacifico', 'Shadows Into Light'],
        'indie': ['Indie Flower', 'Dancing Script', 'Kalam', 'Pacifico', 'Shadows Into Light'],
        'modern': ['Clash Display', 'Cabinet Grotesk', 'General Sans', 'system-ui'],
        'elegant': ['Playfair Display', 'Cormorant', 'Libre Baskerville', 'serif'],
        'creative': ['Righteous', 'Fredoka One', 'Comfortaa', 'cursive'],
        'tech': ['Space Grotesk', 'Chakra Petch', 'IBM Plex Sans', 'monospace'],
        'heading': ['Pacifico', 'Righteous', 'Fredoka One', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
      backgroundImage: {
        'grid-slate-200': 'linear-gradient(to right, rgb(226 232 240 / 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgb(226 232 240 / 0.1) 1px, transparent 1px)',
        'grid-slate-700': 'linear-gradient(to right, rgb(51 65 85 / 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgb(51 65 85 / 0.1) 1px, transparent 1px)',
        'noise': 'url("/noise.png")',
      },
    },
  },
  plugins: [],
};

export default config;
