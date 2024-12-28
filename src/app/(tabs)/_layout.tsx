import { router, Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import { APP_COLOR } from "../utils/constant";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Route } from "expo-router/build/Route";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import spa from "@/assets/icons/makeanapointment.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCurrentApp } from "@/context/app.context";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TabLayout = () => {
  const { appState } = useCurrentApp();
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("access_token");
      if (!token || !appState) {
        router.replace("/(auth)/welcome");
      }
    };
    checkAuth();
  }, [appState]);
  const getIcons = (routeName: string, focused: boolean, size: number) => {
    if (routeName == "index") {
      return (
        <Entypo
          name="home"
          size={size}
          color={focused ? APP_COLOR.vang : APP_COLOR.darkGray}
        />
      );
    }

    if (routeName == "makeanapointment") {
      return (
        <FontAwesome5
          name="spa"
          size={size}
          color={focused ? APP_COLOR.vang : APP_COLOR.darkGray}
        />
      );
    }

    if (routeName == "favories") {
      return focused ? (
        <AntDesign name="heart" size={size} color={APP_COLOR.vang} />
      ) : (
        <AntDesign name="hearto" size={size} color={APP_COLOR.darkGray} />
      );
    }

    if (routeName == "booking") {
      return (
        <FontAwesome
          name="book"
          size={size}
          color={focused ? APP_COLOR.vang : APP_COLOR.darkGray}
        />
      );
    }

    if (routeName == "profile") {
      return (
        <Entypo
          name="user"
          size={size}
          color={focused ? APP_COLOR.vang : APP_COLOR.darkGray}
        />
      );
    }
    return <></>;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return getIcons(route.name, focused, size);
          },
          headerShown: false,
          tabBarLabelStyle: { paddingBottom: 3 },
          tabBarActiveTintColor: APP_COLOR.vang,
        })}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen
          name="makeanapointment"
          options={{
            title: "History",
            headerTitle: "History",
            headerShown: true,
            headerTitleStyle: {
              color: APP_COLOR.primary,
              fontSize: 22,
              fontWeight: "bold",
            },
            headerStyle: {
              backgroundColor: APP_COLOR.lightGray,
            },
          }}
        />

        <Tabs.Screen name="favories" options={{ title: "Favories" }} />
        <Tabs.Screen name="booking" options={{ title: "Booking now" }} />
        {/* <Tabs.Screen
                name="profile"
                options={{title:"Profile"}}
            /> */}
      </Tabs>
    </SafeAreaView>
  );
};

export default TabLayout;
