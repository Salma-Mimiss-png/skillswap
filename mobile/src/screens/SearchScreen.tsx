import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList,
  TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native';
import { searchSkills } from '../services/skillService';

const SearchScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (query.trim() === '') return;
    setLoading(true);
    searchSkills(query)
        .then(data => setResults(data))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Rechercher une compétence</Text>

        <View style={styles.searchRow}>
          <TextInput
              style={styles.input}
              placeholder="Ex: JavaScript, Git..."
              placeholderTextColor="#aaa"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
          />
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Chercher</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#1E90FF" />}

        <FlatList
            data={results}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('SkillDetail', { skill: item })}
                >
                  <Text style={styles.skillName}>{item.title}</Text>
                  <Text style={styles.skillDesc}>{item.description}</Text>
                </TouchableOpacity>
            )}
            ListEmptyComponent={
              !loading ? <Text style={styles.empty}>Aucun résultat trouvé</Text> : null
            }
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#D0D8F0',
    color: '#333',
  },
  button: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1E90FF',
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
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
    fontSize: 15,
  },
});

export default SearchScreen;