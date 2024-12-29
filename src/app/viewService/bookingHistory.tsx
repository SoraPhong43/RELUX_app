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
    return moment(dateTime).utcOffset(7).format("HH:mm DD/MM/YYYY");
  };

  const fetchBookingHistory = async () => {
    setLoading(true);
    try {
      const res = await placeBookingByUserAPI(appState?.user.id);
      console.log("Booking History:", res);
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
          <Text style={styles.noHistoryText}>Không có lịch sử dịch vụ</Text>
        </View>
      ) : (
        bookingHistory.map((item, index) => (
          <View key={index} style={styles.bookingCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Dịch vụ: </Text>
              <Text style={styles.serviceName}>
                {item.services?.[0]?.name || "Không xác định"}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Thời gian đặt lịch: </Text>
              <Text style={styles.bookingTime}>{item.bookingTime}</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 15,
    padding: 10,
  },
  bookingCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  serviceName: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  bookingTime: {
    fontSize: 14,
    color: "#777",
  },
  noHistoryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noHistoryText: {
    fontSize: 16,
    color: "#888",
  },
});

export default BookingHistory;
