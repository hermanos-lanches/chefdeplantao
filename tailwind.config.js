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
        primary: {
          DEFAULT: '#FF6B00',
          hover: '#E66000',
        },
        background: '#121212',
        card: '#1E1E1E',
        'card-hover': '#2A2A2A',
      },
      borderRadius: {
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
