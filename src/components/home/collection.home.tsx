import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import demo from "@/assets/spaHome1.jpg";
import { APP_COLOR } from "@/app/utils/constant";
import { useEffect, useState } from "react";
import { currencyFormatter, getTopService } from "@/app/utils/API";
import { router } from "expo-router";
import ContentLoader, { Rect } from "react-content-loader/native";
const { height: sHeight, width: sWidth } = Dimensions.get("window");

interface IProps {
  name: string;
  description: string;
  refAPI: string;
}

const styes = StyleSheet.create({
  container: {
    paddingLeft: 5,
    borderColor: "green",
  },
});
const CollectionHome = (props: IProps) => {
  const { name, description, refAPI } = props;

  const [service, setService] = useState<ITopService[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getTopService(refAPI);
      if (res.data) {
        setService(res.data);
      } else {
        //error
      }
      setLoading(false);
    };

    fetchData();
  }, [refAPI]);

  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;

  const baseImage = `${backend}/images/service`;
  console.log("Base Image URL:", baseImage);
  return (
    <>
      <View style={{ height: 10, backgroundColor: "#e9e9e9" }}></View>
      {loading === false ? (
        <View style={styes.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 5,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: APP_COLOR.vang,
              }}
            >
              {name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#5a5a5a", paddingRight: 5, fontSize: 15 }}>
                See all
              </Text>
              <AntDesign
                name="rightcircleo"
                size={16}
                color="black"
                style={{ paddingRight: 5 }}
              />
            </View>
          </View>
          <View style={{ marginVertical: 4 }}>
            <Text style={{ color: "#5a5a5a", paddingLeft: 5 }}>
              {description}
            </Text>
          </View>
          <FlatList
            data={service}
            horizontal
            contentContainerStyle={{ gap: 10 }}
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
                        pathname: "/product/[id]",
                        params: { id: item.id },
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
                        {item.name}
                      </Text>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                          maxWidth: 220,
                          fontWeight: 400,
                          color: APP_COLOR.darkGray,
                          paddingTop: 5,
                          paddingLeft: 2,
                        }}
                      >
                        {item.description}
                      </Text>
                    </View>
                  </Pressable>
                  {/* <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: APP_COLOR.vang,
                        fontWeight: 600,
                        paddingLeft: 5,
                      }}
                    >
                      {currencyFormatter(item.price)}
                    </Text>
                    <FontAwesome name="cart-plus" size={24} color="#C3A74E" />
                  </View> */}
                </View>
              );
            }}
          />
        </View>
      ) : (
        <ContentLoader
          speed={2}
          width={sWidth}
          height={230}
          // viewBox="0 0 700 150"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ width: "100%" }}
        >
          <Rect x="10" y="10" rx="5" ry="5" width={150} height="200" />
          <Rect x="170" y="10" rx="5" ry="5" width={150} height="200" />
          <Rect x="330" y="10" rx="5" ry="5" width={150} height="200" />
        </ContentLoader>
      )}
    </>
  );
};

export default CollectionHome;
