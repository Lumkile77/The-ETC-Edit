/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f4ebd9',
          300: '#ecd9b8',
          400: '#e0c191',
          500: '#d4a96b',
          600: '#c6924f',
          700: '#a8763f',
          800: '#875e35',
          900: '#6e4d2e',
        },
        ink: {
          50: '#f6f5f3',
          100: '#e8e6e1',
          200: '#d1cdc4',
          300: '#b0a99c',
          400: '#8a8170',
          500: '#6b6253',
          600: '#564e42',
          700: '#463f36',
          800: '#3a342d',
          900: '#2b2722',
        },
        wine: {
          50: '#fdf2f2',
          100: '#fce4e4',
          200: '#facdcd',
          300: '#f6a8a8',
          400: '#f07474',
          500: '#e34a4a',
          600: '#c93838',
          700: '#a82c2c',
          800: '#8a2727',
          900: '#722424',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
