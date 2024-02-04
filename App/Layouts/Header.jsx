import { View, Text , Image } from 'react-native'
import React from 'react'

export default function Header() {
    return (
        <View className="py-3 mt-4 flex-row items-center justify-between ">
            <View className="w-16 h-full  flex-row items-center justify-between">
                <Text className="text-lg font-bold">100</Text>
                <Image className="w-7 h-7" source={require("../../assets/img/reward.png")} />
            </View>
            <Image className="w-14 h-14" source={require("../../assets/img/profile.png")} />
        </View>
    )
}