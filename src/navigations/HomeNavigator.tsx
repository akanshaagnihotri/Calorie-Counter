import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { uiColorToBaseColor } from '@styleguide/styles/color';

import HomePage from '@scenes/HomePage/index';
import UploadImage from '@scenes/UploadImage/index';
import User from '@scenes/User/index';
import { ScannedContextProvider } from '@context/ScannedContext';

const Tab = createBottomTabNavigator();
Icon.loadFont();

const HomeNavigator = () => (
  <ScannedContextProvider>
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="home" size={20} color={focused ? '#4F8EF7' : '#e1e1e1'} />
          ),
        }}
        name={HomePage.routeName}
        component={HomePage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="camera" size={20} color={focused ? '#4F8EF7' : '#e1e1e1'} />
          ),
        }}
        name={UploadImage.routeName}
        component={UploadImage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="user" size={20} color={focused ? '#4F8EF7' : '#e1e1e1'} />
          ),
        }}
        name={User.routeName}
        component={User}
      />
    </Tab.Navigator>
  </ScannedContextProvider>
);

export default HomeNavigator;
