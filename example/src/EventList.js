import React, { useState, useEffect } from 'react';
import { LightningIcon, PlusCircleIcon } from './icons';
import List from './List';
import Unflow from 'unflow-react-native';

export default function EventList({ events, onAdd }) {
  let [data, setData] = useState([]);

  useEffect(() => {
    let mappedEvents = events.map((screen) => {
      return {
        title: screen.title,
        description: screen.key,
        key: screen.key,
        Icon: LightningIcon,
      };
    });
    mappedEvents.push({
      title: 'Add Event trigger',
      description: 'Add an event that can be trigger automatically',
      style: 'action',
      key: 'create',
      Icon: PlusCircleIcon,
    });
    setData(mappedEvents);
  }, [events]);

  let onPress = (key) => {
    if (key === 'create') {
      onAdd();
    } else {
      Unflow.trackEvent(key, {});
    }
  };

  return <List data={data} onPress={onPress} />;
}
