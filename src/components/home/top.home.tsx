import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BannerHome from "./banner.home";
import { getCateServiceBookingAPI } from "@/app/utils/API";
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    marginVertical: 15,
  },
  itemContainer: {
    padding: 10,
    margin: 5,
    alignItems: "center",
  },
  itemImage: {
    height: 35,
    width: 35,
  },
  itemText: {
    textAlign: "center",
  },
});

const imageMap: Record<string, any> = {
  wellness: require("@/assets/category/category1.png"),
  Relaxation: require("@/assets/category/category1.png"),
  "Skin Care": require("@/assets/category/category1.png"),
  Beauty: require("@/assets/category/category1.png"),
  // "sauna": require("@/assets/icons/sauna.png"),
  // "face": require("@/assets/icons/face.png"),
  // "Reflexology": require("@/assets/icons/Reflexology.png"),
};

const TopListHome = () => {
  const { cate, setCate } = useCurrentApp();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await getCateServiceBookingAPI();
        if (Array.isArray(res.data)) {
          setCate(res.data);
        } else {
          console.warn("Menu data is not an array");
        }
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };

    fetchMenu();
  }, []);

  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;

  const baseImage = `${backend}/images/menu`;

  return (
    <View style={styles.container}>
      <BannerHome />

      <ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}
      >
        <FlatList
          horizontal
          contentContainerStyle={{ alignSelf: "flex-start" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={Array.isArray(cate) ? cate : []}
          renderItem={({
            item,
          }: {
            item: { id: number; name: string; typeService: string };
          }) => (
            <TouchableOpacity
              onPress={() =>
                router.navigate({
                  pathname: "/product/menu.product",
                  params: { categoryId: item.id },
                })
              }
              style={styles.itemContainer}
            >
              <Image
                source={require("../../assets/category/category1.png")}
                style={{ width: 35, height: 35 }} // Thay đổi kích thước theo nhu cầu
              />

              <Text style={styles.itemText}>
                {item.typeService || "No name"}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default TopListHome;
