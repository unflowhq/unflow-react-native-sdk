import { NativeModules } from 'react-native';
import OpenerView from './opener-view';
import type { UnflowType } from './types';

const { Unflow } = NativeModules;

export { OpenerView };
export default Unflow as UnflowType;
