import {
  currencyFormatter,
  DisplayMenuItemByIdAPI,
  getURLBaseBackend,
} from "@/app/utils/API";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const MenuProduct = () => {
  const { menuId, menuName } = useLocalSearchParams(); // Lấy menuId từ tham số URL
  const [menuItem, setMenuItem] = useState<IMenuItem[]>([]); // Cập nhật lại kiểu dữ liệu cho phù hợp với mảng
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      try {
        const res = await DisplayMenuItemByIdAPI(menuId as string); // API trả về danh sách món ăn (IMenuItem[])
        if (res.data && Array.isArray(res.data)) {
          console.log(">> check menu items:", res.data); // Kiểm tra dữ liệu trả về
          setMenuItem(res.data); // Cập nhật state với danh sách dịch vụ
        } else {
          console.log("No menu items found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchMenuItems();
  }, [menuId]);

  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;

  const baseImage = `${backend}/images/menuItem`;
  //console.log("Base Image URL:", baseImage);
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : menuItem.length > 0 ? (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ paddingTop: 30 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", padding: 10 }}>
              {menuName}
            </Text>
            {menuItem.map((item) => (
              <TouchableOpacity
                key={item.id} // Đảm bảo rằng mỗi phần tử trong danh sách có key
                onPress={() =>
                  router.push({
                    pathname: "/product/per.menuItem", // Đường dẫn đến trang chi tiết
                    params: { id: item.id }, // Truyền menuItemId qua query
                  })
                }
              >
                <View style={styles.menuItemCard}>
                  <Image
                    source={{
                      uri: `${getURLBaseBackend()}/images/menuItem/${
                        item?.image
                      }`,
                    }}
                    style={styles.menuImage}
                  />
                  <View style={styles.menuInfo}>
                    <Text style={styles.menuName}>{item.name}</Text>
                    <Text numberOfLines={1} style={styles.menuDescription}>
                      {item.description}
                    </Text>
                    <Text style={styles.menuPrice}>
                      Giá: {currencyFormatter(item.price)}
                    </Text>
                    <Text style={styles.menuDuration}>
                      Thời gian: {item.duration} phút
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      ) : (
        <Text style={styles.noItems}>Không tìm thấy dịch vụ.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginTop: 20,
  },
  menuList: {
    padding: 10,
  },
  menuItemCard: {
    //paddingTop: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  menuImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  menuInfo: {
    flex: 1,
    justifyContent: "center",
  },
  menuName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  menuDescription: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  menuPrice: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 5,
  },
  menuDuration: {
    fontSize: 14,
    color: "#333",
  },
  noItems: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});

export default MenuProduct;
