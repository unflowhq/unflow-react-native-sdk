import * as React from 'react';
import { View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { LightningIcon, DetailsIcon } from './icons';

export default function TabBar({ state, descriptors, navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => (
          <TabOption
            key={route.key}
            navigation={navigation}
            route={route}
            isFocused={state.index === index}
            options={descriptors[route.key]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const TabOption = ({ navigation, route, isFocused, options }) => {
  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate({ name: route.name, merge: true });
    }
  };

  let Icon = route.name === 'Home' ? LightningIcon : DetailsIcon;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      style={{
        width: 32,
        height: 32,
        marginVertical: 16,
        alignItems: 'center',
      }}
    >
      <Icon width={32} height={32} color={isFocused ? '#6366F1' : '#18181B'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 64,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 160,
    borderRadius: 32,
    paddingHorizontal: 32,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
