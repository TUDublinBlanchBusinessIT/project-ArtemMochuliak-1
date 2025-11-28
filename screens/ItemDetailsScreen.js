import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "../styles/styles";

import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ItemDetailsScreen({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const createOrOpenChat = async () => {
    const auth = getAuth();
    const currentUid = auth.currentUser.uid;

    const itemOwnerUid = item.uid;
    const itemOwnerUsername = item.username;
    const currentUsername =
      auth.currentUser.displayName ||
      auth.currentUser.email?.split("@")[0] ||
      "User";

    if (!itemOwnerUid || !currentUid) return;

    const chatQuery = query(
      collection(db, "chats"),
      where("participants", "array-contains", currentUid)
    );

    const querySnapshot = await getDocs(chatQuery);

    let existingChat = null;

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.participants.includes(itemOwnerUid)) {
        existingChat = { id: docSnap.id, ...data };
      }
    });

    if (existingChat) {
      navigation.navigate("MessagesTab", {
        screen: "ChatScreen",
        params: { chatId: existingChat.id }
      });
      return;
    }

    const newChat = await addDoc(collection(db, "chats"), {
      participants: [currentUid, itemOwnerUid],
      itemId: item.id,
      itemTitle: item.title,
      userA: {
        uid: currentUid,
        username: currentUsername
      },
      userB: {
        uid: itemOwnerUid,
        username: itemOwnerUsername
      },
      lastMessage: `Swap request: ${item.title}`,
      lastMessageTime: Date.now(),
      messages: []
    });

    navigation.navigate("MessagesTab", {
      screen: "ChatScreen",
      params: { chatId: newChat.id }
    });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F0FFF4" }}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 15
        }}
      >
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 45,
                height: 45,
                borderRadius: 22.5,
                backgroundColor: "#10B981",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold"
                }}
              >
                {item.username ? item.username[0].toUpperCase() : "?"}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                  color: "#111"
                }}
              >
                {item.username || "Unknown user"}
              </Text>

              {item.location ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 3
                  }}
                >
                  <Ionicons
                    name="location-outline"
                    size={15}
                    color="#10B981"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={{ fontSize: 13, color: "#6B7280" }}>
                    {item.location}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        <Text style={{ fontSize: 12, color: "#6B7280" }}>
          {item.createdAt
            ? new Date(item.createdAt.seconds * 1000).toLocaleDateString()
            : ""}
        </Text>
      </View>

      <FlatList
        data={item.images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / SCREEN_WIDTH
          );
          setActiveIndex(index);
        }}
        renderItem={({ item: img }) => (
          <View style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}>
            <Image
              source={{ uri: img }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
        )}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 8
        }}
      >
        {item.images.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor:
                activeIndex === index ? "#10B981" : "#d1d5db"
            }}
          />
        ))}
      </View>

      <View style={{ padding: 18 }}>
        <Text style={styles.feed_title}>{item.title}</Text>

        <Text style={styles.feed_subtitle}>
          {item.category} • Condition: {item.condition}
        </Text>

        <Text style={styles.feed_description}>
          {item.description}
        </Text>
      </View>

      <TouchableOpacity
        onPress={createOrOpenChat}
        style={{
          backgroundColor: "#10B981",
          paddingVertical: 16,
          borderRadius: 12,
          marginHorizontal: 20,
          marginTop: 10
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "600"
          }}
        >
          Request Swap
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
