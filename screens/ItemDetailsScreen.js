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
import { styles } from "../styles/styles";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ItemDetailsScreen({ route }) {
  const { item } = route.params;
  const [activeIndex, setActiveIndex] = useState(0);

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
          padding: 15,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 45,
              height: 45,
              borderRadius: 22.5,
              backgroundColor: "#10B981",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              {item.username ? item.username[0].toUpperCase() : "?"}
            </Text>
          </View>

          <Text style={{ fontSize: 17, fontWeight: "600", color: "#111" }}>
            {item.username || "Unknown user"}
          </Text>
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
        onScroll={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
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
          marginTop: 8,
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
              backgroundColor: activeIndex === index ? "#10B981" : "#d1d5db",
            }}
          />
        ))}
      </View>

      <View style={{ padding: 18 }}>
        <Text style={styles.feed_title}>{item.title}</Text>
        <Text style={styles.feed_subtitle}>
          {item.category} • Condition: {item.condition}
        </Text>
        <Text style={styles.feed_description}>{item.description}</Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#10B981",
          paddingVertical: 16,
          borderRadius: 12,
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Request Swap
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
