import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { APP_COLOR } from "../utils/constant";
import unusedBookings from "../viewService/unusedService";
import BookingHistory from "../viewService/bookingHistory";

// Import các file chứa nội dung từng tab

const MakeAnAppointment = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [routes] = useState([
    { key: "unused", title: "Tình trạng" },
    { key: "history", title: "History" },
  ]);

  const renderScene = SceneMap({
    unused: unusedBookings, // Component cho tab Chưa Sử Dụng
    history: BookingHistory, // Component cho tab Lịch Sử
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index: currentIndex, routes }}
        renderScene={renderScene}
        onIndexChange={setCurrentIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: APP_COLOR.vang }}
            style={styles.tabBar}
            labelStyle={{ fontWeight: "bold" }}
            activeColor={APP_COLOR.vang} // Màu chữ cho tab đang chọn
            inactiveColor="gray" // Màu chữ cho tab không được chọn
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
  },
});

export default MakeAnAppointment;