import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Linking,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HelpSupportScreen() {
  const [expanded, setExpanded] = useState({
    privacy: false,
    terms: false,
    community: false,
  });

  const toggleSection = (key) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const openEmail = () => {
    Linking.openURL(
      "mailto:B00165618@mytudublin.ie?subject=Swapify Support Request"
    );
  };

  const openBugReport = () => {
    Linking.openURL(
      "mailto:B00165618@mytudublin.ie?subject=Bug Report&body=Describe the issue:"
    );
  };

  const openFeedback = () => {
    Linking.openURL(
      "mailto:B00165618@mytudublin.ie?subject=Swapify Feedback&body=Your feedback:"
    );
  };

  const cardShadow = {
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0FFF4" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
     
        <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 20 }}>
          Help & Support
        </Text>

        
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
          Frequently Asked Questions
        </Text>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 15,
            marginBottom: 20,
            ...cardShadow,
          }}
        >
          {[
            {
              q: "How do I list an item?",
              a: "Tap the + button and fill in the item details.",
            },
            {
              q: "How do swaps work?",
              a: "Users can request to swap with your listed items.",
            },
            {
              q: "How do I message someone?",
              a: "Messages appear after a swap request is created.",
            },
          ].map((item, index) => (
            <View key={index} style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.q}</Text>
              <Text style={{ fontSize: 14, color: "#6B7280", marginTop: 3 }}>
                {item.a}
              </Text>
            </View>
          ))}
        </View>

        
        <TouchableOpacity
          onPress={openEmail}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
            ...cardShadow,
          }}
        >
          <Ionicons
            name="mail-outline"
            size={24}
            color="#10B981"
            style={{ marginRight: 15 }}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Contact Support</Text>
            <Text style={{ fontSize: 14, color: "#6B7280" }}>
              B00165618@mytudublin.ie
            </Text>
          </View>
        </TouchableOpacity>

        
        <TouchableOpacity
          onPress={openBugReport}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
            ...cardShadow,
          }}
        >
          <Ionicons
            name="bug-outline"
            size={24}
            color="#EF4444"
            style={{ marginRight: 15 }}
          />
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Report a Problem</Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          onPress={openFeedback}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
            ...cardShadow,
          }}
        >
          <Ionicons
            name="chatbox-ellipses-outline"
            size={24}
            color="#3B82F6"
            style={{ marginRight: 15 }}
          />
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Send App Feedback</Text>
        </TouchableOpacity>

        
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 15,
            marginTop: 10,
            marginBottom: 40,
            ...cardShadow,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
            Legal & Policies
          </Text>

          
          <TouchableOpacity
            onPress={() => toggleSection("privacy")}
            style={{
              paddingVertical: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>Privacy Policy</Text>
            <Ionicons
              name={expanded.privacy ? "chevron-up" : "chevron-down"}
              size={22}
              color="#555"
            />
          </TouchableOpacity>

          {expanded.privacy && (
            <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 15 }}>
              Swapify collects only essential information to provide a smooth swapping experience.
              We do not share your data with third parties and store all information securely.
            </Text>
          )}

          
          <TouchableOpacity
            onPress={() => toggleSection("terms")}
            style={{
              paddingVertical: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>Terms of Service</Text>
            <Ionicons
              name={expanded.terms ? "chevron-up" : "chevron-down"}
              size={22}
              color="#555"
            />
          </TouchableOpacity>

          {expanded.terms && (
            <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 15 }}>
              By using Swapify, you agree to swap items fairly, avoid fraudulent activity,
              and follow community rules. Violations may lead to account restrictions.
            </Text>
          )}

          
          <TouchableOpacity
            onPress={() => toggleSection("community")}
            style={{
              paddingVertical: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>Community Guidelines</Text>
            <Ionicons
              name={expanded.community ? "chevron-up" : "chevron-down"}
              size={22}
              color="#555"
            />
          </TouchableOpacity>

          {expanded.community && (
            <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 15 }}>
              Treat other users with respect, avoid offensive content, and post only accurate
              descriptions of items. Help maintain a safe and honest swapping environment.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
