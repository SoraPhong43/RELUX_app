import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { forgotPasswordAPI } from "../utils/API";
import Toast from "react-native-root-toast";
import { APP_COLOR } from "../utils/constant";
import ShareButton from "@/components/button/share.button";
import { Formik } from "formik";
import { ForgotPasswordSchema } from "../utils/validate.schema";
import ShareInput from "@/components/input/share.input";

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { email, resetPasswordToken } = useLocalSearchParams();

  const handleForgotPassword = async (password: string) => {
    try {
      console.log("chay api");
      setLoading(true);
      console.log(email);
      console.log(password);

      console.log(resetPasswordToken);

      const res = await forgotPasswordAPI({
        email: email as string,
        newPassword: password,
        token: resetPasswordToken as string,
      });
      console.log(res);

      setLoading(false);
      if (res.isSuccess) {
        console.log("tc");
        Toast.show("Thay đổi mật khẩu thành công.", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.primary,
          opacity: 1,
        });
        router.replace("/(auth)/login");
      } else {
        console.log("loi qmk");
        Toast.show("lai loi", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.primary,
          opacity: 1,
        });
      }
    } catch (error) {
      console.log(">>> check error:", error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        validationSchema={ForgotPasswordSchema}
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => handleForgotPassword(values.password)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View
            style={{
              flex: 1,
              marginHorizontal: 20,
              gap: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 600,
                  marginVertical: 30,
                }}
              >
                Thay đổi mật khẩu
              </Text>
            </View>

            <ShareInput
              title="Enter New password"
              secureTextEntry={true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={errors.password}
              touched={touched.password}
            />
            <ShareInput
              title="Confirm new password"
              secureTextEntry={true}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
            <View style={{ marginVertical: 10 }}></View>
            <ShareButton
              loading={loading}
              title="Reset Password"
              onPress={handleSubmit}
              textStyle={{
                textTransform: "uppercase",
                color: "#fff",
                paddingVertical: 5,
              }}
              btnStyle={{
                justifyContent: "center",
                borderRadius: 30,
                marginHorizontal: 50,
                paddingVertical: 10,
                backgroundColor: APP_COLOR.primary,
              }}
              pressStyle={{ alignSelf: "stretch" }}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};
export default ForgotPasswordPage;
