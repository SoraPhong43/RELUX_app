
import {  Redirect, router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import { getAccountAPI} from "./utils/API";
import { useCurrentApp } from "@/context/app.context";
import * as SplashScren from 'expo-splash-screen'

SplashScren.preventAutoHideAsync();

const RootPage = () => {
  const { setAppState } = useCurrentApp();

  useEffect(() => {
      async function prepare() {
          try {
              const token = await AsyncStorage.getItem("access_token");
              if (!token) {
                  router.replace("/(auth)/welcome");
                  return;
              }

              const res = await getAccountAPI();
              if (res.data) {
                  setAppState({
                      user: res.data.user,
                      access_token: token
                  });
                  router.replace("/(tabs)");
              } else {
                  await AsyncStorage.removeItem("access_token");
                  router.replace("/(auth)/welcome");
              }
          } catch (e) {
              console.warn(e);
              await AsyncStorage.removeItem("access_token");
              router.replace("/(auth)/welcome");
          } finally {
              await SplashScren.hideAsync();
          }
      }

      prepare();
  }, []);

  return <></>;
}

export default RootPage;