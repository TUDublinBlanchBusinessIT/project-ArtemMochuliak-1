import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import AddItemScreen from "./screens/AddItemScreen"; 

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        
      
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}