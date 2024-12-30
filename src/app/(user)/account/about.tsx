import { APP_COLOR } from "@/app/utils/constant";
import { Text, View } from "react-native";

const About = () => {
  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 10 }}>
      {/* Phần văn bản trên */}
      <View>
        <Text style={{ fontSize: 15 }}>
          For your convenience, there are more than 20 diferent massage
          therapists who are great professionals, ready to make your body more
          beautiful
        </Text>
      </View>

      {/* Phần văn bản dưới */}
      <View>
        <Text
          style={{
            fontSize: 13,
            textAlign: "center",
            color: APP_COLOR.darkGray,
          }}
        >
          Product by group C1SE.31
        </Text>
      </View>
    </View>
  );
};

export default About;
