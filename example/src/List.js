import * as React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

export default function List({ data }) {
  return (
    <View style={styles.list}>
      <FlatList
        data={data}
        renderItem={ListItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const ListItem = ({ item }) => (
  <View style={styles.listItem}>
    <Text>{item.title}</Text>
    {item.description && <Text>{item.title}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  list: { marginHorizontal: 16, backgroundColor: 'white', borderRadius: 16 },
  listItem: { paddingVertical: 12, paddingHorizontal: 16 },
});
