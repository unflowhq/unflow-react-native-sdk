import { NativeModules } from 'react-native';

type UnflowReactNativeSdkType = {
  multiply(a: number, b: number): Promise<number>;
  initialize(apiKey: string, enableLogging: boolean): null;
  sync(): null;
};

const { UnflowReactNativeSdk } = NativeModules;

export default UnflowReactNativeSdk as UnflowReactNativeSdkType;
