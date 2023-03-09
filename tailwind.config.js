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
        theme: '#363c70',
        primary: '#ff7717',
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
