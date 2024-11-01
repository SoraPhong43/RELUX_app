import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/socical.button"
import ShareInput from "@/components/input/share.input"
import { registerAPI } from "@/app/utils/API"
import { APP_COLOR } from "@/app/utils/constant"
import { Link, router } from "expo-router"
import { useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import Toast from "react-native-root-toast"
import { SafeAreaView } from "react-native-safe-area-context"
import { Formik } from "formik"
import { SignUpSchema } from "@/app/utils/validate.schema";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        gap: 10
    },

})

const SignUpPage = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)

    const handleSignUp = async (email: string, password: string, name: string) => {

        try {
            setLoading(true)
            const res = await registerAPI(email, password, name);
            setLoading(false)
            if (res.data) {
                // router.navigate("/(auth)/verify")
                router.replace({
                    pathname: "/(auth)/verify",
                    params: { email: email }
                })
            } else {
                const m = Array.isArray(res.message)
                    ? res.message[0] : res.message;

                Toast.show(m, {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.vang,
                    opacity: 1
                });

            }
        } catch (error) {
            console.log(">>> check error: ", error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <View style={styles.container}>
                <View>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 600,
                        marginVertical: 30
                    }}>Đăng ký tài khoản</Text>
                </View>
                <ShareInput
                    title="Họ tên"
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
                    title="Password"
                    secureTextEntry={true}
                    value={password}
                    setValue={setPassword}
                />

                <View style={{ marginVertical: 10 }}></View>
                <ShareButton
                    loading={loading}
                    title="Đăng Ký"
                    onPress={handleSignUp}
                    textStyle={{
                        textTransform: "uppercase",
                        color: "#fff",
                        paddingVertical: 5
                    }}
                    btnStyle={{
                        justifyContent: "center",
                        borderRadius: 30,
                        marginHorizontal: 50,
                        paddingVertical: 10,
                        backgroundColor: APP_COLOR.vang,

                    }}
                    pressStyle={{ alignSelf: "stretch" }}
                />

                <View style={{
                    marginVertical: 15,
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "center"
                }}>
                    <Text style={{
                        color: "black",
                    }}>
                        Đã có tài khoản?
                    </Text>
                    <Link href={"/(auth)/login"}>
                        <Text style={{ color: "black", textDecorationLine: 'underline' }}>
                            Đăng nhập.
                        </Text>
                    </Link>

                </View>

                <SocialButton
                    title="Or Register with" />
            </View> */}
            <Formik
                validationSchema={SignUpSchema}
                initialValues={{ email: '', password: '', name: '' }}
                onSubmit={values => handleSignUp(values.email, values.password, values.name)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={styles.container}>
                        <View>
                            <Text style={{
                                fontSize: 25,
                                fontWeight: 600,
                                marginVertical: 30
                            }}>Đăng ký tài khoản</Text>
                        </View>
                        <ShareInput
                            title="Họ tên"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            error={errors.name}
                        />

                        <ShareInput
                            title="Email"
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            error={errors.email}
                        />

                        <ShareInput
                            title="Password"
                            secureTextEntry={true}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            error={errors.password}
                        />

                        <View style={{ marginVertical: 10 }}></View>
                        <ShareButton
                            title="Đăng Ký"
                            onPress={handleSubmit}
                            textStyle={{
                                textTransform: "uppercase",
                                color: "#fff",
                                paddingVertical: 5
                            }}
                            btnStyle={{
                                justifyContent: "center",
                                borderRadius: 30,
                                marginHorizontal: 50,
                                paddingVertical: 10,
                                backgroundColor: APP_COLOR.vang,

                            }}
                            pressStyle={{ alignSelf: "stretch" }}
                        />

                        <View style={{
                            marginVertical: 15,
                            flexDirection: "row",
                            gap: 10,
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                color: "black",
                            }}>
                                Đã có tài khoản?
                            </Text>
                            <Link href={"/(auth)/login"}>
                                <Text style={{ color: "black", textDecorationLine: 'underline' }}>
                                    Đăng nhập.
                                </Text>
                            </Link>

                        </View>

                        <SocialButton
                            title="Đăng ký với"
                        />
                    </View>
                )}

            </Formik>
        </SafeAreaView>
    )
}

export default SignUpPage;