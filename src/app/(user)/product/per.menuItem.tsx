import {
  currencyFormatter,
  DisplayPerMenuItemAPI,
  getURLBaseBackend,
} from "@/app/utils/API";
import { formatDuration } from "@/app/utils/format.duration";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { APP_COLOR } from "@/app/utils/constant";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCurrentApp } from "@/context/app.context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PerMenuItem = () => {
  const { id } = useLocalSearchParams();
  const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quality, setQuality] = useState<number>(0);
  const { cart, setCart } = useCurrentApp();
  useEffect(() => {
    const fetchPerMenuItem = async () => {
      setLoading(true);
      try {
        const res = await DisplayPerMenuItemAPI(id as string);
        if (res.data) {
          setMenuItem(res.data);
          // Kiểm tra xem dịch vụ có trong giỏ hàng không, nếu có, đồng bộ số lượng
          if (cart[res.data.id]) {
            setQuality(cart[res.data.id].quantity); // Cập nhật số lượng giỏ hàng
          }
        } else {
          console.error("Error loading menu item");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      setLoading(false);
    };
    fetchPerMenuItem();
  }, [id, cart]); // Đảm bảo khi cart thay đổi sẽ cập nhật lại số lượng
  const saveCartToStorage = async (newCart: Record<string, any>) => {
    try {
      // Kiểm tra và lưu giỏ hàng vào AsyncStorage
      if (newCart) {
        await AsyncStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        console.error("Giỏ hàng không hợp lệ: ", newCart);
      }
    } catch (error) {
      console.error("Error saving cart to AsyncStorage:", error);
    }
  };

  const handleQualityChange = (action: "PLUS" | "MINS") => {
    setQuality((prevQuality) => {
      let newQuality = prevQuality;

      // Cập nhật số lượng dựa vào hành động
      if (action === "PLUS") {
        newQuality = prevQuality + 1;
      } else if (action === "MINS" && prevQuality > 0) {
        newQuality = prevQuality - 1;
      }

      if (menuItem) {
        const newCart: Record<string, any> = { ...cart };

        // Nếu món này chưa có trong giỏ hàng, khởi tạo
        if (!newCart[menuItem.id]) {
          newCart[menuItem.id] = {
            sum: 0,
            quantity: 0,
            items: {},
          };
        }

        // Cập nhật số lượng và tính lại tổng giá trị cho món này
        newCart[menuItem.id].quantity = newQuality;
        newCart[menuItem.id].sum =
          newCart[menuItem.id].quantity * menuItem.price;

        // Cập nhật lại giỏ hàng trong context
        setCart(newCart);

        // Lưu giỏ hàng vào AsyncStorage
        saveCartToStorage(newCart);
      }

      return newQuality;
    });
  };

  const getSum = () => {
    let totalSum = 0;

    // Tính tổng giá trị của các món trong giỏ hàng
    for (const key in cart) {
      if (cart[key]) {
        totalSum += cart[key].sum; // Cộng tổng giá trị của món
      }
    }

    return totalSum;
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {menuItem && (
          <>
            {/* Make sure to concatenate the full image URL */}
            <Image
              style={{ height: 280, width: "100%" }}
              source={{
                uri: `${getURLBaseBackend()}/images/menuItem/${menuItem.image}`, // Dynamically append image path
              }}
            />
            <Text style={{ fontSize: 20, fontWeight: 600, padding: 10 }}>
              {menuItem.name}
            </Text>
            <Text style={{ fontSize: 15, padding: 5, fontWeight: 500 }}>
              Description:
            </Text>
            <Text> {menuItem.description}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15, padding: 5, fontWeight: 500 }}>
                Price:
              </Text>
              <Text>{currencyFormatter(menuItem.price)}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15, padding: 5, fontWeight: 500 }}>
                Duration:
              </Text>
              <Text>{formatDuration(menuItem.duration)}</Text>
            </View>

            {/* Quantity controls */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {quality === 0 ? null : ( // Ẩn nút trừ khi quality = 0
                <Pressable
                  onPress={() => handleQualityChange("MINS")}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                    marginRight: 10,
                  })}
                >
                  <AntDesign
                    name="minussquare"
                    size={24}
                    color={APP_COLOR.vang}
                  />
                </Pressable>
              )}

              {/* Giữ vị trí của số lượng cố định */}
              <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>
                {quality}
              </Text>

              {quality === 1 ? null : ( // Ẩn nút cộng khi quality = 1
                <Pressable
                  onPress={() => handleQualityChange("PLUS")}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                    marginLeft: 10,
                  })}
                >
                  <AntDesign
                    name="plussquare"
                    size={24}
                    color={APP_COLOR.vang}
                  />
                </Pressable>
              )}
            </View>
          </>
        )}
      </ScrollView>
      {getSum() === 0 ? (
        <></>
      ) : (
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            zIndex: 11,
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
              borderTopWidth: 1,
              borderTopColor: APP_COLOR.GRAY,
            }}
          >
            <View style={{ paddingVertical: 10, paddingHorizontal: 30 }}>
              <View
                style={{
                  position: "absolute",
                  left: 60,
                  top: 4,
                  width: 16,
                  height: 16,
                  borderRadius: 16 / 2,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: APP_COLOR.vang,
                }}
              >
                <Text style={{ color: "white", fontSize: 9 }}>
                  {menuItem &&
                    cart &&
                    cart[menuItem?.id] &&
                    cart[menuItem?.id]["quantity"] && (
                      <Text>{cart[menuItem?.id]["quantity"]}</Text>
                    )}
                </Text>
              </View>
              <Pressable onPress={() => alert("cart")}>
                <FontAwesome name="book" size={24} color="black" />
              </Pressable>
            </View>
            <View style={{ paddingRight: 10 }}>
              <Text
                style={{
                  color: APP_COLOR.vang,
                  fontSize: 18,
                }}
              >
                {currencyFormatter(getSum())}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: 110,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: APP_COLOR.vang,
            }}
          >
            <Text
            //   style={{ color: "white", textAlign: "center" }}
            //   onPress={() => router.navigate("/product/booking")}
            >
              Make an apoinment now
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default PerMenuItem;
