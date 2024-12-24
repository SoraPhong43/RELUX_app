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
import ShareInput from "@/components/input/share.input";
const Step3 = () => {
    const {
        booking, setBooking,
    } = useCurrentApp();

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, padding: 20, }}>
                <View
                    style={{
                        padding: 10,
                        borderColor: APP_COLOR.darkGray,
                        borderWidth: 1,
                        borderBottomWidth: 0,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={styles.label}>Price</Text>
                    <Text style={styles.label}>{
                        currencyFormatter(
                            booking?.price - 0
                        )}
                    </Text>
                </View>
                <View
                    style={{
                        padding: 10,
                        borderColor: APP_COLOR.darkGray,
                        borderWidth: 1,
                        borderBottomWidth: 0,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={styles.label}>Discount</Text>
                    <Text style={styles.label}>{booking?.discountPercentage * 100}%</Text>
                </View>
                <View
                    style={{
                        padding: 10,
                        borderColor: APP_COLOR.darkGray,
                        borderWidth: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={styles.label}>Total</Text>
                    <Text style={styles.label}>{
                        currencyFormatter(
                            booking?.price - booking?.discountPercentage * booking?.price
                        )}
                    </Text>
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

export default Step3;
