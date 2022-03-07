import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Section({ title, children }) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 28 },
  title: {
    paddingHorizontal: 16,
    fontWeight: '500',
    color: '#52525B',
    marginBottom: 8,
  },
});
