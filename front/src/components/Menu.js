import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SideMenu from "./SideMenu";

export default function Menu({ children, navigation }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuOpen(true)}>
          <Ionicons name="menu" size={30} color="#7EC8FF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>{children}</View>

      {menuOpen && (
        <View style={styles.sideMenu}>
          <SideMenu
            navigation={navigation}
            onClose={() => setMenuOpen(false)}
          />

          <TouchableOpacity
            style={styles.backdrop}
            onPress={() => setMenuOpen(false)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 80,
    paddingHorizontal: 25,
    backgroundColor: "#111C33",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    elevation: 5,
  },

  title: {
    color: "#7EC8FF",
    fontSize: 18,
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    padding: 10,
  },

  sideMenu: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
