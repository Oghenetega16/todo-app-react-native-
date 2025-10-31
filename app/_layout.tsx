import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";

// Replace with your actual Convex deployment URL
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

export default function RootLayout() {
    return (
        <ConvexProvider client={convex}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
            </Stack>
        </ConvexProvider>
    );
}