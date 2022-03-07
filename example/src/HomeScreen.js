import * as React from 'react';
import { StyleSheet, RefreshControl, ScrollView } from 'react-native';
import Unflow from 'unflow-react-native';
import { OpenerView } from 'unflow-react-native';
import EventList from './EventList';
import ManualList from './ManualList';
import Section from './Section';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Unflow.sync();
    setTimeout(() => setRefreshing(false), 750);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Section title="Banner stack">
        <OpenerView />
      </Section>
      <Section title="Demo other content">
        <ManualList />
      </Section>
      <Section>
        <EventList />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', paddingVertical: 16 },
});
