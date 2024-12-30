import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { APP_COLOR } from "@/app/utils/constant";
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import CloudWithSun from "../card/weather";
import APIWeather from "../card/api.wrather";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingVertical: 5, // Đây là khoảng cách bên trong
    paddingHorizontal: 5, // Đây cũng có thể gây khoảng cách không mong muốn
  },
  userName: {
    flexDirection: "column",
  },
  greeting: {
    color: APP_COLOR.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
    color: "#333",
  },
  clock: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
});

const HeaderHome = () => {
  const { theme, appState } = useCurrentApp();
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    // Thiết lập interval để cập nhật thời gian mỗi giây
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
  }, []);
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <View style={styles.userName}>
          <Text style={styles.greeting}>Happy new days,</Text>
          <Text style={styles.name}>
            {appState?.user?.fullName || "Tên không có sẵn"}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <CloudWithSun />
          {/* <APIWeather /> */}
          <Text style={styles.clock}>{formatTime(currentTime)}</Text>
        </View>
      </View>
      {/* <View style={styles.location}>
        <Entypo name="location-pin" size={20} color={APP_COLOR.primary} />
        <Text>669 Hoàn Kiếm, Hà Nội</Text> */}
    </View>
  );
};
export default HeaderHome;
