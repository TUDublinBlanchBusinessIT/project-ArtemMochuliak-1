import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { styles } from "../styles/styles";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function HomeFeed() {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState({});
  const [searchText, setSearchText] = useState("");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const CATEGORY_OPTIONS = [
    "Electronics",
    "Clothing",
    "Books",
    "Home Appliances",
    "Accessories",
    "Sports",
    "Toys",
    "Furniture",
    "Beauty",
    "Gaming",
    "Tools",
    "Pet Supplies",
    "Other",
  ];

  const CONDITION_OPTIONS = ["New", "Like New", "Good", "Used", "Heavily Used"];

  useEffect(() => {
    const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const initial = {};
      data.forEach((i) => (initial[i.id] = 0));
      setActiveIndex(initial);
      setItems(data);
      setFilteredItems(data);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    let data = [...items];
    if (searchText.trim() !== "") {
      data = data.filter(
        (i) =>
          i.title.toLowerCase().includes(searchText.toLowerCase()) ||
          i.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (selectedCategory) data = data.filter((i) => i.category === selectedCategory);
    if (selectedCondition) data = data.filter((i) => i.condition === selectedCondition);
    if (selectedLocation)
      data = data.filter((i) =>
        i.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    setFilteredItems(data);
  }, [searchText, selectedCategory, selectedCondition, selectedLocation, items]);

  const onViewableItemsChanged = useRef(({ viewableItems, itemId }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setActiveIndex((prev) => ({ ...prev, [itemId]: index }));
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 60 });

  const renderItem = ({ item }) => (
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
                      <Image source={{ uri }} style={styles.carouselImage} resizeMode="cover" />
                    </TouchableOpacity>
                  </View>
                );
              }}
              onViewableItemsChanged={(info) =>
                onViewableItemsChanged.current({ ...info, itemId: item.id })
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
  );

  return (
    <View style={[styles.feed_container, { flex: 1 }]}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          alignItems: "center",
          margin: 15,
          zIndex: 100,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Ionicons name="search-outline" size={22} color="#555" />
        <TextInput
          placeholder="Search items..."
          value={searchText}
          onChangeText={setSearchText}
          style={{ flex: 1, marginLeft: 8, fontSize: 16 }}
        />
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="options-outline" size={26} color="#10B981" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 50 }}
      />

      <Modal visible={filterModalVisible} animationType="fade" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 15,
              padding: 20,
              position: "relative",
            }}
          >
            <TouchableOpacity
              onPress={() => setFilterModalVisible(false)}
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                zIndex: 20,
                backgroundColor: "rgba(255,255,255,0.85)",
                borderRadius: 20,
                padding: 4,
              }}
            >
              <Ionicons name="close-circle" size={40} color="#444" />
            </TouchableOpacity>

            <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
              Filters
            </Text>

            <Text style={{ fontWeight: "600", marginTop: 10 }}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {CATEGORY_OPTIONS.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={{
                    padding: 10,
                    marginRight: 10,
                    borderRadius: 10,
                    backgroundColor:
                      selectedCategory === cat ? "#10B981" : "#e5e7eb",
                  }}
                >
                  <Text
                    style={{
                      color: selectedCategory === cat ? "white" : "black",
                    }}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={{ fontWeight: "600", marginTop: 10 }}>Condition</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {CONDITION_OPTIONS.map((cond) => (
                <TouchableOpacity
                  key={cond}
                  onPress={() => setSelectedCondition(cond)}
                  style={{
                    padding: 10,
                    marginRight: 10,
                    borderRadius: 10,
                    backgroundColor:
                      selectedCondition === cond ? "#10B981" : "#e5e7eb",
                  }}
                >
                  <Text
                    style={{
                      color: selectedCondition === cond ? "white" : "black",
                    }}
                  >
                    {cond}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={{ fontWeight: "600", marginTop: 10 }}>Location</Text>
            <TextInput
              placeholder="Enter location"
              value={selectedLocation}
              onChangeText={setSelectedLocation}
              style={{
                backgroundColor: "#f3f4f6",
                padding: 10,
                borderRadius: 10,
                marginTop: 5,
              }}
            />

            <TouchableOpacity
              onPress={() => setFilterModalVisible(false)}
              style={{
                marginTop: 20,
                backgroundColor: "#10B981",
                padding: 14,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Apply Filters
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectedCategory("");
                setSelectedCondition("");
                setSelectedLocation("");
                setFilterModalVisible(false);
              }}
              style={{
                marginTop: 10,
                padding: 12,
                borderRadius: 10,
                backgroundColor: "#ef4444",
              }}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontWeight: "700" }}
              >
                Reset Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
