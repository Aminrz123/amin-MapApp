import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

import { supabase } from '@/supabase';

// Forsiden: tre knapper til kortet, listen og log ud
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Min Kort App</Text>

      <Button title="Åbn kort" onPress={() => router.push('/map')} />
      <Button title="Se alle markers" onPress={() => router.push('/markers')} />
      <Button title="Log ud" color="gray" onPress={() => supabase.auth.signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
