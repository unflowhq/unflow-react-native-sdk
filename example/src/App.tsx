import * as React from 'react';

import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Unflow, { OpenerView } from 'unflow-react-native-sdk';

export default function App() {
  Unflow.initialize('a4d9813852bde4511755d9adb2b5716b', true);
  Unflow.sync();

  React.useEffect(() => {
    // Unflow.initialize('a4d9813852bde4511755d9adb2b5716b', true);
    // Unflow.sync();
    // Unflow.setUserId('1234567');
    // Unflow.setAttributes({ name: 'David' });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Padding</Text>
      <Text>Padding</Text>
      <Text>Padding</Text>
      <Text>Padding</Text>
      <Text>Padding</Text>

      <OpenerView
        style={{ height: 80, width: '100%', backgroundColor: 'red' }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  // box: {
  //   width: 60,
  //   height: 60,
  //   marginVertical: 20,
  // },
});
