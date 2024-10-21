import { Text, View, StyleSheet } from "react-native"
import { APP_COLOR } from "../utils/constant";
import ShareButton from "@/components/button/share.button";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context"
import ShareInput from "@/components/input/share.input";
import SocicalButton from "@/components/button/socical.button";
import { Link, router } from "expo-router";
import axios from "axios";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: 30,
        marginHorizontal: 20,
        gap: 10
    },
    inputGroup: {
        padding: 5,
        gap: 10
    },
    text: {
        fontSize: 18
    },
    input: {
        backgroundColor: "#E8ECF4",
        borderColor: APP_COLOR.vienInput,
        borderWidth: 1,
        paddingHorizontal: 7,
        paddingVertical: 10,
        borderRadius: 5
    }
})
const SignUpPage = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    //const [confirmpassword, setConfirmPassword] = useState("");


    //console.log(">>> check url backend: ", URL_BACKEND)

    // useEffect(() => {
    //     const fetchAPI = async () => {
    //         try {
    //             const res = await axios.get(process.env.EXPO_PUBLIC_API_URL!);
    //             console.log(">>> check res: ", res.data)
    //         } catch (error) {
    //             console.log(">>> check error: ", error)
    //         }

    //     }
    //     fetchAPI()
    // }, [])

    const handleSignUp = async () => {
        const url = `${process.env.EXPO_PUBLIC_API_URL}/api/v1 / auth / register`
        try {
            const res = await axios.post(url, { email, password, name });
            console.log(">>> check res: ", res.data)
        } catch (error) {
            console.log(">>> check error: ", error)
        }
        alert("call me")
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 600,
                        marginVertical: 30
                    }}>
                        Hello! Sign up to get started</Text>
                </View>
                <ShareInput
                    title="Full name"
                    value={name}
                    setValue={setName}
                />
                <ShareInput
                    title="Email"
                    keyboardType="email-address"
                    value={email}
                    setValue={setEmail}
                />
                <ShareInput
                    title="password"
                    secureTextEntry={true}
                    value={password}
                    setValue={setPassword}
                />
                {/* <ShareInput
                    title="Confirm password"
                    secureTextEntry={true}
                    value={confirmpassword}
                    setValue={setConfirmPassword}
                /> */}
                <View style={{ marginVertical: 10 }}></View>

                <ShareButton
                    title="Register"
                    onPress={handleSignUp}
                    //  onPress={() => { console.log(name, email, password) }}
                    textStye={{
                        textTransform: "uppercase",
                        color: "#fff",
                        paddingVertical: 5
                    }}
                    btnStyle={{
                        // backgroundColor: "white",
                        justifyContent: "center",
                        borderRadius: 5,
                        marginHorizontal: 10,
                        paddingVertical: 10,
                        backgroundColor: APP_COLOR.vang,
                    }}
                    pressStye={{ alignSelf: "stretch" }}
                />
                <SocicalButton />
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "center",
                    paddingVertical: 10
                }}>
                    <Text style={{
                        color: "black"
                    }}> Already have an account?</Text>
                    <Link href={"/"}>
                        <Text style={{ color: APP_COLOR.vang, textDecorationLine: 'underline' }}>Sign in now</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignUpPage;