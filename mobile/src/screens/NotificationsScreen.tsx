import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const userId = 'user2'; 

const C = {
  primary: '#2B8EF0',
  primary50: '#EBF5FF',
  primary800: '#1A3A6B',
  bg: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  textMain: '#1E293B',
  textSub: '#475569',
  textMuted: '#94A3B8',
  success50: '#E6FAF5',
  success800: '#065140',
  danger50: '#FEF2F2',
  danger: '#EF4444',
  amber50: '#FFF8E1',
  amber800: '#78350F',
};

function getNotifStyle(type: string) {
  switch (type) {
    case 'NEW_REQUEST': return { icon: '📩', bg: C.primary50,  text: C.primary800  };
    case 'ACCEPTED':    return { icon: '✅', bg: C.success50,  text: C.success800  };
    case 'REJECTED':    return { icon: '❌', bg: C.danger50,   text: C.danger      };
    case 'COMPLETED':   return { icon: '⭐', bg: C.amber50,    text: C.amber800    };
    default:            return { icon: '🔔', bg: '#F1F5F9',    text: C.textSub     };
  }
}

function formatTime(dateString: string) {
  if (!dateString) return '';
  const d = new Date(dateString);
  const now = new Date();
  const diffMin = Math.floor((now.getTime() - d.getTime()) / 60000);
  if (diffMin < 1)  return 'À l\'instant';
  if (diffMin < 60) return `Il y a ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24)   return `Il y a ${diffH}h`;
  return d.toLocaleDateString('fr-FR');
}

export default function NotificationsScreen({ navigation }: any) {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => { loadNotifs(); }, []);

const loadNotifs = async () => {
  try {
    const res = await axios.get(`http://10.0.2.2:8080/api/notifications/user/${userId}`);
    setNotifications(res.data);
  } catch {
    console.log('Erreur chargement notifications');
  }
};

const markAsRead = async (item: any) => {
  try {
    await axios.put(`http://10.0.2.2:8080/api/notifications/${item.id}/read`);
    loadNotifs();
    if (item.sessionId) navigation.navigate('Sessions');
  } catch {}
};

const markAllRead = async () => {
  try {
    const unread = notifications.filter(n => !n.read);
    await Promise.all(unread.map(n => axios.put(`http://10.0.2.2:8080/api/notifications/${n.id}/read`)));
    loadNotifs();
  } catch {}
};

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={ss.safe}>
      <View style={ss.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 20, color: C.textMain }}>←</Text>
        </TouchableOpacity>
        <Text style={ss.headerTitle}>
          Notifications{unreadCount > 0 ? ` (${unreadCount})` : ''}
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text style={ss.markAll}>Tout lire</Text>
          </TouchableOpacity>
        )}
      </View>

      {notifications.length === 0 ? (
        <View style={ss.empty}>
          <Text style={ss.emptyIcon}>🔔</Text>
          <Text style={ss.emptyTitle}>Aucune notification</Text>
          <Text style={ss.emptyMsg}>Vous recevrez ici les demandes de session.</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const style = getNotifStyle(item.type);
            return (
              <TouchableOpacity
                style={[ss.notifCard, !item.read && ss.notifUnread]}
                onPress={() => markAsRead(item)}
              >
                <View style={[ss.notifIcon, { backgroundColor: style.bg }]}>
                  <Text style={{ fontSize: 18 }}>{style.icon}</Text>
                </View>
                <View style={ss.notifBody}>
                  <Text style={[ss.notifTitle, !item.read && { fontWeight: '600' }]}>{item.title}</Text>
                  <Text style={ss.notifMsg} numberOfLines={2}>{item.body}</Text>
                  <Text style={ss.notifTime}>{formatTime(item.createdAt)}</Text>
                </View>
                {!item.read && <View style={ss.unreadDot} />}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const ss = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: '#F8FAFC' },
  header:       { backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#E2E8F0' },
  headerTitle:  { flex: 1, fontSize: 17, fontWeight: '600', color: '#1E293B', marginLeft: 10 },
  markAll:      { fontSize: 13, color: '#2B8EF0', fontWeight: '500' },
  notifCard:    { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#E2E8F0' },
  notifUnread:  { backgroundColor: '#EBF5FF' },
  notifIcon:    { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  notifBody:    { flex: 1, gap: 2 },
  notifTitle:   { fontSize: 14, color: '#1E293B' },
  notifMsg:     { fontSize: 13, color: '#475569', lineHeight: 18 },
  notifTime:    { fontSize: 11, color: '#94A3B8', marginTop: 2 },
  unreadDot:    { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2B8EF0', marginTop: 6 },
  empty:        { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 8 },
  emptyIcon:    { fontSize: 44 },
  emptyTitle:   { fontSize: 16, fontWeight: '600', color: '#1E293B' },
  emptyMsg:     { fontSize: 14, color: '#475569', textAlign: 'center' },
});