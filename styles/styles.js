import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  
  loginContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    backgroundColor: "#fff",
  },

  logoIcon: {
    fontSize: 70,
    textAlign: "center",
    color: "#10B981",
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#10B981",
    marginBottom: 20,
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#eee",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 30,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#10B981",
  },

  tabText: {
    fontSize: 16,
    color: "#333",
  },

  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  loginButton: {
    backgroundColor: "#10B981",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },





  

  bottomNav: {
    height: 65,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    marginBottom: 40,
  },



  addButtonContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 45,
    elevation: 6,
  },

 
  centerScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#10B981",
  },


  
    
});
