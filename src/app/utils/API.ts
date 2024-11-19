import axios from "@/app/utils/axios.customize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const registerAPI = (email: string, password: string, name: string) => {
   const url = `/api/v1/auth/register`;
//   const url =`\register`;
    return axios.post<IBackendRes<IRegister>>(url, { email, password, name });
}


export const verifyCodeAPI = (email: string, code: string) => {
    const url = `/api/v1/auth/verify-code`;
    return axios.post<IBackendRes<IRegister>>(url, { email, code });
}

export const resendCodeAPI = (email: string) => {
    const url = `/api/v1/auth/verify-email`;
    return axios.post<IBackendRes<IRegister>>(url, { email });
}

export const loginAPI = (email: string, password: string) => {
    const url = `/api/v1/auth/login`;
    return axios.post<IBackendRes<IUserLogin>>(url, { email: email, password });
}

export const getAccountAPI = () => {
    const url = `/api/v1/auth/account`;
    return axios.get<IBackendRes<IUserLogin>>(url);
}

export const getTopService = (ref:string) => {
    const url = `/api/v1/services/${ref}`;
   // console.log(">>check:",url);
    return axios.post<IBackendRes<ITopService[]>>(url,{},{
        headers:{
            delay:3000
        }
    });
}

export const getURLBaseBackend = () => {
    const backend = Platform.OS === "android"
        ? process.env.EXPO_PUBLIC_ANDROID_API_URL
        : process.env.EXPO_PUBLIC_IOS_API_URL;

    return backend;
}

export const getServiceByIdAPI = (id:string) => {
    const url = `/api/v1/services/${id}`;
    return axios.get<IBackendRes<IService>>(url,{
        headers:{delay:6000}
    });
}

export const getAllLocations = ()=>{
    const url = `/api/v1/location/geteinspa`;
    return axios.get<IBackendRes<ILocation>>(url);
}

export const printAsyncStorage = () => {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys!, (error, stores) => {
            let asyncStorage: any = {}
            stores?.map((result, i, store) => {
                asyncStorage[store[i][0]] = store[i][1]
            });
            console.log(JSON.stringify(asyncStorage, null, 2));
        });
    });
};

export const processDataServiceMenu=(service:IService | null)=>{
    if(!service) return[];
    return service?.menu?.map((menu,index)=>{
        return{
            index,
            key:menu.id,
            title:menu.name,
            data:menu.menuItems
        }
    })
}

export const currencyFormatter = (value: any) => {
    const options = {
        significantDigits: 2,
        thousandsSeparator: '.',
        decimalSeparator: ',',
        symbol: 'đ'
    }

    if (typeof value !== 'number') value = 0.0
    value = value.toFixed(options.significantDigits)

    const [currency, decimal] = value.split('.')
    return `${currency.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        options.thousandsSeparator
    )} ${options.symbol}`
}

export const placeBookingAPI=(data:any)=>{
    const url = `/api/v1/bookings`;
    return axios.post<IBackendRes<IUserLogin>>(url,{...data});
}

export const getBookingHistoryAPI = ()=>{
    const url =`/api/v1/bookings/all`;
    return axios.get<IBackendRes<IBooking[]>>(url)
}

