import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {
  Book,
  Bug,
  Bulb,
  Comment,
  LinkedIn,
  Share,
  Twitter,
  UnflowMark,
} from './icons';
import Section from './Section';

const LINKS_DATA = [
  {
    id: 'docs',
    title: 'Technical documentation',
    icon: Book,
    external: true,
    url: 'https://docs.unflow.com',
  },
  {
    id: 'chat',
    title: 'Chat with the team',
    icon: Comment,
    url: 'mailto:team@unflow.com',
  },
  {
    id: 'feature',
    title: 'Feature request',
    icon: Bulb,
    url: 'mailto:team@unflow.com',
  },
  {
    id: 'bug',
    title: 'Report a bug',
    icon: Bug,
    url: 'mailto:team@unflow.com',
  },
];

const SOCIAL_DATA = [
  {
    id: 'website',
    title: 'Website',
    icon: UnflowMark,
    external: true,
    url: 'https://unflow.com',
  },
  {
    id: 'twitter',
    title: 'Twitter',
    icon: Twitter,
    external: true,
    url: 'https://twitter.com/unflowhq',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    icon: LinkedIn,
    external: true,
    url: 'https://www.linkedin.com/company/65640038',
  },
];

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const ListItem = ({ item }) => {
  const onPress = async () => {
    let supported = await Linking.canOpenURL(item.url);
    if (supported) {
      await Linking.openURL(item.url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${item.url}`);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.listItem}>
      <View style={styles.listItemDescription}>
        <item.icon style={styles.icon} />
        <Text>{item.title}</Text>
      </View>
      {item.external && <Share style={styles.share} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 16, backgroundColor: '#FAFAFA' },
  list: { marginHorizontal: 16, backgroundColor: 'white', borderRadius: 16 },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemDescription: {
    flexDirection: 'row',
  },
  icon: { width: 20, height: 20, marginRight: 8, color: 'black' },
  share: { width: 20, height: 20, color: '#D4D4D8' },
});
