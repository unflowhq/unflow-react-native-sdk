import React, { ReactElement, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { EventEmitter, subscribe } from './native-emitter';

type Opener = {
  id: number;
  title: String;
  priority: number;
  subtitle: String;
  imageURL: String;
};

export default function OpenerView({ subscriptionId }): ReactElement {
  let [openers, setOpeners] = useState<[Opener?]>([]);

  let onOpenersChanged = (event: [Opener]) => {
    setOpeners(event[subscriptionId]);
  };

  useEffect(() => {
    const subscription = EventEmitter.addListener(
      'OpenersChanged',
      onOpenersChanged
    );
    subscribe(subscriptionId);
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [subscriptionId]);

  return <Text>{openers.length}</Text>;
}
