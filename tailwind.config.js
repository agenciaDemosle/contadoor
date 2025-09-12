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
          DEFAULT: '#A0569A',
          50: '#F9F5F9',
          100: '#F0E5EF',
          200: '#E0C5DE',
          300: '#D0A5CC',
          400: '#B87BB3',
          500: '#A0569A',
          600: '#8A3F83',
          700: '#6E326A',
          800: '#522650',
          900: '#361937'
        },
        neutral: '#9F9F9E',
        black: '#000000',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'button': '20px',
        'xl': '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(160, 86, 154, 0.15), 0 10px 20px -2px rgba(160, 86, 154, 0.08)',
        'glow': '0 0 30px rgba(160, 86, 154, 0.3)',
        'brutal': '8px 8px 0 #000000',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #A0569A 0%, #D0A5CC 50%, #A0569A 100%)',
        'pattern-dots': 'radial-gradient(circle, #A0569A 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}

