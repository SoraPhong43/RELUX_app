import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
} from "react-native";
import moment from "moment";
import { APP_COLOR } from "@/app/utils/constant";
import { currencyFormatter } from "@/app/utils/API";
import { useCurrentApp } from "@/context/app.context";

const Step2 = () => {
  const { booking } = useCurrentApp();

  const adjustTime = (time: string) => {
    if (!time) return "--";
    return moment.utc(time).format("DD/MM/YYYY HH:mm");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Booking Time */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Booking Time</Text>
          <Text style={styles.value}>
            {booking?.bookingTime ? adjustTime(booking?.bookingTime) : "--"}
          </Text>
        </View>

        {/* Location */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{booking?.locationName || "--"}</Text>
        </View>

        {/* Employee */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Employee</Text>
          <Text style={styles.value}>{booking?.employeeName || "--"}</Text>
        </View>

        {/* Total Price */}
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total (After Discount):</Text>
          <Text style={styles.totalValue}>
            {currencyFormatter(
              booking?.price -
                (booking?.price * booking?.discountPercentage) / 100
            )}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  infoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: APP_COLOR.darkGray,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#333333",
  },
  totalBox: {
    backgroundColor: APP_COLOR.primary,
    borderRadius: 10,
    padding: 20,
    marginTop: 30,
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },
});

export default Step2;
