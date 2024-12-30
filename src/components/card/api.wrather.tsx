// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   PermissionsAndroid,
//   Platform,
// } from "react-native";
// import Geolocation from "react-native-geolocation-service";
// import axios from "axios";

// const APIWeather = () => {
//   const [location, setLocation] = useState(null); // Địa điểm hiện tại
//   const [temperature, setTemperature] = useState(null); // Nhiệt độ
//   const [loading, setLoading] = useState(true); // Trạng thái tải
//   const [error, setError] = useState<string | null>(null);

//   // API Key từ OpenWeatherMap
//   const apiKey = "6b3dfdbf039df986eabca784ef23b77e";

//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       // Yêu cầu quyền truy cập vị trí (Android)
//       if (Platform.OS === "android") {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           setError("Permission denied");
//           setLoading(false);
//           return;
//         }
//       }
//       getLocation(); // Lấy vị trí nếu quyền được cấp
//     };

//     requestLocationPermission();
//   }, []);

//   const getLocation = () => {
//     // Lấy vị trí hiện tại
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         fetchWeather(latitude, longitude); // Gọi API thời tiết
//       },
//       (error) => {
//         setError("Unable to get location");
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   const fetchWeather = async (lat: number, lon: number) => {
//     try {
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
//       );
//       setLocation(response.data.name); // Lưu địa điểm
//       setTemperature(response.data.main.temp); // Lưu nhiệt độ
//     } catch (err) {
//       setError("Unable to fetch weather data");
//     } finally {
//       setLoading(false); // Dừng trạng thái tải
//     }
//   };

//   if (loading) {
//     // Hiển thị khi đang tải
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Đang tải...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     // Hiển thị khi có lỗi
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   // Hiển thị thông tin thời tiết
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Bây giờ ở: {location}</Text>
//       <Text style={styles.text}>Nhiệt độ: {temperature}°C</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   text: {
//     fontSize: 20,
//     marginVertical: 10,
//   },
//   errorText: {
//     color: "red",
//     fontSize: 18,
//   },
// });

// export default APIWeather;
