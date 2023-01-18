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
import { storeData } from '../utils/storage';
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
import Unflow from 'unflow-react-native';

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
  let clearStorage = async () => {
    await storeData({ screens: [], events: [] });
  };
  let resetSession = () => {
      Unflow.clearUserSession();
  };
  
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
      <TouchableOpacity style={styles.destructiveButton} onPress={resetSession}>
        <Text style={styles.destructiveButtonText}>Reset User Session</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.destructiveButton} onPress={clearStorage}>
        <Text style={styles.destructiveButtonText}>Clear Cache</Text>
      </TouchableOpacity>
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
  destructiveButton: {
    backgroundColor: '#FACDCD',
    marginHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius: 32,
    alignItems: 'center',
  },
  destructiveButtonText: {
    color: '#E80404',
    fontSize: 16,
  },
});
