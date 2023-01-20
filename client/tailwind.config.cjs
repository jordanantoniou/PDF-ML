/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'base-1': '#1D1D1D',
      'base-2': '#1F1E1E',
      'base-3': '#3C3C3C',
      'base-4': '#2B2B2B',
      'base-5': '#232323',
      'text-1': 'white',
      'text-2': '#949494',
      accent: '#4584FF'
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['Roboto Mono', 'monospace']
    },
    extend: {
      gridTemplateColumns: {
        button: '1fr min-content',
        'class-table': '20rem 20rem repeat(2, min-content)'
      }
    }
  },
  plugins: []
};
