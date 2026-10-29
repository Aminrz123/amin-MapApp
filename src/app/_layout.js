import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { supabase } from '@/supabase';

SplashScreen.preventAutoHideAsync();

// Navigation for hele appen.
// Er man logget ind, ser man appen. Ellers ser man kun login.
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [session, setSession] = useState(null);

  // Hent den gemte session og lyt efter login/logud
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="index" options={{ title: 'Forside' }} />
          <Stack.Screen name="markers" options={{ title: 'Markers' }} />
          <Stack.Screen name="map" options={{ title: 'Kort' }} />
          <Stack.Screen name="detail/[id]" options={{ title: 'Detaljer' }} />
        </Stack.Protected>
        <Stack.Protected guard={!session}>
          <Stack.Screen name="login" options={{ title: 'Log ind' }} />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}
