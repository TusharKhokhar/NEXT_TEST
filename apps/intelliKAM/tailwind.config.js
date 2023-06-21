module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './common/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xxl: "1920px",
        xl: "1440px",
        lg: "1280px",
        md: "1024px",
        sm: "768px"
      },
      colors: {
        container: {
          lg: '1920px',
        },
        complimentaryLight: '#E8EDEF',
        complimentary: '#00C6C6',
        primary: '#101935',
        secondary: '#020205',
        accentDark: '#B6BDC0',
        accentLightDark: 'F6FBF9',
      },
      fontFamily: {
        'body': ['"Lato", sans-serif']
      }
    },
  },
  plugins: [require("daisyui")],
}
