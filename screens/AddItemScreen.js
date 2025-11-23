import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";

export default function AddItemScreen() {
  return (
    <View style={styles.centerScreen}>
      <Text style={styles.heading}>Add your item</Text>
    </View>
  );
}
