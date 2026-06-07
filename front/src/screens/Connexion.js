import { useContext, useState } from "react";
import InputWithIcon from "../components/InputWithIcon";

import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../components/AuthProvider";
import { SERVEUR_BACK_END } from "../constants";

export default function Connexion({ navigation }) {
  const background = require("../../assets/connexion_background.jpg");

  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authentifier = async () => {
    try {
      const res = await fetch(`${SERVEUR_BACK_END}/user/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        alert("Email ou mot de passe incorrect");
        return;
      }

      const userResp = await res.json();

      setUser(userResp);

      navigation.navigate("Profil");
    } catch (error) {
      console.log(error);
      alert("Erreur serveur");
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
          <View style={styles.inputContainer}>
            <Ionicons />
            <TextInput style={styles.input} />
          </View>

          <InputWithIcon
            name="mail-outline"
            size={20}
            color="#7ec8ff"
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

            <TouchableOpacity
              onPress={() => navigation.navigate("Inscription")}
            >
              <Text style={styles.link}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    padding: 20,
  },

  iconContainer: {
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    color: "#E6F2FF",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 25,
  },

  form: {
    gap: 15,
  },

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

  text: {
    color: "#D6EFFF",
  },

  link: {
    color: "#7EC8FF",
    fontWeight: "bold",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
});
