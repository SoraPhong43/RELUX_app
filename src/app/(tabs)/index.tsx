import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import CollectionHome from "@/components/home/collection.home";
import HeaderHome from "@/components/home/header.home";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.home";
import DisplayLocation from "@/components/location/display.location";
import { useCurrentApp } from "@/context/app.context";
import { AntDesign } from "@expo/vector-icons";
import {
  Button,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_COLOR } from "../utils/constant";
import { router } from "expo-router";
import Latest from "@/components/filter/latest";
import EmployeeDisplay from "@/components/filter/employee";
import ServiceDiscount from "@/components/filter/discount";
import CurrentService from "@/components/filter/service.curent";
import { useAnimatedStyle } from "react-native-reanimated";

//const data = Array(10).fill(1);

const HomeTab = () => {
  const headerHeight = 60;
  const imageHeight = 200;

  return (
    // <View style={{ flex: 1 }}>
    //   <CustomFlatList
    //     data={data}
    //     style={styles.list}
    //     renderItem={({ item }) => (
    //       <CollectionHome
    //         name={item.name}
    //         description={item.description}
    //         refAPI={item.refAPI}
    //       />

    //     )}

    //     HeaderComponent={<HeaderHome />}
    //     StickyElementComponent={<SearchHome />}
    //     // TopListElementComponent={<View style={styles.topList} />}
    //     TopListElementComponent={<TopListHome />}
    //     ListFooterComponent={<DisplayLocation />}
    //   />
    <ScrollView>
      <HeaderHome />
      <SearchHome />
      <TopListHome />
      <ServiceDiscount />
      <CurrentService />
      <Latest />
      <EmployeeDisplay />
      <DisplayLocation />
    </ScrollView>

    //   {/* <View>
    //     <Pressable
    //       onPress={() => router.push('/(user)/product/CpBooking')}
    //       style={({ pressed }) => ({
    //         opacity: pressed === true ? 0.5 : 1,
    //         padding: 10,
    //         backgroundColor: APP_COLOR.vang,
    //         alignItems: "center",
    //         justifyContent: "center",
    //         borderRadius: 3,
    //       })}
    //     >
    //       <Text style={{ fontSize: 16, fontWeight: "bold", color: "white", cursor: "pointer" }} >Booking now!</Text>
    //     </Pressable>
    //   </View> */}
    // // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    padding: 8,
  },
  header: {
    borderColor: "red",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%",
  },
  item: {
    borderColor: "green",
    borderWidth: 1,
    height: 250,
    marginBottom: 10,
    width: "100%",
  },
  list: {
    overflow: "hidden",
  },
  sticky: {
    backgroundColor: "#2555FF50",
    borderColor: "blue",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%",
  },
});

export default HomeTab;
