import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Unflow, { useSpace, eventListener } from 'unflow-react-native';

const CustomStack = () => {
  let openers = useSpace();
  let cardWidth = 130;
  let multipleOpeners = openers.length > 1;

  if (openers.length === 0) return null;
  return (
    <ScrollView
      horizontal={true}
      decelerationRate={0}
      snapToInterval={cardWidth}
      snapToAlignment="center"
      scrollEnabled={multipleOpeners}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {openers.map((opener) => (
        <TouchableOpacity
          key={opener.id}
          activeOpacity={0.9}
          onPress={() => Unflow.openScreen(opener.id)}
          style={{ width: cardWidth }}
        >
          <Card opener={opener} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const Card = ({ opener }) => (
  <View style={styles.card}>
    <Image
      style={styles.image}
      resizeMode="cover"
      source={{ uri: opener.imageURL }}
    />
    <View style={styles.titleContainer}>
      <Text style={styles.title} numberOfLines={2}>
        {opener.title}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12 },
  card: {
    marginHorizontal: 4,
    minHeight: 160,
    justifyContent: 'flex-end',
  },
  image: { flex: 1, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  titleContainer: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'center',
    minHeight: 57,
  },
  title: {
    fontSize: 14,
    padding: 12,
  },
});

export default CustomStack;
