/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Navy blue — matches logo "par" colour (#1B3F73)
        primary: {
          DEFAULT: '#1B3F73',
          50:  '#EEF2F9',
          100: '#D4E0F0',
          200: '#A9C1E2',
          300: '#7EA2D3',
          400: '#5383C5',
          500: '#1B3F73',
          600: '#163462',
          700: '#102850',
          800: '#0B1D3D',
          900: '#06112A',
        },
        // Terracotta red — matches logo "lons" colour (#C0533A)
        accent: {
          DEFAULT: '#C0533A',
          50:  '#FAF0ED',
          100: '#F2D3CA',
          200: '#E5A796',
          300: '#D87A61',
          400: '#CC6449',
          500: '#C0533A',
          600: '#9B4229',
          700: '#78311C',
          800: '#562110',
          900: '#341207',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%':      { transform: 'translateX(-6px)' },
          '40%':      { transform: 'translateX(6px)' },
          '60%':      { transform: 'translateX(-4px)' },
          '80%':      { transform: 'translateX(4px)' },
        },
      },
      animation: {
        shake: 'shake 0.4s ease',
      },
    },
  },
  plugins: [],
}
