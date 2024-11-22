import { getLocationById, getURLBaseBackend } from "@/app/utils/API";
import { useCurrentApp } from "@/context/app.context";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

const idLocation = () => {
  const { locationID } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const { location, setLocation } = useCurrentApp();

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true);
      const res = await getLocationById(locationID as string);
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        setLocation(res.data[0]);
      }
      setLoading(false);
    };
    fetchLocation();
  }, []);

  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Animated.View entering={FadeIn} style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `${getURLBaseBackend()}/images/location/${location?.image}`,
            }}
          />
          <View style={styles.header}>
            <Text style={styles.title}>{location?.locationName}</Text>
            <Text style={styles.address}>{location?.Address}</Text>
          </View>
        </Animated.View>

        <Animated.View entering={SlideInDown} style={styles.detailsContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionContent}>{location?.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>
            <Text style={styles.sectionContent}>{location?.Address}</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default idLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    fontSize: 16,
    color: "#555",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  address: {
    fontSize: 16,
    color: "#ddd",
  },
  detailsContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  sectionContent: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
});
