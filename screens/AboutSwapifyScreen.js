import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function AboutSwapifyScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0FFF4" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>

        
        <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 20 }}>
          About Swapify
        </Text>

        
        <View
          style={{
            backgroundColor: "#fff",
            padding: 18,
            borderRadius: 12,
            marginBottom: 18,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Ionicons name="leaf-outline" size={26} color="#10B981" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 20, fontWeight: "700" }}>What is Swapify?</Text>
          </View>

          <Text style={{ fontSize: 15, color: "#475569", lineHeight: 22 }}>
            Swapify is a community-driven swapping platform designed to reduce waste, 
            promote re-use, and help people exchange items they no longer need. 
            Instead of throwing things away, Swapify encourages users to list, swap, 
            and give items a second life.
          </Text>
        </View>

        
        <View
          style={{
            backgroundColor: "#fff",
            padding: 18,
            borderRadius: 12,
            marginBottom: 18,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Ionicons name="earth-outline" size={26} color="#10B981" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Our Mission</Text>
          </View>

          <Text style={{ fontSize: 15, color: "#475569", lineHeight: 22 }}>
            Our mission is to make sustainable living easier, more accessible, and 
            more rewarding by reducing waste and encouraging item re-use in local communities.
          </Text>
        </View>

        
        <View
          style={{
            backgroundColor: "#fff",
            padding: 18,
            borderRadius: 12,
            marginBottom: 18,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Ionicons name="swap-horizontal-outline" size={26} color="#10B981" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 20, fontWeight: "700" }}>How Swapify Works</Text>
          </View>

          {[
            "List an item by uploading images and describing your item.",
            "Browse items offered by people in your community.",
            "Request a swap when you find something you like.",
            "Chat safely in-app to coordinate the exchange.",
            "Complete the swap and enjoy your new item!",
          ].map((step, i) => (
            <Text
              key={i}
              style={{
                fontSize: 15,
                color: "#475569",
                marginTop: 6,
                lineHeight: 22,
              }}
            >
              • {step}
            </Text>
          ))}
        </View>

        
        <View
          style={{
            backgroundColor: "#fff",
            padding: 18,
            borderRadius: 12,
            marginBottom: 18,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Ionicons name="star-outline" size={26} color="#10B981" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Why Swapify?</Text>
          </View>

          {[
            "100% free to use.",
            "Eco-friendly and waste reducing.",
            "Builds real community connections.",
            "Simple, clean and modern design.",
            "Encourages a circular economy.",
          ].map((point, i) => (
            <Text
              key={i}
              style={{
                fontSize: 15,
                color: "#475569",
                marginTop: 6,
                lineHeight: 22,
              }}
            >
              • {point}
            </Text>
          ))}
        </View>

        
        <View
          style={{
            backgroundColor: "#fff",
            padding: 18,
            borderRadius: 12,
            marginBottom: 18,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Ionicons name="person-circle-outline" size={26} color="#10B981" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Developer</Text>
          </View>

          <Text style={{ fontSize: 15, color: "#475569", lineHeight: 22 }}>
            Swapify was created by Artem Mochuliak, with the goal of
            building a modern mobile app that promotes sustainable swapping and 
            circular reuse.
          </Text>
        </View>

        
        <View
          style={{
            backgroundColor: "#fff",
            padding: 18,
            borderRadius: 12,
            marginBottom: 40,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 6 }}>
            Version
          </Text>
          <Text style={{ fontSize: 15, color: "#475569", marginBottom: 15 }}>
            Swapify v1.0.0
          </Text>

          <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 6 }}>
            Support
          </Text>
          <Text style={{ fontSize: 15, color: "#475569" }}>
            B00165618@mytudublin.ie
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
