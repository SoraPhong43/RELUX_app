import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCurrentApp } from "@/context/app.context";
import { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import ItemSingle from "@/components/service/booking/item.single";
import { APP_COLOR } from "../../utils/constant";
import { currencyFormatter } from "../../utils/API";

const CreateModalPage = () => {
  const { service, cart, setCart } = useCurrentApp();
  const { menuItemId } = useLocalSearchParams();

  const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

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

  const handlePressItem = (item: IMenuItem, action: "MINUS" | "PLUS") => {
    if (action === "MINUS" && quantity === 1) return;
    const total = action === "MINUS" ? -1 : 1;
    setQuantity((prevQuantity: number) => prevQuantity + total);
  };

  const handleAddCart = () => {
    if (service?.id && menuItem) {
      const total = quantity;
      const item = menuItem;

      const option = menuItem.options[selectedIndex];
      // console.log("cc:", option);
      const keyOption = `${option.title}-${option.description}`;

      if (!cart[service?.id]) {
        //chưa tồn tại cửa hàng => khởi tạo cửa hàng
        cart[service.id] = {
          sum: 0,
          quantity: 0,
          items: {},
        };
      }
      console.log();
      //xử lý sản phẩm
      cart[service.id].sum =
        cart[service.id].sum + total * (item.price + option.additionalPrice);
      cart[service.id].quantity = cart[service.id].quantity + total;

      //check sản phẩm đã từng thêm vào chưa
      if (!cart[service.id].items[item.id]) {
        cart[service.id].items[item.id] = {
          data: menuItem,
          quantity: 0,
          extra: {
            [keyOption]: 0,
          },
        };
      }

      //check options đã từng thêm vào chưa
      if (cart[service.id].items[item.id]) {
        const extra = cart[service.id].items[item.id].extra;
        if (extra && !extra[keyOption]) {
          cart[service.id].items[item.id] = {
            ...cart[service.id].items[item.id],
            extra: {
              ...cart[service.id].items[item.id].extra,
              [keyOption]: 0,
            },
          };
        }
      }

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

      if (currentQuantity <= 0) {
        delete cart[service.id].items[item.id];
      }

      setCart((prevState: any) => ({ ...prevState, ...cart })); //merge state

      router.back();
    }
  };
  console.log("menuItem.option:", menuItem?.options);
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
          height: "80%",
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
              Thêm món mới
            </Text>
          </View>
          <AntDesign
            onPress={() => router.back()}
            name="close"
            size={24}
            color="grey"
          />
        </View>

        <View
          style={{
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
          }}
        >
          {menuItem && (
            <ItemSingle
              menuItem={menuItem}
              showMinus={true}
              quantity={quantity}
              handlePressItem={handlePressItem}
            />
          )}
        </View>

        <View
          style={{
            backgroundColor: "#eee",
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
        >
          <Text>Lựa chọn (chọn 1)</Text>
        </View>

        <ScrollView
          style={{
            flex: 1,
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
          }}
        >
          {menuItem?.options?.map((item, index) => {
            return (
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                  flexDirection: "row",
                }}
                key={index}
              >
                <View style={{ gap: 5, flex: 1 }}>
                  {/* <Text>
                    {item.title} - {item.description}{" "}
                  </Text>
                  <Text style={{ color: APP_COLOR.primary }}>
                    {currencyFormatter(item.additionalPrice)}
                  </Text> */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text>{item.title}</Text>
                    <View>
                      <Text style={{ color: APP_COLOR.primary }}>
                        {currencyFormatter(item.additionalPrice)}
                      </Text>
                    </View>
                  </View>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{ width: 250, color: APP_COLOR.GRAY }}
                  >
                    {item.description}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 10,
                  }}
                >
                  <Pressable
                    onPress={() => setSelectedIndex(index)}
                    style={({ pressed }) => ({
                      opacity: pressed === true ? 0.5 : 1,
                      alignSelf: "flex-start",
                      padding: 2,
                      borderRadius: 2,
                      backgroundColor:
                        index === selectedIndex ? APP_COLOR.primary : "white",
                      borderColor:
                        index === selectedIndex ? APP_COLOR.primary : "grey",
                      borderWidth: 1,
                    })}
                  >
                    <Feather name="check" size={15} color="white" />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View
          style={{
            marginBottom: 20,
            marginTop: 10,
            marginHorizontal: 10,
            justifyContent: "flex-end",
          }}
        >
          <Pressable
            onPress={handleAddCart}
            style={({ pressed }) => ({
              opacity: pressed === true ? 0.5 : 1,
              padding: 10,
              backgroundColor: APP_COLOR.primary,
              borderRadius: 3,
            })}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Thêm vào giỏ hàng
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default CreateModalPage;
