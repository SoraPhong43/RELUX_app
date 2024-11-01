import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import BannerHome from "./banner.home";

const styles = StyleSheet.create({
    
})

const data=[
    {key:1, name:"Spa & Massage",source:require("@/assets/icons/spa&massage.png")},
    {key:2, name:"Sauna",source:require("@/assets/icons/sauna.png")},
    {key:3, name:"Face",source:require("@/assets/icons/face.png")},
    {key:4, name:"Reflexology",source:require("@/assets/icons/Reflexology.png")},
]
const data1 = Array(10).fill(1);
const TopListHome = () => {
    return (
        <View >
            <BannerHome/>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                directionalLockEnabled={true}
                alwaysBounceVertical={false}
                style={{marginVertical:15}}
            >
                <FlatList
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    numColumns={Math.ceil(data.length)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ 
                                padding: 10, 
                                margin: 5,
                                alignItems:"center"}}>
                                    <Image source={item.source}
                                    style={{height:35,width:35}}/>
                                    <Text style={{textAlign:"center"}}>{item.name}</Text>
                            </View>
                        )
                    }}
                />
            </ScrollView>
        </View>
    )
}

export default TopListHome;
