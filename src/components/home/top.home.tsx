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
import { useEffect, useState } from "react";
import { DisplayMenuAPI } from "@/app/utils/API";
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";

const styles = StyleSheet.create({});

const data = [
  {
    key: 1,
    name: "Spa & Massage",
    source: require("@/assets/icons/spa&massage.png"),
  },
  { key: 2, name: "Sauna", source: require("@/assets/icons/sauna.png") },
  { key: 3, name: "Face", source: require("@/assets/icons/face.png") },
  {
    key: 4,
    name: "Reflexology",
    source: require("@/assets/icons/Reflexology.png"),
  },
];

const data1 = Array(10).fill(1);

const TopListHome = () => {
  const { menu, setMenu } = useCurrentApp();

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await DisplayMenuAPI();
      if (res.data) {
        setMenu(res.data);
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
    <View>
      <BannerHome />
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}
        style={{ marginVertical: 15 }}
      >
        <FlatList
          contentContainerStyle={{ alignSelf: "flex-start" }}
          numColumns={Math.ceil(data.length)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  padding: 10,
                  margin: 5,
                  alignItems: "center",
                }}
              >
                <Image source={item.source} style={{ height: 35, width: 35 }} />
                <Text style={{ textAlign: "center" }}>{item.name}</Text>
              </View>
            );
          }}
        />
      </ScrollView> */}

      <ScrollView
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}
        style={{ marginVertical: 15 }}
      >
        {/* Ensure that `menu` is an array */}
        <FlatList
          horizontal={true}
          contentContainerStyle={{ alignSelf: "flex-start" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={Array.isArray(menu) ? menu : []} // Ensure menu is an array
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.navigate({
                  pathname: "/product/menu.product",
                  params: { menuId: item.id, menuName: item.name },
                })
              }
              // Handle press event
              style={{
                padding: 10,
                margin: 5,
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: `${baseImage}/${item.image}` }} // API-based image URL
                style={{
                  height: 35,
                  width: 35,
                }}
              />
              <Text style={{ textAlign: "center" }}>
                {item.name || "No name"}
              </Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default TopListHome;
