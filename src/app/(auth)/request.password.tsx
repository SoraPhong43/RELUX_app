import { useState } from "react";
import { SafeAreaView, Share, StyleSheet, Text, View } from "react-native";
import { requestPasswordAPI } from "../utils/API";
import { router } from "expo-router";
import Toast from "react-native-root-toast";
import { APP_COLOR } from "../utils/constant";
import { Formik } from "formik";
import { RequestPasswordSchema } from "../utils/validate.schema";
import ShareInput from "@/components/input/share.input";
import ShareButton from "@/components/button/share.button";

const RequestPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleRequestPassword = async (email: string) => {
    try {
      console.log(email);
      setLoading(true);
      const res = await requestPasswordAPI(email);
      setLoading(false);
      if (res) {
        console.log("Routing to forgot.password screen...");
        router.replace({
          pathname: "/(auth)/verify",
          params: { email },
        });
      } else {
        Toast.show("khong co email nay", {
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
        validationSchema={RequestPasswordSchema}
        initialValues={{ email: "" }}
        onSubmit={(values) => handleRequestPassword(values.email)}
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
              paddingTop: 50,
              gap: 30,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 600,
                  marginTop: 30,
                }}
              >
                Forgot Password
              </Text>
              <Text style={{ color: APP_COLOR.darkGray, paddingTop: 10 }}>
                Please fill in your login account email to make a password
                change request.
              </Text>
              <View style={{ paddingTop: 10 }}>
                <ShareInput
                  title="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                />
              </View>
              <View style={{ marginVertical: 10 }}></View>
              <View>
                <ShareButton
                  loading={loading}
                  title="Confirm"
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
              </View>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};
export default RequestPassword;
