import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { supabase } from '@/supabase';

// Viser én marker og giver mulighed for at slette den
export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const [marker, setMarker] = useState(null);

  // Hent den marker der har dette id
  useEffect(() => {
    supabase
      .from('markers')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => setMarker(data));
  }, [id]);

  async function sletMarker() {
    const { error } = await supabase.from('markers').delete().eq('id', id);
    if (error) {
      Alert.alert('Fejl', 'Kunne ikke slette marker');
      return;
    }
    router.back();
  }

  if (!marker) {
    return <Text style={styles.container}>Henter...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titel}>{marker.titel}</Text>
      <Text>Latitude: {marker.latitude}</Text>
      <Text>Longitude: {marker.longitude}</Text>
      <Button title="Slet marker" color="red" onPress={sletMarker} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  titel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
