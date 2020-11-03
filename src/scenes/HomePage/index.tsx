import * as React from 'react';
import { StatusBar, Button } from 'react-native';

import { UserContext, UserProviderInterface } from '@context/UserContext';

import { SafeAreaView, ScrollView, Text } from '@styleguide/components/index';

const HomePage = () => {
  const { signOut,user }: UserProviderInterface = React.useContext(UserContext);
console.log(user);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Button title="Sign Out" onPress={signOut} />
            <Text>Look for the calories in your food </Text>
            <Button title="Upload Image"                 onPress={() => navigation.navigate('SignUpPage')}
            />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

HomePage.routeName = 'HomePage';

export default HomePage;
