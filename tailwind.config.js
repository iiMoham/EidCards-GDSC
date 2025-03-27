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
          green: '#38A555',
          blue: '#4587F6',
          yellow: '#FAAE0B',
          red: '#E84336',
        },
      },
    },
  },
  plugins: [],
};