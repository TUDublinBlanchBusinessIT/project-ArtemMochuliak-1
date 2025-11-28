import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ChatScreen({ route }) {
  const { chatId } = route.params;
  const auth = getAuth();
  const currentUid = auth.currentUser.uid;

  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");
  const flatListRef = useRef(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatId), (snap) => {
      if (snap.exists()) {
        setChat(snap.data());
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 50);
      }
    });
    return () => unsub();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const msg = {
      text: message.trim(),
      sender: currentUid,
      timestamp: Date.now(),
    };

    await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion(msg),
      lastMessage: msg.text,
      lastMessageTime: msg.timestamp,
    });

    setMessage("");
  };

  if (!chat) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#F3FFF5" }}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={chat.messages || []}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 15, paddingBottom: 90 }}
        renderItem={({ item }) => {
          const isMine = item.sender === currentUid;
          return (
            <View
              style={{
                alignSelf: isMine ? "flex-end" : "flex-start",
                backgroundColor: isMine ? "#10B981" : "#E5E7EB",
                paddingVertical: 10,
                paddingHorizontal: 14,
                marginVertical: 4,
                borderRadius: 18,
                maxWidth: "75%",
              }}
            >
              <Text style={{ color: isMine ? "white" : "#111" }}>
                {item.text}
              </Text>
            </View>
          );
        }}
      />

      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: 12,
          backgroundColor: "#F3FFF5",
          borderTopWidth: 1,
          borderColor: "#D1D5DB",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 25,
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: "#D1D5DB",
          }}
        >
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            style={{
              flex: 1,
              fontSize: 16,
              paddingVertical: 4,
            }}
          />

          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={22} color="#10B981" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
