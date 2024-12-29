import ShareButton from "@/components/button/share.button";
import ShareInput from "@/components/input/share.input";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
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
    username: string,
    password: string,
    email: string,
    phone: string,
    fullName: string
  ) => {
    try {
      const res = await registerAPI(username, password, email, phone, fullName);

      // console.log("API Response: ", res);

      if (res?.data) {
        Toast.show("Registration successful!", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.primary,
          opacity: 1,
        });
        router.replace("/(auth)/welcome");
      } else {
        const m = Array.isArray(res.message) ? res.message[0] : res.message;
        Toast.show(m || "Registration failed!", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: "red",
          opacity: 1,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Toast.show("Something went wrong. Please try again.", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: "red",
        opacity: 1,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Formik
          validationSchema={SignUpSchema}
          initialValues={{
            username: "",
            password: "",
            email: "",
            phone: "",
            fullName: "", // Đảm bảo tên trường phù hợp với backend
          }}
          onSubmit={(values) =>
            handleSignUp(
              values.username,
              values.password,
              values.email,
              values.phone,
              values.fullName
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
          }) => (
            <View style={styles.container}>
              <View>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "600",
                    marginVertical: 30,
                  }}
                >
                  Sign up now
                </Text>
              </View>
              <ShareInput
                title="Full name"
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
                title="Phone number"
                keyboardType="number-pad"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                error={errors.phone}
                touched={touched.phone}
              />
              <ShareInput
                title="User name"
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

              <View style={{ marginVertical: 10 }}></View>
              <ShareButton
                title="Register"
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
                  You already have account?
                </Text>
                <Link href={"/(auth)/login"}>
                  <Text
                    style={{
                      color: APP_COLOR.primary,
                      textDecorationLine: "underline",
                    }}
                  >
                    Login
                  </Text>
                </Link>
              </View>

              <SocicalButton title="Register with" />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpPage;
