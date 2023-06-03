/** @type {import('tailwindcss').Config} */

export default  {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {colors: {
      'mmOrange': '#FEB117', 
      'mmYellow': '#FEE305',
      'mmBlue': '#3D2E55'
    }},
  },
  plugins: [require('flowbite/plugin')],
};
