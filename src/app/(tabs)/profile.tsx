import { useCurrentApp } from "@/context/app.context";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { APP_COLOR } from "../utils/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
});
const ProfileTab = () => {
  const { theme, appState } = useCurrentApp();

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn chắc chắn đăng xuất người dùng ?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xác nhận",
        onPress: async () => {
          await AsyncStorage.removeItem("access_token");
          router.replace("/(auth)/welcome");
        },
      },
    ]);
  };

  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;

  const baseImage = `${backend}/images/avatar`;
  console.log("Avatar URL:", `${baseImage}/${appState?.user.avatar}`);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", gap: 5 }}>
        <Image
          style={{ height: 150, width: 150 }}
          source={{ uri: `${baseImage}/${appState?.user.avatar}` }}
        />
        <Text>{appState?.user.name}</Text>
      </View>
    </View>
  );
};

export default ProfileTab;
