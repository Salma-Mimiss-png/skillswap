import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator
} from 'react-native';
import { getAllSkills } from '../services/skillService';

const HomeScreen = ({ navigation }: any) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
          <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              style={{ marginRight: 16 }}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>🔍</Text>
          </TouchableOpacity>
      ),
    });

    getAllSkills()
        .then(data => setSkills(data))
        .catch(err => console.log('Erreur:', err))
        .finally(() => setLoading(false));
  }, [navigation]);

  if (loading) {
    return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1E90FF" />
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Compétences disponibles</Text>

        {skills.length === 0 ? (
            <Text style={styles.empty}>Aucune compétence trouvée</Text>
        ) : (
            <FlatList
                data={skills}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('SkillDetail', { skill: item })}
                    >
                      <Text style={styles.skillName}>{item.title}</Text>
                      <Text style={styles.skillDesc}>{item.description}</Text>
                      <Text style={styles.skillLevel}>{item.level} • {item.category}</Text>
                    </TouchableOpacity>
                )}
            />
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1E90FF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  skillName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  skillDesc: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  skillLevel: {
    fontSize: 12,
    color: '#1E90FF',
    marginTop: 6,
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
    fontSize: 15,
  },
});

export default HomeScreen;