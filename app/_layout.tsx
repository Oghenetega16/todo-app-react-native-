import { JosefinSans_400Regular, JosefinSans_700Bold, useFonts } from '@expo-google-fonts/josefin-sans';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Constants from 'expo-constants';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Get Convex URL from environment or app config
const CONVEX_URL = 
  process.env.EXPO_PUBLIC_CONVEX_URL || 
  Constants.expoConfig?.extra?.EXPO_PUBLIC_CONVEX_URL ||
  "https://accurate-ladybug-134.convex.cloud"; 

if (!CONVEX_URL) {
  throw new Error("Missing EXPO_PUBLIC_CONVEX_URL - check your .env.local and app.json");
}

const convex = new ConvexReactClient(CONVEX_URL);

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ConvexProvider client={convex}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </ConvexProvider>
  );
}