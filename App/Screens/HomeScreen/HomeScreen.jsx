import { View, Text, TextInput, ScrollView, } from 'react-native'
import React from 'react'
import Header from '../../Layouts/Header'
import { useUser } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';
import CategorySection from './components/CategorySection';

export default function HomeScreen() {


    const { isLoaded, isSignedIn, user } = useUser();
    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <ScrollView>
            <View className={` px-4`}>
                <Header />
                <View className=" py-2">
                    <Text className={`text-4xl font-extrabold`}>Hello, {user.firstName}</Text>
                    <Text className={`text-xl font-extralight text-gray-400  mt-1`}>19 Tasks Today</Text>
                </View>
                <View className={`flex-row items-center gap-x-3 p-4 mt-2 rounded-2xl bg-[#eaeaea] `}>
                    <AntDesign name="search1" size={24} color="black" />
                    <TextInput className="text-lg" placeholder='Search Task...' />
                </View>
                <View className={`mt-2 py-3 flex-row justify-between items-center`}>
                    <Text className={`text-2xl font-extrabold `}>Categories</Text>
                    <AntDesign name="right" size={24} color="black" />
                </View>
                    
                <CategorySection />

                <View className="h-max bg-black">
                    
                </View>
            </View>
        </ScrollView>
    )
}