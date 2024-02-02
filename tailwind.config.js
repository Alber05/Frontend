/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      Montserrat: ['Montserrat', 'sans-serif'],
      Eczar: ['Eczar', 'serif']
    },
    extend: {
      colors: {
        'primary-blue': '#111827',
        'custom-cyan': '#62CFC8'
      },
      backgroundImage: {
        'login-form':
          'linear-gradient(to left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url("/src/assets/login-bg.jpg")',
        'register-form':
          'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/src/assets/sign-up.jpg")'
      }
    }
  },
  plugins: []
}
