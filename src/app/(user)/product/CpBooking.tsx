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
import { router, Stack, useNavigation } from "expo-router";
import moment, { duration } from "moment";
import { APP_COLOR } from "@/app/utils/constant";
import { currencyFormatter, getEmployeeFreeTimeSpa, getEmployeeSpa, getProfileAPI, placeBookingAPI } from "@/app/utils/API";
import { getCateServiceBookingAPI, getLocationSpa } from "@/app/utils/API";
import CmSelect from "@/components/CmSelect/CmSelect";
import imgLocation from "@/assets/spaHome1.jpg";
import imgStaff from "@/assets/icons/face.png";
import { useCurrentApp } from "@/context/app.context";
import Step1 from "./step/Step1";
import Step2 from "./step/Step2";
import Step3 from "./step/Step3";
import Step4 from "./step/Step4";
const Booking = () => {
    const {
        booking, setBooking,
    } = useCurrentApp();
    const [isLoading, setIsLoading] = useState(true);
    const [step, setStepService] = useState<number>(1);

    const handlePrevBooking = async () => {
        console.log(booking);
        setStepService(step - 1);
    };
    const handleNextBooking = async () => {
        console.log(booking);
        setStepService(step + 1);
    };
    const handleBooking = async () => {
        try {
            setIsLoading(true);

            const res = await placeBookingAPI(booking);
            if (res && res.data) {
                console.log(">>> Booking Successful:", res);
                Toast.show("Success Booking!", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.vang,
                    opacity: 1,
                });
                //clear data
                handleClearBooking()
                router.navigate("/(tabs)/makeanapointment");
            } else {
                console.log("Unexpected Response Format:", res);
                const m = Array.isArray(res.message)
                    ? res.message[0]
                    : res.message || "tc"; // Add fallback message
                Toast.show(m, {
                    duration: Toast.durations.LONG,
                    textColor: "red",
                    backgroundColor: APP_COLOR.vang,
                    opacity: 1,
                });
            }
        } catch (error) {
            console.error("Error fetching fetchEmployeeService:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleClearBooking = async () => {
        setBooking({
            bookingTime: '',
            bookingnotes: '',
            serviceIds: [],
            locationId: null,
            employeeId: null,
            customerId: null,
        } as any);
    };
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ display: step === 1 ? 'flex' : 'none' }}>
                        <Step1 />
                    </View>
                    <View style={{ display: step === 2 ? 'flex' : 'none' }}>
                        <Step2 />
                    </View>
                    <View style={{ display: step === 3 ? 'flex' : 'none' }}>
                        <Step3 />
                    </View>
                    <View style={{ display: step === 4 ? 'flex' : 'none' }}>
                        <Step4 />
                    </View>
                </View>
            </ScrollView>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                    marginBottom: 15,
                    padding: 10,
                }}
            >
                {step > 1 && (
                    <View style={{ flex: 1 }} >
                        <Pressable
                            disabled={!booking.bookingTime}
                            onPress={handlePrevBooking}
                            style={({ pressed }) => ({
                                opacity: pressed === true ? 0.5 : 1,
                                padding: 10,
                                backgroundColor: !booking.bookingTime ? APP_COLOR.darkGray : APP_COLOR.vang,
                                borderRadius: 3,
                            })}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    textAlign: "center",
                                }}
                            >
                                Back
                            </Text>
                        </Pressable>
                    </View>
                )}
                {step === 4 && (
                    <View style={{ flex: 1 }} >
                        <Pressable
                            onPress={handleBooking}
                            style={({ pressed }) => ({
                                opacity: pressed === true ? 0.5 : 1,
                                padding: 10,
                                backgroundColor: !booking.bookingTime ? APP_COLOR.darkGray : APP_COLOR.vang,
                                borderRadius: 3,
                            })}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    textAlign: "center",
                                }}
                            >
                                Booking
                            </Text>
                        </Pressable>
                    </View>
                )}
                {step < 4 && (
                    <View style={{ flex: 1 }}>
                        <Pressable
                            disabled={!booking.bookingTime}
                            onPress={handleNextBooking}
                            style={({ pressed }) => ({
                                opacity: pressed === true ? 0.5 : 1,
                                padding: 10,
                                backgroundColor: !booking.bookingTime ? APP_COLOR.darkGray : APP_COLOR.vang,
                                borderRadius: 3,
                            })}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    textAlign: "center",
                                }}
                            >
                                Next
                            </Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </View>
    );
};

export default Booking;
