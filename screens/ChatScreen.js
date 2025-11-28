import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ChatScreen({ route }) {
  const { chatId } = route.params;
  const auth = getAuth();
  const currentUid = auth.currentUser.uid;

  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadChat = async () => {
      const snap = await getDoc(doc(db, "chats", chatId));
      setChat(snap.data());
    };
    loadChat();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion({
        text: message,
        sender: currentUid,
        time: Date.now()
      }),
      lastMessage: message,
      lastMessageTime: Date.now()
    });

    setMessage("");
  };

  if (!chat) return <View />;

  return (
    <View style={{ flex: 1, padding: 15 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
        Chat about: {chat.itemTitle}
      </Text>

      <FlatList
        data={chat.messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf:
                item.sender === currentUid ? "flex-end" : "flex-start",
              marginBottom: 8,
              padding: 10,
              backgroundColor:
                item.sender === currentUid ? "#10B981" : "#e5e7eb",
              borderRadius: 10,
              maxWidth: "75%"
            }}
          >
            <Text style={{ color: item.sender === currentUid ? "white" : "#111" }}>
              {item.text}
            </Text>
          </View>
        )}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10
        }}
      >
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          style={{
            flex: 1,
            backgroundColor: "#f3f4f6",
            borderRadius: 10,
            padding: 12
          }}
        />

        <TouchableOpacity
          onPress={sendMessage}
          style={{
            marginLeft: 10,
            backgroundColor: "#10B981",
            padding: 12,
            borderRadius: 10
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
