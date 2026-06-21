import React, { useContext, useState } from "react";
import InputWithIcon from "../components/InputWithIcon.tsx";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../components/AuthProvider.tsx";
import { loginUser } from "../services/skillService";

interface ConnexionProps {
  navigation: any;
}

export default function Connexion({ navigation }: ConnexionProps) {
  const background = require("../../assets/connexion_background.jpg");
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const authentifier = async (): Promise<void> => {
    try {
      const userResp = await loginUser(email, password);
      setUser(userResp);
      navigation.navigate("Profil");
    } catch (error: any) {
      Alert.alert("Erreur", String(error?.message || error));
    }
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.iconContainer}>
          <Ionicons name="person-circle" size={90} color="#E6F2FF" />
        </View>

        <Text style={styles.title}>Connexion</Text>

        <View style={styles.form}>
          <InputWithIcon
            name="mail-outline"
            size={20}
            color="#7ec8ff"
            placeholder="Email"
            placeholderTextColor="#BFDFFF"
            secureTextEntry={false}
            onChangeText={setEmail}
          />

          <InputWithIcon
            name="lock-closed-outline"
            size={20}
            color="#7ec8ff"
            placeholder="Mot de passe"
            placeholderTextColor="#BFDFFF"
            secureTextEntry
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={authentifier}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.text}>Première connexion ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Inscription")}>
              <Text style={styles.link}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    padding: 20,
  },
  iconContainer: { alignItems: "center", marginBottom: 10 },
  title: {
    fontSize: 30,
    color: "#E6F2FF",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 25,
  },
  form: { gap: 15 },
  button: {
    backgroundColor: "#4DA6FF",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: "#4DA6FF",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  text: { color: "#D6EFFF" },
  link: {
    color: "#7EC8FF",
    fontWeight: "bold",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
});
