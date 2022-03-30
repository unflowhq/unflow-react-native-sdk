import React, { useEffect, useState, useCallback } from 'react';
<<<<<<< HEAD
import { StyleSheet, RefreshControl, ScrollView, View } from 'react-native';
=======
import {
  StyleSheet,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
>>>>>>> 2874e95 (Custom opener examples)
import Unflow, { OpenerView } from 'unflow-react-native';
import { getData } from '../utils/storage';
import CustomStack from './CustomStack';
import EventList from './EventList';
import ManualList from './ManualList';
import Section from './Section';
import VisualOpener from './VisualOpener';

export default function HomeScreen({ navigation }) {
  let [data, setData] = useState({ screens: [], events: [] });
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Unflow.sync();
    setTimeout(() => setRefreshing(false), 750);
  }, []);

  let refreshData = () => {
    async function func() {
      let response = await getData();
      setData(response);
    }
    func();
  };

  useEffect(refreshData, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', refreshData);
    return unsubscribe;
  }, [navigation]);

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
      <Section title="Card stack">
        <OpenerView>
          {({ opener }) => <VisualOpener opener={opener} />}
        </OpenerView>
      </Section>
      <Section title="Custom stack">
        <CustomStack />
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
      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingVertical: 16,
  },
  spacer: { height: 160 },
});
