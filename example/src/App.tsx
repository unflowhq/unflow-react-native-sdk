import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, Button } from 'react-native';
import Unflow, { OpenerView } from 'unflow-react-native';

export default function App() {
  // Do this as early as possible in your app
  Unflow.initialize('ae469c05ed6d8f7c1d46d12901f661c9', true);
  Unflow.sync();
  Unflow.setUserId('<USER_ID>');
  Unflow.setCustomFonts({ button: 'shadowsintolight_regular' });
  Unflow.setAttributes({ name: 'Joe Bloggs' });

  let [showOpener, setShowOpener] = React.useState(true);

  let syncUnflow = () => Unflow.sync();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Before meem</Text>
      {showOpener && <OpenerView subscriptionId={'default'} />}
      <Button onPress={syncUnflow} title="Sync" />
      <Button onPress={() => setShowOpener(true)} title="Add Opener" />
      <Button onPress={() => setShowOpener(false)} title="Remove Opener" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'red' },
});
