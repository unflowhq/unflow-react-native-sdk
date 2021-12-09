import * as React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Unflow, { OpenerView } from 'unflow-react-native-sdk';

export default function App() {
  // Do this as early as possible in your app
  Unflow.initialize('<YOUR_API_KEY>', true);
  Unflow.sync();
  Unflow.setUserId('<USER_ID>');
  Unflow.setAttributes({ name: 'Joe Bloggs' });

  return (
    <SafeAreaView style={styles.container}>
      <Text>Before</Text>
      <OpenerView />
      <Text>After</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
