/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1F3A',
        royal: '#155EEF',
        gold: '#D4A72C',
        offwhite: '#F8FAFC',
        textdark: '#172033'
      },
      boxShadow: {
        soft: '0 10px 25px rgba(11, 31, 58, 0.12)'
      }
    }
  },
  plugins: []
};
