import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationNavigator from '@navigations/AuthenticationNavigator';
import HomeNavigator from '@navigations/HomeNavigator';
import { UserContext, UserProviderInterface } from '@context/UserContext';

const Navigator = () => {
  const { isLoggedIn }: UserProviderInterface = React.useContext(UserContext);

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeNavigator /> : <AuthenticationNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
