/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4cae51', // Brand green color
          dark: '#3d8c41',
          light: '#6bc36f',
        },
        gray: {
          dark: '#222222', // Greyish black
          DEFAULT: '#4a4a4a',
          light: '#f8f8f8', // Off white
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  darkMode: 'class', // Enable class-based dark mode
  plugins: [],
}