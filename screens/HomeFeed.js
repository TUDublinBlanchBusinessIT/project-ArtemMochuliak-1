import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { styles } from "../styles/styles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const IMAGE_HEIGHT = SCREEN_WIDTH * 0.75;

export default function HomeFeed() {
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
                        <Image
                          source={{ uri }}
                          style={styles.carouselImage}
                          resizeMode="cover"
                        />
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

        </View>
      ))}

    </ScrollView>
  );
}
