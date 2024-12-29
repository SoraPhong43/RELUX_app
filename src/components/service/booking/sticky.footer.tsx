import { Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { APP_COLOR } from "@/app/utils/constant";
import { currencyFormatter } from "@/app/utils/API";
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";

interface IProps {
  service: IService | null;
}
const StickyFooter = (props: IProps) => {
  const { cart, setCart } = useCurrentApp();
  const { service } = props;

  const getSum = () => {
    if (service && cart[service.id]) {
      return cart[service.id].sum;
    }
    return 0;
  };

  return (
    <>
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
                  backgroundColor: APP_COLOR.primary,
                }}
              >
                <Text style={{ color: "white", fontSize: 9 }}>
                  {service &&
                    cart &&
                    cart[service?.id] &&
                    cart[service?.id]["quantity"] && (
                      <Text>{cart[service?.id]["quantity"]}</Text>
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
                  color: APP_COLOR.primary,
                  fontSize: 18,
                }}
              >
                {/* {currencyFormatter(getSum)} */}
                {currencyFormatter(
                  service &&
                    cart &&
                    cart[service?.id] &&
                    cart[service?.id]["sum"]
                )}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: 110,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: APP_COLOR.primary,
            }}
          >
            <Text
              style={{ color: "white", textAlign: "center" }}
              onPress={() => router.navigate("/product/booking")}
            >
              Make an apoinment now
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default StickyFooter;
