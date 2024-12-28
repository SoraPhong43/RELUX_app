import { currencyFormatter, getServiceByCatalogy } from "@/app/utils/API";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

const MenuProduct = () => {
  const { categoryId } = useLocalSearchParams();
  const [categoryService, setCategoryService] = useState<IService[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const categoryIdNumber = Number(categoryId as string);

  useEffect(() => {
    const fetchCateById = async () => {
      try {
        const res = await getServiceByCatalogy(categoryIdNumber);
        if (Array.isArray(res.data)) {
          setCategoryService(res.data);
        } else {
          setError("Menu data is not an array.");
        }
      } catch (error) {
        setError("Failed to fetch menu data.");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCateById();
  }, [categoryIdNumber]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categoryService}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.ServiceID || index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
              router.navigate({
                pathname: "/product/per.menuItem",
                params: { serviceId: item.id },
              })
            }
          >
            <Image source={{ uri: item.imageMain }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                {currencyFormatter(item.price)}
              </Text>
              <Text style={styles.itemDescription}>
                {item.descriptionShort}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default MenuProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: Platform.OS === "android" ? 25 : 0, // Bù cho status bar trên Android
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  listContent: {
    paddingVertical: 15,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: "#e0e0e0",
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007bff",
    marginVertical: 5,
  },
  itemDescription: {
    fontSize: 12,
    color: "#666",
  },
});
