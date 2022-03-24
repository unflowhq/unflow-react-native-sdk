import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import List from './List';
import Unflow from 'unflow-react-native';
import { LightningIcon, PlusCircleIcon } from './icons';

export default function ManualList({ screens, onAdd }) {
  let [data, setData] = useState([]);

  useEffect(() => {
    let mappedScreens = screens.map((screen) => {
      return {
        title: screen.title,
        description: screen.key,
        key: screen.key,
        Icon: LightningIcon,
      };
    });
    mappedScreens.push({
      title: 'Add “Manual” content',
      description: 'Preview content that’s manually added in code',
      style: 'action',
      key: 'create',
      Icon: PlusCircleIcon,
    });
    setData(mappedScreens);
  }, [screens]);

  let onPress = (key) => {
    if (key === 'create') {
      onAdd();
    } else {
      Unflow.openScreen(key);
    }
  };

  return (
    <View>
      <List data={data} onPress={onPress} />
    </View>
  );
}
