import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import InputWithIcon from "../components/InputWithIcon";
import { Ionicons } from "@expo/vector-icons";
import { SERVEUR_BACK_END } from "../constants";

export default function Inscription({ navigation }) {
  const background = require("../../assets/connexion_background.jpg");

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");

  const inscrire = async () => {
    try {
      const res = await fetch(`${SERVEUR_BACK_END}/user/inscrire`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom,
          prenom,
          email,
          password,
          telephone,
        }),
      });

      if (!res.ok) {
        alert("Erreur dans l'inscription");
        return;
      }

      const user = await res.json();

      navigation.navigate("Connexion");
    } catch (error) {
      console.log(error);
      alert("Erreur serveur");
    }
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.titre}>Inscription</Text>

          <InputWithIcon
            name="person-outline"
            size={20}
            color="#7EC8FF"
            placeholder="Nom"
            placeholderTextColor="#BFDFFF"
            onChangeText={setNom}
          />

          <InputWithIcon
            name="person"
            size={20}
            color="#7EC8FF"
            placeholder="Prénom"
            placeholderTextColor="#BFDFFF"
            onChangeText={setPrenom}
          />

          <InputWithIcon
            name="mail-outline"
            size={20}
            color="#7EC8FF"
            placeholder="Email"
            placeholderTextColor="#BFDFFF"
            onChangeText={setEmail}
          />

          <InputWithIcon
            name="lock-closed-outline"
            size={20}
            color="#7EC8FF"
            placeholder="Mot de passe"
            placeholderTextColor="#BFDFFF"
            secureTextEntry
            onChangeText={setPassword}
          />

          <InputWithIcon
            name="call-outline"
            size={20}
            color="#7EC8FF"
            placeholder="Téléphone"
            placeholderTextColor="#BFDFFF"
            onChangeText={setTelephone}
          />

          <TouchableOpacity style={styles.button} onPress={inscrire}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>

          <View style={styles.connexion}>
            <TouchableOpacity onPress={() => navigation.navigate("Connexion")}>
              <Text style={styles.lien}>Connexion</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 20,
  },

  titre: {
    fontSize: 28,
    color: "#E6F2FF",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },

  form: {
    flexGrow: 1,
    justifyContent: "center",
    gap: 12,
  },

  button: {
    backgroundColor: "#4DA6FF",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  connexion: {
    marginTop: 15,
    alignItems: "center",
  },

  lien: {
    color: "#7EC8FF",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
