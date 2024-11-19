import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { currencyFormatter, getBookingHistoryAPI } from "../utils/API";
import moment from "moment";
import { APP_COLOR } from "../utils/constant";

const BookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState<IBooking[]>([]);

  const formatDateTime = (dateTime: any) => {
    return moment(dateTime).format("HH:mm DD/MM/YYYY");
  };

  useEffect(() => {
    const fetchBookingHistory = async () => {
      const res = await getBookingHistoryAPI();
      if (res && Array.isArray(res)) {
        setBookingHistory(res);
      } else if (res && res.data && Array.isArray(res.data)) {
        setBookingHistory(res.data);
      }
    };
    fetchBookingHistory();
  }, []);

  // Lọc các mục có trạng thái `Confirmed`, `Completed`, hoặc `Cancelled`
  const completedBookings = bookingHistory.filter(
    (item) =>
      item.status === "Confirmed" ||
      item.status === "Completed" ||
      item.status === "Cancelled"
  );

  return (
    <ScrollView style={styles.scrollView}>
      {completedBookings.length === 0 ? (
        <View>
          <Text>Không có lịch sử dịch vụ</Text>
        </View>
      ) : (
        completedBookings.map((item, index) => (
          <View key={index} style={styles.bookingCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Dịch vụ: </Text>
              <Text style={styles.serviceName}>{item.serviceName}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Thời gian đặt lịch: </Text>
              <Text style={styles.bookingTime}>
                {formatDateTime(item.bookingTime)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Số tiền phải trả: </Text>
              <Text style={styles.totalAmount}>
                {currencyFormatter(Number(item.totalAmount))}
              </Text>
            </View>
            <Text style={styles.status}>Tình trạng: {item.status}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 15,
    paddingTop: 10,
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
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
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
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: APP_COLOR.vang,
    marginVertical: 5,
  },
  status: {
    fontSize: 14,
    color: "green",
  },
});

export default BookingHistory;
