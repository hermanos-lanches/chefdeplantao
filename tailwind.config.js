/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#14110F',
          dark: '#0A0908',
        },
        card: {
          DEFAULT: '#1C1917',
          hover: '#262220',
        },
        primary: {
          DEFAULT: '#F97316', // Orange fiel ao layout
          hover: '#EA580C',
        },
        surface: {
          DEFAULT: '#262220',
          highlight: '#332D2A',
        }
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Lexend', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
