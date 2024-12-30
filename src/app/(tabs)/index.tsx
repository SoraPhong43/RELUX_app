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
  return (
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
  );
};

export default HomeTab;
