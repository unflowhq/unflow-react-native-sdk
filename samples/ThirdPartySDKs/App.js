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

import Unflow from 'unflow-react-native';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
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
      <Tab.Navigator
        screenListeners={({route}) => {
          console.log(route.name);
          Unflow.trackEvent(`Transitioned_${route.name}`, {route: route.name});
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
