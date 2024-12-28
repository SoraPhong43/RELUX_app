import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DropDown from "../button/drop.down";
import { countries } from "@/app/utils/textdl";
import { useEffect, useState } from "react";
import { getAllLocations, getServiceByIdAPI } from "@/app/utils/API";
import { useCurrentApp } from "@/context/app.context";

interface OptionItem {
  value: string;
  label: string;
}
const SelectSpa = () => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const {
    selectedEmployee,
    setSelectedEmployee,
    selectedLocation,
    setSelectedLocation,
  } = useCurrentApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        setIsLoading(true);
        const res = await getAllLocations();
        // console.log("API Response:", res);
        if (Array.isArray(res.data)) {
          setLocations(res.data as ILocation[]);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFacility();
  }, []);

  // Map locations to dropdown format
  const formattedLocations = locations.map((location) => ({
    value: location.name,
    label: location.name,
  }));

  console.log("Formatted Locations:", formattedLocations);

  const handleLocationChange = (item: OptionItem) => {
    const selected = locations.find((location) => location.name === item.value);
    if (selected) {
      setSelectedLocation(selected); // Set selected location
      setSelectedEmployee(null); // Reset selected employee
    } else {
      console.warn(`No location found for id: ${item.value}`);
    }
    console.log("Selected Location:", selected);
  };

  // Map employees to dropdown format if a location is selected
  const formattedEmployee: OptionItem[] = selectedLocation
    ? selectedLocation.employees.map((employee) => ({
        value: employee.name,
        label: employee.name,
      }))
    : [];

  console.log("Formatted Employees:", formattedEmployee);

  const handleEmployeeChange = (item: OptionItem) => {
    const selected = selectedLocation?.employees.find(
      (employee) => employee.name === item.value
    );
    if (selected) {
      setSelectedEmployee(selected);
    } else {
      console.log(`No employee found for id: ${item.value}`);
      setSelectedEmployee(null);
    }
  };
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
          data={formattedLocations}
          onChange={handleLocationChange}
          placeholder="Choose a spa facility"
        />
      </View>
      {formattedEmployee.length > 0 ? (
        <>
          <Text style={{ fontSize: 18, fontWeight: "500", paddingLeft: 20 }}>
            {" "}
            Choose Employee
          </Text>
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
              data={formattedEmployee}
              onChange={handleEmployeeChange}
              placeholder="Choose employee"
            />
          </View>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};
export default SelectSpa;
