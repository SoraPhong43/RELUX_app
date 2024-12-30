import { currencyFormatter, getServiceByCatalogy } from "@/app/utils/API";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";
const { height: sHeight, width: sWidth } = Dimensions.get("window");

const MenuProduct = () => {
  const { categoryId } = useLocalSearchParams();
  const [categoryService, setCategoryService] = useState<IService[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const categoryIdNumber = Number(categoryId as string);

  useEffect(() => {
    const fetchCateById = async () => {
      try {
        const res = await getServiceByCatalogy(categoryIdNumber);
        if (Array.isArray(res.data)) {
          setCategoryService(res.data);
        } else {
          console.log("loi cate");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }
    };
    fetchCateById();
  }, [categoryIdNumber]);

  return (
    <View style={{ flex: 1 }}>
      {isLoading === false ? (
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
                <Image
                  source={{ uri: item.imageDescription }}
                  style={styles.image}
                />
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
      ) : (
        <ContentLoader
          speed={1}
          width={400}
          height={500}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ width: 1000 }}
        >
          {/* Image1 Skeleton */}
          <Rect x="10" y="40" rx="10" ry="10" width="380" height="110" />
          <Rect x="20" y="60" rx="10" ry="10" width="75" height="75" />
          <Rect x="100" y="60" rx="10" ry="10" width="150" height="15" />
          <Rect x="100" y="80" rx="10" ry="10" width="100" height="15" />
          <Rect x="100" y="105" rx="10" ry="10" width="280" height="30" />
          {/* Image3 Skeleton */}
          <Rect x="10" y="170" rx="10" ry="10" width="380" height="110" />
          <Rect x="20" y="190" rx="10" ry="10" width="75" height="75" />
          <Rect x="100" y="190" rx="10" ry="10" width="150" height="15" />
          <Rect x="100" y="210" rx="10" ry="10" width="100" height="15" />
          <Rect x="100" y="235" rx="10" ry="10" width="280" height="30" />
          {/* Image3 Skeleton */}
          <Rect x="10" y="300" rx="10" ry="10" width="380" height="110" />
          <Rect x="20" y="320" rx="10" ry="10" width="75" height="75" />
          <Rect x="100" y="320" rx="10" ry="10" width="150" height="15" />
          <Rect x="100" y="340" rx="10" ry="10" width="100" height="15" />
          <Rect x="100" y="365" rx="10" ry="10" width="280" height="30" />
        </ContentLoader>
      )}
    </View>
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
