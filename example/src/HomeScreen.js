import * as React from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import Unflow from 'unflow-react-native';
import { OpenerView } from 'unflow-react-native';
import Section from './Section';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Unflow.sync();
    setTimeout(() => setRefreshing(false), 750);
  }, []);

  return (
    <View
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Section title="Banner stack">
        <OpenerView />
      </Section>
      <Section title="Demo other content">Content</Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', paddingVertical: 16 },
});
