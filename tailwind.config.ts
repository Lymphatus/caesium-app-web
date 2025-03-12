/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './app.vue', './error.vue', './node_modules/preline/preline.js'],
  theme: {
    extend: {
      colors: {
        rgrey: {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#171717',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('preline/plugin')], // eslint-disable-line
};
