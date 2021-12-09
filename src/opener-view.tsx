import React, { ReactElement, useState } from 'react';
import { StyleSheet } from 'react-native';
import Opener from './native-opener';

export default function OpenerView(): ReactElement {
  const [height, setHeight] = useState(0);

  return (
    <Opener
      style={[styles.opener, { height }]}
      onHeightSet={({ nativeEvent }) => setHeight(nativeEvent.height)}
    />
  );
}

const styles = StyleSheet.create({
  opener: { width: '100%' },
});
