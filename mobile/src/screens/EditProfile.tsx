import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../components/AuthProvider.tsx";
import { updateUser } from "../services/skillService";

interface EditProfileProps {
  navigation: any;
}

export default function EditProfile({ navigation }: EditProfileProps) {
  const { user, setUser } = useContext(AuthContext);
  const [nom, setNom] = useState<string>(user?.nom ?? "");
  const [prenom, setPrenom] = useState<string>(user?.prenom ?? "");
  const [email, setEmail] = useState<string>(user?.email ?? "");
  const [telephone, setTelephone] = useState<string>(user?.telephone ?? "");

  const handleUpdate = async (): Promise<void> => {
    try {
      const updatedUser = await updateUser(user.id, { nom, prenom, email, telephone });
      setUser(updatedUser);
      navigation.goBack();
    } catch{
      Alert.alert("Erreur mise à jour");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#7EC8FF" />
      </TouchableOpacity>

      <View style={{ paddingTop: 100 }}>
        <Text style={styles.title}>Modifier profil</Text>

        <Text style={styles.label}>Nom</Text>
        <TextInput style={styles.input} value={nom} onChangeText={setNom} />

        <Text style={styles.label}>Prénom</Text>
        <TextInput style={styles.input} value={prenom} onChangeText={setPrenom} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Téléphone</Text>
        <TextInput style={styles.input} value={telephone} onChangeText={setTelephone} />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0B1220",
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  label: {
    color: "#7EC8FF",
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 2,
  },
  title: {
    fontSize: 24,
    color: "#7EC8FF",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    color: "#fff",
  },
  button: {
    backgroundColor: "#7EC8FF",
    padding: 14,
    borderRadius: 10,
    marginTop: 40,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#000",
  },
});
