import React, { useCallback, useEffect, useState } from 'react';
import type { EmitterSubscription } from 'react-native';
import DefaultOpenerView from './default-opener-view';
import { EventEmitter, subscribe } from './native-emitter';
import type { Opener, UnflowOpenerViewType } from './types';

type NativeOpenerChangedEvent = {
  [key: string]: [Opener];
};

const OpenerView: React.FC<UnflowOpenerViewType> = ({
  subscriptionId = 'default',
  children,
}) => {
  let [openers, setOpeners] = useState<Opener[]>([]);

  let onOpenersChanged = useCallback(
    (event: NativeOpenerChangedEvent) => {
      setOpeners(event[subscriptionId]);
    },
    [subscriptionId]
  );

  useEffect(() => {
    let subscription: EmitterSubscription;
    if (EventEmitter) {
      subscription = EventEmitter.addListener(
        'OpenersChanged',
        onOpenersChanged
      );
      subscribe(subscriptionId);
    }
    return () => {
      if (subscription) subscription.remove();
    };
  }, [subscriptionId, onOpenersChanged]);

  return <DefaultOpenerView openers={openers}>{children}</DefaultOpenerView>;
};

const useSpace = (subscriptionId: string = 'default') => {
  let [openers, setOpeners] = useState<Opener[]>([]);

  let onOpenersChanged = useCallback(
    (event: NativeOpenerChangedEvent) => {
      setOpeners(event[subscriptionId]);
    },
    [subscriptionId]
  );

  useEffect(() => {
    let subscription: EmitterSubscription;
    if (EventEmitter) {
      subscription = EventEmitter.addListener(
        'OpenersChanged',
        onOpenersChanged
      );
      subscribe(subscriptionId);
    }
    return () => {
      if (subscription) subscription.remove();
    };
  }, [subscriptionId, onOpenersChanged]);

  return openers;
};

export default OpenerView;
export { useSpace };
