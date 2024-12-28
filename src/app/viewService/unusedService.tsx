import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  currencyFormatter,
  getBookingHistoryAPI,
  placeBookingByUserAPI,
} from "../utils/API";
import moment from "moment";
import { APP_COLOR } from "../utils/constant";
import { useCurrentApp } from "@/context/app.context";

const UnusedServices = () => {
  const { appState } = useCurrentApp();
  const [bookingHistory, setBookingHistory] = useState<IBooking[]>([]);

  const formatDateTime = (dateTime: any) => {
    return moment(dateTime).format("HH:mm DD/MM/YYYY");
  };

  useEffect(() => {
    const fetchBookingHistory = async () => {
      const res = await placeBookingByUserAPI(appState?.user?.id);
      console.log("Booking History:", res);

      setBookingHistory(res.data);
    };
    fetchBookingHistory();
  }, []);

  // Lọc các mục có trạng thái `Pending`
  const unusedBookings = bookingHistory.filter(
    (item) => item.status === "Pending"
  );

  return (
    <ScrollView style={styles.scrollView}>
      {unusedBookings.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
            paddingHorizontal: 20,
          }}
        >
          <Image
            source={require("@/assets/booking/bookingHollow.png")} // Cập nhật đường dẫn tới ảnh bạn cung cấp
            style={{
              width: 150,
              height: 150,
              marginBottom: 20,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            There are no Orders to show!
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: APP_COLOR.vang,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Run for Fresh Fab Looks
          </Text>
          {/* Nút hành động */}
          <TouchableOpacity
            style={{
              backgroundColor: APP_COLOR.vang,
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 25,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Add now
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        unusedBookings.map((item, index) => (
          <View key={index} style={styles.bookingCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Dịch vụ: </Text>
              {/* <Text style={styles.serviceName}>{item.services.[0].name}</Text> */}
            </View>
            {/* <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Thời gian đặt lịch: </Text>
              <Text style={styles.bookingTime}>
                {formatDateTime(item.bookingTime)}
              </Text>
            </View> */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Số tiền phải trả: </Text>
              {/* <Text style={styles.totalAmount}>
                {currencyFormatter(Number(item.totalAmount))}
              </Text> */}
            </View>
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
    color: "orange",
  },
});

export default UnusedServices;
