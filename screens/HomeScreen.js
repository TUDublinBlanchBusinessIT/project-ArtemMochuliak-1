import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigationState } from "@react-navigation/native";

import MessagesScreen from "./MessagesScreen";
import CommunityScreen from "./CommunityScreen";
import ProfileScreen from "./ProfileScreen";
import AddItemScreen from "./AddItemScreen";
import SettingsScreen from "./SettingsScreen";
import HelpSupportScreen from "./HelpSupportScreen";
import EcoChallengesScreen from "./EcoChallengesScreen";
import SwapHistoryScreen from "./SwapHistoryScreen";
import LeaderboardsScreen from "./LeaderboardsScreen";
import AboutSwapifyScreen from "./AboutSwapifyScreen";
import HomeFeed from "./HomeFeed";

import { styles } from "../styles/styles";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const SCREEN_LABELS = {
  HelpSupport: "Help & Support",
  EcoChallenges: "Eco Challenges",
  SwapHistory: "Swap History",
  Leaderboards: "Leaderboards",
  AboutSwapify: "About Swapify",
  Settings: "Settings",
};

function getLabel(screenName) {
  return SCREEN_LABELS[screenName] || screenName.replace(/([A-Z])/g, " $1").trim();
}


function HomeMain() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
      <HomeFeed />
    </SafeAreaView>
  );
}


function wrapScreen(ScreenComponent) {
  return function Wrapped(props) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
        <ScreenComponent {...props} />
      </SafeAreaView>
    );
  };
}


function screenHeader(navigation) {
  return {
    headerShown: true,
    headerTitle: "",
    headerStyle: { backgroundColor: "#fff" },

    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
        <Ionicons name="menu" size={28} color="#000" />
      </TouchableOpacity>
    ),

    headerRight: () => (
      <Text style={{ fontSize: 18, fontWeight: "600", marginRight: 15 }}>Swapify</Text>
    ),

    animation: "none",
  };
}


function HomeStackScreen({ navigation }) {
  return (
    <Stack.Navigator screenOptions={() => screenHeader(navigation)}>
      <Stack.Screen name="HomeMain" component={HomeMain} />
      <Stack.Screen name="Settings" component={wrapScreen(SettingsScreen)} options={{ title: "Settings" }} />
      <Stack.Screen name="HelpSupport" component={wrapScreen(HelpSupportScreen)} options={{ title: "Help & Support" }} />
      <Stack.Screen name="EcoChallenges" component={wrapScreen(EcoChallengesScreen)} options={{ title: "Eco Challenges" }} />
      <Stack.Screen name="SwapHistory" component={wrapScreen(SwapHistoryScreen)} options={{ title: "Swap History" }} />
      <Stack.Screen name="Leaderboards" component={wrapScreen(LeaderboardsScreen)} options={{ title: "Leaderboards" }} />
      <Stack.Screen name="AboutSwapify" component={wrapScreen(AboutSwapifyScreen)} options={{ title: "About Swapify" }} />
      <Stack.Screen name="AddItem" component={wrapScreen(AddItemScreen)} options={{ title: "Add Item" }} />
    </Stack.Navigator>
  );
}

function MessagesStackScreen({ navigation }) {
  return (
    <Stack.Navigator screenOptions={() => screenHeader(navigation)}>
      <Stack.Screen name="MessagesMain" component={wrapScreen(MessagesScreen)} />
    </Stack.Navigator>
  );
}

function CommunityStackScreen({ navigation }) {
  return (
    <Stack.Navigator screenOptions={() => screenHeader(navigation)}>
      <Stack.Screen name="CommunityMain" component={wrapScreen(CommunityScreen)} />
    </Stack.Navigator>
  );
}

function ProfileStackScreen({ navigation }) {
  return (
    <Stack.Navigator screenOptions={() => screenHeader(navigation)}>
      <Stack.Screen name="ProfileMain" component={wrapScreen(ProfileScreen)} />
    </Stack.Navigator>
  );
}

function AddItemStackScreen({ navigation }) {
  return (
    <Stack.Navigator screenOptions={() => screenHeader(navigation)}>
      <Stack.Screen name="AddItemMain" component={wrapScreen(AddItemScreen)} />
    </Stack.Navigator>
  );
}


function BottomTabs() {
  const navState = useNavigationState((s) => s);

  const isDrawerScreen = (() => {
    try {
      const mainRoute = navState.routes[navState.index];
      const tabState = mainRoute.state;
      if (!tabState) return false;

      const tabRoute = tabState.routes[tabState.index];
      const stackState = tabRoute.state;
      if (!stackState) return false;

      const currentScreen = stackState.routes[stackState.index].name;

      return ["Settings", "HelpSupport", "EcoChallenges", "SwapHistory", "Leaderboards", "AboutSwapify"]
        .includes(currentScreen);
    } catch {
      return false;
    }
  })();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
      <Tab.Navigator
        detachInactiveScreens={false}
        screenOptions={{
          headerShown: false,
          lazy: false,
          tabBarActiveTintColor: isDrawerScreen ? "#6B7280" : "#10B981",
          tabBarInactiveTintColor: "#6B7280",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#e5e7eb",
          },
        }}
      >
        
        <Tab.Screen
          name="HomeTab"
          component={HomeStackScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.reset({
                index: 0,
                routes: [{ name: "HomeTab", state: { index: 0, routes: [{ name: "HomeMain" }] } }],
              });
            },
          })}
        />

        <Tab.Screen
          name="MessagesTab"
          component={MessagesStackScreen}
          options={{
            tabBarLabel: "Messages",
            tabBarIcon: ({ color }) => <Ionicons name="chatbubble-outline" size={24} color={color} />,
          }}
        />

        <Tab.Screen
          name="AddItemTab"
          component={AddItemStackScreen}
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
          name="CommunityTab"
          component={CommunityStackScreen}
          options={{
            tabBarLabel: "Community",
            tabBarIcon: ({ color }) => <Ionicons name="people-outline" size={24} color={color} />,
          }}
        />

        <Tab.Screen
          name="ProfileTab"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}


function CustomDrawer({ navigation }) {
  const screens = ["Settings", "HelpSupport", "EcoChallenges", "SwapHistory", "Leaderboards", "AboutSwapify"];

  const openScreen = (screenName) => {
    navigation.navigate("Main", {
      screen: "HomeTab",
      params: { screen: screenName },
    });
    navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView>
      {screens.map((screen, idx) => (
        <View key={screen}>
          <TouchableOpacity onPress={() => openScreen(screen)} style={{ padding: 15 }}>
            <Text style={{ fontSize: 16 }}>{getLabel(screen)}</Text>
          </TouchableOpacity>

          {idx < screens.length - 1 && (
            <View style={{ height: 1, backgroundColor: "#e5e7eb", marginHorizontal: 15 }} />
          )}
        </View>
      ))}
    </DrawerContentScrollView>
  );
}


export default function HomeScreen() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: "71%" },
      }}
    >
      <Drawer.Screen name="Main" component={BottomTabs} />
    </Drawer.Navigator>
  );
}
