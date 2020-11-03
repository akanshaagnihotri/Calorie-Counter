import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from '@scenes/HomePage/index';

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name={HomePage.routeName} component={HomePage} />
  </Stack.Navigator>
);

export default HomeNavigator;
