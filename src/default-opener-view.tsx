import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Appearance,
  StyleSheet,
  ColorSchemeName,
  Dimensions,
  Image,
  NativeModules,
  TouchableOpacity,
} from 'react-native';
import type { Opener } from './types';

const { Unflow } = NativeModules;

type DefaultOpenerViewProps = {
  openers: [Opener] | [];
  children?: ({
    opener,
    numOpeners,
  }: {
    opener: Opener;
    numOpeners: number;
  }) => {};
};

const DefaultOpenerView: React.FC<DefaultOpenerViewProps> = ({
  openers,
  children,
}) => {
  let [appearance, setAppearance] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  let style = appearance || 'light';
  let screenWidth = Dimensions.get('window').width;
  let multipleOpeners = openers.length > 1;
  let cardWidth = multipleOpeners ? screenWidth * 0.9 : screenWidth;

  let onAppearanceChange = ({
    colorScheme,
  }: Appearance.AppearancePreferences) => {
    setAppearance(colorScheme);
  };

  useEffect(() => {
    let subscription = Appearance.addChangeListener(onAppearanceChange);
    return () => {
      if (subscription) subscription.remove();
    };
  });

  if (openers.length === 0) return null;
  return (
    <View>
      <ScrollView
        horizontal={true}
        decelerationRate={0}
        snapToInterval={cardWidth}
        snapToAlignment="center"
        scrollEnabled={multipleOpeners}
        showsHorizontalScrollIndicator={false}
      >
        {openers.map((opener) => (
          <View key={opener.id} style={[{ width: cardWidth }]}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => Unflow.openScreen(opener.id)}
            >
              {children ? (
                children({ opener, numOpeners: openers.length })
              ) : (
                <DefaultCard opener={opener} style={style} />
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

type DefaultCardProps = {
  opener: Opener;
  style: 'light' | 'dark';
};

const DefaultCard: React.FC<DefaultCardProps> = ({ opener, style }) => (
  <View style={[styles.card, cardStyles[style]]}>
    <Thumnail uri={opener.imageURL} />
    <View>
      <Text style={[styles.title, titleStyles[style]]}>{opener?.title}</Text>
      <Text style={[styles.subtitle, subtitleStyles[style]]}>
        {opener?.subtitle}
      </Text>
    </View>
  </View>
);

const Thumnail = ({ uri }: { uri?: string }) => {
  if (!uri) return null;
  return <Image style={styles.thumbnail} source={{ uri }} />;
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 64,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  subtitle: {
    fontWeight: '500',
    fontSize: 12,
  },
  thumbnail: {
    height: 40,
    width: 40,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#F4F4F5',
  },
});

const cardStyles = StyleSheet.create({
  light: { backgroundColor: 'white' },
  dark: { backgroundColor: 'black' },
});

const titleStyles = StyleSheet.create({
  light: { color: 'black' },
  dark: { color: 'white' },
});

const subtitleStyles = StyleSheet.create({
  light: { color: '#52525B' },
  dark: { color: '#626472' },
});

export default DefaultOpenerView;
