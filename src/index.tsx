import { NativeModules } from 'react-native';
import {
  addAnalyticsListener,
  removeAnalyticsListener,
} from './analytics-listener';
import {
  addAttributesListener,
  removeAttributesListener,
} from './attributes-listener';
import OpenerView, { useSpace } from './opener-view';
import SpacesView, { useSpaces } from './spaces-view';
import type { UnflowType } from './types';

const { Unflow } = NativeModules;

export { OpenerView, SpacesView, useSpace, useSpaces };

function initialize(apiKey: string, enableLogging: boolean) {
  if (!apiKey || typeof apiKey !== 'string') {
    throw 'Unflow: Your API key should be a non-empty string';
  }
  if (typeof enableLogging !== 'boolean') {
    console.debug('The Unflow enable logging flag should be a boolean');
  }
  Unflow.initialize(apiKey, enableLogging);
}

function setUserId(value: string) {
  if (!value || typeof value !== 'string') {
    throw 'Unflow: The user ID must be set to a non-empty string';
  }
  Unflow.setUserId(value);
}

type AttributeValue = string | number | Date | null;
type MetadataAttributeValue = AttributeValue | AttributeValue[];

function setAttributes(attributes: { [key: string]: MetadataAttributeValue }) {
  if (!attributes || typeof attributes !== 'object') {
    console.debug('Unflow: Attributes must be sent as an object');
    return;
  }
  Unflow.setAttributes(attributes);
}

function openScreen(id: number) {
  if (!id || typeof id !== 'number') {
    console.debug('Unflow: A screen ID should be a number');
    return;
  }
  Unflow.openScreen(id);
}

function trackEvent(eventName: string, metadata: MetadataAttributeValue) {
  Unflow.trackEvent(eventName, metadata);
}

function setPushToken(value: string) {
  if (!value || typeof value !== 'string') {
    console.debug('Unflow: A push token must be a non-empty string');
    return;
  }
  Unflow.setUserId(value);
}

export default {
  ...Unflow,
  initialize,
  setUserId,
  setAttributes,
  trackEvent,
  openScreen,
  setPushToken,
  addAnalyticsListener: addAnalyticsListener,
  removeAnalyticsListener: removeAnalyticsListener,
  addAttributesListener: addAttributesListener,
  removeAttributesListener: removeAttributesListener,
} as UnflowType;
