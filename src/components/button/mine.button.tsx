import { Pressable, StyleSheet, Text, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';

const styles = StyleSheet.create({
    text: {
        textTransform: 'uppercase',

    },
    bntContainer: {
        borderWidth: 1,
        borderColor: "green",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: "#ccc"
    }

})
interface IProps {
    title: string;
    onPress: () => void;
}
const MineButton = (props: IProps) => {
    const { title, onPress } = props;
    return (
        <>
            <Pressable
                style={({ pressed }) => ({
                    opacity: pressed === true ? 0.5 : 1,
                    alignSelf: "flex-start",
                })}
                onPress={onPress}


            >
                <View style={styles.bntContainer}>
                    <AntDesign
                        name="pluscircle"
                        size={24} color="origin"
                    />
                    <Text style={styles.text}>{title}</Text>
                </View>
            </Pressable>
        </>
    )
}

export default MineButton;