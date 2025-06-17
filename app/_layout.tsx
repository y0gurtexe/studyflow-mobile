import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { COLORS } from "@/constants/theme";

export default function RootLayout() {
  // Color scheme is handled by our custom theme
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: COLORS.primary,
      background: COLORS.dark,
      card: COLORS.dark,
      text: COLORS.white,
      border: COLORS.dark, // Using dark as border color since gray is not defined
      notification: COLORS.primary,
    },
  };

  return (
    <ThemeProvider value={customTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: COLORS.dark,
          },
          headerTintColor: COLORS.white,
          headerShadowVisible: false,
          animation: "fade",
          contentStyle: {
            backgroundColor: COLORS.dark,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
