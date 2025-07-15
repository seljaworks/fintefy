import Colors from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";

import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

import { tokenCache } from "@clerk/clerk-expo/token-cache";

import AntDesign from "@expo/vector-icons/AntDesign";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CLERK_PUBLISHED_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/(authenticated)/(tabs)/home",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  const segments = useSegments();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded || !isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const isInAuthGroup = segments[0] === "(authenticated)";

    //TODO: ganti indexnya jadi halaman home biar ngak muncul halaman login pas startup

    //jika sudah login dan masih ada di luar auth groups
    if (isSignedIn && !isInAuthGroup) {
      router.replace("/(authenticated)/(tabs)/home");
    } else {
      router.replace("/");
    }
  }, [isSignedIn]);

  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Link href="/" dismissTo asChild>
            <AntDesign name="left" size={32} color={Colors.dark} />
          </Link>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          title: "",
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <Link href="/" dismissTo asChild>
              <AntDesign name="left" size={32} color={Colors.dark} />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="verify/[phoneNumber]"
        options={{
          title: "",
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <Link href="/" dismissTo asChild>
              <AntDesign name="left" size={32} color={Colors.dark} />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <Link href="/" dismissTo asChild>
              <AntDesign name="left" size={32} color={Colors.dark} />
            </Link>
          ),
          headerRight: () => (
            <Link href="/help" asChild>
              <MaterialIcons name="help-outline" size={32} color="black" />
            </Link>
          ),
        }}
      />

      <Stack.Screen name="help" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="(authenticated)/(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}

export default function RootLayoutNav() {
  return (
    <>
      <StatusBar style="dark" />

      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={CLERK_PUBLISHED_KEY}
      >
        <GestureHandlerRootView>
          <QueryClientProvider client={queryClient}>
            <InitialLayout />
          </QueryClientProvider>
        </GestureHandlerRootView>
      </ClerkProvider>
    </>
  );
}
