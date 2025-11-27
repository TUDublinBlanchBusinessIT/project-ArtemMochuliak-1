import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAuth } from "firebase/auth";
import { styles } from "../styles/styles";

export default function ProfileScreen() {
  const auth = getAuth();
  const user = auth.currentUser;

  const username =
    user?.displayName || user?.email?.split("@")[0] || "User";

  const email = user?.email || "No email";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3FFF5" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        {/* Avatar Circle */}
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: "#10B981",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Ionicons name="person-outline" size={60} color="#fff" />
        </View>

        {/* Username */}
        <Text style={{ fontSize: 24, fontWeight: "700", color: "#111" }}>
          {username}
        </Text>

        {/* Email */}
        <Text style={{ fontSize: 16, marginTop: 4, color: "#6B7280" }}>
          {email}
        </Text>
      </View>
    </SafeAreaView>
  );
}
