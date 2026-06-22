import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert, SafeAreaView,
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
  success800: '#065140',
  danger: '#EF4444',
  danger50: '#FEF2F2',
  amber50: '#FFF8E1',
  amber800: '#78350F',
};

const TABS = ['En attente', 'Acceptées', 'Terminées'];
const STATUS_MAP: Record<string, string[]> = {
  'En attente': ['PENDING'],
  'Acceptées': ['ACCEPTED', 'IN_PROGRESS'],
  'Terminées': ['COMPLETED', 'REJECTED', 'CANCELLED'],
};

function StatusBadge({ status }: { status: string }) {
  const configs: Record<string, { bg: string; text: string; label: string }> = {
    PENDING:     { bg: C.amber50,   text: C.amber800,   label: 'En attente' },
    ACCEPTED:    { bg: C.success50, text: C.success800, label: 'Acceptée'   },
    IN_PROGRESS: { bg: C.primary50, text: C.primary800, label: 'En cours'   },
    COMPLETED:   { bg: C.success50, text: C.success800, label: 'Terminée'   },
    REJECTED:    { bg: C.danger50,  text: C.danger,     label: 'Refusée'    },
    CANCELLED:   { bg: '#F1F5F9',   text: C.textSub,    label: 'Annulée'    },
  };
  const cfg = configs[status] || configs.PENDING;
  return (
    <View style={[ss.badge, { backgroundColor: cfg.bg }]}>
      <Text style={[ss.badgeText, { color: cfg.text }]}>{cfg.label}</Text>
    </View>
  );
}

export default function SessionsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState(0);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////::::::::

  const userId ='user2';
 ////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////:
 //////////////////////////////////////////////////////////////////////:::

  useEffect(() => { fetchSessions(); }, []);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://192.168.1.7:8085/api/sessions/my/${userId}`,
      );
      setSessions(res.data);
    } catch {
      Alert.alert('Erreur', 'Impossible de charger les sessions.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: string) => {
    await axios.put(`http://10.0.2.2:8080/api/sessions/${id}/accept`);
    fetchSessions();
  };

  const handleReject = async (id: string) => {
    await axios.put(`http://10.0.2.2:8080/api/sessions/${id}/reject`);
    fetchSessions();
  };

  const handleComplete = async (id: string) => {
    await axios.put(`http://10.0.2.2:8080/api/sessions/${id}/complete`);
    fetchSessions();
  };

  const filtered = sessions.filter(s => STATUS_MAP[TABS[activeTab]].includes(s.status));

  return (
    <SafeAreaView style={ss.safe}>
        <View style={ss.header}>
        <Text style={ss.headerTitle}>Sessions</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Text style={{ fontSize: 22 }}>🔔</Text>
        </TouchableOpacity>
        </View>

      <View style={ss.tabs}>
        {TABS.map((tab, i) => (
          <TouchableOpacity key={tab} style={[ss.tab, activeTab === i && ss.tabActive]} onPress={() => setActiveTab(i)}>
            <Text style={[ss.tabText, activeTab === i && ss.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={C.primary} style={{ marginTop: 40 }} />
      ) : filtered.length === 0 ? (
        <View style={ss.empty}>
          <Text style={ss.emptyIcon}>📅</Text>
          <Text style={ss.emptyText}>Aucune session</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 14, gap: 10 }}
          renderItem={({ item }) => (
            <View style={ss.card}>
              <View style={ss.cardTop}>
                <View style={ss.cardInfo}>
                <Text style={ss.cardTitle}>{item.skillTitle || 'Compétence'}</Text>
                <Text style={ss.cardDate}>👤 {userId === item.teacherId ? item.studentName : item.teacherName}</Text>
                <Text style={ss.cardDate}>{item.date}  {item.time}</Text>
                </View>
                <StatusBadge status={item.status} />
              </View>
              {item.status === 'PENDING' && (
                <View style={ss.actions}>
                  <TouchableOpacity style={[ss.actionBtn, { backgroundColor: C.success }]} onPress={() => handleAccept(item.id)}>
                    <Text style={ss.actionBtnText}>✓ Accepter</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[ss.actionBtn, { backgroundColor: C.danger50 }]} onPress={() => handleReject(item.id)}>
                    <Text style={[ss.actionBtnText, { color: C.danger }]}>✕ Refuser</Text>
                  </TouchableOpacity>
                </View>
              )}
              {item.status === 'ACCEPTED' && (
                <TouchableOpacity style={[ss.actionBtn, { backgroundColor: C.primary, marginTop: 10 }]} onPress={() => handleComplete(item.id)}>
                  <Text style={ss.actionBtnText}>Terminer</Text>
                </TouchableOpacity>
              )}
                {item.status === 'COMPLETED' && item.rated !== true && (
                <TouchableOpacity style={[ss.actionBtn, { backgroundColor: C.amber50, marginTop: 10 }]} onPress={() => navigation.navigate('Rating', { session: item })}>
                    <Text style={[ss.actionBtnText, { color: C.amber800 }]}>⭐ Noter</Text>
                </TouchableOpacity>
                )}
                {item.status === 'COMPLETED' && item.rated === true && (
                <View style={[ss.actionBtn, { backgroundColor: C.amber50, marginTop: 10 }]}>
                    <Text style={[ss.actionBtnText, { color: C.amber800 }]}>{'⭐'.repeat(item.stars || 0)} Noté</Text>
                </View>
                )}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const ss = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: '#F8FAFC' },
header: { backgroundColor: '#2B8EF0', padding: 16, borderBottomWidth: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
headerTitle: { fontSize: 17, fontWeight: '600', color: '#FFFFFF' },
  tabs:          { flexDirection: 'row', backgroundColor: '#fff', paddingHorizontal: 14, paddingTop: 10, borderBottomWidth: 0.5, borderBottomColor: '#E2E8F0' },
  tab:           { flex: 1, paddingBottom: 10, alignItems: 'center' },
  tabActive:     { borderBottomWidth: 2, borderBottomColor: '#2B8EF0' },
  tabText:       { fontSize: 13, color: '#94A3B8', fontWeight: '500' },
  tabTextActive: { color: '#2B8EF0' },
  card:          { backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 0.5, borderColor: '#E2E8F0' },
  cardTop:       { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  cardInfo:      { flex: 1 },
  cardTitle:     { fontSize: 14, fontWeight: '500', color: '#1E293B', marginBottom: 2 },
  cardDate:      { fontSize: 11, color: '#94A3B8' },
  badge:         { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  badgeText:     { fontSize: 11, fontWeight: '500' },
  actions:       { flexDirection: 'row', gap: 8, marginTop: 10 },
  actionBtn:     { flex: 1, padding: 10, borderRadius: 999, alignItems: 'center' },
  actionBtnText: { fontSize: 13, fontWeight: '500', color: '#fff' },
  empty:         { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyIcon:     { fontSize: 36 },
  emptyText:     { fontSize: 14, color: '#94A3B8' },
});
