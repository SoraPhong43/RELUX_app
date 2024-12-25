import HeaderHome from "@/components/home/header.home";
import { useEffect, useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
    Image,
    StyleSheet
} from "react-native";
import Toast from "react-native-root-toast";

import SelectSpa from "@/components/InfoBooking/select.spa";
import CmSelectMulti from "@/components/CmSelect/CmSelectMulti";
import DropDownFacility from "@/components/InfoBooking/choose.time";
import { router, useNavigation } from "expo-router";
import moment, { duration } from "moment";
import { APP_COLOR } from "@/app/utils/constant";
import { currencyFormatter, getEmployeeFreeTimeSpa, getEmployeeSpa, getProfileAPI, placeBookingAPI } from "@/app/utils/API";
import { getCateServiceBookingAPI, getLocationSpa } from "@/app/utils/API";
import CmSelect from "@/components/CmSelect/CmSelect";
import imgLocation from "@/assets/spaHome1.jpg";
import imgStaff from "@/assets/icons/face.png";
import { useCurrentApp } from "@/context/app.context";
const Step2 = () => {
    const {
        booking, setBooking,
    } = useCurrentApp();
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, paddingHorizontal: 40 }} >
                    <View
                        style={{
                            padding: 10,
                        }}
                    >
                        <Text style={styles.label}>{booking?.locationName}</Text>
                        <Text style={{
                            backgroundColor: "#ffffff",
                            borderColor: APP_COLOR.darkGray,
                            marginBottom: 5,
                            fontSize: 14,
                        }}>{booking?.bookingTime ? moment(booking?.bookingTime).format('DD/MM/YYYY HH:mm') : '--'}</Text>
                    </View>
                    <View
                        style={{
                            padding: 10,
                        }}
                    >
                        <Text style={styles.label}>Location</Text>
                        <Text style={{
                            backgroundColor: "#ffffff",
                            borderColor: APP_COLOR.darkGray,
                            marginBottom: 5,
                            fontSize: 14,
                        }}>{booking?.locationName}</Text>
                    </View>
                    <View
                        style={{
                            padding: 10,

                        }}
                    >
                        <Text style={styles.label}>Employee</Text>
                        <Text style={{
                            backgroundColor: "#ffffff",
                            borderColor: APP_COLOR.darkGray,
                            marginBottom: 5,
                            fontSize: 14,
                        }}>{booking?.employeeName}</Text>
                    </View>
                </View>
                <View
                    style={{
                        padding: 20,
                    }}
                >
                    <View style={{
                        paddingVertical: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        borderColor: APP_COLOR.darkGray,
                        borderTopWidth: 1,
                    }}>
                        <Text style={styles.label}>Total (After discount): </Text>
                        <Text style={styles.label}>{booking?.price - booking?.discountPercentage * booking?.price}</Text>
                    </View>
                </View>
            </ScrollView>

        </View >
    );
};
const styles = StyleSheet.create({

    label: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 8,
        color: 'Purple',
    },

});

export default Step2;
