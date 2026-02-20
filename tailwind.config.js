/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#102a5c',
        'navy-dark': '#0b1e43',
        text: '#1b2430',
        muted: '#6a7689',
        line: '#dce2eb',
        panel: '#f5f7fb',
        accent: '#2158d8'
      }
    }
  },
  plugins: []
};
