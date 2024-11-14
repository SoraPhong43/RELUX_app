import AppProvider from "@/context/app.context";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Slot, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_COLOR } from "./utils/constant";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const RootLayout = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  return (
    <RootSiblingParent>
      <AppProvider>
        {/* <SafeAreaView  style={styles.container} > */}
        <ThemeProvider value={navTheme}>
          <Stack
            screenOptions={{
              headerTintColor: APP_COLOR.vang,
              headerTitleStyle: {
                color: "black",
              },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
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
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="product/[id]"
              options={{ headerShown: false }}
              // options={{ headerTitle: "Services" }}
            />
            <Stack.Screen
              name="product/create.modal"
              options={{
                headerShown: false,
                animation: "fade",
                presentation: "transparentModal",
              }}
            />
            <Stack.Screen
              name="product/update.modal"
              options={{
                headerShown: false,
                animation: "fade",
                presentation: "transparentModal",
              }}
            />
            <Stack.Screen
              name="product/booking"
              options={{ headerTitle: "Book apointment" }}
              // options={{
              //   headerShown: false,
              // }}
            />
            <Stack.Screen
              name="product/confirm"
              options={{ headerTitle: "Confirm infomation" }}
              // options={{
              //   headerShown: false,
              // }}
            />
          </Stack>
        </ThemeProvider>
        {/* </SafeAreaView> */}
      </AppProvider>
    </RootSiblingParent>
  );
};

export default RootLayout;
