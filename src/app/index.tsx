
import {  router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import { getAccountAPI} from "./utils/API";
import { useCurrentApp } from "@/context/app.context";
import * as SplashScren from 'expo-splash-screen'

SplashScren.preventAutoHideAsync();

const RootPage = () => {
    const{setAppState} =useCurrentApp();

    useEffect(()=>{
        const fetchAccount=async()=>{
            
        }
        fetchAccount()
    })
      
    
    useEffect(() => {
        async function prepare() {
          try {
            // Pre-load fonts, make any API calls you need to do here
            const res = await getAccountAPI();
            console.log(">>> check res: ",res)
            if(res.data){
                //succes 
                setAppState({
                    user:res.data.user,
                    access_token:await AsyncStorage.getItem("access_token")
                })
                router.replace("/(tabs)")
                await AsyncStorage.removeItem("access_token")
            }else{
                //error
                router.replace("/(auth)/welcome")
            }
          } catch (e) {
            console.warn(e);
          } finally {
            // Tell the application to render
            await SplashScren.hideAsync();
          }
        }
    
        prepare();
      }, []);
    // if (true) {
    //     return (
    //         <Redirect href={"/(tabs)"} />
    //     )
    // }
    return (
        <>
       
        </>
    )
}

export default RootPage;