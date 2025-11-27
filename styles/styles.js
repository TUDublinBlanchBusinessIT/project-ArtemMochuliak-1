import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  //LOGIN & SIGN UP SCREENS
 

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


//ADD ITEM SCREEN STYLES

addItem_container: {
  flex: 1,
  backgroundColor: "#f0fdf4",
  justifyContent: "center",
  alignItems: "center",
},

addItem_iconWrapper: {
  marginBottom: 10,
},

addItem_title: {
  fontSize: 22,
  fontWeight: "600",
  marginTop: 10,
},

addItem_subtitle: {
  fontSize: 15,
  color: "#6b7280",
  marginTop: 5,
},

addItem_modalContainer: {
  padding: 20,
  backgroundColor: "#fff",
},

addItem_modalTitle: {
  fontSize: 26,
  fontWeight: "700",
  marginBottom: 20,
  textAlign: "center",
},

addItem_input: {
  backgroundColor: "#f3f4f6",
  padding: 12,
  borderRadius: 8,
  marginTop: 10,
  fontSize: 16,
},


addItem_dropdown: {
  backgroundColor: "#f3f4f6",
  padding: 12,
  borderRadius: 8,
  marginTop: 10,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

addItem_dropdownText: {
  fontSize: 16,
  color: "#444",
},

addItem_dropdownItem: {
  backgroundColor: "#e5e7eb",
  padding: 12,
  borderRadius: 8,
  marginTop: 6,
},

addItem_dropdownItemText: {
  fontSize: 15,
},


addItem_uploadButton: {
  flexDirection: "row",
  backgroundColor: "#0f8a5f",
  padding: 12,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 15,
},

addItem_uploadText: {
  color: "#fff",
  fontSize: 16,
  marginLeft: 8,
},


addItem_imagePreviewContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 15,
},

addItem_previewImage: {
  width: 80,
  height: 80,
  marginRight: 10,
  marginTop: 10,
  borderRadius: 8,
},

descriptionInput: {
  backgroundColor: "#F4F4F4",     
  borderRadius: 8,
  padding: 12,
  marginTop: 12,
  minHeight: 100,
  fontSize: 16,
  textAlignVertical: "top",        
},


addItem_submitButton: {
  backgroundColor: "#10b981",
  padding: 15,
  borderRadius: 10,
  marginTop: 25,
},

addItem_submitText: {
  color: "#fff",
  textAlign: "center",
  fontSize: 18,
  fontWeight: "600",
},


addItem_closeButton: {
  padding: 15,
  marginTop: 15,
  borderRadius: 10,
  backgroundColor: "#e5e7eb",
},

addItem_closeText: {
  color: "#111827",
  textAlign: "center",
  fontSize: 16,
},

});