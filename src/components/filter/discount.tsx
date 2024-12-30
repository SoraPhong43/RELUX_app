import { DiscountListAPI } from "@/app/utils/API";
import { APP_COLOR } from "@/app/utils/constant";
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

const ServiceDiscount = () => {
  const [serDiscount, setSerDiscount] = useState<IService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDataDiscount = async () => {
      try {
        const res = await DiscountListAPI();

        if (Array.isArray(res?.data)) {
          const mappedData = res.data.map((item) => {
            const discount = parseFloat(
              item.promotion?.discountPercentage || 0
            );
            const discountedPrice =
              parseFloat(item.price) * (1 - discount / 100);
            return {
              ...item,
              discountedPrice: discountedPrice.toFixed(2),
            };
          });
          setSerDiscount(mappedData);
        } else {
          console.warn("Unexpected data format from API:", res?.data);
        }
      } catch (error) {
        console.error("Error fetching latest services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataDiscount();
  }, []);

  if (loading) {
    return (
      <View style={styles.centeredView}>
        <Text>Loading discounts...</Text>
      </View>
    );
  }

  if (serDiscount.length === 0) {
    return (
      <View style={styles.centeredView}>
        <Text>No discount services available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Promotional Services</Text>
      <FlatList
        horizontal
        data={serDiscount}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.card}
            onPress={() => {
              router.navigate({
                pathname: "/product/per.menuItem",
                params: { serviceId: item.id },
              });
            }}
          >
            <Image
              source={{ uri: item.imageMain }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.originalPrice}>${item.price}</Text>
                <Text style={styles.discountedPrice}>
                  ${item.discountedPrice}
                </Text>
              </View>
              {item.promotion?.discountPercentage && (
                <Text style={styles.discount}>
                  {item.promotion.discountPercentage}% OFF
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ServiceDiscount;

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 230,
    height: 210,
    marginRight: 12,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 120, // Giảm chiều cao hình ảnh
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 8,
  },
  name: {
    fontSize: 15, // Giảm kích thước font chữ
    fontWeight: "600",
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: 13,
    textDecorationLine: "line-through",
    color: "#888",
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 14, // Giảm kích thước font chữ
    fontWeight: "bold",
    color: APP_COLOR.primary,
  },
  discount: {
    fontSize: 13, // Giảm kích thước font chữ
    color: "#FF6347",
    fontWeight: "bold",
  },
});
