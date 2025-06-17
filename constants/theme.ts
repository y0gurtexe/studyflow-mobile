import { Dimensions, ViewStyle } from "react-native"; // Removed unused TextStyle

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

export const COLORS = {
  primary: "rgba(99, 102, 241, 0.8)",
  secondary: "rgba(168, 85, 247, 0.8)",
  accent: "rgba(236, 72, 153, 0.8)",
  success: "rgba(16, 185, 129, 0.8)",
  warning: "rgba(245, 158, 11, 0.8)",
  danger: "rgba(239, 68, 68, 0.8)",
  dark: "rgba(15, 23, 42, 0.8)",
  gray: "rgba(128, 128, 128, 0.8)",
  light: "rgba(248, 250, 252, 0.8)",
  white: "rgba(255, 255, 255, 0.9)",
  black: "rgba(0, 0, 0, 0.9)",
  transparent: "transparent",
};

export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  margin: 24,

  // Font sizes
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // App dimensions
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

export const FONTS = {
  h1: { fontFamily: "Inter-Bold", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Inter-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Inter-Bold", fontSize: SIZES.h3, lineHeight: 26 },
  h4: { fontFamily: "Inter-Bold", fontSize: SIZES.h4, lineHeight: 22 },
  body1: { fontFamily: "Inter-Regular", fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: "Inter-Regular", fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: "Inter-Regular", fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontFamily: "Inter-Regular", fontSize: SIZES.body4, lineHeight: 20 },
  body5: { fontFamily: "Inter-Regular", fontSize: SIZES.body5, lineHeight: 18 },
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  dark: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
};

// Glass effect styles for light theme
export const glassStyle: ViewStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderWidth: 1,
  borderColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: SIZES.radius,
  overflow: "hidden" as const,
  // For iOS
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  // For Android
  elevation: 3,
  // Workaround for backdropFilter
  opacity: 0.9,
};

// Glass effect styles for dark theme
export const glassDarkStyle: ViewStyle = {
  ...glassStyle,
  backgroundColor: "rgba(15, 23, 42, 0.7)",
  borderColor: "rgba(255, 255, 255, 0.05)",
  // Dark theme specific adjustments
  shadowColor: "#000",
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 5,
};
