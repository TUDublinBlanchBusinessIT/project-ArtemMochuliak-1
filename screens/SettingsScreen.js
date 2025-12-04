import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login"); 
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  return (
    <View style={[styles.feed_container, { flex: 1, padding: 20 }]}>
      <Text style={styles.heading}>Settings</Text>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "#ef4444",
          padding: 15,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 4,
          marginTop: 25,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
