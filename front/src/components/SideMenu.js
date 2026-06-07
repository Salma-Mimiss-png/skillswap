import { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "./AuthProvider";

export default function SideMenu({ navigation, onClose }) {
    const { setUser } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate("Profil");
          onClose();
        }}
      >
        <Ionicons name="person-outline" size={20} color="#7EC8FF" />
        <Text style={styles.text}>Profil</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={styles.logout}
        onPress={() => {
          setUser(null);
          navigation.navigate("Connexion");
          onClose();
        }}
      >
        <Ionicons name="log-out-outline" size={20} color="red" />
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 260,
    height: "100%",
    backgroundColor: "#0F172A",
    padding: 20,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 15,
  },

  text: {
    color: "#fff",
    fontSize: 16,
  },

  logout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 60,
  },

  logoutText: {
    color: "red",
    fontWeight: "bold",
  },
});
