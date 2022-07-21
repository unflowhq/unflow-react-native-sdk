import { NativeModules, Platform, NativeEventEmitter } from 'react-native';

const { UnflowEventEmitter, Unflow } = NativeModules;
const { openers, spaces } = Unflow;

const EventEmitter = Platform.select({
  ios: new NativeEventEmitter(UnflowEventEmitter),
  android: new NativeEventEmitter(Unflow),
});

export {
  EventEmitter,
  openers as subscribeToOpeners,
  spaces as subscribeToSpaces,
};
