module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wwGreen: '#9BCF39',
        wwDarkGreen: '#6B8F28',
        wwLightGreen: '#A4DB3D',
        wwLightGray: '#BABABA',
        wwGray: '#2c3234',
        wwDarkGray: '#1E2224',
        wwRed: '#FE013D',
        wwDarkRed: '#8E0122',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
};
