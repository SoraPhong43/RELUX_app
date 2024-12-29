import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { APP_COLOR } from "@/app/utils/constant";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
interface IProps {
  infoHeight: number;
  service: IService | null;
}
const Info = (props: IProps) => {
  const { infoHeight, service } = props;

  return (
    <View
      style={{
        height: infoHeight,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ height: 60, margin: 10 }}>
        <Text style={{ lineHeight: 30 }} numberOfLines={2} ellipsizeMode="tail">
          <View>
            <Text
              style={{
                color: APP_COLOR.primary,
                backgroundColor: "#F5F5DC",
                padding: 0,
                margin: 0,
              }}
            >{`  Ưu tiên  `}</Text>
          </View>
          <Text>{` `}</Text>
          <MaterialCommunityIcons name="flower" size={24} color="#C3A74E" />
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            {service?.name}
          </Text>
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 10,
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: 10, flexDirection: "row" }}>
          <View
            style={{ gap: 3, flexDirection: "row", alignSelf: "flex-start" }}
          >
            <AntDesign name="star" size={15} color="orange" />
            <AntDesign name="star" size={15} color="orange" />
            <AntDesign name="star" size={15} color="orange" />
            <AntDesign name="star" size={15} color="orange" />
            <AntDesign name="star" size={15} color="orange" />
          </View>
          <Text>5.0 (999+ Bình Luận) </Text>
        </View>

        {/* nút like/dislike chuyển qua component sticky.header, do zIndex component nào bé hơn => không pressable được */}
        {/* <MaterialIcons name="favorite" size={20} color="black" />
                <MaterialIcons onPress={() => alert("like")} name="favorite-outline" size={20} color={APP_COLOR.GREY} /> */}
      </View>
      <View style={{ height: 10, backgroundColor: "#e9e9e9" }}></View>

      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <View style={{ marginHorizontal: 10, marginVertical: 5, gap: 10 }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 50 / 2,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F5F5DC",
              }}
            >
              <Entypo name="leaf" size={24} color="#A2D5AB" />
            </View>
            <View>
              <Text>Dịch vụ chăm sóc tiêu chuẩn</Text>
            </View>
          </View>
          <View style={{ gap: 5 }}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <AntDesign name="gift" size={14} color={APP_COLOR.primary} />
              <Text style={{ fontSize: 13 }}>
                Giảm 20% cho lần đặt đầu tiên
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <AntDesign name="gift" size={14} color={APP_COLOR.primary} />
              <Text style={{ fontSize: 13 }}>
                Giảm 20% cho liệu trình từ 200k
              </Text>
            </View>
          </View>
        </View>
        <View style={{ height: 10, backgroundColor: "#e9e9e9" }}></View>
      </View>
    </View>
  );
};

export default Info;
