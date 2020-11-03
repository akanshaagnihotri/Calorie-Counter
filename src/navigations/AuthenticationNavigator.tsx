import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GoogleSignin } from '@react-native-community/google-signin';
import ENV_VARIABLES from 'react-native-config';
import { uiColorToBaseColor } from '@styleguide/styles/color';

import LoginScreen from '@scenes/Authentication/Login';
import ForgotPasswordScreen from '@scenes/Authentication/ForgotPassword';
import SignUpScreen from '@scenes/Authentication/SignUp';

const Stack = createStackNavigator();

GoogleSignin.configure({
  webClientId: ENV_VARIABLES.GOOGLE_AUTH_WEB_CLIENT_ID, // From Firebase Console Settings
});

const AuthenticationNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerShown: false }}
      name={LoginScreen.routeName}
      component={LoginScreen}
    />
    <Stack.Screen
      options={{
        headerTitle: '',
        headerBackTitle: '',
        headerStyle: {
          backgroundColor: uiColorToBaseColor('defaultGray'),
        },
        headerTintColor: uiColorToBaseColor('darkerGray'),
        headerBackTitleStyle: { color: uiColorToBaseColor('darkerGray') },
      }}
      name={ForgotPasswordScreen.routeName}
      component={ForgotPasswordScreen}
    />
    <Stack.Screen
      options={{
        headerTitle: '',
        headerBackTitle: '',
        headerStyle: {
          backgroundColor: uiColorToBaseColor('defaultGray'),
        },
        headerTintColor: uiColorToBaseColor('darkerGray'),
        headerBackTitleStyle: { color: uiColorToBaseColor('darkerGray') },
      }}
      name={SignUpScreen.routeName}
      component={SignUpScreen}
    />
  </Stack.Navigator>
);

export default AuthenticationNavigator;
