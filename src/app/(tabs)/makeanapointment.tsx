import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import moment from "moment";
import { APP_COLOR } from "../utils/constant";
import { useCurrentApp } from "@/context/app.context";
import { useFocusEffect } from "@react-navigation/native";
import { placeBookingByUserAPI } from "../utils/API";

const BookingHistory = () => {
  const { appState } = useCurrentApp();
  const [bookingHistory, setBookingHistory] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(false);

  const formatDateTime = (dateTime: any) => {
    // Cộng thêm 7 giờ để chuyển sang múi giờ Việt Nam
    return moment(dateTime).utcOffset(0).format("HH:mm DD/MM/YYYY");
  };

  const fetchBookingHistory = async () => {
    setLoading(true);
    try {
      const res = await placeBookingByUserAPI(appState?.user.id);
      setBookingHistory(res?.data || []); // Đặt giá trị mặc định nếu res.data là undefined
    } catch (error) {
      console.error("Failed to fetch booking history:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBookingHistory();
    }, [])
  );

  return (
    <ScrollView style={styles.scrollView}>
      {loading ? (
        <ActivityIndicator size="large" color={APP_COLOR.primary} />
      ) : bookingHistory.length === 0 ? (
        <View style={styles.noHistoryContainer}>
          <Text style={styles.noHistoryText}>No service history</Text>
        </View>
      ) : (
        bookingHistory.map((item, index) => (
          <View key={index} style={styles.bookingCard}>
            <View style={styles.rowContainer}>
              <Text style={styles.label}>Service:</Text>
              <Text style={styles.serviceName}>
                {item.services?.[0]?.name || "Không xác định"}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.label}>Time Set Calendar:</Text>
              <Text style={styles.bookingTime}>
                {formatDateTime(item.bookingTime)}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 15,
    backgroundColor: "#F0F0F0", // Nền của danh sách
  },
  bookingCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: APP_COLOR.primary,
  },
  serviceName: {
    fontSize: 16,
    color: APP_COLOR.textPrimary,
    fontWeight: "500",
  },
  bookingTime: {
    fontSize: 14,
    color: APP_COLOR.textSecondary,
  },
  noHistoryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  noHistoryText: {
    fontSize: 16,
    color: APP_COLOR.textSecondary,
  },
});

export default BookingHistory;
