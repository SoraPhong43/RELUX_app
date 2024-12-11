import React, { useEffect, useState } from "react";
import { Text, View, FlatList, SafeAreaView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "@expo/vector-icons/Entypo";
import { APP_COLOR } from "@/app/utils/constant";
import AntDesign from "@expo/vector-icons/AntDesign";
const NotificationList = () => {
  const [notifications, setNotifications] = useState<
    { message: string; time: Date }[]
  >([]);

  /**
   * Hàm tải thông báo từ AsyncStorage
   */
  const loadNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem("notifications");
      console.log("Raw notifications from AsyncStorage:", storedNotifications);

      if (storedNotifications) {
        let parsedNotifications = [];
        try {
          parsedNotifications = JSON.parse(storedNotifications);

          // Đảm bảo dữ liệu hợp lệ
          if (!Array.isArray(parsedNotifications)) {
            console.error("Parsed notifications is not an array, resetting.");
            parsedNotifications = [];
          }
        } catch (error) {
          console.error("Error parsing notifications:", error);
          parsedNotifications = [];
        }

        console.log("Parsed notifications:", parsedNotifications);
        setNotifications(parsedNotifications);
      } else {
        console.log("No notifications found, initializing empty state.");
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  /**
   * Hàm tính toán thời gian đã trôi qua
   */
  const timeAgo = (time: Date) => {
    const diffInMs = new Date().getTime() - time.getTime();
    const diffInMin = Math.floor(diffInMs / 60000); // Tính bằng phút

    if (diffInMin < 1) return "Vừa xong";
    if (diffInMin < 60) return `${diffInMin} phút trước`;
    const diffInHour = Math.floor(diffInMin / 60);
    if (diffInHour < 24) return `${diffInHour} giờ trước`;
    const diffInDay = Math.floor(diffInHour / 24);
    return `${diffInDay} ngày trước`;
  };

  /**
   * Tải thông báo khi khởi động
   */
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        await loadNotifications();
      } catch (error) {
        console.error("Error initializing notifications:", error);
      }
    };

    initializeNotifications();
  }, []);

  return (
    <View>
      <FlatList
        data={notifications}
        initialNumToRender={10} // Hiển thị 10 thông báo đầu tiên
        renderItem={({ item }) => (
          <View style={styles.notificationContainer}>
            <Entypo
              name="bookmark"
              size={30}
              color={APP_COLOR.vang}
              style={styles.icon}
            />
            <View style={styles.textContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontWeight: 600 }}>You have apointment</Text>
                  <Entypo name="dot-single" size={20} color="black" />
                  <Text style={styles.time}>
                    {timeAgo(
                      typeof item.time === "string"
                        ? new Date(item.time)
                        : item.time
                    )}
                  </Text>
                </View>
                <AntDesign name="ellipsis1" size={30} color="black" />
              </View>
              <Text style={styles.message}>{item.message}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có thông báo</Text>
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    padding: 5,
  },
  icon: {
    // width: 40,
    // height: 40,
    paddingTop: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    width: 330,
  },
  message: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: "gray",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});
export default NotificationList;
