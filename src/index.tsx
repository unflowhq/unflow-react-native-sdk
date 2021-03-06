import { NativeModules } from 'react-native';
import OpenerView, { useSpace } from './opener-view';
import SpacesView, { useSpaces } from './spaces-view';
import type { UnflowType } from './types';

const { Unflow } = NativeModules;

export { OpenerView, SpacesView, useSpace, useSpaces };
export default Unflow as UnflowType;
