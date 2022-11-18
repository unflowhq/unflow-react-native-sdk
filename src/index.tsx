import { NativeModules } from 'react-native';
import {
  addAnalyticsListener,
  removeAnalyticsListener,
} from './analytics-listener';
import OpenerView, { useSpace } from './opener-view';
import SpacesView, { useSpaces } from './spaces-view';
import type { UnflowType, MetadataAttributeValue } from './types';

const { Unflow } = NativeModules;

export { OpenerView, SpacesView, useSpace, useSpaces };

function initialize(apiKey: string, enableLogging: boolean) {
  if (!apiKey || typeof apiKey !== 'string') {
    throw 'Your API key must be a non-empty string';
  }
  if (typeof enableLogging !== 'boolean') {
    console.debug('The enable logging flag should be a boolean');
  }
  Unflow.initialize(apiKey, enableLogging);
}

function setUserId(value: string) {
  if (!value || typeof value !== 'string') {
    throw 'You must the user Id to a non-empty string';
  }
  Unflow.setUserId(value);
}

// setAttributes

function openScreen(id: number) {
  if (!id || typeof id !== 'number') {
    console.debug('The screen Id must be a number');
    return;
  }
  Unflow.openScreen(id);
}

type AttributeValue = string | number | boolean;

function trackEvent(
  eventName: string,
  metadata: AttributeValue | AttributeValue[]
) {
  Unflow.trackEvent(eventName, metadata);
}

function setPushToken(value: string) {
  if (!value || typeof value !== 'string') {
    console.debug('The push token must be a non-empty string');
    return;
  }
  Unflow.setUserId(value);
}

export default {
  ...Unflow,
  initialize,
  setUserId,
  openScreen,
  trackEvent,
  setPushToken,
  addAnalyticsListener: addAnalyticsListener,
  removeAnalyticsListener: removeAnalyticsListener,
} as UnflowType;
