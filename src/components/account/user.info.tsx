import { useCurrentApp } from "@/context/app.context";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ShareInput from "../input/share.input";
import { Formik } from "formik";
import { UpdateUserSchema } from "@/app/utils/validate.schema";
import { APP_COLOR } from "@/app/utils/constant";
import Toast from "react-native-root-toast";
import { updateUserAPI } from "@/app/utils/API";
import { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import AvatarActionSheet from "../uploadModal/action.sheet";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75, // Bo tròn hình tròn
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "relative", // Để đặt icon camera ở góc
    overflow: "visible", // Cho phép hiển thị các phần tử vượt ra ngoài
    borderWidth: 2,
    borderColor: "#E0E0E0", // Màu viền
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 75, // Bo tròn hình tròn
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 10, // Đẩy xuống góc dưới
    right: 10, // Đẩy sang phải
    backgroundColor: "#fff", // Nền trắng
    borderRadius: 20, // Bo tròn nền
    padding: 5, // Tạo khoảng trống xung quanh icon
    borderWidth: 1,
    borderColor: "#E0E0E0", // Màu viền
    zIndex: 10, // Đặt giá trị zIndex cao để hiện phía trên
    elevation: 5, // Cho Android
  },
});

const UserInfo = () => {
  const { appState, setAppState } = useCurrentApp();
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleUpdateUser = async (
    fullName: string,
    phone: string,
    setValues: Function
  ) => {
    try {
      if (!appState?.user.id) {
        throw new Error("User ID is missing. Please log in again.");
      }

      const res = await updateUserAPI(appState.user.id, phone, fullName);

      if (res?.data) {
        // Update app state
        setAppState((prevState: typeof appState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            fullName,
            phone,
          },
        }));

        // Update form values
        setValues({
          fullName,
          email: appState?.user.email, // Giữ lại email hiện tại
          phone,
          username: appState?.user.username, // Giữ lại username
        });

        Toast.show("Cập nhật thông tin user thành công!", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.primary,
          opacity: 1,
        });
      } else {
        const errorMessage =
          res?.message || "Cập nhật thông tin thất bại. Vui lòng thử lại.";
        console.log(errorMessage);
      }
    } catch (error: any) {
      Toast.show(error?.message || "Đã xảy ra lỗi. Vui lòng thử lại.", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: "red",
        opacity: 1,
      });
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
            <View style={styles.avatarContainer}>
              {/* Avatar */}
              <Image
                style={styles.avatar}
                source={
                  appState?.user.avatar
                    ? { uri: appState?.user.avatar }
                    : require("../../assets/booking/bookingHollow.png")
                }
              />
              {/* Icon Camera */}
              <TouchableOpacity
                style={styles.cameraIconContainer}
                onPress={() => setVisible(true)}
              >
                <AntDesign name="camerao" size={24} color={APP_COLOR.primary} />
              </TouchableOpacity>
            </View>
            <AvatarActionSheet
              visible={visible}
              onClose={() => setVisible(false)}
              onSetAvatar={(uri) => {
                if (uri) {
                  setAppState((prevState: typeof appState) => ({
                    ...prevState,
                    user: {
                      ...prevState?.user,
                      avatar: uri, // Cập nhật URI của avatar
                    },
                  }));
                }
              }}
            />

            <Text style={{ alignItems: "center" }}>
              {appState?.user.fullName}
            </Text>
          </View>
          <Formik
            validationSchema={UpdateUserSchema}
            enableReinitialize
            initialValues={{
              fullName: appState?.user.fullName || "",
              email: appState?.user.email,
              phone: appState?.user.phone || "",
              username: appState?.user.username,
            }}
            onSubmit={(values, { setValues }) =>
              handleUpdateUser(values.fullName, values.phone, setValues)
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
                  title="Username"
                  value={values.username}
                  editable={false}
                />
                <ShareInput
                  title="Full Name"
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                  error={errors.fullName}
                  touched={touched.fullName}
                />
                <ShareInput
                  editable={false}
                  title="Email"
                  value={values.email}
                />
                <ShareInput
                  title="Phone number"
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
                    opacity: pressed ? 0.5 : 1,
                    backgroundColor:
                      isValid && dirty ? APP_COLOR.primary : APP_COLOR.darkGray,
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
                    Save changes
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
