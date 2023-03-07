module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    boxShadow: {
      '3xl': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    },
    extend: {
      colors: {
        theme: '#101d6c',
        primary: '#A8282E',
        facebook: '#3b5999',
        twitter: '#55acee',
        linkedin: '#0077b5',
        instagram: '#e4405f',
        whatsapp: '#25d366',
        youtube: '#cd201f',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
