import type { EmitterSubscription } from 'react-native';
import { EventEmitter } from './native-emitter';
import type { Metadata } from './types';

export function addAttributesListener(
  callback: (attributes: Metadata) => void
): EmitterSubscription | undefined {
  let subscription: EmitterSubscription | undefined;
  if (EventEmitter) {
    subscription = EventEmitter.addListener('AttributesUpdated', callback);
  }
  return subscription;
}

export function removeAttributesListener(
  subscription: EmitterSubscription
): void {
  if (subscription) subscription.remove();
}
