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
        ivory: {
          50: '#FFFDF8',
          100: '#FAF6EE',
          200: '#F5ECE0',
        },
        cream: {
          50: '#FDFBF7',
          100: '#F7F0E5',
          200: '#EFE3D0',
          300: '#E2D1B8',
        },
        burgundy: {
          DEFAULT: '#70152C',
          50: '#F9EAEF',
          100: '#F3D1DC',
          200: '#E6A3B9',
          600: '#8A1B38',
          700: '#70152C',
          800: '#541021',
          900: '#3A0B17',
        },
        gold: {
          light: '#E2C275',
          DEFAULT: '#C49A45',
          dark: '#A37B2E',
          shimmer: '#D4AF37',
          border: '#E8D9BD',
        },
        blush: {
          50: '#FAF2F4',
          100: '#F3DDE1',
          200: '#E7BDC5',
          300: '#D899A6',
        },
        charcoal: {
          DEFAULT: '#393333',
          light: '#5A5353',
          muted: '#7A7272',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'boutique': '0 4px 20px -2px rgba(112, 21, 44, 0.05), 0 2px 6px -1px rgba(196, 154, 69, 0.08)',
        'boutique-hover': '0 12px 30px -4px rgba(112, 21, 44, 0.12), 0 4px 12px -2px rgba(196, 154, 69, 0.15)',
        'subtle': '0 1px 3px rgba(57, 51, 51, 0.05)',
      },
    },
  },
  plugins: [],
};
export default config;
