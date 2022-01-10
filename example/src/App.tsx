import * as React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Unflow, { OpenerView } from 'unflow-react-native';

export default function App() {
  // Do this as early as possible in your app
  Unflow.initialize('ae469c05ed6d8f7c1d46d12901f661c9', true);
  Unflow.sync();
  Unflow.setUserId('<USER_ID>');
  Unflow.setCustomFonts({ button: 'shadowsintolight_regular' });
  Unflow.setAttributes({ name: 'Joe Bloggs' });

  return (
    <SafeAreaView style={styles.container}>
      <Text>Before meem</Text>
      <OpenerView />
      <Text>After</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
