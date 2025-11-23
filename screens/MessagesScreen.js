import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";

export default function MessagesScreen() {
  return (
    <View style={styles.centerScreen}>
      <Text style={styles.heading}>Messages</Text>
    </View>
  );
}
