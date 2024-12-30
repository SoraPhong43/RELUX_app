import { useCurrentApp } from "@/context/app.context";
import { View, Text, Image, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { APP_COLOR } from "../utils/constant";
import { getURLBaseBackend } from "../utils/API";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AccountPage = () => {
  const { appState } = useCurrentApp();
  const baseImage = `${getURLBaseBackend()}/images/avatar`;
  const insets = useSafeAreaInsets();

  const handleLogOut = async () => {
    Alert.alert("Logout", "Are you sure you want to log out the user?", [
      {
        text: "cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: async () => {
          await AsyncStorage.removeItem("access_token");
          router.replace("/(auth)/welcome");
        },
      },
    ]);
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: insets.top,
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: APP_COLOR.primary,
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Image
          style={{ height: 80, width: 80 }}
          source={
            appState?.user.avatar
              ? { uri: appState.user.avatar }
              : require("../../assets/booking/bookingHollow.png")
          }
        />
        <View>
          <Text style={{ color: "white", fontSize: 20 }}>
            {appState?.user?.fullName}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => router.navigate("/(user)/account/info")}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Feather name="user-check" size={20} color="green" />
          <Text>Your profile</Text>
        </View>

        <MaterialIcons name="navigate-next" size={24} color="grey" />
      </Pressable>

      {/* <Pressable
        onPress={() => router.navigate("/(user)/account/password")}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="password" size={20} color="green" />
          <Text>Change your password</Text>
        </View>

        <MaterialIcons name="navigate-next" size={24} color="grey" />
      </Pressable> */}

      {/* <Pressable
        onPress={() => router.navigate("/(user)/account/language")}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="language" size={20} color="green" />
          <Text>Language</Text>
        </View>

        <MaterialIcons name="navigate-next" size={24} color="grey" />
      </Pressable> */}

      <Pressable
        onPress={() => router.navigate("/(user)/account/about")}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="info-outline" size={20} color="green" />
          <Text>About me</Text>
        </View>

        <MaterialIcons name="navigate-next" size={24} color="grey" />
      </Pressable>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          gap: 10,
          paddingBottom: 15,
        }}
      >
        <Pressable
          onPress={handleLogOut}
          style={({ pressed }) => ({
            opacity: pressed === true ? 0.5 : 1,
            padding: 10,
            marginHorizontal: 10,
            backgroundColor: APP_COLOR.primary,
            borderRadius: 3,
          })}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            Logout
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AccountPage;
