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
    color: APP_COLOR.primary,
  },
});

const VerifyPage = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const otpRef = useRef<OTPTextView>(null);
  const [otpCode, setOtpCode] = useState<string>("");

  const { email } = useLocalSearchParams();

  const verifyCode = async () => {
    if (otpCode && otpCode.length === 6) {
      Keyboard.dismiss();
      setIsSubmit(true);
      try {
        console.log("Response from login API1:", otpCode, email);

        const res = await verifyCodeAPI(otpCode, email as string);
        setIsSubmit(false);
        console.log("otp:", otpCode);
        if (res?.isSuccess) {
          otpRef?.current?.clear();
          Toast.show("Verification successful!", {
            duration: Toast.durations.SHORT,
            textColor: "white",
            backgroundColor: APP_COLOR.primary,
            opacity: 1,
          });
          // Navigate to the reset password page
          router.navigate({
            pathname: "/(auth)/forgot.password",
            params: {
              resetPasswordToken: res.resetPasswordToken,
              email: email,
            },
          });
        } else {
          Toast.show("Verification failed.", {
            duration: Toast.durations.LONG,
            textColor: "white",
            backgroundColor: "red",
            opacity: 1,
          });
        }
      } catch (error) {
        setIsSubmit(false);
        Toast.show("An error occurred. Please try again.", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: "red",
          opacity: 1,
        });
      }
    }
  };

  useEffect(() => {
    if (otpCode.length === 6) {
      verifyCode();
    }
  }, [otpCode]);

  const handleResendCode = async () => {
    otpRef?.current?.clear();
    try {
      const res = await resendCodeAPI(email as string);
      Toast.show("Code resent successfully.", {
        duration: Toast.durations.SHORT,
        textColor: "white",
        backgroundColor: APP_COLOR.primary,
        opacity: 1,
      });
    } catch (error) {
      Toast.show("Failed to resend code. Please try again.", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: "red",
        opacity: 1,
      });
    }
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
            handleTextChange={setOtpCode}
            autoFocus
            inputCount={6}
            inputCellLength={1}
            tintColor={APP_COLOR.primary}
            textInputStyle={{
              borderWidth: 1,
              borderColor: APP_COLOR.vienInput,
              borderBottomWidth: 1,
              borderRadius: 5,
              //@ts-ignore:next-line
              color: APP_COLOR.primary,
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Text>Didn’t receive the code?</Text>
          <Text
            style={{
              textDecorationLine: "underline",
              color: APP_COLOR.primary,
              paddingLeft: 5,
            }}
            onPress={handleResendCode}
          >
            Resend Code
          </Text>
        </View>
      </View>
      {isSubmit && <LoadingOverlay />}
    </>
  );
};

export default VerifyPage;
