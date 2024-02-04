import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function GuideScreen({ onGuideScreenClose }) {
  const [showGuideScreen, setShowGuideScreen] = useState(true);



  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('hasShownGuideScreen', 'true');
      setShowGuideScreen(false);
      onGuideScreenClose(); // Callback to inform the parent component about guide screen close
    } catch (error) {
      console.error('Error setting guide screen status:', error);
    }
  };

    return (
      <View className={`h-screen flex-col justify-evenly items-center p-6`}>
            <Image className="w-[700px] -top-[430px] h-[700px] absolute" source={require("../../../assets/img/blob.png")} />

        <View>
          <Image className="w-96 h-96" source={require("../../../assets/img/GuidePhoto.png")} />
        </View>
        <View className='relative flex-col'>
          <Text className="text-3xl font-extrabold">Less Stress, More Achievement & Productivity with <Text className="text-purple-600">ProTasker</Text></Text>
          <Text className="text-lg font-light mt-4">Your Key To Organised Tasks And Streamlined Success</Text>
        </View>
        <TouchableOpacity onPress={handleGetStarted} className="bg-black w-[100%] py-3 rounded-full">
          <Text className="text-white text-center text-xl">Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }


