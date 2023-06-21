const colors = {
  bgPrimary: '',
  bgSecondary: '',
  bgAlt: '',
  colorPrimary: 'red',
  colorSecondary: '',
  colorAlt: '',
  btnPrimary: '',
  btnSecondary: '',
  btnAlt: '',
  error: '',
  warning: '',
  success: '',
  info: '',
  fontColorPrimary: "#000",
  skyBlue: "#0ca5e9",
  white: "#fff"
}

// These margins are defined for the outer container, so everything looks aligned and follows a set rule
const spacing = {
  xxl: {
    y: 150,
    x: 80,
  },
  xl: {
    y: 120,
    x: 60,
  },
  lg: {
    y: 100,
    x: 40,
  },
  md: {
    y: 80,
    x: 32,
  },
  sm: {
    y: 80,
    x: 16,
  },
}

const sizes = {
  //button sizes
  button: {
    large: {
      fontSize: 18,
      lineHeight: 27,
      padding: "10px 25px",
      minHeight: "70px",
    },
    medium: {
      fontSize: 16,
      lineHeight: 24,
      padding: "10px 25px",
      minHeight: "40px",
    },
    small: {
      fontSize: 11,
      lineHeight: 16.5,
      padding: "22px 28px 22px 18px",
      minHeight: "69px",
    },
  },
  // Title sizes for Text with font-weight:700(Bold)
  boldTitle: {
    h1: {
      fontSize: 160,
      lineHeight: 195,
    },
    h2: {
      fontSize: 72,
      lineHeight: 87,
    },
    h3: {
      fontSize: 48,
      lineHeight: 60,
    },
    h4: {
      fontSize: 24,
      lineHeight: 36,
    },
    h5: {
      fontSize: 56,
      lineHeight: 68,
    },
    h6: {
      fontSize: 40,
      lineHeight: 52,
    },
  },
  // Title sizes for Text with font-weight:500(Medium)
  mediumTitle: {
    h1: {
      fontSize: 170,
      lineHeight: 255,
    },
    h2: {
      fontSize: 96,
      lineHeight: 117,
    },
    h3: {
      fontSize: 56,
      lineHeight: 84,
    },
    h4: {
      fontSize: 48,
      lineHeight: 72,
    },
    h5: {
      fontSize: 24,
      lineHeight: 34,
    },
    h6: {
      fontSize: 24,
      lineHeight: 30,
    },
    h7: {
      fontSize: 22,
      lineHeight: 28,
    },
  },
  // Title sizes for Text with font-weight:400(Regular)
  regularTitle: {
    h1: { fontSize: 56, lineHeight: 80 },
    h2: { fontSize: 36, lineHeight: 50 },
    h3: {
      fontSize: 32,
      lineHeight: 45,
    },
    h4: {
      fontSize: 32,
      lineHeight: 48,
    },
  },
  content: {
    p1: {
      fontSize: 24,
      lineHeight: 30,
    },
    p2: {
      fontSize: 21,
      lineHeight: 30,
    },
    p3: {
      fontSize: 18,
      lineHeight: 30,
    },
    p4: {
      fontSize: 18,
      lineHeight: 22,
    },
    p5: { fontSize: 16, lineHeight: 19.5 },
    p6: {
      fontSize: 15,
      lineHeight: 25,
    },
    p7: {
      fontSize: 14,
      lineHeight: 21,
    },
    p8: {
      fontSize: 14,
      lineHeight: 17,
    },
  },
  small: {
    s1: {
      fontSize: 12,
      lineHeight: 15,
    },
  },
};

const fonts = {
  // This is default
  regular: {
    name: "Montserrat-Regular",
    weight: 400,
  },
  //className:"fnt-medium"
  medium: {
    name: "Montserrat-Medium",
    weight: 500,
  },
  //className:"fnt-bold"
  bold: {
    name: "Montserrat-Bold",
    weight: 700,
  },
};

const buttons = {
  base: {
    borderWidth: "1px",
    borderRadius: "8px",
  },
  primaryCta: {
    background: colors.skyBlue,
    color: colors.white,
    borderColor: colors.skyBlue,
    font: fonts.medium,
  },
  secondaryCta: {
    background: "transparent",
    color: colors.fontColorPrimary,
    borderColor: colors.skyBlue,
    font: fonts.medium,
  },
  default: {
    background: colors.white,
    color: colors.fontColorPrimary,
    borderColor: colors.white,
    font: fonts.regular,
  },
};

export const theme = {
  sizes,
  colors,
  spacing,
  fonts,
  buttons
}

export default theme
