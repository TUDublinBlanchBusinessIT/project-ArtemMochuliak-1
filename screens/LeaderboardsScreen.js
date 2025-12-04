import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";

export default function LeaderboardsScreen() {
  return (
    <View style={[styles.feed_container, { flex: 1, padding: 20 }]}>
      <Text style={styles.heading}>Leaders</Text>
    </View>
  );
}
