import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { getAuth } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

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
    <View style={{ flex: 1, backgroundColor: "#F0FFF4", padding: 15 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 15 }}>
        My Items
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ marginTop: 40, textAlign: "center", fontSize: 16 }}>
            You haven't posted any items yet.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("MyItemDetails", { item })}
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
              elevation: 1,
            }}
          >
            <Image
              source={{ uri: item.images[0] }}
              style={{ width: 70, height: 70, borderRadius: 10, marginRight: 12 }}
            />

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                {item.title}
              </Text>

              <Text style={{ fontSize: 14, color: "#6B7280" }}>
                {item.category} • {item.condition}
              </Text>

              <Text numberOfLines={1} style={{ fontSize: 13, color: "#374151", marginTop: 4 }}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
