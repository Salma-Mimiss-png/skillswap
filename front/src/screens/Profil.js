import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../components/AuthProvider";
import Menu from "../components/Menu";

export default function Profil({ navigation }) {
  const { user } = useContext(AuthContext);

  return (
    <Menu navigation={navigation}>
      <View style={styles.container}>
        <Ionicons name="person-circle" size={120} color="#7EC8FF" />

        <Text style={styles.welcome}>
          Bienvenue {user?.prenom} {user?.nom}
        </Text>

        <View style={styles.infoCard}>
          <View style={styles.row}>
            <Ionicons name="person-outline" size={24} color="#7EC8FF" />
            <Text style={styles.text}>
              {user?.nom} {user?.prenom}
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="mail-outline" size={24} color="#7EC8FF" />
            <Text style={styles.text}>{user?.email}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="call-outline" size={24} color="#7EC8FF" />
            <Text style={styles.text}>{user?.telephone}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Ionicons name="create-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </Menu>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: "#EAF4FF",
  },

  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
    marginTop: 10,
    marginBottom: 25,
    textAlign: "center",
  },

  infoCard: {
    width: "95%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },

  text: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },

  editButton: {
    position: "absolute",
    bottom: 75,
    right: 25,
    backgroundColor: "#7EC8FF",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
