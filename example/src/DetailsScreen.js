import * as React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, Text } from 'react-native';
import Section from './Section';

const LINKS_DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Technical documentation',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chat with the team',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Feature request',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Report a bug',
  },
];

const SOCIAL_DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Website',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Twitter',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'LinkedIn',
  },
];

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Section title="Useful links">
        <View style={styles.list}>
          <FlatList
            data={LINKS_DATA}
            renderItem={ListItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Section>
      <Section title="Find us online">
        <View style={styles.list}>
          <FlatList
            data={SOCIAL_DATA}
            renderItem={ListItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Section>
    </SafeAreaView>
  );
}

const ListItem = ({ item }) => (
  <View style={styles.listItem}>
    <Text>{item.title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  list: { marginHorizontal: 16, backgroundColor: 'white', borderRadius: 16 },
  listItem: { paddingVertical: 12, paddingHorizontal: 16 },
});
