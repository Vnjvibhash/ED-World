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
        brand: {
          50: '#f0f4f9',
          100: '#dce6f2',
          200: '#bad0e7',
          300: '#8db3d8',
          400: '#4a8bc4',
          500: '#173E67', // ED-World Primary Navy (from Logo)
          600: '#133355',
          700: '#0f2742',
          800: '#0a1b2e',
          900: '#06101c',
          950: '#03080e',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF8000', // ED-World Radiant Orange (from Logo)
          600: '#ea6c00',
          700: '#c25400',
          800: '#9a4204',
          900: '#7c3707',
          950: '#431903',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.7))',
      },
    },
  },
  plugins: [],
};
export default config;
