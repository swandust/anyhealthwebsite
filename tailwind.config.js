/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './blog/*.html', './partials/*.html', './src/**/*.ts'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B2A5C',
          50: '#F0F3FA',
          100: '#DEE5F3',
          200: '#BCC9E6',
          400: '#5F77B8',
          600: '#2A3D7E',
          700: '#22346E',
          800: '#182655',
          900: '#111C40',
          950: '#0B1329',
        },
        sage: {
          DEFAULT: '#4E9A7E',
          50: '#F2F8F5',
          100: '#E3F0EA',
          200: '#C3E0D3',
          300: '#9CCAB6',
          400: '#6FAE93',
          500: '#4E9A7E',
          600: '#3F8169',
          700: '#336655',
          800: '#2A5146',
          900: '#22413A',
        },
        wa: {
          DEFAULT: '#25D366',
          deep: '#075E54',
          chat: '#ECE5DD',
          bubble: '#D9FDD3',
        },
        amber: { brand: '#E7A83E' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { '8xl': '88rem' },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.55' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.22,1,.36,1) both',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
