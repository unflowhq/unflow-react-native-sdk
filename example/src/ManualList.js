import * as React from 'react';
import { View, Text } from 'react-native';
import BottomSheet from './Sheet';
import { LightningIcon, PlusCircleIcon } from './icons';
import List from './List';

export default function ManualList() {
  let onPress = (key) => {
    if (key === 'create') {
      // Open sheet
    } else {
      Unflow.openScreen(key);
    }
  };

  return (
    <View>
      <BottomSheet>
        <Text>Hello</Text>
      </BottomSheet>
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
            key: 'create',
            Icon: PlusCircleIcon,
          },
        ]}
        onPress={onPress}
      />
    </View>
  );
}
