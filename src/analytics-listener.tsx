import type { EmitterSubscription } from 'react-native';
import { EventEmitter } from './native-emitter';
import type { UnflowEvent } from './types';

export function addAnalyticsListener(
  callback: (event: UnflowEvent) => void
): EmitterSubscription | undefined {
  let subscription: EmitterSubscription | undefined;
  if (EventEmitter) {
    subscription = EventEmitter.addListener('EventReceived', callback);
  }
  return subscription;
}

export function removeAnalyticsListener(
  subscription: EmitterSubscription
): void {
  if (subscription) subscription.remove();
}
