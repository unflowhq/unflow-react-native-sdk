import * as React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Unflow, { OpenerView } from 'unflow-react-native-sdk';

export default function App() {
  Unflow.initialize('a4d9813852bde4511755d9adb2b5716b', false);
  Unflow.sync();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Before</Text>
      <OpenerView />
      <Text>After</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});
