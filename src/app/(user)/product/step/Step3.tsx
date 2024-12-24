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

    const setNote = (note: string) => {
        setBooking((prevState) => {
            return {
                ...prevState,
                bookingnotes: note,
            };
        });

    };



    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, paddingHorizontal: 20, marginBottom: 20 }} >
                    <ShareInput
                        title="Name"
                        editable={false}
                        value={booking?.customerName}
                    />
                </View>
                <View
                    style={{
                        justifyContent: "flex-start",
                        flex: 1, paddingHorizontal: 20
                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 8 }}>Note</Text>
                    <TextInput
                        numberOfLines={3}
                        value={booking.bookingnotes}
                        onChangeText={(text) => setNote(text)}
                        style={{
                            backgroundColor: APP_COLOR.vienInput,
                            padding: 20,
                            borderRadius: 10,
                            borderColor: "white",
                            borderWidth: 1,
                            textAlignVertical: "top",
                        }}
                        placeholder="write note here"
                    />
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
