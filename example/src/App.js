import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Unflow from 'unflow-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import TabBar from './TabBar';
import ManualModal from './ManualModal';
import EventModal from './EventModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // Do this as early as possible in your app
  Unflow.initialize('ae469c05ed6d8f7c1d46d12901f661c9', true);
  Unflow.setUserId('unflow-mirror_react-native');
  Unflow.sync();
  // Unflow.setCustomFonts({ button: 'shadowsintolight_regular' });
  Unflow.setCustomFonts({
    button: { family: 'shadowsintolight_regular', size: 26 },
  });

  const unflowAnalyticsListener = (event) => {
    console.log(event);
  };

  useEffect(() => {
    let subscription = Unflow.addAnalyticsListener(unflowAnalyticsListener);
    return () => Unflow.removeAnalyticsListener(subscription);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Group>
            <Stack.Screen name="Content" component={ScreenNavigation} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              name="ManualModal"
              component={ManualModal}
              options={{
                headerShown: true,
                title: 'Create Shortcut',
                headerBackTitle: 'Close',
              }}
            />
            <Stack.Screen
              name="EventModal"
              component={EventModal}
              options={{
                headerShown: true,
                title: 'Create Shortcut',
                headerBackTitle: 'Close',
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const ScreenNavigation = () => (
  <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Details" component={DetailsScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
});
