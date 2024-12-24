import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { currencyFormatter, getBookingHistoryAPI, placeBookingByUserAPI } from "../utils/API";
import moment from "moment";
import { APP_COLOR } from "../utils/constant";
import { useCurrentApp } from "@/context/app.context";
import { useFocusEffect } from "@react-navigation/native";

const BookingHistory = () => {
  const {
    appState,
  } = useCurrentApp();
  const [bookingHistory, setBookingHistory] = useState<IBooking[]>([]);

  const formatDateTime = (dateTime: any) => {
    return moment(dateTime).format("HH:mm DD/MM/YYYY");
  };


  const fetchBookingHistory = async () => {
    const res = await placeBookingByUserAPI(appState?.user?.id);
    console.log("Booking History:", res);

    setBookingHistory(res.data);
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchBookingHistory();
    }, [])
  );
  return (
    <ScrollView style={styles.scrollView}>
      {bookingHistory.length === 0 ? (
        <View>
          <Text>Không có lịch sử dịch vụ</Text>
        </View>
      ) : (
        bookingHistory.map((item, index) => (
          <View key={index} style={styles.bookingCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Dịch vụ: </Text>
              <Text style={styles.serviceName}>{item.services?.[0]?.name}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Thời gian đặt lịch: </Text>
              <Text style={styles.bookingTime}>
                {formatDateTime(item.bookingTime)}
              </Text>
            </View>
            {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Số tiền phải trả: </Text>
              <Text style={styles.totalAmount}>
                {currencyFormatter(Number(item.totalAmount))}
              </Text>
            </View> */}
            {/* <Text style={styles.status}>Tình trạng: {item.status}</Text> */}
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
