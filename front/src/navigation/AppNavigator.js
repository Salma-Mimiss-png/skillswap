import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Connexion from "../screens/Connexion";
import Profil from "../screens/Profil";
import Inscription from "../screens/Inscription";
import EditProfile from "../screens/EditProfile";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Connexion"
          component={Connexion}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Inscription"
          component={Inscription}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Profil"
          component={Profil}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
