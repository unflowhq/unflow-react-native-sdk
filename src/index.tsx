import { NativeModules, requireNativeComponent, ViewStyle } from 'react-native';

const { Unflow } = NativeModules;

type UnflowType = {
  initialize(apiKey: string, enableLogging: boolean): null;
  sync(): null;
  setUserId(userId: string): null;
  setAttributes({}): null;
  setCustomFonts({}: {
    title: string;
    body: string;
    button: string;
    openerTitle: string;
    openerSubtitle: string;
  }): null;
};

type OpenerViewProps = {
  style?: ViewStyle;
};

const OpenerView = requireNativeComponent<OpenerViewProps>(
  'UnflowReactNativeSdkView'
);

export { OpenerView };
export default Unflow as UnflowType;
