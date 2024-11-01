import { StyleSheet, Text, View,TextInput } from "react-native"
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useState } from "react";
import { SearchBar } from "react-native-screens";
import { APP_COLOR } from "@/app/utils/constant";

const styles=StyleSheet.create({
    container:{
        backgroundColor:APP_COLOR.darkGray,
        gap:5,
        flexDirection:"row",
        margin:5,
        paddingHorizontal:3,
        paddingVertical:7,
        borderRadius:4,
        paddingLeft:5
    },
    
})
type SerachBarComponentProps={};

const SearchHome = () => {
    return (
       <View style={styles.container}>
            <EvilIcons name="search" size={20} color="black" />
            <Text style={{color:"#707070"}}>Search for service...</Text>
       </View>
    
    )
}

export default SearchHome;
