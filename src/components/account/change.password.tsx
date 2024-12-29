import { updateUserPasswordAPI } from "@/app/utils/API";
import { APP_COLOR } from "@/app/utils/constant";
import { UpdateUserPasswordScheme } from "@/app/utils/validate.schema";
import { Formik, FormikProps } from "formik";
import { useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Toast from "react-native-root-toast";
import ShareInput from "../input/share.input";

const ChangePassword = () => {
  const formikRef = useRef<FormikProps<any>>(null);

  const handleUpdatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    const res = await updateUserPasswordAPI(currentPassword, newPassword);
    if (res.data) {
      Toast.show("update succes", {
        duration: Toast.durations.LONG,
        textColor: APP_COLOR.primary,
        backgroundColor: "white",
        opacity: 1,
      });
      formikRef?.current?.resetForm();
    } else {
      const m = Array.isArray(res.message) ? res.message[0] : res.message;

      Toast.show(m, {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: APP_COLOR.primary,
        opacity: 1,
      });
    }
    console.log(currentPassword);
    console.log(newPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 20,
          }}
        >
          <Formik
            innerRef={formikRef}
            validationSchema={UpdateUserPasswordScheme}
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            }}
            onSubmit={(values) =>
              handleUpdatePassword(
                values?.currentPassword ?? "",
                values?.newPassword ?? ""
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
                  title="Mật khẩu hiện tại"
                  secureTextEntry={true}
                  onChangeText={handleChange("currentPassword")}
                  onBlur={handleBlur("currentPassword")}
                  value={values.currentPassword}
                  error={errors.currentPassword}
                  touched={touched.currentPassword}
                />
                <ShareInput
                  title="Mật khẩu mới"
                  secureTextEntry={true}
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  value={values.newPassword}
                  error={errors.newPassword}
                  touched={touched.newPassword}
                />
                <ShareInput
                  title="Xác nhận mật khẩu mới"
                  secureTextEntry={true}
                  onChangeText={handleChange("confirmNewPassword")}
                  onBlur={handleBlur("confirmNewPassword")}
                  value={values.confirmNewPassword}
                  error={errors.confirmNewPassword}
                  touched={touched.confirmNewPassword}
                />

                <Pressable
                  disabled={!(isValid && dirty)}
                  onPress={handleSubmit as any}
                  style={({ pressed }) => ({
                    opacity: pressed === true ? 0.5 : 1,
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
export default ChangePassword;
