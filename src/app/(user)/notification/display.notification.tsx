import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Notifications from "expo-notifications";
import { APP_COLOR } from "@/app/utils/constant";

const NotificationList = () => {
  const [notifications, setNotifications] = useState<
    { message: string; time: Date }[]
  >([]);

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        await loadNotifications();
      } catch (error) {
        console.error("Error initializing notifications:", error);
      }
    };

    initializeNotifications();

    // Listener for received notifications
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        const newMessage = {
          message:
            notification.request.content.body || "You have a new notification!",
          time: new Date(),
        };
        saveNotification(newMessage);
      }
    );

    return () => {
      notificationListener.remove();
    };
  }, []);

  /**
   * Load notifications from AsyncStorage
   */
  const loadNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem("notifications");
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications);
        setNotifications(
          parsedNotifications.map((notif: any) => ({
            ...notif,
            time: new Date(notif.time),
          }))
        );
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  /**
   * Save a new notification to AsyncStorage
   */
  const saveNotification = async (newNotification: {
    message: string;
    time: Date;
  }) => {
    try {
      const updatedNotifications = [newNotification, ...notifications];
      setNotifications(updatedNotifications);
      await AsyncStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );
    } catch (error) {
      console.error("Error saving notification:", error);
    }
  };

  /**
   * Calculate time elapsed since the notification
   */
  const timeAgo = (time: Date) => {
    const diffInMs = new Date().getTime() - time.getTime();
    const diffInMin = Math.floor(diffInMs / 60000);

    if (diffInMin < 1) return "Just now";
    if (diffInMin < 60) return `${diffInMin} minutes ago`;
    const diffInHour = Math.floor(diffInMin / 60);
    if (diffInHour < 24) return `${diffInHour} hours ago`;
    const diffInDay = Math.floor(diffInHour / 24);
    return `${diffInDay} days ago`;
  };

  return (
    <View>
      <FlatList
        data={notifications}
        initialNumToRender={10}
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
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ fontWeight: "600" }}>
                        You have apointment
                      </Text>
                      <Entypo name="dot-single" size={24} color="black" />
                      <Text style={styles.time}>{timeAgo(item.time)}</Text>
                    </View>
                    <AntDesign name="ellipsis1" size={20} color="black" />
                  </View>
                  <Text style={styles.message}>{item.message}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: "row",
    // alignItems: "stretch",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
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
