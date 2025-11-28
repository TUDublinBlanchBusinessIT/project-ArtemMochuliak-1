import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function HomeFeed() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const snapshot = await getDocs(collection(db, "items"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    };

    loadItems();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f3f4f6" }}
      contentContainerStyle={{ padding: 15 }}
    >
      {items.map((item) => (
        <View
          key={item.id}
          style={{
            backgroundColor: "#fff",
            borderRadius: 14,
            overflow: "hidden",
            marginBottom: 20,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          
          {item.images?.[0] && (
            <Image
              source={{ uri: item.images[0] }}
              style={{
                width: "100%",
                height: 220,
              }}
              resizeMode="cover"
            />
          )}

          
          <View style={{ padding: 18 }}>
            <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 6 }}>
              {item.title}
            </Text>

            <Text
              style={{
                color: "#6b7280",
                fontSize: 15,
                marginBottom: 10,
              }}
            >
              {item.category} • {item.condition}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "#374151",
                lineHeight: 22,
              }}
            >
              {item.description.length > 120
                ? item.description.slice(0, 120) + "..."
                : item.description}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
