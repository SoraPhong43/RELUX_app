import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useCurrentApp } from "@/context/app.context";
import { NotificationPushAPI, SaveExpoPushTokenAPI } from "@/app/utils/API";
import moment from "moment";

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

          if (Array.isArray(res.data) && res.data.length > 0) {
            res.data.forEach((booking) => {
              const { bookingId, serviceName, bookingTime } = booking;

              // Ensure we process each booking only once
              if (!notifiedBookings.has(bookingId)) {
                const utcTime = new Date(bookingTime); // Parse UTC time
                if (isNaN(utcTime.getTime())) {
                  console.warn("Invalid booking time:", bookingTime);
                  return;
                }

                console.log("New Booking Found:", bookingId);

                // Schedule notification
                scheduleNotificationHandle(serviceName, utcTime);

                // Update notifiedBookings to include the bookingId
                setNotifiedBookings((prev) => {
                  const updated = new Set(prev);
                  updated.add(bookingId);
                  return updated;
                });
              }
            });
          } else {
          }
        } catch (error) {
          console.error("Error fetching notifications:", error);
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
  const formatDateTime = (dateTime: any) => {
    return moment(dateTime).utcOffset(0).format("HH:mm DD/MM/YYYY");
  };

  const scheduleNotificationHandle = (
    serviceName: string,
    bookingTime: Date // Pass a Date object
  ) => {
    // Convert UTC to local time for display in notifications

    Notifications.scheduleNotificationAsync({
      content: {
        title: "You have an appointment",
        body: `Your booking for "${serviceName}" is coming up at ${formatDateTime(
          bookingTime
        )}`,
        data: { serviceName, bookingTime },
      },
      trigger: null, // Can add a custom trigger if necessary
    });
  };

  return null;
};

export default DisplayNotification;
