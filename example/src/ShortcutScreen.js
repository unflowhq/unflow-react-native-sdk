import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Section from './Section';

const ShortcutScreen = ({
  onComplete,
  secondaryTitle,
  secondaryPlaceholder,
  secondaryKeyboardType = 'default',
}) => {
  let [title, setTitle] = useState('');
  let [key, setKey] = useState(null);

  let add = () => onComplete(title, key);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Section title="Title">
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
            placeholder="Shortcut Name"
          />
        </Section>
        <Section title={secondaryTitle}>
          <TextInput
            style={styles.input}
            onChangeText={setKey}
            value={key}
            placeholder={secondaryPlaceholder}
            keyboardType={secondaryKeyboardType}
          />
        </Section>
        <TouchableOpacity style={styles.button} onPress={add}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { paddingVertical: 16 },
  button: {
    backgroundColor: '#6366F1',
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 32,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    backgroundColor: 'white',
    marginHorizontal: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});

export default ShortcutScreen;
