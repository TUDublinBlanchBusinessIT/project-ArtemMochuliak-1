import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { styles } from "../styles/styles";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function HomeFeed() {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState({});

  useEffect(() => {
    const loadItems = async () => {
      const snapshot = await getDocs(collection(db, "items"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const initialIndexes = {};
      data.forEach(item => (initialIndexes[item.id] = 0));

      setActiveIndex(initialIndexes);
      setItems(data);
    };

    loadItems();
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems, itemId }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setActiveIndex(prev => ({ ...prev, [itemId]: index }));
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 60 });

  return (
    <ScrollView style={styles.feed_container} contentContainerStyle={{ padding: 15 }}>
      {items.map(item => (
        <View key={item.id} style={styles.feed_card}>
          
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15,
              paddingBottom: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
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

              <View>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#111" }}>
                  {item.username || "Unknown user"}
                </Text>

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
                  <Ionicons name="location-outline" size={14} color="#6B7280" />
                  <Text style={{ fontSize: 12, color: "#6B7280", marginLeft: 4 }}>
                    {item.location || "Unknown"}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={{ fontSize: 12, color: "#6B7280" }}>
              {item.createdAt
                ? new Date(item.createdAt.seconds * 1000).toLocaleDateString()
                : ""}
            </Text>
          </View>

          {item.images?.length > 0 && (
            <View style={styles.carouselOuterFix}>
              <View style={styles.carouselWrapper}>
                <FlatList
                  data={item.images}
                  keyExtractor={(_, i) => i.toString()}
                  horizontal
                  pagingEnabled
                  snapToInterval={SCREEN_WIDTH}
                  decelerationRate="fast"
                  showsHorizontalScrollIndicator={false}
                  getItemLayout={(_, index) => ({
                    length: SCREEN_WIDTH,
                    offset: SCREEN_WIDTH * index,
                    index,
                  })}
                  renderItem={({ item: img }) => {
                    const uri = img.startsWith("data:image")
                      ? img
                      : "data:image/jpeg;base64," + img;

                    return (
                      <View style={{ width: SCREEN_WIDTH }}>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={() => navigation.navigate("ItemDetails", { item })}
                        >
                          <Image
                            source={{ uri }}
                            style={styles.carouselImage}
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  onViewableItemsChanged={info =>
                    onViewableItemsChanged.current({
                      ...info,
                      itemId: item.id,
                    })
                  }
                  viewabilityConfig={viewConfigRef.current}
                />

                <View style={styles.carouselDots}>
                  {item.images.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.carouselDot,
                        activeIndex[item.id] === index && styles.carouselDotActive,
                      ]}
                    />
                  ))}
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("ItemDetails", { item })}
          >
            <View style={styles.feed_content}>
              <Text style={styles.feed_title}>{item.title}</Text>

              <Text style={styles.feed_subtitle}>
                {item.category} • Condition: {item.condition}
              </Text>

              <Text style={styles.feed_description}>
                {item.description.length > 120
                  ? item.description.slice(0, 120) + "..."
                  : item.description}
              </Text>
            </View>
          </TouchableOpacity>

        </View>
      ))}
    </ScrollView>
  );
}
