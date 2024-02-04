import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import PagerView from 'react-native-pager-view';
import { Entypo } from '@expo/vector-icons';

export default function CategorySection() {
    const [test, setTest] = useState([1, 2, 3, 4, 5])


    return (
        
        <PagerView className="w-full h-72 " style={{ flex: 1 / 1.9 }} initialPage={0}>

            {
                test.map((element, index) =>
                    <View key={index} >
                        <View className=" py-2 flex-row items-center justify-between">
                            <View className={`w-[48%] flex-col justify-evenly px-3 h-[100%] bg-[#baf6db] rounded-3xl`}>
                                <View className={`w-11 h-11 flex-col items-center justify-center rounded-full bg-white`}>
                                    <Entypo className={``} name="game-controller" size={24} color="black" />
                                </View>
                                <Text>Game Desijjgn</Text>
                                <View>
                                    <Text>Today</Text>
                                <View className="flex-row items-end gap-x-1">
                                    <Text className={`text-4xl`}>11:30</Text><Text>am</Text>

                                </View>
                                </View>
                                <TouchableOpacity className={`py-3 bg-black rounded-full`}>
                                    <Text className={`text-center text-white`}>Mark as completed</Text>
                                </TouchableOpacity>
                            </View>

                            <View className={`w-[48%] flex-col justify-between  h-[100%] rounded-3xl`}>
                                <View className={`h-[48%] flex-row justify-evenly py-4 bg-[#c4f1ff] w-[100%] rounded-3xl`}>
                                    <View className={`flex-col items-center`}>
                                        <View className={`w-11 h-11 flex-col items-center justify-center rounded-full bg-white`}>
                                            <Entypo className={``} name="game-controller" size={24} color="black" />
                                        </View>
                                        <View className={` border-r-4 border-dotted  w-1 h-14 border-blue-500/70`}></View>
                                    </View>
                                    <View className={`flex-col h-full items-start justify-between`}>
                                        <View className="h-8">
                                            <Text className={`text-xl`}>Read Book </Text>
                                            <Text>08h Left </Text>
                                        </View>
                                        <View className="h-8">
                                            <Text>Scheduuled</Text>
                                            <Text>07:00 - 09:00</Text>
                                        </View>
                                    </View>
                                </View>

                                <View className={`h-[48%]  flex-col  justify-evenly p-2 bg-[#eedafe] w-[100%] rounded-3xl`}>
                                    <View className={`flex-row items-start justify-between px-2`}>
                                        <Text className={`text-lg w-[60%]`}>Completed</Text>
                                        <Text className={`text-lg `}>80%</Text>
                                    </View>
                                    <TouchableOpacity className={`py-3 rounded-full bg-black`}>
                                        <Text className={`text-white text-center`}>Analysis</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>
                )
            }

        </PagerView>

    )
}
