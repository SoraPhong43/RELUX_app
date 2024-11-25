import { getAllLocations, getLocationSpa } from "@/app/utils/API";
import { APP_COLOR } from "@/app/utils/constant";
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { boolean } from "yup";

const data = [
  {
    key: 1,
    name: "vi tri",
    description: "vi tri cua spa",
  },
  {
    key: 2,
    name: "gido tinh sau=)))",
    description: "bla",
  },
];
const DisplayLocation = () => {
  const [location, setLocation] = useState<IAllLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await getLocationSpa();
      //  console.log("res", res);
      // console.log("res data", res.data);
      if (res.data && Array.isArray(res.data)) {
        setLocation(res.data);
        //console.log(res.data);
      } else {
        console.warn("Response does not contain 'data' as an array:", res);
        setLocation([]);
      }
      setLoading(false);
    };
    fetchLocations();
  }, []);

  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;

  const baseImage = `${backend}/images/location`;
  //console.log("Base Image URL:", baseImage);

  return (
    <View style={{ flex: 1, padding: 5 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 16,
          color: APP_COLOR.vang,
        }}
      >
        List of Locations
      </Text>
      <FlatList
        data={location}
        keyExtractor={(item) => item.locationID}
        contentContainerStyle={{ gap: 10 }}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                backgroundColor: "#ffffff",
                borderWidth: 1,
                borderColor: APP_COLOR.darkGray,
                borderRadius: 15,
                marginLeft: index === 0 ? 8 : 0,
                marginBottom: 5,
              }}
            >
              <Pressable
                onPress={() =>
                  router.navigate({
                    pathname: "/product/locationid",
                    params: { locationID: item.locationID },
                  })
                }
              >
                <Image
                  style={{
                    height: 120,
                    width: 230,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}
                  source={{ uri: `${baseImage}/${item.image}` }}
                />
                <View style={{ padding: 5 }}>
                  <Text style={{ fontWeight: 500, maxWidth: 200 }}>
                    {item.locationName}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      maxWidth: 220,
                      fontWeight: 400,
                      color: APP_COLOR.darkGray,
                      paddingTop: 5,
                      paddingLeft: 2,
                    }}
                  >
                    {item.Address}
                  </Text>
                </View>
              </Pressable>
              {/* <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <Text>{item.address}</Text> */}
            </View>
          );
        }}
      />
    </View>
    // <View>
    //   <Text>abc</Text>
    // </View>
  );
};
export default DisplayLocation;
