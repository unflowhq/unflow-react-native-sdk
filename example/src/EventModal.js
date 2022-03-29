import React from 'react';
import { getData, storeData } from '../utils/storage';
import ShortcutScreen from './ShortcutScreen';

const EventModal = ({ navigation }) => {
  let onComplete = async (title, eventKey) => {
    let data = await getData();
    data.events.push({ title, key: eventKey });
    await storeData(data);
    navigation.goBack();
  };

  return (
    <ShortcutScreen
      navigation={navigation}
      onComplete={onComplete}
      secondaryTitle="Event Key"
      secondaryPlaceholder="Dashboard Key"
    />
  );
};

export default EventModal;
