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
  Unflow.setUserId('unflow-mirror_tabs-sample_14');
  Unflow.sync();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Home2" component={HomeScreen} />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          listeners={() => ({
            tabPress: e => {
              console.log('Visited Settings');
              Unflow.trackEvent('Transitioned_Settings', {route: 'Settings'});
            },
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
