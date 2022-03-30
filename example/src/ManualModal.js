import React from 'react';
import { getData, storeData } from '../utils/storage';
import ShortcutScreen from './ShortcutScreen';

const ManualModal = ({ navigation }) => {
  let onComplete = async (title, screenId) => {
    let data = await getData();
    data.screens.push({ title, key: parseInt(screenId, 10) });
    await storeData(data);
    navigation.goBack();
  };

  return (
    <ShortcutScreen
      navigation={navigation}
      onComplete={onComplete}
      secondaryTitle="Screen ID"
      secondaryPlaceholder="Dashboard Identifier"
      secondaryKeyboardType="numeric"
    />
  );
};

export default ManualModal;
