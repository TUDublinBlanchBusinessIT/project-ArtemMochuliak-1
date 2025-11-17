import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

export default function App() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleAuth = () => setShowLogin(!showLogin);

  return (
    <NavigationContainer>
      {showLogin ? (
        <LoginScreen onSwitch={toggleAuth} />
      ) : (
        <SignUpScreen onSwitch={toggleAuth} />
      )}
    </NavigationContainer>
  );
}