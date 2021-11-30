import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import UnflowReactNativeSdk, { OpenerView } from 'unflow-react-native-sdk';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    UnflowReactNativeSdk.multiply(3, 7).then(setResult);
    UnflowReactNativeSdk.initialize('a4d9813852bde4511755d9adb2b5716b', false);
    UnflowReactNativeSdk.sync();
    UnflowReactNativeSdk.setUserId('1234567');
    UnflowReactNativeSdk.setAttributes({ name: 'David' });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <OpenerView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
