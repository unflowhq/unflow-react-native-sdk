import { requireNativeComponent } from 'react-native';
import type { OpenerType } from './types';

const Opener = requireNativeComponent<OpenerType>('UnflowOpenerView');

export default Opener;
