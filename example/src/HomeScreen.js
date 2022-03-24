import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, RefreshControl, ScrollView } from 'react-native';
import Unflow from 'unflow-react-native';
import { OpenerView } from 'unflow-react-native';
import { getData } from '../lib/storage';
import EventList from './EventList';
import ManualList from './ManualList';
import Section from './Section';

export default function HomeScreen({ navigation }) {
  let [data, setData] = useState({ screens: [], events: [] });
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Unflow.sync();
    setTimeout(() => setRefreshing(false), 750);
  }, []);

  let refreshData = async () => {
    let data = await getData();
    setData(data);
  };

  useEffect(refreshData, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', refreshData);
    return unsubscribe;
  }, [navigation]);

  console.log(data);

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
        <ManualList
          screens={data.screens}
          onAdd={() => navigation.navigate('ManualModal')}
        />
      </Section>
      <Section>
        <EventList
          events={data.events}
          onAdd={() => navigation.navigate('EventModal')}
        />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', paddingVertical: 16 },
});
