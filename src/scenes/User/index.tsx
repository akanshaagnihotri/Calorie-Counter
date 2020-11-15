import * as React from 'react';
import { StatusBar, Image, StyleSheet, Platform, Dimensions, View } from 'react-native';
import { LottieAnimation, SafeAreaView, ScrollView, Text } from '@styleguide/components';
import { UserContext } from '@context/UserContext';
import { Button } from '@styleguide/components/Button';
import styled from 'styled-components/native';
import * as UserAnimation from './User.json';
import { ScannedContext } from '@context/ScannedContext';

const deviceWidth = Dimensions.get('window').width;

const InnerContainer = styled.View`
  padding: 30px;
`;

const StyledText = styled(Text)`
  font-size: 32px;
  font-weight: 500;
`;

const CenteredStyledView = styled.View`
  flex: 1;
  align-items: center;
  margin: 10px 0 30px;
`;

const Value = styled(Text)`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 3px;
`;

const Label = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 3px;
`;

const Row = ({ label, value }) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    }}
  >
    <Label>{label}</Label>
    <Value>{value}</Value>
  </View>
);

const User = () => {
  const { user, signOut } = React.useContext(UserContext);
  const { calorieTarget } = React.useContext(ScannedContext);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <InnerContainer>
            <StyledText>User Profile</StyledText>
            <CenteredStyledView>
              <LottieAnimation
                style={{
                  width: deviceWidth * 0.8,
                  height: deviceWidth * 0.8,
                }}
                loop={false}
                source={UserAnimation}
              />
            </CenteredStyledView>
            <Row label={'Email:'} value={user?.email} />
            <Row label={'Verified:'} value={user.emailVerified ? 'Yes' : 'No'} />
            <Row label={'Daily Calorie Target:'} value={`${calorieTarget} KCal`} />

            <Button style={{ marginTop: 20 }} onPress={signOut} color="red" textColor="white">
              Logout
            </Button>
          </InnerContainer>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

User.routeName = 'Profile';

export default User;
