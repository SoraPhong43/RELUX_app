import { useCurrentApp } from "@/context/app.context";
import { View, Text, Image, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { APP_COLOR } from "../utils/constant";
import { getURLBaseBackend } from "../utils/API";

const AccountPage = () => {
  const { appState } = useCurrentApp();
  const baseImage = `${getURLBaseBackend()}/images/avatar`;
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: insets.top,
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: APP_COLOR.vang,
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Image
          style={{ height: 60, width: 60 }}
          source={{ uri: `${baseImage}/${appState?.user.avatar}` }}
        />
        <View>
          <Text style={{ color: "white", fontSize: 20 }}>
            {appState?.user.username}
          </Text>
        </View>
      </View>

      <Pressable
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
          <Text>Cập nhật thông tin</Text>
        </View>

        <MaterialIcons name="navigate-next" size={24} color="grey" />
      </Pressable>

      <Pressable
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
          <Text>Thay đổi mật khẩu</Text>
        </View>

        <MaterialIcons name="navigate-next" size={24} color="grey" />
      </Pressable>

      <Pressable
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
          <Text>Ngôn ngữ</Text>
        </View>

        <MaterialIcons name="navigate-next" size={24} color="grey" />
      </Pressable>

      <Pressable
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
          <Text>Về ứng dụng</Text>
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
          style={({ pressed }) => ({
            opacity: pressed === true ? 0.5 : 1,
            padding: 10,
            marginHorizontal: 10,
            backgroundColor: APP_COLOR.vang,
            borderRadius: 3,
          })}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            Đăng Xuất
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AccountPage;
