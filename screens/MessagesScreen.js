import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function MessagesScreen() {
  const [chats, setChats] = useState([]);
  const auth = getAuth();
  const currentUid = auth.currentUser?.uid;
  const navigation = useNavigation();

  useEffect(() => {
    if (!currentUid) return;

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", currentUid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(list);
    });

    return () => unsub();
  }, []);

  const openChat = (chatId) => {
    navigation.navigate("ChatScreen", { chatId });
  };

  const renderItem = ({ item }) => {
    const isUserA = item.userA?.uid === currentUid;

    const otherUser = isUserA ? item.userB : item.userA;

    const username = otherUser?.username || "Unknown user";

    return (
      <TouchableOpacity
        onPress={() => openChat(item.id)}
        style={{
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderColor: "#E5E7EB",
        }}
      >
        <View
          style={{
            width: 45,
            height: 45,
            borderRadius: 22.5,
            backgroundColor: "#10B981",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {username[0]?.toUpperCase() || "?"}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#111" }}>
            {username}
          </Text>

          <Text style={{ fontSize: 14, color: "#6B7280" }}>
            {item.lastMessage || "No messages yet"}
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F3FFF5" }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          margin: 20,
          color: "#111",
        }}
      >
        Your Chats
      </Text>

      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
