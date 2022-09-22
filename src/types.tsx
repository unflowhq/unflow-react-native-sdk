import type { StyleProp, ViewStyle } from 'react-native';

export type UnflowSpace = {
  id: number;
  spaceKey: string;
  name: string;
  openers: UnflowOpener[];
};

export type UnflowOpener = {
  id: number;
  title: string;
  priority: number;
  subtitle: string;
  imageURL: string;
};

export type UnflowSpacesViewType = {
  cardStyle?: StyleProp<ViewStyle>;
};

export type UnflowOpenerViewType = {
  spaceKey?: string;
  cardStyle?: StyleProp<ViewStyle>;
  children?: ({
    opener,
    numOpeners,
  }: {
    opener: UnflowOpener;
    numOpeners: number;
  }) => {};
};

type Font =
  | string
  | {
      family: string;
      size: number;
    };

export type UnflowType = {
  initialize(apiKey: string, enableLogging: boolean): null;
  sync(): null;
  close(): null;
  pause(): null;
  setUserId(userId: string): null;
  setAttributes({}: { [key: string]: string }): null;
  setCustomFonts({}: {
    title?: Font;
    body?: Font;
    button?: Font;
    openerTitle?: Font;
    openerSubtitle?: Font;
  }): null;
  openScreen(screenId: number): null;
  trackEvent(eventName: string, metadata: { [key: string]: any }): null;
  deregisterToken(): null;
};
