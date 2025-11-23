import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  Animated,
  TouchableWithoutFeedback,
  UIManager,
  findNodeHandle,
} from "react-native";
import { styles } from "../styles/styles";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const shift = useRef(new Animated.Value(0)).current;
  const buttonRef = useRef(null);

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", (e) => {
      if (!buttonRef.current) return;

      UIManager.measure(
        findNodeHandle(buttonRef.current),
        (x, y, width, height, pageX, pageY) => {
          const keyboardY = e.endCoordinates.screenY;
          const gap = keyboardY - (pageY + height + 20);
          if (gap < 0) {
            Animated.timing(shift, {
              toValue: gap,
              duration: 300,
              useNativeDriver: true,
            }).start();
          }
        }
      );
    });

    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(shift, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View
        style={[
          styles.loginContainer,
          {
            transform: [{ translateY: shift }],
            justifyContent: "flex-start",
            paddingTop: 220,
          },
        ]}
      >
        <Text style={styles.logoIcon}>♻️</Text>
        <Text style={styles.title}>Welcome to Swapify</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
            <Text style={styles.tabText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.tabText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          ref={buttonRef}
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}