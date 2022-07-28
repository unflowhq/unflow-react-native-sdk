import React, { useCallback, useEffect, useState } from 'react';
import type { EmitterSubscription } from 'react-native';
import DefaultOpenerView from './default-opener-view';
import { EventEmitter, subscribeToOpeners } from './native-emitter';
import type { UnflowOpener, UnflowOpenerViewType } from './types';

type NativeOpenerChangedEvent = {
  [key: string]: UnflowOpener[];
};

const OpenerView: React.FC<UnflowOpenerViewType> = ({
  spaceKey = 'default',
  children,
}) => {
  let [openers, setOpeners] = useState<UnflowOpener[]>([]);

  let onOpenersChanged = useCallback(
    (event: NativeOpenerChangedEvent) => {
      setOpeners(event[spaceKey] || []);
    },
    [spaceKey]
  );

  useEffect(() => {
    let subscription: EmitterSubscription;
    if (EventEmitter) {
      subscription = EventEmitter.addListener(
        'OpenersChanged',
        onOpenersChanged
      );
      subscribeToOpeners(spaceKey);
    }
    return () => {
      if (subscription) subscription.remove();
    };
  }, [spaceKey, onOpenersChanged]);

  return <DefaultOpenerView openers={openers}>{children}</DefaultOpenerView>;
};

const useSpace = (spaceKey: string = 'default') => {
  let [openers, setOpeners] = useState<UnflowOpener[]>([]);

  let onOpenersChanged = useCallback(
    (event: NativeOpenerChangedEvent) => {
      setOpeners(event[spaceKey] || []);
    },
    [spaceKey]
  );

  useEffect(() => {
    let subscription: EmitterSubscription;
    if (EventEmitter) {
      subscription = EventEmitter.addListener(
        'OpenersChanged',
        onOpenersChanged
      );
      subscribeToOpeners(spaceKey);
    }
    return () => {
      if (subscription) subscription.remove();
    };
  }, [spaceKey, onOpenersChanged]);

  return openers;
};

export default OpenerView;
export { useSpace };
