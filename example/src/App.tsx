import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import UnflowReactNativeSdk, { OpenerView } from 'unflow-react-native-sdk';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    UnflowReactNativeSdk.multiply(3, 7).then(setResult);
    UnflowReactNativeSdk.initialize('ae469c05ed6d8f7c1d46d12901f661c9', true);
    UnflowReactNativeSdk.sync();
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
  // box: {
  //   width: 60,
  //   height: 60,
  //   marginVertical: 20,
  // },
});
