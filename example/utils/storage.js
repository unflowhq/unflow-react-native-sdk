import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'UNFLOW_MIRROR_STORAGE';

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {}
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null
      ? JSON.parse(jsonValue)
      : { screens: [], events: [] };
  } catch (e) {}
};

export { storeData, getData };
