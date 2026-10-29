import { StyleSheet, Text, View } from 'react-native';

// react-native-maps virker ikke på web, så her vises bare en besked
export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text>Kortet findes kun på mobil.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
