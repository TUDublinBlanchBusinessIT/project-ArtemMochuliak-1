import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styles } from "../styles/styles";

export default function SignUpScreen({ onSwitch, onSignUp }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.logoIcon}>♻️</Text>
      <Text style={styles.title}>Sign Up</Text>

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
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={onSignUp}>
        <Text style={styles.loginButtonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitch}>
        <Text style={styles.forgotText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
