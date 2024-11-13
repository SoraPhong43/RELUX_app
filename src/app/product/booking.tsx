import HeaderHome from "@/components/home/header.home";
import { useCurrentApp } from "@/context/app.context";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { APP_COLOR } from "../utils/constant";
import { currencyFormatter } from "../utils/API";
import SelectSpa from "@/components/InfoBooking/select.spa";
import DropDownFacility from "@/components/InfoBooking/choose.time";

interface IBookingItem {
  title: string;
  option: string;
  price: number;
  quantity: number;
}
const Booking = () => {
  const { service, cart } = useCurrentApp();
  const [orderItems, setOrderItems] = useState<IBookingItem[]>([]);
  useEffect(() => {
    if (cart && service && service.id) {
      const result = [];
      for (const [menuItemId, currentItems] of Object.entries(
        cart[service.id].items
      )) {
        if (currentItems.extra) {
          for (const [key, value] of Object.entries(currentItems.extra)) {
            const option = currentItems.data.options?.find(
              (item) => `${item.title}-${item.description}` === key
            );
            const addPrice = option?.additionalPrice ?? 0;
            result.push({
              // image: currentItems.data.image,
              title: currentItems.data.name,
              option: key,
              price: currentItems.data.price + addPrice,
              quantity: value,
            });
          }
        } else {
          result.push({
            //image: currentItems.data.image,
            title: currentItems.data.name,
            option: "",
            price: currentItems.data.price,
            quantity: currentItems.quantity,
          });
        }
        setOrderItems(result);
      }
    }
  }, [service]);
  const handlePlaceBooking = () => {
    alert("me");
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          padding: 10,
        }}
      >
        <HeaderHome />
        <DropDownFacility />
        <SelectSpa />
      </View>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          {service?.name}
        </Text>
      </View>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {orderItems?.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                gap: 10,
                flexDirection: "row",
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
                paddingVertical: 10,
              }}
            >
              {/* <Image
                                style={{ height: 50, width: 50 }}
                                source={{ uri: `${getURLBaseBackend()}/images/menu-item/${item?.image}` }}
                            /> */}
              <View>
                <Text style={{ fontWeight: "600" }}>{item.quantity} x</Text>
              </View>
              <View style={{ gap: 10 }}>
                <Text>{item.title}</Text>
                <Text style={{ fontSize: 12, color: APP_COLOR.GRAY }}>
                  {item.option}
                </Text>
              </View>
            </View>
          );
        })}
        {orderItems?.length > 0 && (
          <View style={{ marginVertical: 15 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: APP_COLOR.GRAY }}>
                Tổng cộng ({cart?.[service!.id].quantity} dịch vụ)
              </Text>
              <Text>{currencyFormatter(cart?.[service!.id].sum)}</Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          gap: 20,
          marginBottom: 15,
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          {/* <Pressable
            style={{
              borderWidth: 1,
              borderColor: APP_COLOR.GRAY,
              flex: 1,
              padding: 7,
            }}
          >
            <Text
              style={{
                color: APP_COLOR.GRAY,
                textAlign: "center",
              }}
            >
              Ví PayPal
            </Text>
          </Pressable>
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: APP_COLOR.vang,
              flex: 1,
              padding: 7,
            }}
          >
            <Text
              style={{
                color: APP_COLOR.vang,
                textAlign: "center",
              }}
            >
              Tiền mặt
            </Text>
          </Pressable> */}
        </View>
        <View>
          <Pressable
            onPress={handlePlaceBooking}
            style={({ pressed }) => ({
              opacity: pressed === true ? 0.5 : 1,
              padding: 10,
              backgroundColor: APP_COLOR.vang,
              borderRadius: 3,
            })}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              Bước tiếp theo - {``}
              {currencyFormatter(cart?.[service!.id].sum)}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default Booking;
