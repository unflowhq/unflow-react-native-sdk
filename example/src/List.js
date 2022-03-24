import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function List({ data, onPress }) {
  return (
    <View style={styles.list}>
      {data.map((item) => (
        <ListItem key={item.key} item={item} onPress={onPress} />
      ))}
    </View>
  );
}

const ListItem = ({ item, onPress }) => {
  let style = item.style || 'default';

  return (
    <TouchableOpacity onPress={() => onPress(item.key)} style={styles.item}>
      {item.Icon && (
        <item.Icon
          style={[styles.icon, { ...styles[style].primary }]}
          width={20}
          height={20}
        />
      )}
      <View>
        <Text style={[styles.title, { ...styles[style].primary }]}>
          {item.title}
        </Text>
        {item.description && (
          <Text style={[styles.description, { ...styles[style].secondary }]}>
            {item.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  list: { marginHorizontal: 16, backgroundColor: 'white', borderRadius: 16 },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { marginRight: 8 },
  title: { fontSize: 14, fontWeight: '500' },
  description: { fontSize: 12, fontWeight: '500' },
  default: {
    primary: { color: '#18181B' },
    secondary: { color: '#71717A' },
  },
  action: {
    primary: { color: '#6366F1' },
    secondary: { color: '#6366F1' },
  },
});
