import { useCurrentApp } from "@/context/app.context";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ShareInput from "../input/share.input";
import { Formik } from "formik";
import { SignUpSchema, UpdateUserSchema } from "@/app/utils/validate.schema";
import { APP_COLOR } from "@/app/utils/constant";
import Toast from "react-native-root-toast";
import { updateUserAPI } from "@/app/utils/API";
import { useEffect } from "react";
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 50,
  },
});
const UserInfo = () => {
  const { appState, setAppState } = useCurrentApp();

  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;

  const baseImage = `${backend}/images/avatar`;

  const handleUpdateUser = async (
    username: string,
    phone: string,
    setValues: Function
  ) => {
    if (appState?.user.userId) {
      const res = await updateUserAPI(appState?.user.userId, username, phone);
      if (res.data) {
        setAppState((prevState: typeof appState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            username: username,
            phone: phone,
          },
        }));

        setValues({
          name: username,
          email: appState?.user.email,
          phone: phone,
        });

        Toast.show("Cập nhật thông tin user thành công!", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.vang,
          opacity: 1,
        });
      } else {
        const m = Array.isArray(res.message) ? res.message[0] : res.message;
        Toast.show(m, {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.vang,
          opacity: 1,
        });
      }
    }
  };

  useEffect(() => {
    console.log("AppState updated in UserInfo:", appState);
  }, [appState]);
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
          <Formik
            validationSchema={UpdateUserSchema}
            enableReinitialize
            initialValues={{
              name: appState?.user.username,
              email: appState?.user.email,
              phone: appState?.user.phone,
            }}
            onSubmit={(values, { setValues }) =>
              handleUpdateUser(
                values?.name ?? "",
                values?.phone ?? "",
                setValues
              )
            }
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              dirty,
            }) => (
              <View style={{ marginTop: 20, gap: 20 }}>
                <ShareInput
                  title="Họ tên"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  error={errors.name}
                  touched={touched.name}
                />
                <ShareInput
                  editable={false}
                  title="Email"
                  keyboardType="email-address"
                  value={appState?.user.email}
                />
                <ShareInput
                  title="Số điện thoại"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  error={errors.phone}
                  touched={touched.phone}
                />
                <Pressable
                  disabled={!(isValid && dirty)}
                  onPress={handleSubmit as any}
                  style={({ pressed }) => ({
                    opacity: pressed === true ? 0.5 : 1,
                    backgroundColor:
                      isValid && dirty ? APP_COLOR.vang : APP_COLOR.darkGray,
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 3,
                  })}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: isValid && dirty ? "white" : "grey",
                    }}
                  >
                    Lưu thay đổi
                  </Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserInfo;
