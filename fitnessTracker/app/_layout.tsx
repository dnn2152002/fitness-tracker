import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { FitnessContext } from "@/Context";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/utils/db";
import PersonInfoInput from "@/components/PersonInfoInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectRole from "./select-role";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isInitInfo, setInitInfo] = useState(false)

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {

    const checkInfo = async () => {
      if (await AsyncStorage.getItem("PERSON")) {
        setInitInfo(true)
      }
    }
    checkInfo()
  }, [])

  if (!loaded) {
    return null;
  }

  if (!isInitInfo) {
    return <PersonInfoInput setInitInfo={setInitInfo} />
  }

  return (
    <SQLiteProvider databaseName="fitness.db" onInit={migrateDbIfNeeded}>
      <FitnessContext>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack >
            <Stack.Screen name="index"  options={{ headerShown: false }} />
          
            <Stack.Screen name="+not-found" />

            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen name="(coach)" options={{ headerShown: false }} />

            <Stack.Screen name="workouts" options={{ headerShown: false }} />
            <Stack.Screen name="fitness" options={{ headerShown: false }} />
            <Stack.Screen name="webView" />
            <Stack.Screen
              name="add-plans"
              options={{ title: "Tạo kế hoạch giảm cân" }}
            />
            <Stack.Screen name="Rest" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </FitnessContext>
    </SQLiteProvider>
  );
}
