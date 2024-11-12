import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useCurrentApp } from "@/context/app.context";
import { useEffect, useState } from "react";
import { APP_COLOR } from "../utils/constant";
import { currencyFormatter } from "../utils/API";

interface IUpdatedItem {
  //image: string;
  title: string;
  option: string;
  price: number;
  quantity: number;
}
const UpdateModalPage = () => {
  const { service, cart, setCart } = useCurrentApp();
  const { menuItemId } = useLocalSearchParams();

  const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);
  const [updatedItems, setUpdatedItems] = useState<IUpdatedItem[]>([]);

  useEffect(() => {
    if (service && menuItemId) {
      for (let i = 0; i < service.menu.length; i++) {
        const menu = service.menu[i];

        let check = false;
        for (let j = 0; j < menu.menuItems.length; j++) {
          if (menu.menuItems[j].id === menuItemId) {
            check = true;
            setMenuItem(menu.menuItems[j]);
            break;
          }
        }
        if (check) break;
      }
    }
  }, [service, menuItemId]);

  useEffect(() => {
    if (menuItem && service) {
      const currentItems = cart[service.id].items[menuItem.id];
      if (currentItems.extra) {
        const result = [];
        for (const [key, value] of Object.entries(currentItems.extra)) {
          const option = menuItem.options?.find(
            (item) => `${item.title}-${item.description}` === key
          );

          const addPrice = option?.additionalPrice ?? 0;

          result.push({
            //image: menuItem.image,
            title: menuItem.name,
            option: key,
            price: menuItem.price + addPrice,
            quantity: value,
          });
        }
        setUpdatedItems(result);
      }
    }
  }, [menuItem]);

  const handlePressItem = (item: IUpdatedItem, action: "MINUS" | "PLUS") => {
    let foundItem = updatedItems.find((x) => x.option === item.option);
    const foundIndex = updatedItems.findIndex((x) => x.option === item.option);
    let shouldCloseModal = false;

    if (foundItem) {
      const total = action === "MINUS" ? -1 : 1;
      foundItem.quantity = foundItem.quantity + total;

      if (foundItem.quantity === 0) {
        const temp = updatedItems.filter((x) => x.option !== item.option);
        setUpdatedItems(temp);
        if (temp.length === 0) shouldCloseModal = true;
      } else {
        const temp = [...updatedItems];
        temp[foundIndex] = foundItem;
        setUpdatedItems(temp);
      }

      //update cart
      updateCart(total, foundItem.option, foundItem.price);
      if (shouldCloseModal) router.back();
    }
  };

  const updateCart = (total: number, keyOption: string, price: number) => {
    if (service?.id && menuItem) {
      const item = menuItem;

      //xử lý sản phẩm
      cart[service.id].sum = cart[service.id].sum + total * price;
      cart[service.id].quantity = cart[service.id].quantity + total;

      const currentQuantity = cart[service.id].items[item.id].quantity + total;

      const i = cart[service.id].items[item.id];
      let currentExtraQuantity = 0;
      if (i.extra && i.extra?.[keyOption] !== null)
        currentExtraQuantity = i.extra[keyOption] + total;

      cart[service.id].items[item.id] = {
        data: menuItem,
        quantity: currentQuantity,
        extra: {
          ...cart[service.id].items[item.id].extra,
          [keyOption]: currentExtraQuantity,
        },
      };

      if (currentExtraQuantity <= 0) {
        delete cart[service.id].items[item.id].extra?.[keyOption];
      }

      //chỉ xóa giỏ hàng khi số lượng sản phẩm options = 1
      if (currentQuantity <= 0 && updatedItems.length === 1) {
        delete cart[service.id].items[item.id];
      }

      setCart((prevState: any) => ({ ...prevState, ...cart }));
    }
  };
  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "#00000040",
      }}
    >
      <Pressable
        onPress={() => router.back()}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View
        entering={SlideInDown}
        style={{
          height: "60%",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            flexDirection: "row",
            gap: 10,
            padding: 10,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Chỉnh sửa số lượng
            </Text>
          </View>
          <AntDesign
            onPress={() => router.back()}
            name="close"
            size={24}
            color="grey"
          />
        </View>

        <ScrollView
          style={{
            flex: 1,
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
          }}
        >
          {updatedItems.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: "white",
                  gap: 15,
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderBottomColor: "#eee",
                  borderBottomWidth: 1,
                }}
              >
                <View>
                  {/* <Image
                                      style={{ height: 80, width: 80 }}
                                      source={{ uri: `${getURLBaseBackend()}/images/menu-item/${item?.image}` }} /> */}
                </View>
                <View style={{ flex: 1, gap: 10 }}>
                  <View>
                    <Text>{item?.title}</Text>
                  </View>
                  <View>
                    <Text>{item?.option}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ color: APP_COLOR.vang }}>
                      {currencyFormatter(item?.price)}
                    </Text>
                    <View
                      style={{
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 3,
                      }}
                    >
                      <Pressable
                        style={({ pressed }) => ({
                          opacity: pressed === true ? 0.5 : 1,
                          alignSelf: "flex-start", //fit-content
                        })}
                        onPress={() => handlePressItem(item, "MINUS")}
                      >
                        <AntDesign
                          name="minussquareo"
                          size={24}
                          color={APP_COLOR.vang}
                        />
                      </Pressable>
                      <Text
                        style={{
                          minWidth: 25,
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </Text>

                      <Pressable
                        style={({ pressed }) => ({
                          opacity: pressed === true ? 0.5 : 1,
                          alignSelf: "flex-start", //fit-content
                        })}
                        onPress={() => handlePressItem(item, "PLUS")}
                      >
                        {item.quantity >= 1 ? (
                          <></>
                        ) : (
                          <AntDesign
                            name="plussquare"
                            size={24}
                            color={APP_COLOR.vang}
                          />
                        )}
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
};

export default UpdateModalPage;
