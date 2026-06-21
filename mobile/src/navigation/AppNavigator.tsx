import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Écrans Users (authentification / profil)
import Connexion from '../screens/Connexion';
import Inscription from '../screens/Inscription';
import Profil from '../screens/Profil';
import EditProfile from '../screens/EditProfile';

// Écrans Skills
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SkillDetailScreen from '../screens/SkillDetailScreen';
import skillUsersScreen from '../screens/skillUsersScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Connexion"
        screenOptions={{
          headerStyle: { backgroundColor: '#1E90FF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* --- Authentification / Profil --- */}
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

        {/* --- Compétences --- */}

      </Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Accueil' }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'Recherche' }}
      />
      <Stack.Screen
        name="SkillDetail"
        component={SkillDetailScreen}
        options={{ title: 'Détail' }}
      />
      <Stack.Screen
        name="SkillUsers"
        component={skillUsersScreen}
        options={{ title: 'Utilisateurs' }}
      />
    </NavigationContainer>
  );
};

export default AppNavigator;
