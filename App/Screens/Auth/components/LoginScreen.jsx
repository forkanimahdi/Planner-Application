import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../../../hooks/warmUpBrowser';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useOAuth, useSignIn } from '@clerk/clerk-expo';

export default function LoginScreen() {

    const { signIn, setActive, isLoaded } = useSignIn();
    // const navigation = useNavigation();

    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");



    useWarmUpBrowser();
    WebBrowser.maybeCompleteAuthSession();
    const navigation = useNavigation()
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    

    const authing = async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();
    
            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
                console.error("Invalid or missing session ID");
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }
    

    const onSignInPress = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignIn = await signIn.create({
                identifier: emailAddress,
                password,
            });
            // Save the token to the secure store so that u dont have to login each time
            await SecureStore.setItemAsync('userToken', completeSignIn.createdSessionId);
            const storedToken = await tokenCache.getToken('userToken');
            console.log(storedToken + "hhh");
            // Set the active session
            await setActive({ session: completeSignIn.createdSessionId });

        } catch (err) {
            console.log("error line 60"+err);
        }
    };

    return (
        <View className="h-screen flex-col items-center justify-center gap-y-5 p-10  bg-[#fafafa] ">
            {/* <Image className="w-[700px] -top-[430px] h-[700px] absolute" source={require("../../../../assets/img/blob.png")} /> */}
            <View>
                {/* <Image className="w-80 h-56" source={require("../../../assets/img/Welcome.png")} /> */}
            </View>
            <View className="w-[100%] flex-col gap-y-4 items-center ">
                <Image className="w-24 h-24 rounded-xl" source={require("../../../../assets/img/Logo.png")} />
                <Text className="text-3xl">Welcome to <Text className="text-purple-600">ProTasker</Text> !</Text>

                <View className="flex-row w-[100%] items-center border shadow rounded-full p-3 justify-around">
                    <MaterialIcons name="email" size={24} color="black" />
                    <TextInput autoCapitalize="none" value={emailAddress} placeholder="Email..." onChangeText={(emailAddress) => setEmailAddress(emailAddress)} keyboardType='email-address' className=" teenter w-[80%]" />
                </View>
                <View className="flex-row w-[100%] items-center border shadow rounded-full p-3 justify-around">
                    <Entypo name="lock" size={24} color="black" />
                    <TextInput value={password} placeholder="Password..." secureTextEntry={true} onChangeText={(password) => setPassword(password)} textContentType='password' className=" teenter w-[80%]" />
                </View>

            </View>

            <TouchableOpacity onPress={onSignInPress} className="py-5 rounded-full bg-black w-[100%]">
                <Text className="text-center text-white">Login </Text>
            </TouchableOpacity>
            <View className="w-[100%] flex-row items-center justify-between">
                <View className="w-[40%] bg-slate-500 h-[2px]"></View>
                <Text className="text-center text-xl static z-20">or</Text>
                <View className="w-[40%] bg-slate-500 h-[2px]"></View>
            </View>
            <TouchableOpacity onPress={authing}  className="py-3 rounded-full border w-[100%] flex-row items-center justify-center gap-x-2">
                <Image className="w-7 h-7 rounded-xl" source={require("../../../../assets/img/google.png")} />
                <Text className="text-center">Continue with Google </Text>
            </TouchableOpacity>
            <Text className="text-center">You don't have an account? <Text onPress={() => { navigation.navigate("Signup"); }} className="text-purple-600">Sign up</Text> </Text>
        </View>
    )
}