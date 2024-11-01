import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

const backend = Platform.OS === "android" ?
    process.env.EXPO_PUBLIC_ANDROID_API_URL
    : process.env.EXPO_PUBLIC_IOS_API_URL;
console.log(">>check backend", backend)

const instance = axios.create({
    baseURL: backend,
});

instance.interceptors.request.use(async function (config) {
    config.headers["delay"] = 3000;
    const access_token =await AsyncStorage.getItem("access_token");
    config.headers["Authorization"] = `Bearer ${access_token}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    if (response.data) return response.data;
    return response;
}, function (error) {
    if (error?.response?.data) return error?.response?.data;
    console.log(">>>run error here")
    return Promise.reject(error);
});
export default instance;