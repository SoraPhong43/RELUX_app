import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  AppState,
} from "react-native";
import Toast from "react-native-root-toast";
import { useFocusEffect } from "@react-navigation/native";
import { useCurrentApp } from "@/context/app.context";
import { placeBookingAPI } from "@/app/utils/API";
import { APP_COLOR } from "@/app/utils/constant";
import { router } from "expo-router";
import Step1 from "./step/Step1";
import Step2 from "./step/Step2";
import Step3 from "./step/Step3";
import Step4 from "./step/Step4";

const Booking = () => {
  const { booking, setBooking, appState, service, setService } =
    useCurrentApp();
  const [step, setStepService] = useState<number>(1);
  const handlePrevBooking = () => {
    setStepService((prev) => Math.max(prev - 1, 1));
  };

  const handleNextBooking = () => {
    setStepService((prev) => Math.min(prev + 1, 4));
  };

  const handleClearBooking = () => {
    setBooking({
      bookingTime: "",
      bookingnotes: "",
      serviceIds: [],
      locationId: null,
      employeeId: null,
      categoryId: [],
      customerId: appState?.user.id || null,
      price: 0,
      discountPercentage: 0,
      bookingCount: appState?.user.bookingCount,
    });
    setStepService(1);
  };

  const handleBooking = async () => {
    try {
      const res = await placeBookingAPI(booking);
      if (res && res.data) {
        Toast.show("Success Booking!", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.vang,
        });
        handleClearBooking();
        router.replace("/(tabs)/makeanapointment");
      } else {
        Toast.show("Unexpected error occurred", {
          duration: Toast.durations.LONG,
          textColor: "red",
          backgroundColor: APP_COLOR.vang,
        });
      }
    } catch (error) {
      console.error("Error during booking:", error);
      Toast.show("An error occurred during booking", {
        duration: Toast.durations.LONG,
        textColor: "red",
        backgroundColor: APP_COLOR.vang,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleClearBooking();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 />}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {step > 1 && (
          <Pressable onPress={handlePrevBooking} style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>
        )}
        {step === 4 && (
          <Pressable onPress={handleBooking} style={styles.button}>
            <Text style={styles.buttonText}>Booking</Text>
          </Pressable>
        )}
        {step < 4 && (
          <Pressable
            onPress={handleNextBooking}
            style={[
              styles.button,
              !booking.bookingTime && styles.disabledButton,
            ]}
            disabled={!booking.bookingTime}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Booking;
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: APP_COLOR.vang,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: APP_COLOR.darkGray,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
