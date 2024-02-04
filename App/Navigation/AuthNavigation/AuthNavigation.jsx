import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../Screens/Auth/components/LoginScreen';
import SignupScreen from '../../Screens/Auth/components/SignupScreen';

export default function AuthNavigation() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator  screenOptions={{ headerShown: false }}  initialRouteName="Login">
            <Stack.Screen name="Login"  component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    )
}