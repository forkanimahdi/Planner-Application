import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useOAuth, useSignUp } from '@clerk/clerk-expo';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../../../hooks/warmUpBrowser';

export default function SignupScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const navigation = useNavigation()

  //************************************************************ */
  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    //! create user
    try {
      await signUp.create({ firstName, lastName, emailAddress, password, });
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });

    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
    navigation.navigate('Login');
  };

  useWarmUpBrowser();
  WebBrowser.maybeCompleteAuthSession();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const authing = async () => {
      try {
          const { createdSessionId, signIn, signUp, setActive } =
              await startOAuthFlow();

          if (createdSessionId) {
              setActive({ session: createdSessionId });
          } else {
              // Use signIn or signUp for next steps such as MFA
          }
      } catch (err) {
          console.error("OAuth error", err);
      }
  }
  return (
    <View>
      {!pendingVerification && (
        <View className="h-screen flex-col items-center justify-evenly p-10  bg-[#fafafa] ">
          {/* <Image className="w-[700px] -top-[430px] h-[700px] absolute" source={require("../../../assets/img/blob.png")} /> */}
          <View>
            <Image className="w-24 h-24 rounded-xl" source={require("../../../../assets/img/Logo.png")} />
          </View>
          <Text className="text-3xl">Became a <Text className="text-purple-600">ProTasker</Text> !</Text>
          {/* Form */}
          <View className="w-[100%] flex-col gap-y-3 ">
            <View className="flex-row items-center border shadow rounded-full p-3 justify-around">
              <FontAwesome name="user" size={24} color="black" />
              <TextInput autoCapitalize="none" value={firstName} placeholder="First Name..." onChangeText={(firstName) => setFirstName(firstName)} className=" teenter w-[80%]" />
            </View>
            <View className="flex-row items-center border shadow rounded-full p-3 justify-around">
              <FontAwesome name="user" size={24} color="black" />
              <TextInput autoCapitalize="none" value={lastName} placeholder="Last Name..." onChangeText={(lastName) => setLastName(lastName)} className=" teenter w-[80%]"  />
            </View>
            <View className="flex-row items-center border shadow rounded-full p-3 justify-around">
              <MaterialIcons name="email" size={24} color="black" />
              <TextInput autoCapitalize="none" value={emailAddress} placeholder="Email..." onChangeText={(email) => setEmailAddress(email)} keyboardType='email-address' className=" teenter w-[80%]" />
            </View>
            <View className="flex-row items-center border shadow rounded-full p-3 justify-around">
              <Entypo name="lock" size={24} color="black" />
              <TextInput  value={password} placeholder="Password..." secureTextEntry={true} onChangeText={(password) => setPassword(password)} textContentType='password' className=" teenter w-[80%]" />
            </View>

          </View>

          <TouchableOpacity  onPress={onSignUpPress} className="py-5 rounded-full bg-black w-[100%]">
            <Text className="text-center text-white">Sign up</Text>
          </TouchableOpacity>
          <View className="w-[100%] flex-row items-center justify-between">
            <View className="w-[40%] bg-slate-500 h-[2px]"></View>
            <Text className="text-center text-xl static z-20">or</Text>
            <View className="w-[40%] bg-slate-500 h-[2px]"></View>
          </View>
          <TouchableOpacity onPress={authing} className="py-3 rounded-full border w-[100%] flex-row items-center justify-center gap-x-2">
            <Image className="w-7 h-7 rounded-xl" source={require("../../../../assets/img/google.png")} />
            <Text className="text-center">Continue with Google </Text>
          </TouchableOpacity>
          <Text className="text-center">Already have an account ? <Text onPress={() => { navigation.navigate("Login") }} className="text-purple-600">Login</Text> </Text>
        </View>
      )}
      {pendingVerification && (
        <View className="h-screen flex-col items-center justify-center p-10 gap-y-7">
          <Text className="text-2xl">Verify your Email !</Text>
          <Text className="text-sm">We Just Sent You a Verification Code To Your Email!</Text>
            <TextInput className="border py-3 text-xl w-[100%] text-center rounded-full" value={code} placeholder="Code..." onChangeText={(code) => setCode(code)}
            />
          <TouchableOpacity  className="bg-black py-3 w-[100%] rounded-full" onPress={onPressVerify}>
            <Text className="text-white text-lg text-center">Verify Code</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}