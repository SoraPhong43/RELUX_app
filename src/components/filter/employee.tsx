import { getEmployeeAPI } from "@/app/utils/API";
import { APP_COLOR } from "@/app/utils/constant";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const EmployeeDisplay = () => {
  const [employee, setEmployee] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEmployeeAPI();
        // console.log("API Response:", res?.data);
        if (Array.isArray(res?.data)) {
          setEmployee(res.data);
          // console.log(res.data);
        } else {
          console.warn("Unexpected data format from API:", res?.data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee List</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={employee}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phone}>Phone: {item.phone}</Text>
              <Text style={styles.email}>Email: {item.email}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default EmployeeDisplay;

// API

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: APP_COLOR.primary,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 8,
    marginRight: 12,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 3,
    // overflow: "hidden",
    width: 230,
    height: 210,
  },
  avatar: {
    width: "100%",
    height: 120,
    borderRadius: 20,
  },
  infoContainer: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#777",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
