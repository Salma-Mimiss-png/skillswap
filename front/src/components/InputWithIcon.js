import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function InputWithIcon({
  name,
  size,
  color,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  onChangeText
}) {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name={name} size={size} color={color} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(135, 206, 250, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(135, 206, 250, 0.35)",
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    padding: 12,
    color: "#fff",
  },
});
