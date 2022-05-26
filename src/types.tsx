export type Opener = {
  id: number;
  title: string;
  priority: number;
  subtitle: string;
  imageURL: string;
};

export type UnflowOpenerViewType = {
  subscriptionId?: string;
  children?: ({
    opener,
    numOpeners,
  }: {
    opener: Opener;
    numOpeners: number;
  }) => {};
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
  openScreen(screenId: number): null;
  trackEvent(eventName: string, metadata: { [key: string]: any }): null;
  deregisterToken(): null;
};
