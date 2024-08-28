/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        layout: 'calc(100% - 74px)',
        pageLayout: 'calc(100vh - 207px)',
        inherit: 'inherit'
      }
    }
  },
  plugins: []
}
