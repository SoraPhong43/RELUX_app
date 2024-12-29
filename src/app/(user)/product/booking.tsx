import HeaderHome from "@/components/home/header.home";
import { useCurrentApp } from "@/context/app.context";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import SelectSpa from "@/components/InfoBooking/select.spa";
import DropDownFacility from "@/components/InfoBooking/choose.time";
import { router, useNavigation } from "expo-router";
import moment, { duration } from "moment";
import { APP_COLOR } from "@/app/utils/constant";
import { currencyFormatter } from "@/app/utils/API";
import { formatDuration } from "@/app/utils/format.duration";

const Booking = () => {
  const {
    service,
    cart,
    selectedDate,
    selectedTime,
    selectedEmployee,
    selectedLocation,
  } = useCurrentApp();
  const [orderItems, setOrderItems] = useState<IBookingItem[]>([]);

  const [note, setNote] = useState("");
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    if (cart && service && service.id && cart[service.id]) {
      const result = [];
      let totalDurationTemp = 0;

      // Loop through cart items and calculate the total duration
      for (const [menuItemId, currentItems] of Object.entries(
        cart[service.id].items || {}
      )) {
        if (currentItems.extra) {
          for (const [key, value] of Object.entries(currentItems.extra)) {
            const option = currentItems.data.options?.find(
              (item) => `${item.title}-${item.description}` === key
            );
            const addPrice = option?.additionalPrice ?? 0;
            result.push({
              title: currentItems.data.name,
              option: key,
              price: currentItems.data.price + addPrice,
              quantity: value,
              duration: currentItems.data.duration,
            });

            // Sum the durations
            totalDurationTemp += currentItems.data.duration * value;
          }
        } else {
          result.push({
            title: currentItems.data.name,
            option: "",
            price: currentItems.data.price,
            quantity: currentItems.quantity,
            duration: currentItems.data.duration,
          });

          // Sum the durations
          totalDurationTemp +=
            currentItems.data.duration * currentItems.quantity;
        }
      }

      setOrderItems(result);
      setTotalDuration(totalDurationTemp);
    }
  }, [cart, service]);

  const isTimeSelected = (selectedTime: string | null): boolean => {
    if (!selectedTime) {
      Alert.alert("Chọn Thời Gian", "Vui lòng chọn thời gian cho cuộc hẹn.");
      return false;
    }
    return true;
  };

  const validateSelection = (): boolean => {
    // Check if a date is selected
    if (!selectedDate || !moment(selectedDate).isValid()) {
      Alert.alert("Chọn Ngày", "Vui lòng chọn ngày cho cuộc hẹn.");
      return false;
    }

    // Check if a time is selected
    if (!isTimeSelected(selectedTime)) {
      return false;
    }

    // Check if a facility (selectedLocation) is chosen
    if (!selectedLocation) {
      Alert.alert("Chọn Cơ Sở", "Vui lòng chọn cơ sở cho cuộc hẹn.");
      return false;
    }

    // Check if an employee (selectedEmployee) is chosen
    if (!selectedEmployee) {
      Alert.alert("Chọn Nhân Viên", "Vui lòng chọn nhân viên cho cuộc hẹn.");
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateSelection()) {
      router.navigate({
        pathname: "/product/confirm",
        params: {
          note: note,
          orderItems: JSON.stringify(orderItems),
          totalDuration: totalDuration,
        },
      });
    }
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
        <DropDownFacility />
        <SelectSpa />
        <View
          style={{
            justifyContent: "flex-start",
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Note</Text>
          <TextInput
            numberOfLines={3}
            value={note}
            onChangeText={(text) => setNote(text)}
            style={{
              backgroundColor: APP_COLOR.vienInput,
              padding: 10,
              borderRadius: 10,
              borderColor: "white",
              borderWidth: 1,
              textAlignVertical: "top",
            }}
            placeholder="write note here"
          />
        </View>
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
                <Text>
                  {item.title} - {item.duration} mins
                </Text>
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
                Tổng cộng (
                {service && cart?.[service!.id] && cart?.[service!.id].quantity}{" "}
                dịch vụ)
              </Text>
              <Text>
                {currencyFormatter(
                  service && cart?.[service!.id] && cart?.[service!.id].sum
                )}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
              }}
            >
              <Text style={{ color: APP_COLOR.GRAY }}>Time</Text>
              <Text>{formatDuration(totalDuration)}</Text>
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
              borderColor: APP_COLOR.primary,
              flex: 1,
              padding: 7,
            }}
          >
            <Text
              style={{
                color: APP_COLOR.primary,
                textAlign: "center",
              }}
            >
              Tiền mặt
            </Text>
          </Pressable> */}
        </View>
        <View>
          <Pressable
            onPress={handleNextStep}
            style={({ pressed }) => ({
              opacity: pressed === true ? 0.5 : 1,
              padding: 10,
              backgroundColor: APP_COLOR.primary,
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
              {currencyFormatter(
                cart &&
                  service &&
                  cart?.[service!.id] &&
                  cart?.[service!.id].sum
              )}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default Booking;
