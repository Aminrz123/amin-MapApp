import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { router } from 'expo-router';

import { supabase } from '@/supabase';

// Kortet starter over København
const startRegion = {
  latitude: 55.6761,
  longitude: 12.5683,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

export default function MapScreen() {
  const [markers, setMarkers] = useState([]);

  // Hent markers fra Supabase når skærmen åbner
  useEffect(() => {
    supabase
      .from('markers')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          Alert.alert('Fejl', 'Kunne ikke hente markers');
        } else {
          setMarkers(data);
        }
      });
  }, []);

  // Langt tryk på kortet = ny marker
  async function tilfoejMarker(event) {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    const nyMarker = {
      titel: 'Marker ' + (markers.length + 1),
      latitude: latitude,
      longitude: longitude,
    };

    const { data, error } = await supabase.from('markers').insert(nyMarker).select().single();

    if (error) {
      Alert.alert('Fejl', 'Kunne ikke gemme marker');
      return;
    }
    setMarkers([...markers, data]);
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={startRegion} onLongPress={tilfoejMarker}>
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.titel}
            description="Tryk for detaljer"
            onCalloutPress={() => router.push('/detail/' + marker.id)}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
