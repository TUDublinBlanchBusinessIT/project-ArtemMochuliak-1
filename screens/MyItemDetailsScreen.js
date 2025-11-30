import React, { useState } from "react";
import { View, Text, Image, FlatList, Dimensions, ScrollView, TouchableOpacity, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "../styles/styles";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function MyItemDetailsScreen({ route, navigation }) {
  const item = route.params?.item;

  if (!item) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No item data found.</Text>
      </View>
    );
  }

  const [activeIndex, setActiveIndex] = useState(0);

  const deleteItem = () => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteDoc(doc(db, "items", item.id));
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F0FFF4" }} contentContainerStyle={{ paddingBottom: 120 }}>
      
      
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 6 }}>{item.title}</Text>
        <Text style={{ color: "#6B7280", fontSize: 14 }}>
          {item.category} • {item.condition}
        </Text>
      </View>

      
      <FlatList
        data={item.images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setActiveIndex(index);
        }}
        renderItem={({ item: img }) => (
          <View style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}>
            <Image source={{ uri: img }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          </View>
        )}
      />

      
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 8 }}>
        {item.images.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor: activeIndex === index ? "#10B981" : "#d1d5db",
            }}
          />
        ))}
      </View>

      
      <View style={{ padding: 18 }}>
        <Text style={{ fontSize: 16, color: "#374151", lineHeight: 22 }}>
          {item.description}
        </Text>
      </View>

      
      <TouchableOpacity
        onPress={deleteItem}
        style={{
          backgroundColor: "#dc2626",
          paddingVertical: 16,
          borderRadius: 12,
          marginHorizontal: 20,
          marginTop: 10
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 18, fontWeight: "600" }}>
          Delete Item
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
