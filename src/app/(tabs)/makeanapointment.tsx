import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { APP_COLOR } from "../utils/constant";
import unusedBookings from "../viewService/unusedService";
import BookingHistory from "../viewService/bookingHistory";

// Import các file chứa nội dung từng tab

const MakeAnAppointment = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refreshing, setRefresing] = React.useState(false);
  const [routes] = useState([
    { key: "history", title: "History" },
    { key: "unused", title: "Tình trạng" },
  ]);

  const renderScene = SceneMap({
    history: BookingHistory, // Component cho tab Lịch Sử
    unused: unusedBookings, // Component cho tab Chưa Sử Dụng
  });

  const onRefresh = React.useCallback(() => {
    setRefresing(true);
    setTimeout(() => {
      setRefresing(false);
    }, 2000);
  }, []);
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
            activeColor={APP_COLOR.vang}
            inactiveColor="gray"
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
