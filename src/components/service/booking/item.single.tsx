import { currencyFormatter } from "@/app/utils/API";
import { APP_COLOR } from "@/app/utils/constant";
import { Image, Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface IProps {
  menuItem: IMenuItem | null;
  handlePressItem: any;
  showMinus: boolean;
  quantity: number;
}
const ItemSingle = (props: IProps) => {
  const { menuItem, handlePressItem, showMinus, quantity } = props;

  return (
    <View
      style={{
        backgroundColor: "white",
        gap: 10,
        flexDirection: "row",
        padding: 10,
      }}
    >
      <View>
        {/* <Image
                    style={{ height: 100, width: 100 }}
                    source={{ uri: `${getURLBaseBackend()}/images/menu-item/${menuItem?.image}` }} /> */}
      </View>
      <View style={{ flex: 1, gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 260,
          }}
        >
          <Text>{menuItem?.name}</Text>
          <Text>{menuItem?.duration} mins</Text>
        </View>
        <View>
          <Text>{menuItem?.description}</Text>
        </View>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={{ color: APP_COLOR.primary }}>
            {currencyFormatter(menuItem?.price)}
          </Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 3,
            }}
          >
            {showMinus && (
              <>
                <Pressable
                  style={({ pressed }) => ({
                    opacity: pressed === true ? 0.5 : 1,
                    alignSelf: "flex-start", //fit-content
                  })}
                  onPress={() => handlePressItem(menuItem, "MINUS")}
                >
                  <AntDesign
                    name="minussquareo"
                    size={24}
                    color={APP_COLOR.primary}
                  />
                </Pressable>
                <Text
                  style={{
                    minWidth: 25,
                    textAlign: "center",
                  }}
                >
                  {quantity}
                </Text>
              </>
            )}
            <Pressable
              style={({ pressed }) => ({
                opacity: pressed === true ? 0.5 : 1,
                alignSelf: "flex-start", //fit-content
              })}
              onPress={() => handlePressItem(menuItem, "PLUS")}
            >
              {quantity !== 1 && (
                <AntDesign
                  name="plussquare"
                  size={24}
                  color={APP_COLOR.primary}
                />
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemSingle;
