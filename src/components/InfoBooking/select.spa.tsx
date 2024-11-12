import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DropDown from "../button/drop.down";
import { countries } from "@/app/utils/textdl";
import { useEffect, useState } from "react";
import { getAllLocations, getServiceByIdAPI } from "@/app/utils/API";

const formattedCountries = countries.map((c) => ({
  value: c.label,
  label: `${c.value}`,
}));
const [location, setLocation] = useState<ILocation[]>([]);

useEffect(() => {
  const getLocations = async () => {
    const res = await getAllLocations();
    console.log("check:", res);
    if (res.data) {
      setLocation(res.data);
    } else {
      //error
    }
  };

  getLocations();
}, []);

const SelectSpa = () => {
  return (
    <View>
      <StatusBar style="auto" />
      <View
        style={{
          justifyContent: "flex-start",
          paddingHorizontal: 20,
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "500" }}>
          Choose Spa Facility
        </Text>
      </View>
      <View
        style={{
          paddingTop: 10,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
          gap: 10,
        }}
      >
        <DropDown
          data={formattedCountries}
          onChange={console.log}
          placeholder="Choose a spa facility"
        />
      </View>
    </View>
  );
};
export default SelectSpa;
