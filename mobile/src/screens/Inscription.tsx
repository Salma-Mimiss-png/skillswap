import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import InputWithIcon from "../components/InputWithIcon.tsx";
import { registerUser } from "../services/skillService";

interface InscriptionProps {
  navigation: any;
}

export default function Inscription({ navigation }: InscriptionProps) {
  const background = require("../../assets/connexion_background.jpg");
  const [nom, setNom] = useState<string>("");
  const [prenom, setPrenom] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");

  const inscrire = async (): Promise<void> => {
    try {
      await registerUser({ nom, prenom, email, password, telephone, type: "etudiant" });
      navigation.navigate("Connexion");
    } catch (error) {
      Alert.alert("Erreur dans l'inscription");
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
  background: { flex: 1 },
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
