import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const VisualOpener = ({ opener }) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: opener.imageURL }}
        resizeMode="cover"
        style={styles.image}
        imageStyle={styles.rounded}
      >
        <View style={[styles.overlay, styles.rounded]} />
        <Text style={styles.title}>{opener.title}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    minHeight: 140,
    justifyContent: 'flex-end',
  },
  image: { flex: 1, justifyContent: 'flex-end' },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 12,
  },
  rounded: { borderRadius: 12 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

export default VisualOpener;
