import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import CollectionHome from "@/components/home/collection.home";
import HeaderHome from "@/components/home/header.home";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.home";
import DisplayLocation from "@/components/location/display.location";
import { useCurrentApp } from "@/context/app.context";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//const data = Array(10).fill(1);

const data = [
  {
    key: 1,
    name: "Top service Rating 5* this week",
    description: "Gợi ý dịch vụ được đánh giá 5 sao",
    refAPI: "service5star",
  },
  {
    key: 2,
    name: "New services:",
    description: "dịch vụ mới",
    refAPI: "sericediscount",
  },
  {
    key: 3,
    name: "Discover Massage Deals",
    description: "Gợi ý các ưu đãi massage",
    refAPI: "newservice",
  },
];

const HomeTab = () => {
  return (
    <View style={{ flex: 1 }}>
      <CustomFlatList
        data={data}
        style={styles.list}
        renderItem={({ item }) => (
          <CollectionHome
            name={item.name}
            description={item.description}
            refAPI={item.refAPI}
          />
        )}
        HeaderComponent={<HeaderHome />}
        StickyElementComponent={<SearchHome />}
        // TopListElementComponent={<View style={styles.topList} />}
        TopListElementComponent={<TopListHome />}
        ListFooterComponent={<DisplayLocation />}
      />
    </View>
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
