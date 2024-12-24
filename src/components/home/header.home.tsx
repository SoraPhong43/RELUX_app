import { Image, Platform, StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { APP_COLOR } from "@/app/utils/constant";
import { useCurrentApp } from "@/context/app.context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF  ",
    paddingVertical: 10,
    paddingHorizontal: 15,
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  userName: {
    flexDirection: "column",
  },
  greeting: {
    color: APP_COLOR.vang,
    fontSize: 18,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
    color: "#333",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

// const HeaderHome = () => {
//     const{theme, appState}= useCurrentApp();
//     console.log("App State:", appState);
//     console.log("User Data:", appState?.user);
//     const backend=Platform.OS === "android"
//     ? process.env.EXPO_PUBLIC_ANDROID_API_URL
//     : process.env.EXPO_PUBLIC_IOS_API_URL;

//     const baseImage=`${backend}/images/avatar`
//     return (
//         <View style={styles.container}>
//             <View style={{paddingRight:20, flexDirection:"row",alignItems:"center",display:"flex",justifyContent:"space-between"}}>
//             <View style={{ paddingLeft: 5, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
//         <Image
//              style={{ height: 50, width: 50 }}
//             source={{ uri: `${baseImage}/${appState?.user.avatar}` }}
//             />
//           <View style={{ paddingLeft: 10 }}>
//              <Text style={{ color: APP_COLOR.vang, fontSize: 20 }}>happy new day,</Text>
//             <Text>{appState?.user.username || "Tên không có sẵn"}</Text>
//         </View>
//         </View>
//             <MaterialCommunityIcons name="bell-ring-outline" size={24} color="black" />
//             </View>
//             <View style={styles.location}>
//             <Entypo
//             name="location-pin"
//             size={24}
//              color={APP_COLOR.vang}
//               />
//               <Text>Dia chi</Text>
//             </View>
//         </View>
//     )
// }
const HeaderHome = () => {
  const { theme, appState } = useCurrentApp();
  console.log("App State:", appState);

  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <View style={styles.userName}>
          <Text style={styles.greeting}>Happy new days,</Text>
          <Text style={styles.name}>
            {appState?.user?.username || "Tên không có sẵn"}
          </Text>
        </View>
        <MaterialCommunityIcons
          name="bell-ring-outline"
          size={24}
          color={APP_COLOR.vang}
          onPress={() =>
            router.navigate("/(user)/notification/display.notification")
          }
        />
      </View>
      {/* <View style={styles.location}>
        <Entypo name="location-pin" size={20} color={APP_COLOR.vang} />
        <Text>669 Hoàn Kiếm, Hà Nội</Text> */}
    </View>
  );
};
export default HeaderHome;
