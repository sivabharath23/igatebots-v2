/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040d1a',
          900: '#0A1628',
          800: '#0d1f38',
          700: '#122548',
          600: '#1E3A5F',
          500: '#25487a',
        },
        cyan: {
          DEFAULT: '#00A8E8',
          light: '#33BFEF',
          dark: '#007BAB',
        },
        teal: {
          DEFAULT: '#00D4AA',
          light: '#33DDBB',
          dark: '#00A882',
        },
        surface: {
          DEFAULT: '#0f1c30',
          muted: '#162236',
          card: '#1a2a42',
          border: '#1f3250',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/src/assets/svgs/circuit-pattern.svg')",
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 168, 232, 0.3)',
        'glow-teal': '0 0 20px rgba(0, 212, 170, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
