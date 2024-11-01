import { Image, Platform, StyleSheet, Text, View } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import { APP_COLOR } from "@/app/utils/constant";
import { useCurrentApp } from "@/context/app.context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const styles=StyleSheet.create({
    container:{
        gap:3,
       flex:1,
       borderBottomLeftRadius:25,
       borderBottomRightRadius:25
    },
    location:{
        flexDirection:"row",
        alignItems:"flex-end"
    }
})

const HeaderHome = () => {
    const{theme, appState}= useCurrentApp();

    const backend=Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_ANDROID_API_URL
    : process.env.EXPO_PUBLIC_IOS_API_URL;

    const baseImage=`${backend}/images/avatar`
    return (
        <View style={styles.container}>
            <View style={{paddingRight:20, flexDirection:"row",alignItems:"center",display:"flex",justifyContent:"space-between"}}>
            <View style={{paddingLeft:5, flexDirection:"row",alignItems:"center",display:"flex"}}>
                <Image
                style={{height:50,width:50}}
                source={{uri:`${baseImage}/${appState?.user.avatar}`}}
                />
                <View style={{paddingLeft:10}}>
                    <Text style={{color:APP_COLOR.vang, fontSize:20}}>happy new day,</Text>
                    <Text>{appState?.user.name}</Text>
                </View>
            </View>
            <MaterialCommunityIcons name="bell-ring-outline" size={24} color="black" />
            </View>
            <View style={styles.location}>
            <Entypo 
            name="location-pin" 
            size={24}
             color={APP_COLOR.vang}
              />
              <Text>Dia chi</Text>
            </View>
        </View>
    )
}

export default HeaderHome;
