/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal:     '#5BAE8C',
        tealDark: '#4A9960',
        forest:   '#2D5A3D',
        navy:     '#0D1B4B',
        offwhite: '#F0F5F2',
        cream:    '#F8FAF9',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter:   ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
