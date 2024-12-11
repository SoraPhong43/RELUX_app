import React, { useEffect, useState } from "react";
import { Text, View, Button, SafeAreaView, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useCurrentApp } from "@/context/app.context";
import { NotificationPushAPI, SaveExpoPushTokenAPI } from "@/app/utils/API";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldShowAlert: true,
    shouldSetBadge: false,
  }),
});

const DisplayNotification = () => {
  const { appState } = useCurrentApp();
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState<INotification[]>([]);
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    // Yêu cầu quyền nhận thông báo và lấy Expo Push Token
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission for notifications not granted");
        return;
      }

      const token = await Notifications.getExpoPushTokenAsync({
        projectId: "edbf22f8-3887-4518-bec4-37d655dda1b6", // Đảm bảo bạn sử dụng đúng projectId từ app.json
      });

      console.log("Expo Push Token:", token.data);

      const data = {
        userId: appState?.user.userId, // userId lấy từ app context
        pushToken: token.data,
      };

      // Lưu token vào backend của bạn
      await SaveExpoPushTokenAPI(data);
    };

    requestNotificationPermission();

    // Lắng nghe các thông báo push đã nhận
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
        setMessage(
          notification.request.content.body || "Bạn có thông báo mới!"
        ); // Hiển thị thông báo trong state
      }
    );

    return () => {
      notificationListener.remove(); // Cleanup the listener when component unmounts
    };
  }, [appState]);

  useEffect(() => {
    // Polling: Gọi API mỗi 5 giây (có thể thay đổi tùy theo yêu cầu)
    const intervalId = setInterval(async () => {
      if (appState?.user.userId) {
        try {
          const res = await NotificationPushAPI(appState.user.userId);
          console.log("Notification response:", res.data);

          // Kiểm tra dữ liệu trả về từ backend và cập nhật message
          if (Array.isArray(res.data) && res.data.length > 0) {
            const booking = res.data[0];
            const serviceName = booking.serviceName;
            const bookingTime = new Date(booking.bookingTime);
            setNotification(res.data);
            const notificationMessage = `Bạn có lịch hẹn "${serviceName}" vào lúc ${bookingTime.toLocaleString()}`;
            setMessage(notificationMessage);
            console.log("Before scheduling notification");

            // Chỉ gửi thông báo nếu chưa gửi trước đó
            if (!hasNotified) {
              scheduleNotificationHandle(serviceName, bookingTime);
              setHasNotified(true);
              console.log("After scheduling notification");
            }
          } else {
            setMessage("Không có lịch hẹn nào trong 2 giờ tới.");
          }
        } catch (error) {
          console.error("Error fetching notification:", error);
          setMessage("Không thể lấy thông tin lịch hẹn.");
        }
      }
    }, 5000);

    // Cleanup: Dừng polling khi component unmounts
    return () => clearInterval(intervalId);
  }, [appState, hasNotified]);

  useEffect(() => {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }, []);
  const scheduleNotificationHandle = (
    serviceName: string,
    bookingTime: Date
  ) => {
    // Hàm này có thể gọi Expo Push Notification API
    // Gửi thông báo đến device khi lịch hẹn đã được lấy
    Notifications.scheduleNotificationAsync({
      content: {
        title: "You have an appointment",
        body: `Your booking for "${serviceName}" is coming up at ${bookingTime.toLocaleString()}`,
        data: { userName: "Phong" },
      },
      trigger: null,
    });
  };
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <View
    //     style={{
    //       alignContent: "center",
    //       justifyContent: "center",
    //       paddingTop: 50,
    //     }}
    //   >
    //     {/* <Button
    //       title="Schedule Notification"
    //       onPress={scheduleNotificationHandle}
    //     /> */}
    //   </View>
    // </SafeAreaView>
    <></>
  );
};

export default DisplayNotification;
