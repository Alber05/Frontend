/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
        Russo: ['Russo One', 'serif']
      },
      colors: {
        'primary-blue': '#111827',
        'custom-cyan': '#62CFC8',
        'title-colors': '#fff',
        'paragraph-color': '#9AA0AD',
        'padding-gray': '#1F2735'
      },
      backgroundImage: {
        'login-form':
          'linear-gradient(to left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url("/src/assets/login-bg.png")',
        'register-form':
          'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/src/assets/sign-up.png")'
      },
      screens: {
        '3xl': '2560px'
      }
    }
  },
  plugins: []
}
