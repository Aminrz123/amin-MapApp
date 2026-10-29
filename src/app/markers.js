import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { supabase } from '@/supabase';

// Viser alle markers fra Supabase som en liste
export default function Home() {
  const [markers, setMarkers] = useState([]);

  // Hent markers når skærmen åbner
  useEffect(() => {
    supabase
      .from('markers')
      .select('*')
      .then(({ data }) => setMarkers(data ?? []));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={markers}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>Ingen markers endnu. Lav en på kortet!</Text>}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => router.push('/detail/' + item.id)}>
            <Text style={styles.titel}>{item.titel}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  titel: {
    fontSize: 16,
  },
});
