import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { getAuth } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function MyItemsScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const uid = getAuth().currentUser.uid;

  useEffect(() => {
    const q = query(collection(db, "items"), where("uid", "==", uid));

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    });

    return () => unsub();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F0FFF4", padding: 20 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          color: "#111",
          marginBottom: 20,
        }}
      >
        My Items
      </Text>

      {items.length === 0 && (
        <View style={{ marginTop: 45, alignItems: "center" }}>
          <Ionicons
            name="cube-outline"
            size={70}
            color="#10B981"
            style={{ marginBottom: 10 }}
          />

          <Text style={{ fontSize: 18, fontWeight: "600", color: "#111" }}>
            You haven't posted any items yet.
          </Text>

          <Text style={{ fontSize: 14, color: "#6B7280", marginTop: 5 }}>
            Add items to start swapping!
          </Text>
        </View>
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("MyItemDetails", { item })}
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              borderRadius: 14,
              padding: 12,
              marginBottom: 14,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Image
              source={{ uri: item.images[0] }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 10,
                marginRight: 12,
              }}
            />

            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 17, fontWeight: "700", color: "#111" }}
              >
                {item.title}
              </Text>

              <Text style={{ fontSize: 14, color: "#6B7280", marginTop: 2 }}>
                {item.category} • {item.condition}
              </Text>

              <Text
                numberOfLines={1}
                style={{
                  fontSize: 13,
                  color: "#374151",
                  marginTop: 6,
                }}
              >
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
