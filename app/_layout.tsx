import Header from "@/components/header";
import "@/global.css";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <Stack>
                {/* Tabs */}
                <Stack.Screen
                    name="(tabs)"
                    options={{ header: () => <Header /> }}
                />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
