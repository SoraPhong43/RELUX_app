import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
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
  const [notifiedBookings, setNotifiedBookings] = useState(new Set()); // Tracks notified bookingIds

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission for notifications not granted");
          return;
        }

        const token = await Notifications.getExpoPushTokenAsync({
          projectId: "edbf22f8-3887-4518-bec4-37d655dda1b6", // Correct projectId
        });

        console.log("Expo Push Token:", token.data);

        const data = {
          userId: appState?.user.id,
          pushToken: token.data,
        };

        await SaveExpoPushTokenAPI(data);
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    };

    requestNotificationPermission();

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
        setMessage(
          notification.request.content.body || "Bạn có thông báo mới!"
        );
      }
    );

    return () => {
      notificationListener.remove();
    };
  }, [appState]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (appState?.user.id) {
        try {
          const res = await NotificationPushAPI(appState.user.id);
          // console.log("Response from backend:", res); // Logs the full response from backend

          if (Array.isArray(res.data) && res.data.length > 0) {
            res.data.forEach((booking) => {
              const { bookingId, serviceName, bookingTime } = booking;

              if (!notifiedBookings.has(bookingId)) {
                // Parse and convert bookingTime to local time
                const utcTime = new Date(bookingTime); // Assume `bookingTime` is in UTC
                console.log("Parsed UTC time:", utcTime);

                const localTime = new Intl.DateTimeFormat("en-US", {
                  timeZone: "Asia/Ho_Chi_Minh", // Convert to the correct local time zone
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true, // Display time in 12-hour format
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }).format(utcTime);

                console.log(
                  "Converted Local Time (Asia/Ho_Chi_Minh):",
                  localTime
                );

                const notificationMessage = `Bạn có lịch hẹn "${serviceName}" vào lúc ${localTime}`;
                console.log("Notification Message:", notificationMessage);

                setMessage(notificationMessage);

                scheduleNotificationHandle(serviceName, utcTime);

                setNotifiedBookings((prev) => {
                  const updated = new Set(prev);
                  updated.add(bookingId);
                  return updated;
                });
              }
            });
          } else {
            // console.log("No bookings found within the next 2 hours.");
            setMessage("Không có lịch hẹn nào trong 2 giờ tới.");
          }
        } catch (error) {
          console.error("Error fetching notification:", error);
          setMessage("Không thể lấy thông tin lịch hẹn.");
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [appState, notifiedBookings]);

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
    bookingTime: Date // Pass a Date object
  ) => {
    // Convert UTC to local time for display in notifications
    const localTime = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Ho_Chi_Minh", // Ensure we're using the correct time zone
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Display time in 12-hour format
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(bookingTime);

    Notifications.scheduleNotificationAsync({
      content: {
        title: "You have an appointment",
        body: `Your booking for "${serviceName}" is coming up at ${localTime}`,
        data: { serviceName, bookingTime },
      },
      trigger: null, // Can add a custom trigger if necessary
    });
  };

  return null;
};

export default DisplayNotification;
