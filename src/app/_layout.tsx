import AppProvider from "@/context/app.context";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Slot, Stack } from "expo-router";
import {  StyleSheet, Text, View } from "react-native"
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaView } from "react-native-safe-area-context";

const styles=StyleSheet.create({
    container:{
        flex:1,
    }
})

const RootLayout = () => {
    const navTheme={
        ...DefaultTheme,
        colors:{
            ...DefaultTheme.colors,
            background:'transparent',
        },
    };

    return (
        <RootSiblingParent>
            <AppProvider>
        {/* <SafeAreaView  style={styles.container} > */}
            <ThemeProvider value={navTheme}>
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="(auth)/welcome"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="(auth)/signup"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="(auth)/verify"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="(auth)/login"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false }}
            />

        </Stack>
        </ThemeProvider>
        {/* </SafeAreaView> */}
        </AppProvider>
        </RootSiblingParent>
    )
}

export default RootLayout;