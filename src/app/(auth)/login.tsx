import ShareButton from "@/components/button/share.button";
import ShareInput from "@/components/input/share.input";
import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_COLOR } from "../utils/constant";
import { Link, router } from "expo-router";
import SocicalButton from "@/components/button/socical.button";
import { getProfileAPI, loginAPI } from "../utils/API";
import Toast from "react-native-root-toast";
import { Formik } from "formik";
import { LoginSchema } from "../utils/validate.schema";
import { useCurrentApp } from "@/context/app.context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    gap: 10,
  },
});

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAppState } = useCurrentApp();

  const handleLogin = async (username: string, password: string) => {
    try {
      setLoading(true);
      console.log("Response from login API1:", username, password);
      const res = await loginAPI(username, password);
      console.log("Response from login API2:", res);

      setLoading(false);

      if (res.data) {
        // Validate access_token exists
        await AsyncStorage.setItem("access_token", res.data.accessToken);
        const profile = await getProfileAPI();
        res.data.user = {
          ...res.data.user,
          ...profile.data,
        };
        setAppState(res.data);
        router.replace("/(tabs)");
      } else {
        const m = Array.isArray(res.message) ? res.message[0] : res.message;

        alert("Cannot login");
        Toast.show("Cannot login", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.primary,
          opacity: 1,
        });
        console.log(res.statusCode);
      }
    } catch (error) {
      setLoading(false); // Make sure to reset loading state on error
      console.log(">>> check error: ", error);
      Toast.show("An error occurred during login", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: APP_COLOR.primary,
        opacity: 1,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        validationSchema={LoginSchema}
        // initialValues={{ username: "mrthinkj", password: "28122003" }}
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => handleLogin(values.username, values.password)}
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
                  color: APP_COLOR.primary,
                }}
              >
                Login
              </Text>
            </View>

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

            <View style={{ marginVertical: 10 }}>
              <Text
                onPress={() => router.navigate("/(auth)/request.password")}
                style={{
                  textAlign: "center",
                  color: APP_COLOR.primary,
                }}
              >
                Forgot password?
              </Text>
            </View>
            <ShareButton
              loading={loading}
              title="Login"
              onPress={handleSubmit as any}
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
                Don't have an account?
              </Text>
              <Link href={"/(auth)/signup"}>
                <Text
                  style={{
                    color: APP_COLOR.primary,
                    textDecorationLine: "underline",
                  }}
                >
                  register
                </Text>
              </Link>
            </View>

            <SocicalButton title="Sign in with" />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default LoginPage;
