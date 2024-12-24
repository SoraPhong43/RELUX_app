import ShareButton from "@/components/button/share.button";
import ShareInput from "@/components/input/share.input";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerAPI } from "../utils/API";
import { APP_COLOR } from "../utils/constant";
import { SignUpSchema } from "../utils/validate.schema";
import SocicalButton from "@/components/button/socical.button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    gap: 10,
  },
});

const SignUpPage = () => {
  const handleSignUp = async (
    email: string,
    username: string,
    password: string,
    fullName: string,
    phone: string
  ) => {
    try {
      const res = await registerAPI(email, password, username, fullName, phone);
      console.log("API Response: ", res);
      if (res.data) {
        router.replace({
          pathname: "/(auth)/verify",
          params: { email: email },
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
    } catch (error) {
      console.log(">>> check error: ", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        validationSchema={SignUpSchema}
        initialValues={{ email: "", username: "", password: "", fullName: "", phone: "" }}
        onSubmit={(values) =>
          handleSignUp(values.email, values.username, values.password, values.fullName, values.phone)
        }
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 600,
                  marginVertical: 30,
                }}
              >
                Đăng ký tài khoản
              </Text>
            </View>
            <ShareInput
              title="Họ tên"
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              value={values.fullName}
              error={errors.fullName}
              touched={touched.fullName}
            />

            <ShareInput
              title="Email"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />
            <ShareInput
              title="Username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              error={errors.username}
              touched={touched.username}
            />

            <ShareInput
              title="Password"
              secureTextEntry={true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={errors.password}
              touched={touched.password}
            />
            <ShareInput
              title="Phone"
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
              error={errors.phone}
              touched={touched.phone}
            />
            <View style={{ marginVertical: 10 }}></View>
            <ShareButton
              title="Đăng Ký"
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
                backgroundColor: APP_COLOR.vang,
              }}
              pressStyle={{ alignSelf: "stretch" }}
            />

            <View
              style={{
                marginVertical: 15,
                flexDirection: "row",
                gap: 10,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "black",
                }}
              >
                Đã có tài khoản?
              </Text>
              <Link href={"/(auth)/login"}>
                <Text
                  style={{ color: "black", textDecorationLine: "underline" }}
                >
                  Đăng nhập.
                </Text>
              </Link>
            </View>

            <SocicalButton title="Đăng ký với" />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default SignUpPage;
