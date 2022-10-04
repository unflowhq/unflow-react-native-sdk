import { useEffect, useState } from 'react';
import type { EmitterSubscription } from 'react-native';
import { EventEmitter } from './native-emitter';
import type { UnflowEvent } from './types';

const eventListener = () => {
  let [events, setEvents] = useState<UnflowEvent>();

  let onEventReciept = (event: UnflowEvent) => {
    setEvents(event);
  };

  useEffect(() => {
    let subscription: EmitterSubscription;
    if (EventEmitter) {
      subscription = EventEmitter.addListener('EventReceived', onEventReciept);
    }
    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  return events;
};

export { eventListener };
