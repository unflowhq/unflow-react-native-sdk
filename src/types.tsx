import type { EmitterSubscription, StyleProp, ViewStyle } from 'react-native';

export type UnflowSpace = {
  id: number;
  spaceKey: string;
  name: string;
  openers: UnflowOpener[];
};

export type UnflowEventBase<T extends string> = {
  id: string;
  name: T;
  occurredAt?: number;
};

export type UnflowScreenViewedEvent = UnflowEventBase<'question'> & {
  metadata: { screen_id: number; page_count?: number };
};

export type UnflowScreenTransitionedEvent =
  UnflowEventBase<'screen_transitioned'> & {
    metadata: { screen_id: number; page_id: number; page_index: number };
  };

export type UnflowScreenDismissedEvent = UnflowEventBase<'screen_dismissed'> & {
  metadata: { screen_id: number; page_count?: number; pages_viewed?: number };
};

export type UnflowOpenerTappedEvent = UnflowEventBase<'opener_tapped'> & {
  metadata: { screen_id: number };
};

export type UnflowButtonTappedEvent = UnflowEventBase<'button_tapped'> & {
  metadata: { uri: string; analytics_id: string };
};

export type UnflowRatingResponseEvent = UnflowEventBase<'rating_response'> & {
  metadata: { screen_id: number; rating: number };
};

export type UnflowPageAppearEvent = UnflowEventBase<'page_appear'> & {
  metadata: {
    screen_id: number;
    page_id: number;
    page_index: number;
    total_duration?: number;
  };
};

export type UnflowPageDisappearEvent = UnflowEventBase<'page_disappear'> & {
  metadata: {
    screen_id: number;
    page_id: number;
    page_index: number;
    total_duration?: number;
    remaining_duration?: number;
  };
};

export type UnflowQuestionAnsweredEvent =
  UnflowEventBase<'question_answered'> & {
    metadata: {
      screen_id: number;
      block_id: number;
      selections: string[];
      analytics_id: string;
    };
  };

export type UnflowEvent =
  | UnflowScreenViewedEvent
  | UnflowScreenTransitionedEvent
  | UnflowScreenDismissedEvent
  | UnflowOpenerTappedEvent
  | UnflowButtonTappedEvent
  | UnflowRatingResponseEvent
  | UnflowPageAppearEvent
  | UnflowPageDisappearEvent
  | UnflowQuestionAnsweredEvent;

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
  addAnalyticsListener: (
    callback: (event: UnflowEvent) => void
  ) => EmitterSubscription;
  removeAnalyticsListener: (subscription: EmitterSubscription) => void;
};
