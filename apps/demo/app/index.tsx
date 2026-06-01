import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NumberAdjuster } from 'react-native-adjust-numbers';

export default function IndexScreen() {
  const [intValue, setIntValue] = useState('12345');
  const [decValue, setDecValue] = useState('1234.5');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>adjust-numbers demo</Text>

        {/* Integer example */}
        <Text style={styles.sectionTitle}>Integer mode</Text>
        <NumberAdjuster value={intValue} onChange={setIntValue} />
        <Text style={styles.output}>value: {intValue}</Text>

        <View style={styles.divider} />

        {/* Decimal example */}
        <Text style={styles.sectionTitle}>Decimal mode</Text>
        <NumberAdjuster value={decValue} onChange={setDecValue} useComma={false} />
        <Text style={styles.output}>value: {decValue}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#111' },
  container: { padding: 24, alignItems: 'center' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFDE7',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  output: {
    color: '#FFFDE7',
    fontSize: 16,
    marginTop: 12,
    fontFamily: 'monospace',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    width: '100%',
    marginVertical: 32,
  },
});
