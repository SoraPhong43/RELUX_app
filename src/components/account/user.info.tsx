import { useCurrentApp } from "@/context/app.context";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ShareInput from "../input/share.input";
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 50,
  },
});
const UserInfo = () => {
  const { appState } = useCurrentApp();

  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;

  const baseImage = `${backend}/images/avatar`;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{ alignItems: "center", gap: 5 }}>
            <Image
              style={{ height: 150, width: 150 }}
              source={{ uri: `${baseImage}/${appState?.user.avatar}` }}
            />
            <Text>{appState?.user.username}</Text>
          </View>
          <View style={{ marginTop: 20, gap: 20 }}>
            <ShareInput
              title="Họ tên"
              // onChangeText={handleChange('name')}
              // onBlur={handleBlur('name')}
              // value={values.name}
              // error={errors.name}
              value={appState?.user.name}
            />
            <ShareInput
              title="Email"
              keyboardType="email-address"
              // onChangeText={handleChange('email')}
              // onBlur={handleBlur('email')}
              // value={values.email}
              // error={errors.email}
              value={appState?.user.email}
            />

            <ShareInput
              title="Số điện thoại"
              // onChangeText={handleChange('name')}
              // onBlur={handleBlur('name')}
              // value={values.name}
              // error={errors.name}
              value={appState?.user.phone}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default UserInfo;
