import 'react-native-gesture-handler';
import * as React from 'react';
import Navigator from '@navigations/index';
import UserProvider from '@context/UserContext';

const App = () => {
  console.disableYellowBox = true;
  return (
    <UserProvider>
      <Navigator />
    </UserProvider>
  );
};

export default App;
