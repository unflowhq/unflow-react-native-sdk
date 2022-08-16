import React, { useEffect, useState } from 'react';
import { EmitterSubscription, View, Text, StyleSheet } from 'react-native';
import { EventEmitter, subscribeToSpaces } from './native-emitter';
import OpenerView from './opener-view';
import type { UnflowSpace, UnflowSpacesViewType } from './types';

const SpacesView: React.FC<UnflowSpacesViewType> = ({ cardStyle }) => {
  let [spaces, setSpaces] = useState<UnflowSpace[]>([]);

  useEffect(() => {
    let subscription: EmitterSubscription;
    if (EventEmitter) {
      subscription = EventEmitter.addListener('SpacesChanged', setSpaces);
      subscribeToSpaces();
    }
    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  return (
    <View>
      {spaces.map((space, index) => (
        <View key={space.spaceKey} style={index !== 0 && styles.space}>
          <Text style={styles.title}>{space.name}</Text>
          <OpenerView spaceKey={space.spaceKey} cardStyle={cardStyle} />
        </View>
      ))}
    </View>
  );
};

const useSpaces = () => {
  let [spaces, setSpaces] = useState<UnflowSpace[]>([]);

  let onSpacesChanged = (event: UnflowSpace[]) => {
    setSpaces(event);
  };

  useEffect(() => {
    let subscription: EmitterSubscription;
    if (EventEmitter) {
      subscription = EventEmitter.addListener('SpacesChanged', onSpacesChanged);
      subscribeToSpaces();
    }
    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  return spaces;
};

const styles = StyleSheet.create({
  space: { marginTop: 8 },
  title: {
    paddingHorizontal: 16,
    fontWeight: '500',
    color: '#52525B',
    marginBottom: 8,
  },
});

export default SpacesView;
export { useSpaces };
