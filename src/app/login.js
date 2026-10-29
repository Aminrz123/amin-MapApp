import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

import { supabase } from '@/supabase';

// Login-skærm: log ind eller opret en ny bruger med email og adgangskode
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert('Login fejlede', error.message);
    setLoading(false);
  }

  async function signUp() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert('Oprettelse fejlede', error.message);
    else Alert.alert('Bruger oprettet!');
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Adgangskode"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Log ind" onPress={signIn} disabled={loading} />
      <Button title="Opret bruger" onPress={signUp} disabled={loading} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
});
