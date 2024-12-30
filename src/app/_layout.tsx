import AppProvider from "@/context/app.context";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { ErrorBoundaryProps, Slot, Stack } from "expo-router";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_COLOR } from "./utils/constant";
import DisplayNotification from "./(user)/notification/notification";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Tiêu đề lỗi */}
        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>Page Not Found!</Text>
        {/* Hình ảnh */}
        <Image
          source={require("../assets/error/404_page_cover.jpg")} // Đảm bảo đường dẫn và tên file đúng
          style={styles.image}
        />

        {/* Thông báo lỗi */}
        <Text style={styles.message}>
          We're sorry, the page you requested could not be found. Please go back
          to the homepage!
        </Text>

        {/* Nút quay lại */}
        <Button title="Reload" onPress={retry} color={APP_COLOR.primary} />
      </View>
    </SafeAreaView>
  );
}

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
          <DisplayNotification />
          <Stack
            screenOptions={{
              headerTintColor: APP_COLOR.primary,
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
            <Stack.Screen
              name="(auth)/request.password"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/forgot.password"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(user)/notification/display.notification"
              options={{ headerTitle: "Notifications" }}
            />
            <Stack.Screen
              name="(user)/product/[id]"
              options={{ headerShown: false }}
              // options={{ headerTitle: "Services" }}
            />
            <Stack.Screen
              name="(user)/product/create.modal"
              options={{
                headerShown: false,
                animation: "fade",
                presentation: "transparentModal",
              }}
            />
            <Stack.Screen
              name="(user)/product/update.modal"
              options={{
                headerShown: false,
                animation: "fade",
                presentation: "transparentModal",
              }}
            />
            <Stack.Screen
              name="(user)/product/booking"
              options={{ headerTitle: "Book apointment" }}
              // options={{
              //   headerShown: false,
              // }}
            />
            <Stack.Screen
              name="(user)/product/CpBooking"
              options={{ headerTitle: "Book apointment" }}
              // options={{
              //   headerShown: false,
              // }}
            />
            <Stack.Screen
              name="(user)/product/confirm"
              options={{ headerTitle: "Confirm infomation" }}
              // options={{
              //   headerShown: false,
              // }}
            />
            <Stack.Screen
              name="(user)/product/locationid"
              options={{
                headerShown: false,
                animation: "slide_from_bottom",
                // animation: "slide_from_bottom",
                presentation: "transparentModal",
              }}
            />
            <Stack.Screen
              name="(user)/product/staffId"
              options={{ headerTitle: "Confirm infomation" }}
            />
            <Stack.Screen
              name="(user)/account/info"
              options={{
                headerTitle: "Your profile",
                headerTitleAlign: "center",
                headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
              }}
            />
            <Stack.Screen
              name="(user)/account/password"
              options={{ headerTitle: "Change Password" }}
            />
            <Stack.Screen
              name="(user)/account/language"
              options={{ headerTitle: "Change Language" }}
            />
            <Stack.Screen
              name="(user)/product/menu.product"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(user)/product/per.menuItem"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(user)/employee/per.employee"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(user)/account/about"
              options={{
                headerTitle: "About",
                headerTitleAlign: "center",
                headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
              }}
            />
          </Stack>
        </ThemeProvider>
        {/* </SafeAreaView> */}
      </AppProvider>
    </RootSiblingParent>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  content: {
    alignItems: "center",
    gap: 15,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 24,
    color: "#666",
  },
  message: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginVertical: 10,
  },
});
export default RootLayout;
