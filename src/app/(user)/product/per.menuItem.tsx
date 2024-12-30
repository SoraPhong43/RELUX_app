import { getServiceByIdAPI } from "@/app/utils/API";
import { useCurrentApp } from "@/context/app.context";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";
const { height: sHeight, width: sWidth } = Dimensions.get("window");

const PerMenuItem = () => {
  const { serviceId } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { appState, service, setService } = useCurrentApp();

  const servicePer = Number(serviceId as string);
  console.log(appState?.user.bookingCount);
  useEffect(() => {
    const fetchServiceById = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await getServiceByIdAPI(servicePer);

        if (res && res.data) {
          setService(res.data);
          console.log("Service data:", res.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching service data:", error);
        setError("Unable to fetch service data. Please try again later.");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }
    };

    fetchServiceById();
  }, [servicePer]);

  const handleBooking = () => {
    router.navigate({
      pathname: "/(tabs)/booking",
      params: {
        serviceId: service?.id,
        categoryId: service?.categoryId,
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading === false ? (
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            {service ? (
              <View>
                {/* Hình ảnh */}
                <Image
                  source={{ uri: service.imageDescription }}
                  style={styles.image}
                />

                {/* Thông tin cơ bản */}
                <Text style={styles.serviceTitle}>{service.name}</Text>
                <Text style={styles.servicePrice}>Price: ${service.price}</Text>
                <Text style={styles.serviceDescription}>
                  {service.descriptionShort}
                </Text>
                <Text style={styles.serviceDescription}>
                  {service.description2}
                </Text>

                {/* Phần khuyến mãi */}
                {appState?.user?.bookingCount &&
                appState.user.bookingCount >= 3 ? (
                  service.promotion ? (
                    <View>
                      <Text style={styles.promotionTitle}>
                        Promotion Details
                      </Text>
                      <Text style={styles.promotionText}>
                        Discount: {service.promotion.discountPercentage}%
                      </Text>
                      <Text style={styles.promotionText}>
                        Start Date:{" "}
                        {new Date(
                          service.promotion.startDate
                        ).toLocaleDateString()}
                      </Text>
                      <Text style={styles.promotionText}>
                        End Date:{" "}
                        {new Date(
                          service.promotion.endDate
                        ).toLocaleDateString()}
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.noPromotion}>
                      No promotion available.
                    </Text>
                  )
                ) : (
                  <Text style={styles.notEligible}>
                    You are not eligible for promotions. Complete at least 3
                    bookings to unlock promotions!
                  </Text>
                )}

                {/* Nút Booking */}
                <TouchableOpacity
                  style={styles.bookingButton}
                  onPress={handleBooking}
                >
                  <Text style={styles.bookingButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.errorText}>Service not found</Text>
            )}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <ContentLoader
          speed={1}
          width={420}
          height={1500}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ width: "100%" }}
        >
          {/* Image Skeleton */}
          <Rect x="10" y="40" rx="10" ry="10" width="390" height="200" />

          {/* Title Skeleton */}
          <Rect x="40" y="260" rx="4" ry="4" width="140" height="30" />

          <Rect x="40" y="300" rx="4" ry="4" width="20%" height="25" />

          {/* Price Skeleton */}
          <Rect x="40" y="345" rx="4" ry="4" width="80%" height="40" />

          <Rect x="40" y="430" rx="10" ry="10" width="150" height="80" />
          <Rect x="40" y="520" rx="10" ry="10" width="350" height="50" />
        </ContentLoader>
      )}
    </View>
  );
};

export default PerMenuItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  content: {
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  image: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    marginBottom: 20,
  },
  serviceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  servicePrice: {
    fontSize: 18,
    color: "#007bff",
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  promotionText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  noPromotion: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  bookingButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 20,
    alignItems: "center",
  },
  bookingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  notEligible: {
    fontSize: 14,
    color: "#ff4d4f", // Màu đỏ nổi bật
    textAlign: "center",
    marginTop: 10,
  },
});
