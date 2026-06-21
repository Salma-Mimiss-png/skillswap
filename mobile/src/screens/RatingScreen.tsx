import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, TextInput,
  StyleSheet, Alert, ActivityIndicator,
  SafeAreaView, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import axios from 'axios';

const C = {
  primary: '#2B8EF0',
  primary50: '#EBF5FF',
  primary100: '#BFDBFE',
  primary800: '#1A3A6B',
  bg: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  textMain: '#1E293B',
  textSub: '#475569',
  textMuted: '#94A3B8',
  success: '#0D9E75',
  success50: '#E6FAF5',
  amber: '#F59E0B',
  amber50: '#FFF8E1',
  amber800: '#78350F',
};

const STAR_LABELS = ['', 'Mauvais', 'Passable', 'Correct', 'Bien', 'Excellent !'];
const TAGS = ['Très pédagogue', 'Patient', 'Clair', 'Ponctuel', 'Motivant', 'À recommander'];

export default function RatingScreen({ route, navigation }: any) {
  const { session } = route.params;
  const [stars, setStars]       = useState(0);
  const [comment, setComment]   = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading]   = useState(false);

  const toggleTag = (tag: string) => {
    setSelected(prev => {
      const next = prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag];
      setComment(next.join(', '));
      return next;
    });
  };

  const handleSubmit = async () => {
    if (stars === 0) {
      Alert.alert('Note requise', 'Veuillez sélectionner au moins une étoile.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://10.0.2.2:8080/api/ratings', {
        sessionId: session.id,
        userId: session.teacherId,
        stars,
        comment: comment.trim(),
      });
        await axios.put(`http://10.0.2.2:8080/api/sessions/${session.id}/rate?stars=${stars}`);
      Alert.alert('Merci !', 'Votre note a été enregistrée.', [
        { text: 'OK', onPress: () => navigation.navigate('Sessions') },
      ]);
    } catch {
      Alert.alert('Erreur', 'Impossible d\'envoyer la note.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={ss.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={ss.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 20, color: C.textMain }}>←</Text>
          </TouchableOpacity>
          <Text style={ss.headerTitle}>Noter l'échange</Text>
        </View>

        <ScrollView contentContainerStyle={ss.scroll} keyboardShouldPersistTaps="handled">

          {/* Session recap */}
          <View style={ss.card}>
            <Text style={ss.cardTitle}>{session.skillTitle || 'Compétence'}</Text>
            <Text style={ss.cardSub}>{session.teacherName || 'Enseignant'}</Text>
            <Text style={ss.cardDate}>{session.date}  {session.time}</Text>
          </View>

          {/* Stars */}
          <View style={ss.section}>
            <Text style={ss.sectionTitle}>Votre note</Text>
            <View style={ss.starRow}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity key={star} onPress={() => setStars(star)} style={ss.starBtn}>
                  <Text style={[ss.star, star <= stars && ss.starActive]}>★</Text>
                </TouchableOpacity>
              ))}
            </View>
            {stars > 0 && <Text style={ss.starLabel}>{STAR_LABELS[stars]}</Text>}
          </View>

          {/* Tags */}
          <View style={ss.section}>
            <Text style={ss.sectionTitle}>Tags rapides</Text>
            <View style={ss.tagRow}>
              {TAGS.map(tag => (
                <TouchableOpacity
                  key={tag}
                  style={[ss.tag, selected.includes(tag) && ss.tagActive]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text style={[ss.tagText, selected.includes(tag) && ss.tagTextActive]}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Comment */}
          <View style={ss.section}>
            <Text style={ss.sectionTitle}>Commentaire <Text style={{ color: C.textMuted, fontWeight: '400' }}>(optionnel)</Text></Text>
            <TextInput
              style={ss.textArea}
              multiline
              numberOfLines={4}
              placeholder="Décrivez votre expérience…"
              placeholderTextColor={C.textMuted}
              value={comment}
              onChangeText={setComment}
              maxLength={300}
              textAlignVertical="top"
            />
            <Text style={ss.charCount}>{comment.length} / 300</Text>
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={[ss.submitBtn, stars === 0 && ss.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={loading || stars === 0}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={ss.submitBtnText}>Envoyer mon avis</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={ss.skipBtn} onPress={() => navigation.navigate('Sessions')}>
            <Text style={ss.skipBtnText}>Passer</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ss = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: '#F8FAFC' },
  header:         { backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#E2E8F0', gap: 10 },
  headerTitle:    { fontSize: 17, fontWeight: '600', color: '#1E293B' },
  scroll:         { padding: 16, gap: 12, paddingBottom: 32 },
  card:           { backgroundColor: '#fff', borderRadius: 12, padding: 14, borderWidth: 0.5, borderColor: '#E2E8F0', gap: 4 },
  cardTitle:      { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  cardSub:        { fontSize: 13, color: '#475569' },
  cardDate:       { fontSize: 11, color: '#94A3B8' },
  section:        { backgroundColor: '#fff', borderRadius: 12, padding: 14, borderWidth: 0.5, borderColor: '#E2E8F0', gap: 8 },
  sectionTitle:   { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  starRow:        { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingVertical: 4 },
  starBtn:        { padding: 4 },
  star:           { fontSize: 38, color: '#E2E8F0' },
  starActive:     { color: '#F59E0B' },
  starLabel:      { textAlign: 'center', fontSize: 14, fontWeight: '500', color: '#78350F' },
  tagRow:         { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag:            { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 0.5, borderColor: '#E2E8F0', backgroundColor: '#F8FAFC' },
  tagActive:      { backgroundColor: '#EBF5FF', borderColor: '#BFDBFE' },
  tagText:        { fontSize: 12, color: '#475569', fontWeight: '500' },
  tagTextActive:  { color: '#1A3A6B' },
  textArea:       { borderWidth: 0.5, borderColor: '#E2E8F0', borderRadius: 8, padding: 10, fontSize: 14, color: '#1E293B', minHeight: 96, lineHeight: 20 },
  charCount:      { fontSize: 11, color: '#94A3B8', textAlign: 'right' },
  submitBtn:      { backgroundColor: '#2B8EF0', padding: 14, borderRadius: 999, alignItems: 'center', marginTop: 4 },
  submitBtnDisabled: { backgroundColor: '#E2E8F0' },
  submitBtnText:  { fontSize: 15, fontWeight: '600', color: '#fff' },
  skipBtn:        { alignItems: 'center', padding: 10 },
  skipBtnText:    { fontSize: 14, color: '#94A3B8' },
});