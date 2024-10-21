import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import ShareButton from "../components/button/share.button";
import { APP_COLOR } from "./utils/constant";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import bg from '@/assets/auth/pumice-stone-salt-la-stone-candles-flower-white-background.jpg';
import fbLogo from '@/assets/auth/facebook.png';
import ggLogo from '@/assets/auth/google.png';
import { LinearGradient } from "expo-linear-gradient";
import TextBetweenLine from "@/components/button/text.beetween.line";
import { Link, Redirect } from "expo-router";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    welcomeText: {
        flex: 0.6,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 20
    },
    welcomeBnt: {
        flex: 0.4,
        gap: 30
    },
    heading: {
        fontSize: 50,
        fontWeight: "600",
    },
    body: {
        fontSize: 40,
        color: APP_COLOR.vang,
        marginVertical: 10,
    },
    footer: {
        fontSize: 15
    },
})
const WelcomePage = () => {

    if (true) {
        return (
            <Redirect href={"/(auth)/signup"} />
        )
    }
    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={bg}
        >
            <LinearGradient
                style={{ flex: 1 }}
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                locations={[0.2, 0.8]}
            >
                <View style={styles.container}>
                    <View style={styles.welcomeText}>
                        <Text style={styles.heading}>
                            Welcome to
                        </Text>
                        <Text style={styles.body}>
                            RELUX
                        </Text>
                        <Text style={styles.footer}>
                            Explore the best spa services anytime, anywhere.
                        </Text>
                    </View>
                    <View style={styles.welcomeBnt}>
                        <TextBetweenLine title="Login with" />
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 30
                        }}>
                            <ShareButton
                                title="facebook"
                                onPress={() => alert("me")}
                                textStye={{ textTransform: "uppercase" }}
                                btnStyle={{
                                    justifyContent: "center",
                                    borderRadius: 30,
                                    backgroundColor: "#fff"
                                }}
                                icons={
                                    <Image source={fbLogo} />
                                }
                            />

                            <ShareButton
                                title="google"
                                onPress={() => alert("me")}
                                textStye={{ textTransform: "uppercase" }}

                                btnStyle={{
                                    justifyContent: "center",
                                    borderRadius: 30,
                                    paddingHorizontal: 20,
                                    backgroundColor: "#fff"
                                }}
                                icons={
                                    <Image source={ggLogo} />
                                }
                            />
                        </View>
                        <View>
                            <ShareButton
                                title="Login with email"
                                onPress={() => alert("me")}
                                textStye={{ color: "#fff", paddingVertical: 5 }}
                                btnStyle={{
                                    // backgroundColor: "white",
                                    justifyContent: "center",
                                    borderRadius: 30,
                                    marginHorizontal: 50,
                                    paddingVertical: 10,
                                    backgroundColor: APP_COLOR.vang,
                                    borderColor: "#505050",
                                    borderWidth: 1
                                }}
                                pressStye={{ alignSelf: "stretch" }}
                            />
                            {/* <Text>đăng nhập với email</Text> */}
                        </View>
                        <View style={{
                            flexDirection: "row",
                            gap: 10,
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                color: "white"
                            }}> Don't have an account?</Text>
                            <Link href={"/(auth)/signup"}>
                                <Text style={{ color: APP_COLOR.vang, textDecorationLine: 'underline' }}>Sign up now</Text>
                            </Link>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </ImageBackground >
    )
}

export default WelcomePage;