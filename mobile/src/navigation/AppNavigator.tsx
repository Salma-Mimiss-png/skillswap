import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Connexion from '../screens/Connexion';
import Inscription from '../screens/Inscription';
import Profil from '../screens/Profil';
import EditProfile from '../screens/EditProfile';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SkillDetailScreen from '../screens/SkillDetailScreen';
import SkillUsersScreen from '../screens/skillUsersScreen';
import SessionsScreen from '../screens/SessionsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import RatingScreen from '../screens/RatingScreen';

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
        {/* Auth */}
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

        {/* Profil */}
        <Stack.Screen
          name="Profil"
          component={Profil}
          options={{ title: 'Profil' }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ title: 'Modifier Profil' }}
        />

        {/* Skills */}
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
          options={{ title: 'Détail compétence' }}
        />

        <Stack.Screen
          name="SkillUsers"
          component={SkillUsersScreen}
          options={{ title: 'Utilisateurs' }}
        />

        {/* Sessions */}
        <Stack.Screen
          name="Sessions"
          component={SessionsScreen}
          options={{ title: 'Sessions' }}
        />

        {/* Notifications */}
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ title: 'Notifications' }}
        />

        {/* Notes / Rating */}
        <Stack.Screen
          name="Rating"
          component={RatingScreen}
          options={{ title: 'Évaluation' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
