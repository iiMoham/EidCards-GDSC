/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Changa', 'sans-serif'],
      },
      colors: {
        google: {
          green: '#129D57',
          blue: '#4385F3',
          yellow: '#F9BC04',
          red: '#E94335',
        },
      },
    },
  },
  plugins: [],
};