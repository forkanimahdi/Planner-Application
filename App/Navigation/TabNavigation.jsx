import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import { Entypo, FontAwesome, } from '@expo/vector-icons';
export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='Home' component={HomeScreen}
                options={{
                    tabBarActiveBackgroundColor: '#0f172a',
                    tabBarActiveTintColor: "#fff",
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" size={size} color={color} />
                    )
                }} />
        </Tab.Navigator>

    )
}