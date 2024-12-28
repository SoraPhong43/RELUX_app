import { Redirect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getAccountAPI } from "./utils/API";
import { useCurrentApp } from "@/context/app.context";
import * as SplashScren from "expo-splash-screen";

SplashScren.preventAutoHideAsync();

const RootPage = () => {
  const { setAppState } = useCurrentApp();
  const [state, setState] = useState<any>();

  useEffect(() => {
    async function prepare() {
      try {
        const res = await getAccountAPI();

        if (res.data) {
          //success
          setAppState({
            user: res.data.user,
            access_token: await AsyncStorage.getItem("access_token"),
          });
          router.replace("/(tabs)");
        } else {
          //error
          router.replace("/(auth)/welcome");
        }
      } catch (e) {
        setState(() => {
          throw new Error("Cannot connect to API backend");
        });
        await AsyncStorage.removeItem("access_token");
        router.replace("/(auth)/welcome");
      } finally {
        await SplashScren.hideAsync();
      }
    }

    prepare();
  }, []);

  return <></>;
};

export default RootPage;
