import axios from "@/app/utils/axios.customize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const registerAPI = (username:string, password: string,email: string,phone:string,fullName:string) => {
    const url = `/v1/register`;
 //   const url =`\register`;
     return axios.post<IBackendRes<IRegister>>(url, { username, password, email,phone, fullName});
 }

export const verifyCodeAPI = (email: string, code: string) => {
    const url = `/v1/password/verify-otp`;
    return axios.post<IBackendRes<IRegister>>(url, { email, code });
};

export const resendCodeAPI = (email: string) => {
    const url = `/api/v1/auth/verify-email`;
    return axios.post<IBackendRes<IRegister>>(url, { email });
};

export const loginAPI = (username: string, password: string) => {
    const url = `/v1/login`;
    return axios.post<IBackendRes<IUserLogin>>(url, {
        username: username,
        password,
    });
};

export const getAccountAPI = () => {
    const url = `/api/v1/auth/account`;
    return axios.get<IBackendRes<IUserLogin>>(url);
};
export const getCategoryAPI = (id: number): Promise<IBackendRes<ICategoryBooking[]>> => {
    const url = `/v1/service-categories/${id}`;
    return axios.get(url);
  };

export const getlastestAPI = ()=>{
    const url=`/v1/loc/latest`;
    return axios.get<IBackendRes<ILast>>(url);
}
export const getEmployeeAPI = ()=>{
    const url = `/v1/employees`;
    return axios.get<IBackendRes<IEmployee>>(url);
}
  
  
export const getTopService = (ref: string) => {
    const url = `/api/v1/services/${ref}`;
    // console.log(">>check:",url);
    return axios.post<IBackendRes<ITopService[]>>(
        url,
        {},
        {
            headers: {
                delay: 3000,
            },
        }
    );
};

export const getURLBaseBackend = () => {
    const backend =
        Platform.OS === "android"
            ? process.env.EXPO_PUBLIC_ANDROID_API_URL
            : process.env.EXPO_PUBLIC_IOS_API_URL;

    return backend;
};

export const getServiceAPI = ()=>{
    const url = `/v1/services`;
    return axios.get<IBackendRes<IService>>(url);

}

export const getServiceByIdAPI = (id: number) => {
    const url = `/v1/services/${id}`;
    return axios.get<IBackendRes<IService>>(url);
};

export const getServiceByCatalogy=(catelogyId:number)=>{
    const url=`/v1/services/category/${catelogyId}`;
    return axios.get<IBackendRes<IService[]>>(url)
}
export const getAllLocations = () => {
    const url = `/api/v1/location/geteinspa`;
    return axios.get<IBackendRes<ILocation>>(url);
};

export const getLocationSpa = () => {
    const url = `/v1/locations`;
    return axios.get<IBackendRes<IAllLocation>>(url);
};

export const getLocationById = (locationId: string) => {
    const url = `/api/v1/location/getLocationById/${locationId}`;
    return axios.get<IBackendRes<IAllLocation>>(url);
};

export const getEmployeeSpa = () => {
    const url = `/v1/employees`;
    return axios.get<IBackendRes<IEmployee>>(url);
};
export const getEmployeeFreeTimeSpa = (employeeId: number) => {
    const url = `/v1/employees/${employeeId}/free-time`;
    return axios.get<IBackendRes<IFreeTime>>(url);
};

export const printAsyncStorage = () => {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys!, (error, stores) => {
            let asyncStorage: any = {};
            stores?.map((result, i, store) => {
                asyncStorage[store[i][0]] = store[i][1];
            });
            console.log(JSON.stringify(asyncStorage, null, 2));
        });
    });
};

export const processDataServiceMenu = (service: IService | null) => {
    if (!service) return [];
    return service?.menu?.map((menu, index) => {
        return {
            index,
            key: menu.id,
            title: menu.name,
            data: menu.menuItems,
        };
    });
};

export const currencyFormatter = (value: number | string): string => {
    // Ensure the value is a number
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
    // Check if the parsed value is a valid number
    if (isNaN(numericValue)) {
      return '$0.00';
    }
  
    // Format the number as USD
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numericValue);
  };
  
  

export const getProfileAPI = () => {
    const url = `/v1/profile`;
    return axios.post<IBackendRes<IUser>>(url);
};
export const getCateServiceBookingAPI = () => {
    const url = `/v1/service-categories`;
    return axios.get<IBackendRes<ICategoryBooking[]>>(url);
};
export const placeBookingAPI = (data: any) => {
    const url = `/v1/bookings`;
    return axios.post<IBackendRes<IUserLogin>>(url, { ...data });
};
export const placeBookingByUserAPI = (idUser: any) => {
    const url = `/v1/bookings/user/${idUser}`;
    return axios.get<IBackendRes<any>>(url);
};

export const getBookingHistoryAPI = () => {
    const url = `/api/v1/bookings/all`;
    return axios.get<IBackendRes<IBooking[]>>(url);
};

export const updateUserAPI = (
    id:number,
    phone: string,
    fullName: string
) => {
    const url = `/v1/users/${id}`;
    return axios.patch<IBackendRes<IUserLogin>>(url, {phone, fullName });
};

export const updateUserPasswordAPI = (
    currentPassword: string,
    newPassword: string
) => {
    const url = `/api/v1/users/password`;
    return axios.post<IBackendRes<IUserLogin>>(url, {
        currentPassword,
        newPassword,
    });
};

export const requestPasswordAPI = (email: string) => {
    const url = `/api/v1/auth/retry-password`;
    return axios.post<IBackendRes<IUserLogin>>(url, { email });
};

export const forgotPasswordAPI = (
    code: string,
    email: string,
    password: string
) => {
    const url = `/api/v1/auth/forgot-password`;
    return axios.post<IBackendRes<IUserLogin>>(url, { code, email, password });
};

export const DisplayMenuAPI = () => {
    const url = `/api/v1/menu/allmenu`;
    return axios.post<IBackendRes<IMenu>>(url);
};

export const DisplayMenuItemByIdAPI = (menuId: string) => {
    const url = `/api/v1/menu/menuById/${menuId}`;
    return axios.post<IBackendRes<IMenuItem>>(url, { menuId });
};

export const DisplayPerMenuItemAPI = (id: string) => {
    const url = `/api/v1/menuitem/permenuitem/${id}`;
    return axios.post<IBackendRes<IMenuItem>>(url, { id });
};

export const SaveExpoPushTokenAPI = (data: any) => {
    const url = `/v1/notification/save_token`;
    return axios.post<IBackendRes<IUserLogin>>(url, { ...data });
};

export const NotificationPushAPI=(userId:number)=>{
    const url=`/v1/notification/pushNotification`;
    return axios.post<IBackendRes<INotification[]>>(url,{userId})
}
