import { NativeModules } from 'react-native';
import OpenerView, { useSpace } from './opener-view';
import type { UnflowType } from './types';

const { Unflow } = NativeModules;

export { OpenerView, useSpace };
export default Unflow as UnflowType;
