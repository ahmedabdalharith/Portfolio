/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3DDC84', // Android Green
          50: '#e8fbf0',
          100: '#c5f5da',
          200: '#94ebbd',
          300: '#5cdb9b',
          400: '#3DDC84',
          500: '#28cc71',
          600: '#1da559',
          700: '#188248',
          800: '#16663a',
          900: '#145431',
        },
        google: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC05',
          green: '#34A853',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
      boxShadow: {
        'soft': '0 20px 40px rgba(0, 0, 0, 0.04)',
        'soft-hover': '0 30px 60px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        '3xl': '2rem',
        '4xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
