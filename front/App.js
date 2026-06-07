import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/components/AuthProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
