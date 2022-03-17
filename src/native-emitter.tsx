import { NativeModules, Platform, NativeEventEmitter } from 'react-native';

const { UnflowEventEmitter, Unflow } = NativeModules;
const { subscribe } = Unflow;

const EventEmitter = Platform.select({
  ios: new NativeEventEmitter(UnflowEventEmitter),
  android: new NativeEventEmitter(Unflow),
});

export { EventEmitter, subscribe };
