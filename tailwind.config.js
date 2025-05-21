/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#18181b', // Main black
          600: '#27272a',
          700: '#3f3f46',
          800: '#52525b',
          900: '#71717a',
        },
        secondary: {
          50: '#f0faf5',
          100: '#d0f0e0',
          200: '#a0e0c0',
          300: '#70d0a0',
          400: '#40c080',
          500: '#10b060',
          600: '#0d8d4d',
          700: '#0a6a3a',
          800: '#064626',
          900: '#032313',
        },
        accent: {
          50: '#fff7f0',
          100: '#ffe6d0',
          200: '#ffcca0',
          300: '#ffb370',
          400: '#ff9940',
          500: '#ff8010',
          600: '#cc660d',
          700: '#994d0a',
          800: '#663306',
          900: '#331a03',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        'footer-pattern': "url('https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      },
    },
  },
  plugins: [],
};