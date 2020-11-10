import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from '@scenes/HomePage/index';
import UploadImage from '@scenes/UploadImage/index';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name={HomePage.routeName} component={HomePage} />
    <Tab.Screen name={UploadImage.routeName} component={UploadImage} />
  </Tab.Navigator>
);

export default HomeNavigator;
