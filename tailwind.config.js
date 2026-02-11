/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode : 'class',
  theme: {
    extend: {
      colors : {
        'base-first' : '#f2f9ff',
        'base-primary': '#e3f1fa',
        'base-secondary' : '#ddf0f6',
        'green-primary': {
          50: '#f0fbfc',
          100: '#d1f2f5',
          200: '#a3e5eb',
          400: '#4fcad5',
          500: '#03a3ad',
          600: '#029298',
          700: '#018086',
          DEFAULT: '#03a3ad',
        },
        'black-primary' : '#1e1c123',
        'black-secondary' : '#1d222b',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
