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
} from "react-native";
import { styles } from "../styles/styles";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const shift = useRef(new Animated.Value(0)).current;
  const logoGroupScale = useRef(new Animated.Value(1)).current;
  const logoGroupShift = useRef(new Animated.Value(0)).current; 

  const buttonRef = useRef(null);
  const INITIAL_OFFSET = 220; 

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", (e) => {
      
      Animated.timing(logoGroupScale, {
        toValue: 0.7,
        duration: 200,
        useNativeDriver: true,
      }).start();

     
      Animated.timing(logoGroupShift, {
        toValue: 25, 
        duration: 200,
        useNativeDriver: true,
      }).start();

      if (!buttonRef.current) return;

      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        const keyboardY = e.endCoordinates.screenY;
        const gap = keyboardY - (pageY + height + 20);
        if (gap < 0) {
          Animated.timing(shift, {
            toValue: gap,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      });
    });

    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(logoGroupScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      Animated.timing(logoGroupShift, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();

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

  const handleSignUp = async () => {
    if (!username) {
      Alert.alert("Error", "Please enter a username");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username,
        email,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Registered successfully!");
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
          { transform: [{ translateY: shift }], justifyContent: "flex-start", paddingTop: INITIAL_OFFSET },
        ]}
      >
        
        <Animated.View
          style={{
            alignItems: "center",
            transform: [
              { scale: logoGroupScale },
              { translateY: logoGroupShift }
            ],
          }}
        >
          <Text style={styles.logoIcon}>♻️</Text>
          <Text style={styles.title}>Sign Up</Text>
        </Animated.View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.tabText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
            <Text style={styles.tabText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
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

        <TouchableOpacity ref={buttonRef} style={styles.loginButton} onPress={handleSignUp}>
          <Text style={styles.loginButtonText}>Create Account</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
