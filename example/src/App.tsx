import * as React from 'react';
import Unflow from 'unflow-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();

export default function App() {
  // Do this as early as possible in your app
  Unflow.initialize('ae469c05ed6d8f7c1d46d12901f661c9', true);
  Unflow.sync();
  Unflow.setUserId('unflow-mirror_react-native');
  Unflow.setCustomFonts({ button: 'shadowsintolight_regular' });
  Unflow.setAttributes({ name: 'Joe Bloggs' });

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Details" component={DetailsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
