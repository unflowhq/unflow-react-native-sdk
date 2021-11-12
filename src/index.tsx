import { NativeModules } from 'react-native';

type UnflowReactNativeSdkType = {
  multiply(a: number, b: number): Promise<number>;
  sync(): null;
};

const { UnflowReactNativeSdk } = NativeModules;

export default UnflowReactNativeSdk as UnflowReactNativeSdkType;
