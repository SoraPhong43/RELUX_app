import HeaderHome from "@/components/home/header.home";
import { useEffect, useState, } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
    Image,
} from "react-native";
import Toast from "react-native-root-toast";

import SelectSpa from "@/components/InfoBooking/select.spa";
import CmSelectMulti from "@/components/CmSelect/CmSelectMulti";
import DropDownFacility from "@/components/InfoBooking/choose.time";
import { router, useNavigation } from "expo-router";
import moment, { duration } from "moment";
import { APP_COLOR } from "@/app/utils/constant";
import { currencyFormatter, getEmployeeFreeTimeSpa, getEmployeeSpa, getProfileAPI, getServiceByIdAPI, placeBookingAPI } from "@/app/utils/API";
import { getCateServiceBookingAPI, getLocationSpa } from "@/app/utils/API";
import CmSelect from "@/components/CmSelect/CmSelect";
import imgLocation from "@/assets/spaHome1.jpg";
import imgStaff from "@/assets/icons/face.png";
import { useCurrentApp } from "@/context/app.context";
const Step1 = () => {
    const {
        booking, setBooking,
    } = useCurrentApp();
    const [isLoading, setIsLoading] = useState(true);
    const [customerService, setCustomerService] = useState<IUser>();
    const fetchCustomerService = async () => {
        try {
            setIsLoading(true);
            const res = await getProfileAPI();
            setCustomerService(res.data as IUser);
            console.log('fetchCustomerService', res.data);

            setBooking((prevState) => {
                return {
                    ...prevState,
                    customerId: res.data?.id as number,
                    customerName: res.data?.fullName,
                    bookingCount: res.data?.bookingCount,
                };
            });
        } catch (error) {
            console.error("Error fetching fetchCustomerService:", error);
        } finally {
            setIsLoading(false);
        }
    };
    //category
    const [categoryService, setCategoryService] = useState<ICategoryBooking[]>([]);
    const [category, setCategory] = useState<number>();
    const formattedCategoryService = categoryService.map((option) => ({
        value: option.id,
        label: option.name,
        ...option,
    }));
    const fetchCategoryService = async () => {
        try {
            setIsLoading(true);
            const res = await getCateServiceBookingAPI();
            if (Array.isArray(res.data)) {
                setCategoryService(res.data as ICategoryBooking[]);
            }
        } catch (error) {
            console.error("Error fetching categoryService:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchCategoryServiceById = async (id: number) => {
        try {
            setIsLoading(true);
            const res = await getServiceByIdAPI(id);
            console.log('fetchCategoryServiceById', res.data);
            setBooking((prevState) => {
                return {
                    ...prevState,
                    price: res.data?.price,
                    discountPercentage: booking?.bookingCount >= 3 ? res.data?.promotion?.discountPercentage : 0,
                };
            });
        } catch (error) {
            console.error("Error fetching categoryService:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleCateServiceChange = (selected: OptionItem) => {
        setCategory(selected.value as number);
        setBooking((prevState) => {
            return {
                ...prevState,
                serviceIds: [selected.value],
            };
        });
        if (selected != null) {
            fetchCategoryServiceById(selected.value as number);
            fetchLocationService();
        }
    };
    //location
    const [locationService, setLocationService] = useState<IAllLocation[]>([]);
    const [locationData, setLocationData] = useState<OptionItem>();
    const formattedLocationService = locationService.map((option) => ({
        value: option.id,
        label: option.address,
        ...option,
    }));
    const fetchLocationService = async () => {
        try {
            setIsLoading(true);
            const res = await getLocationSpa();
            if (Array.isArray(res.data)) {
                setLocationService(res.data as IAllLocation[]);
            }
        } catch (error) {
            console.error("Error fetching getAllLocations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLocationChange = (selected: OptionItem) => {
        setLocationData(selected)
        setBooking((prevState) => {
            return {
                ...prevState,
                locationId: selected.value as number,
                locationName: selected.label as string,
            };
        });
        if (selected != null) {
            fetchEmployeeService();
        }
    };

    //employee
    const [employeeService, setEmployeeService] = useState<IEmployee[]>([]);
    const [employeeData, setEmployeeData] = useState<OptionItem>();
    const formattedEmployeeService = employeeService.map((option) => ({
        value: option.id,
        label: option.name,
        ...option,
    }));
    const fetchEmployeeService = async () => {
        try {
            setIsLoading(true);
            const res = await getEmployeeSpa();
            if (Array.isArray(res.data)) {
                setEmployeeService(res.data as IEmployee[]);
            }
        } catch (error) {
            console.error("Error fetching fetchEmployeeService:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmployeeChange = (selected: OptionItem) => {
        setEmployeeData(selected)
        setBooking((prevState) => {
            return {
                ...prevState,
                employeeId: selected.value as number,
                employeeName: selected.label as string,
            };
        });
        if (selected != null) {
            fetchTimeService(selected);
        }
    };

    //time
    const [dateService, setDateService] = useState<string>('');
    const [timeService, setTimeService] = useState<string>();
    const [timeRangeService, setTimeRangeService] = useState<OptionItem[]>();
    const [dateTimeService, setDateTimeDService] = useState<IFreeTime[]>([]);
    const formattedTimeService = dateTimeService.map((option) => ({
        value: option.date,
        label: option.date,
        ...option,
    }));
    const fetchTimeService = async (employee: OptionItem) => {
        try {
            setIsLoading(true);
            console.log(employee);

            const res = await getEmployeeFreeTimeSpa(employee.value as number);
            if (Array.isArray(res.data)) {
                setDateTimeDService(res.data as IFreeTime[]);
            }
        } catch (error) {
            console.error("Error fetching fetchEmployeeService:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDateChange = (selected: OptionItem) => {

        setDateService(selected.value as string);
        const timeStart = selected.startTime?.split(":")[0];
        const timeEnd = selected.endTime?.split(":")[0];
        getTime(timeStart, timeEnd, selected);
    };
    const handleTimeChange = (selected: OptionItem) => {
        setTimeService(selected.value as string);
        setBooking((prevState) => {
            return {
                ...prevState,
                bookingTime: setDateTime(dateService, selected.value as string),
            };
        });
    };

    const getTime = (start: number, end: number, selected: OptionItem) => {
        const timeList: OptionItem[] = [];
        for (let i = start; i <= end; i++) {
            timeList.push({
                value: `${i}:00`,
                label: `${i}:00`,
            });
        }
        setTimeRangeService(timeList);
    };
    const setDateTime = (date: string, time: string) => {
        const dateTimeString = `${date}T${time}:00`;
        const dateTime = new Date(dateTimeString + "Z");
        const isoString = dateTime.toISOString();
        return isoString
    }

    useEffect(() => {
        fetchCustomerService();
        fetchCategoryService();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{
                        borderBottomColor: "#eee",
                        borderBottomWidth: 1,
                        padding: 10,
                    }}
                >
                    <View>
                        <CmSelect
                            label="Select the services"
                            data={formattedCategoryService}
                            value={category}
                            onChange={(value) => handleCateServiceChange(value)}
                            placeholder="Select an option"
                        />
                    </View>
                </View>
                {booking.serviceIds?.length > 0 && (
                    <View
                        style={{
                            borderBottomColor: "#eee",
                            borderBottomWidth: 1,
                            padding: 10,
                        }}
                    >
                        <View>
                            <CmSelect
                                label="Select the location"
                                data={formattedLocationService}
                                value={booking.locationId}
                                onChange={(value) => handleLocationChange(value)}
                                placeholder="Select an option"
                            />
                        </View>
                        {booking.locationId !== null && (
                            <View style={{
                                paddingHorizontal: 20,
                            }}>
                                <View
                                    style={{
                                        backgroundColor: "#ffffff",
                                        borderWidth: 1,
                                        borderColor: APP_COLOR.darkGray,
                                        borderRadius: 15,
                                        marginBottom: 5,
                                    }}
                                >
                                    <Pressable
                                        onPress={() =>
                                            router.navigate({
                                                pathname: "/product/locationid",
                                                params: { locationID: locationData?.id },
                                            })
                                        }
                                    >
                                        <Image
                                            style={{
                                                height: 100,
                                                width: '100%',
                                                borderTopLeftRadius: 8,
                                                borderTopRightRadius: 8,
                                            }}
                                            source={imgLocation}
                                        />
                                        <View style={{ padding: 5 }}>
                                            <Text style={{ fontWeight: 500, maxWidth: 200 }}>
                                                {locationData?.locationName}
                                            </Text>
                                            <Text
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                                style={{
                                                    maxWidth: 220,
                                                    fontWeight: 400,
                                                    color: APP_COLOR.darkGray,
                                                    paddingTop: 5,
                                                    paddingLeft: 2,
                                                }}
                                            >
                                                {locationData?.address}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                        )}
                    </View>
                )}

                {booking.locationId !== null && (
                    <View
                        style={{
                            borderBottomColor: "#eee",
                            borderBottomWidth: 1,
                            padding: 10,
                        }}
                    >
                        <View>
                            <CmSelect
                                label="Choose staff"
                                data={formattedEmployeeService}
                                value={booking.employeeId}
                                onChange={(value) => handleEmployeeChange(value)}
                                placeholder="Select an option"
                            />
                        </View>
                        {booking.employeeId !== null && (
                            <View style={{
                                paddingHorizontal: 20,
                            }}>
                                <View
                                    style={{
                                        backgroundColor: "#ffffff",
                                        borderWidth: 1,
                                        borderColor: APP_COLOR.darkGray,
                                        borderRadius: 15,
                                        marginBottom: 5,
                                    }}
                                >
                                    <Pressable
                                    >
                                        <Image
                                            style={{
                                                height: 100,
                                                width: '100%',
                                                borderTopLeftRadius: 8,
                                                borderTopRightRadius: 8,
                                                objectFit: 'contain',
                                            }}
                                            source={imgStaff}
                                        />
                                        <View style={{ padding: 5 }}>
                                            <Text style={{ fontWeight: 500, maxWidth: 200 }}>
                                                {employeeData?.name}
                                            </Text>
                                            <Text style={{ fontWeight: 400, maxWidth: 200, color: APP_COLOR.GRAY, }}>
                                                {employeeData?.phone}
                                            </Text>
                                            <Text
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                                style={{
                                                    maxWidth: 220,
                                                    fontWeight: 400,
                                                    color: APP_COLOR.darkGray,
                                                    paddingTop: 5,
                                                    paddingLeft: 2,
                                                }}
                                            >
                                                {employeeData?.email}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                        )}
                    </View>

                )}
                {booking.employeeId !== null && (
                    <View style={{ padding: 10 }}>
                        <CmSelect
                            label="Choose date"
                            data={formattedTimeService}
                            value={dateService}
                            onChange={(value) => handleDateChange(value)}
                            placeholder="Select an option"
                        />
                        {dateService && (
                            <View>
                                <CmSelect
                                    label="Choose time"
                                    data={timeRangeService || []}
                                    value={timeService}
                                    onChange={(value) => handleTimeChange(value)}
                                    placeholder="Select an option"
                                />
                            </View>
                        )}
                    </View>

                )}


            </ScrollView>

        </View>
    );
};

export default Step1;
