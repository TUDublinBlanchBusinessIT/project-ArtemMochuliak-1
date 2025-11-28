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
import * as FileSystem from "expo-file-system";
import Ionicons from "react-native-vector-icons/Ionicons";

import { styles } from "../styles/styles";


import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function AddItemScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const [showCondDropdown, setShowCondDropdown] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const CATEGORY_OPTIONS = [
    "Electronics", "Clothing", "Books", "Home Appliances", "Accessories",
    "Sports", "Toys", "Furniture", "Beauty", "Gaming", "Tools", "Pet Supplies", "Other"
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
      const newImages = result.assets.map(asset => asset.uri);
      setImages(prev => [...prev, ...newImages]);
    }
  };

  
  const convertImageToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
      return "data:image/jpeg;base64," + base64;
    } catch (error) {
      console.error("Base64 error:", error);
      return null;
    }
  };

  
  const saveItemToDatabase = async () => {
    try {
      const base64Images = [];

      for (let img of images) {
        const base64 = await convertImageToBase64(img);
        if (base64) base64Images.push(base64);
      }

      await addDoc(collection(db, "items"), {
        title,
        category,
        condition,
        description,
        images: base64Images,
        createdAt: Timestamp.now(),
      });

      Alert.alert("Success", "Item has been uploaded!");

      
      setTitle("");
      setCategory("");
      setCondition("");
      setDescription("");
      setImages([]);

      setTimeout(() => setModalVisible(false), 50);

    } catch (error) {
      console.error("Firestore Save Error:", error);
      Alert.alert("Error", "Failed to save item.");
    }
  };

  const validateForm = () => {
    if (!title.trim()) return Alert.alert("Missing Title", "Please enter an item title.");
    if (!category) return Alert.alert("Missing Category", "Please select a category.");
    if (!condition) return Alert.alert("Missing Condition", "Please select the item condition.");
    if (!description.trim()) return Alert.alert("Missing Description", "Please enter a description.");
    if (description.length < 20)
      return Alert.alert("Description Too Short", "Please describe the item in more detail.");
    if (images.length === 0)
      return Alert.alert("No Images", "Please upload at least one photo.");

    saveItemToDatabase();
  };

  return (
    <View style={styles.addItem_container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity style={styles.addItem_iconWrapper} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={90} color="#0f8a5f" />
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.addItem_title}>Add New Item</Text>
      <Text style={styles.addItem_subtitle}>Post items you want to swap</Text>

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.addItem_modalContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              position: "absolute",
              top: Platform.OS === "android" ? 10 : 50,
              right: 10,
              zIndex: 2,
            }}
          >
            <Ionicons name="close-circle" size={40} color="#444" />
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
            <Text style={styles.addItem_dropdownText}>{category || "Select Category"}</Text>
            <Ionicons name={showCatDropdown ? "chevron-up" : "chevron-down"} size={22} />
          </TouchableOpacity>

          {showCatDropdown && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
              {CATEGORY_OPTIONS.map(cat => (
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
            <Text style={styles.addItem_dropdownText}>{condition || "Select Condition"}</Text>
            <Ionicons name={showCondDropdown ? "chevron-up" : "chevron-down"} size={22} />
          </TouchableOpacity>

          {showCondDropdown && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
              {CONDITION_OPTIONS.map(cond => (
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
            style={[styles.descriptionInput, { textAlign: "justify" }]}
            placeholder="Description (min 20 characters)"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
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
