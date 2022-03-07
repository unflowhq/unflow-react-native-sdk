import * as React from 'react';
import { LightningIcon, PlusCircleIcon } from './icons';
import List from './List';
import Unflow from 'unflow-react-native';

export default function EventList() {
  let onPress = (key) => {
    if (key === 'create') {
      // Open sheet
    } else {
      Unflow.trackEvent(key, {});
    }
  };

  return (
    <List
      data={[
        {
          title: 'Hello',
          description: 'Mine',
          key: 'magicEvent',
          Icon: LightningIcon,
        },
        {
          title: 'Add “Manual” content',
          description: 'Preview content that’s manually added in code',
          style: 'action',
          key: 'magicEvent',
          Icon: PlusCircleIcon,
        },
      ]}
      onPress={onPress}
    />
  );
}
