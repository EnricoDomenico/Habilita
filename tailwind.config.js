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
          50: '#fee2e2',
          100: '#fecaca',
          200: '#fca5a5',
          300: '#f87171',
          400: '#ef4444',
          500: '#dc2626',
          600: '#c91a1a',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        brand: {
          red: '#E31E24',
          black: '#1a1a1a',
          gray: '#f5f5f5',
        },
      },
      boxShadow: {
        'material': '0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12)',
        'material-lg': '0 8px 10px -5px rgba(0,0,0,0.2), 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12)',
        'ripple': '0 0 0 0 rgba(227, 30, 36, 0.3)',
      },
      animation: {
        'ripple': 'ripple 0.6s linear',
      },
      keyframes: {
        ripple: {
          '0%': { boxShadow: '0 0 0 0 rgba(227, 30, 36, 0.3)' },
          '100%': { boxShadow: '0 0 0 20px rgba(227, 30, 36, 0)' },
        },
      },
    },
  },
  plugins: [],
}
