/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';

import Unflow from 'unflow-react-native';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  useFocusEffect(() => {
    console.log('home');
    Unflow.trackEvent('Transitioned_Home', {route: 'Home'});
  });

  return (
    <View>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  useFocusEffect(() => {
    console.log('settings');
    Unflow.trackEvent('Transitioned_Settings', {route: 'Settings'});
  });

  return (
    <View>
      <Text>Settings!</Text>
    </View>
  );
}

const App = () => {
  Unflow.initialize('50bcf564f0481f937f599a6b4567bc7f', true);
  Unflow.setUserId('unflow-mirror_tabs-sample');
  Unflow.sync();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
