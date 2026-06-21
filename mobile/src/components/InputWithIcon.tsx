import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface InputWithIconProps {
  name: string;
  size: number;
  color: string;
  placeholder: string;
  placeholderTextColor: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
}

export default function InputWithIcon({
                                        name,
                                        size,
                                        color,
                                        placeholder,
                                        placeholderTextColor,
                                        secureTextEntry = false,
                                        onChangeText,
                                      }: InputWithIconProps) {
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
