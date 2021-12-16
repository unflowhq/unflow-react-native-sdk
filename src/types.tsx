import type { ViewStyle } from 'react-native';

export type OpenerType = {
  style?: [ViewStyle, { height: number }];
  onHeightSet?: (event: { nativeEvent: { height: number } }) => void;
};

export type UnflowType = {
  initialize(apiKey: string, enableLogging: boolean): null;
  sync(): null;
  setUserId(userId: string): null;
  setAttributes({}: { [key: string]: string }): null;
  setCustomFonts({}: {
    title?: string;
    body?: string;
    button?: string;
    openerTitle?: string;
    openerSubtitle?: string;
  }): null;
};
