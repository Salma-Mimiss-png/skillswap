import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet
} from 'react-native';

const SkillDetailScreen = ({ route, navigation }: any) => {
  const { skill } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.skillName}>{skill.title}</Text>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{skill.description}</Text>
        <Text style={styles.label}>Catégorie</Text>
        <Text style={styles.value}>{skill.category || 'Non spécifiée'}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SkillUsers', { skillId: skill.id })}
      >
        <Text style={styles.buttonText}>Voir les utilisateurs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    marginBottom: 20,
  },
  skillName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 12,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SkillDetailScreen;
