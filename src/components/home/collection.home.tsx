import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import demo from "@/assets/spaHome1.jpg"
import { APP_COLOR } from "@/app/utils/constant";
interface IProps{
    name:string;
    description:string;
}

const styes= StyleSheet.create({
    container:{
        borderColor: "green",
    
    // flexDirection: "row",
    // justifyContent:"space-between",
    }
})
const CollectionHome=(props:IProps)=>{
    const{name,description}=props;
    const data=[
        {key:1,image:demo,name:"dich vu 1",price:500},
        {key:2,image:demo,name:"dich vu 2",price:500},
        {key:3,image:demo,name:"dich vu 3",price:500},
        {key:4,image:demo,name:"dich vu 4",price:5000},
        {key:5,image:demo,name:"dich vu 5",price:500}
    ]
    return(
        <>
        <View style={{height:10,backgroundColor:"#e9e9e9"}}></View>
        <View style={styes.container}>
            <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:5}}>
                <Text style={{fontSize:16,fontWeight:"600",color:APP_COLOR.vang,paddingLeft:5}}>{name}</Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <Text style={{color:"#5a5a5a",paddingRight:5}}>See all</Text>
                <AntDesign name="rightcircleo" size={16} color="black" style={{paddingRight:5}}/>
                </View>
                </View>
                <View style={{marginVertical:5}}>
                    <Text style={{color:"#5a5a5a",paddingLeft:5}}>{description}</Text>
                </View>
                <FlatList
                data={data}
                horizontal
                contentContainerStyle={{gap:5}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item,index})=>{
                    return(
                <View style={{backgroundColor:APP_COLOR.vienInput,
                borderRadius:15,
                 marginLeft: index === 0 ? 8 : 0,
                 marginBottom:5}}>
                    <Image
                    style={{height:100,width:150, borderTopLeftRadius:15, borderTopRightRadius:15}}
                     source={demo}/>
                     <View style={{padding:5}}>
                     <Text style={{fontWeight:500}}>{item.name}</Text>
                     </View> 
                     <View style={{flexDirection:"row",justifyContent:"space-between",padding:5}}>
                        <Text>{item.price}</Text>
                        <FontAwesome name="cart-plus" size={24} color="black"/>
                   
                    </View>
                </View> 
                    )
                }}
                />
            </View>
        </>
    )
}

export default CollectionHome;