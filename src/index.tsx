import { NativeModules, requireNativeComponent, ViewStyle } from 'react-native';

const { UnflowReactNativeSdk } = NativeModules;

type UnflowReactNativeSdkType = {
  multiply(a: number, b: number): Promise<number>;
  initialize(apiKey: string, enableLogging: boolean): null;
  sync(): null;
};

type OpenerViewProps = {
  style?: ViewStyle;
};

const OpenerView = requireNativeComponent<OpenerViewProps>(
  'UnflowReactNativeSdkView'
);

export { OpenerView };
export default UnflowReactNativeSdk as UnflowReactNativeSdkType;
