import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { APP_COLOR } from "../../app/utils/constant";
import { ReactNode } from "react";

const styles = StyleSheet.create({
    bntContainer: {
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        backgroundColor: APP_COLOR.vang,
    }

})
interface IProps {
    title: string;
    onPress: () => void;

    textStye?: StyleProp<TextStyle>;
    pressStye?: StyleProp<TextStyle>;
    btnStyle?: StyleProp<TextStyle>;
    icons?: ReactNode
}
const ShareButton = (props: IProps) => {
    const { title, onPress, textStye, pressStye, btnStyle, icons } = props;
    return (
        <Pressable
            style={({ pressed }) => ([{
                opacity: pressed === true ? 0.5 : 1,
                alignSelf: "flex-start",
            }, pressStye])}
            onPress={onPress}
        >
            <View style={[styles.bntContainer, btnStyle]}>
                {icons}
                <Text style={textStye}>{title}</Text>
            </View>
        </Pressable>
    )
}

export default ShareButton;