import React, { useEffect } from 'react';
import { View, StatusBar, SafeAreaView, Text } from 'react-native';
import { ContextProvider } from './utils/context/ContextProvider/ContextProvider';
import { NavigationContainer } from '@react-navigation/native';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import HomeScreen from './App/Screens/HomeScreen/HomeScreen';
import Authentification from './App/Screens/Auth/Authentification';
import * as SecureStore from 'expo-secure-store';
import { clerk } from '@clerk/clerk-expo/dist/singleton';



export default function App() {

  const tokenCache = {
    async getToken(key) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };
  
  
  return (
    <>
      <ClerkProvider  tokenCache={tokenCache} publishableKey={"pk_test_YWRhcHRpbmctYmx1ZWdpbGwtMTAuY2xlcmsuYWNjb3VudHMuZGV2JA"}>
        <ContextProvider>
          <NavigationContainer>
            <SignedIn>
              <View>
                <HomeScreen />
              </View>
            </SignedIn>
            <SignedOut>
              <Authentification />
            </SignedOut>
          </NavigationContainer>
        </ContextProvider>
      </ClerkProvider>
    </>
  );
}
