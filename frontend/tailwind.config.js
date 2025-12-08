/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#19202D',
        primary: {
          600: '#667EEA',
          700: '#5A67D8',
        },
      },
    },
  },
  plugins: [],
}