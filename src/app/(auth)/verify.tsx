import { View, Text, StyleSheet, Keyboard } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import { APP_COLOR } from "../utils/constant";
import LoadingOverlay from "@/components/loading/overlay";
import { useEffect, useRef, useState } from "react";
import { resendCodeAPI, verifyCodeAPI } from "../utils/API";
import Toast from "react-native-root-toast";
import { router, useLocalSearchParams } from "expo-router";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "600",
    marginVertical: 20,
    color: APP_COLOR.vang,
  },
});

const VerifyPage = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const otpRef = useRef<OTPTextView>(null);
  const [code, setCode] = useState<string>("");

  const { email, isLogin } = useLocalSearchParams();

  //   console.log("check email:", email);
  const verifyCode = async () => {
    if (code && code.length === 6) {
      //call api
      Keyboard.dismiss();
      setIsSubmit(true);
      const res = await verifyCodeAPI(email as string, code);
      setIsSubmit(false);

      // otpRef?.current?.clear();
      if (res.data) {
        //success
        otpRef?.current?.clear();
        Toast.show("kich hoat tai khoan thanh cong", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.vang,
          opacity: 1,
        });
        if (isLogin) {
          router.replace("/(tabs)");
        } else router.replace("/(auth)/login");
      } else {
        Toast.show(res.message as string, {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.vang,
          opacity: 1,
        });
      }
    }
  };
  useEffect(() => {
    verifyCode();
  }, [code]);

  const handleResendCode = async () => {
    otpRef?.current?.clear();
    //resendAPI
    const res = await resendCodeAPI(email as string);
    const m = res.data ? "Resend code thanh cong" : res.message;
    Toast.show(res.message as string, {
      duration: Toast.durations.LONG,
      textColor: "white",
      backgroundColor: APP_COLOR.vang,
      opacity: 1,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>OTP Verification</Text>
        <Text style={{ marginVertical: 10, fontSize: 16, color: "#838BA1" }}>
          Enter the verification code we just sent to your email address.
        </Text>
        <View style={{ marginVertical: 20 }}>
          <OTPTextView
            ref={otpRef}
            handleTextChange={setCode}
            //  handleCellTextChange={handeCellTextChange}
            autoFocus
            inputCount={6}
            inputCellLength={1}
            tintColor={APP_COLOR.vang}
            textInputStyle={{
              borderWidth: 1,
              borderColor: APP_COLOR.vienInput,
              borderBottomWidth: 1,
              borderRadius: 5,
              //@ts-ignore:next-line
              color: APP_COLOR.vang,
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Text>Không nhận được mã xác nhận,</Text>
          <Text
            style={{
              textDecorationLine: "underline",
              color: APP_COLOR.vang,
              paddingLeft: 5,
            }}
            onPress={handleResendCode}
          >
            gửi lại
          </Text>
        </View>
      </View>
      {isSubmit && <LoadingOverlay />}
    </>
  );
};

export default VerifyPage;
