import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import MessagesScreen from "./MessagesScreen";
import CommunityScreen from "./CommunityScreen";
import ProfileScreen from "./ProfileScreen";
import AddItemScreen from "./AddItemScreen";
import { styles } from "../styles/styles";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeTab() {
  return (
    <View style={styles.centerScreen}>
      <Text style={styles.heading}>Home Screen Content</Text>
    </View>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeTab} />
      <HomeStack.Screen name="AddItem" component={AddItemScreen} />
    </HomeStack.Navigator>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            ...styles.bottomNav,
            backgroundColor: "#fff", 
            elevation: 0,         
            shadowOpacity: 0,        
          },
          tabBarActiveTintColor: "#10B981",
          tabBarInactiveTintColor: "#6B7280",
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            tabBarLabel: "Messages",
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubble-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="AddItemTab"
          component={AddItemScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: () => (
              <View style={styles.addButtonContainer}>
                <Ionicons name="add" size={32} color="#fff" />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            tabBarLabel: "Community",
            tabBarIcon: ({ color }) => (
              <Ionicons name="people-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
