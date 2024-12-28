import { getlastestAPI } from "@/app/utils/API";
import { APP_COLOR } from "@/app/utils/constant";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Latest = () => {
  const [services, setServices] = useState<ILast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getlastestAPI();
        // console.log("API Response:", res?.data);

        // Xác nhận dữ liệu là mảng trước khi đặt state
        if (Array.isArray(res?.data)) {
          setServices(res.data);
        } else {
          console.warn("Unexpected data format from API:", res?.data);
        }
      } catch (error) {
        console.error("Error fetching latest services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centeredView}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (services.length === 0) {
    return (
      <View style={styles.centeredView}>
        <Text>No services available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Services</Text>
      <FlatList
        horizontal
        data={services}
        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
        keyExtractor={(item) => item.ServiceID}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1} // Disable the overlay effect
            style={styles.itemConteiner}
            onPress={() => {
              router.navigate({
                pathname: "/product/per.menuItem",
                params: { serviceId: item.ServiceID },
              });
            }}
          >
            <View style={styles.cardHorizontal}>
              <Image
                source={{ uri: item.ImageDescription }}
                style={styles.imageHorizontal}
              />
              <View style={styles.infoContainerHorizontal}>
                <Text style={styles.name}>{item.Name}</Text>
                <Text style={styles.price}>${item.Price}</Text>
                <Text style={styles.description}>{item.DescriptionShort}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Latest;

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
  itemConteiner: {
    overflow: "hidden",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: "#fff", // Card background color
  },
  cardHorizontal: {
    flexDirection: "column",
    backgroundColor: "#fff",
    marginRight: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: "hidden",
    width: 230,
    height: 210,
  },
  imageHorizontal: {
    width: "100%",
    height: 120,
  },
  infoContainerHorizontal: {
    flex: 1,
    padding: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginVertical: 4,
  },
  description: {
    fontSize: 13,
    color: "#555",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
