import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import { Entypo, FontAwesome, } from '@expo/vector-icons';
import TasksScreen from '../Screens/CategoriesScreen/CategoriesScreen';
import CategoriesScreen from '../Screens/CategoriesScreen/CategoriesScreen';
import NotificationScreen from '../Screens/NotificationScreen/NotificationScreen';
import ProfileScreen from '../Screens/Auth/ProfileScreen/ProfileScreen';
export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { height: 70 }, title:"", tabBarActiveTintColor: "#000"  }}>
            <Tab.Screen name='Home' component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" size={size} color={color} />
                    )
                }} />
            <Tab.Screen  name='Categories' component={CategoriesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="clipboard" size={size} color={color} />
                    )
                }} />
            <Tab.Screen name='Add' component={CategoriesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View className="bg-purple-500  p-3 rounded-full ">
                            <Entypo  name="plus" size={size} color={"white"} />
                        </View>
                    )
                }} />
            <Tab.Screen name='Notification' component={NotificationScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="bell" size={size} color={color} />
                    )
                }} />
            <Tab.Screen name='Profile' component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="user" size={size} color={color} />
                    )
                }} />
        </Tab.Navigator>

    )
}