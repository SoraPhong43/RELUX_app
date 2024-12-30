import { placeBookingByUserAPI } from "@/app/utils/API";
import { APP_COLOR } from "@/app/utils/constant";
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CurrentService = () => {
  const { appState, bookingHistory, setBookingHistory } = useCurrentApp();
  const [uniqueServices, setUniqueServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await placeBookingByUserAPI(appState?.user.id);

        if (Array.isArray(res?.data)) {
          setBookingHistory(res.data);

          // Lọc danh sách dịch vụ để loại bỏ trùng lặp dựa trên `id`
          const services = res.data
            .flatMap((item) =>
              Array.isArray(item.services) ? item.services : []
            )
            .reduce<IService[]>((unique, service) => {
              if (!unique.some((s: IService) => s.id === service.id)) {
                unique.push(service);
              }
              return unique;
            }, []);
          setUniqueServices(services);
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

  if (uniqueServices.length === 0) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current service</Text>
      <FlatList
        horizontal
        data={uniqueServices}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.itemConteiner}
            onPress={() => {
              router.navigate({
                pathname: "/product/per.menuItem",
                params: { serviceId: item.id },
              });
            }}
          >
            <View style={styles.cardHorizontal}>
              <Image
                source={{ uri: item.imageMain }}
                style={styles.imageHorizontal}
              />
              <View style={styles.infoContainerHorizontal}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.description}>{item.descriptionShort}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default CurrentService;

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
