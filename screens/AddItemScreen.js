import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Image,
  Alert,
  BackHandler,
  Platform,
  Animated,
  Easing,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "../styles/styles";

import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function AddItemScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const [showCondDropdown, setShowCondDropdown] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const CATEGORY_OPTIONS = [
    "Electronics", "Clothing", "Books", "Home Appliances", "Accessories",
    "Sports", "Toys", "Furniture", "Beauty", "Gaming", "Tools",
    "Pet Supplies", "Other"
  ];

  const CONDITION_OPTIONS = ["New", "Like New", "Good", "Used", "Heavily Used"];

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (modalVisible) {
        setModalVisible(false);
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [modalVisible]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      const uris = result.assets.map(a => a.uri);
      setImages(prev => [...prev, ...uris]);
    }
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: "base64",
      });
      return "data:image/jpeg;base64," + base64;
    } catch {
      return null;
    }
  };

  const saveItemToDatabase = async () => {
    try {
      const auth = getAuth();
      const uid = auth.currentUser?.uid;

      const userSnap = await getDoc(doc(db, "users", uid));
      const username = userSnap.data()?.username || "Unknown user";

      const base64Images = [];
      for (let img of images) {
        const b64 = await convertImageToBase64(img);
        if (b64) base64Images.push(b64);
      }

      await addDoc(collection(db, "items"), {
        title: title.trim(),
        category,
        condition,
        description: description.trim(),
        location: location.trim(),
        images: base64Images,
        createdAt: Timestamp.now(),
        username,
        uid,
      });

      Alert.alert("Success", "Item uploaded!");

      setTitle("");
      setCategory("");
      setCondition("");
      setDescription("");
      setLocation("");
      setImages([]);

      setModalVisible(false);
    } catch {
      Alert.alert("Error", "Could not save item.");
    }
  };

  const validateForm = () => {
    if (!title.trim()) return Alert.alert("Missing Title", "Enter a title.");
    if (!category) return Alert.alert("Missing Category", "Choose a category.");
    if (!condition) return Alert.alert("Missing Condition", "Choose a condition.");
    if (!description.trim()) return Alert.alert("Missing Description", "Enter a description.");
    if (description.length < 20) return Alert.alert("Description Too Short", "Min 20 characters.");
    if (!location.trim()) return Alert.alert("Missing Location", "Enter a location.");
    if (images.length === 0) return Alert.alert("No Images", "Upload at least one image.");
    saveItemToDatabase();
  };

  return (
    <View style={styles.addItem_container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.addItem_iconWrapper}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle-outline" size={90} color="#0f8a5f" />
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.addItem_title}>Add New Item</Text>
      <Text style={styles.addItem_subtitle}>Post items you want to swap</Text>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView contentContainerStyle={styles.addItem_modalContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
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
            <Ionicons name="close-circle" size={42} color="#444" />
          </TouchableOpacity>

          <Text style={styles.addItem_modalTitle}>Add New Item</Text>

          <TextInput
            placeholder="Item Title"
            value={title}
            onChangeText={setTitle}
            style={styles.addItem_input}
          />

          <TouchableOpacity
            style={styles.addItem_dropdown}
            onPress={() => setShowCatDropdown(!showCatDropdown)}
          >
            <Text style={styles.addItem_dropdownText}>
              {category || "Select Category"}
            </Text>
            <Ionicons name={showCatDropdown ? "chevron-up" : "chevron-down"} size={22} />
          </TouchableOpacity>

          {showCatDropdown && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
              {CATEGORY_OPTIONS.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.addItem_dropdownItem, { width: "48%", marginBottom: 8 }]}
                  onPress={() => {
                    setCategory(cat);
                    setShowCatDropdown(false);
                  }}
                >
                  <Text style={styles.addItem_dropdownItemText}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={styles.addItem_dropdown}
            onPress={() => setShowCondDropdown(!showCondDropdown)}
          >
            <Text style={styles.addItem_dropdownText}>
              {condition || "Select Condition"}
            </Text>
            <Ionicons name={showCondDropdown ? "chevron-up" : "chevron-down"} size={22} />
          </TouchableOpacity>

          {showCondDropdown && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
              {CONDITION_OPTIONS.map((cond) => (
                <TouchableOpacity
                  key={cond}
                  style={[styles.addItem_dropdownItem, { width: "48%", marginBottom: 8 }]}
                  onPress={() => {
                    setCondition(cond);
                    setShowCondDropdown(false);
                  }}
                >
                  <Text style={styles.addItem_dropdownItemText}>{cond}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TextInput
            placeholder="Description (min 20 characters)"
            value={description}
            onChangeText={setDescription}
            style={[styles.descriptionInput, { textAlign: "justify" }]}
            multiline
            textAlignVertical="top"
          />

          <TextInput
            placeholder="Location (e.g., Dublin, Ireland)"
            value={location}
            onChangeText={setLocation}
            style={styles.addItem_input}
          />

          <TouchableOpacity style={styles.addItem_uploadButton} onPress={pickImages}>
            <Ionicons name="image-outline" size={26} color="#fff" />
            <Text style={styles.addItem_uploadText}>Select Images</Text>
          </TouchableOpacity>

          <View style={styles.addItem_imagePreviewContainer}>
            {images.map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.addItem_previewImage} />
            ))}
          </View>

          <TouchableOpacity style={styles.addItem_submitButton} onPress={validateForm}>
            <Text style={styles.addItem_submitText}>Submit Item</Text>
          </TouchableOpacity>

        </ScrollView>
      </Modal>
    </View>
  );
}
