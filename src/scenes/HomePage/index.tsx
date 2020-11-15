import * as React from 'react';
import { StatusBar, Dimensions } from 'react-native';

import { ScannedContext } from '@context/ScannedContext';

import { uiColorToBaseColor } from '@styleguide/styles/color';
import { LottieAnimation, SafeAreaView, ScrollView, Text } from '@styleguide/components/index';
import styled from 'styled-components/native';
import { Button } from '@styleguide/components/Button';

import UploadImage from '@scenes/UploadImage/index';

import CalorieCard from './CalorieCard';
import * as ScanFoodAnimation from './ScanFood.json';

const deviceWidth = Dimensions.get('window').width;

const StyledText = styled(Text)`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const StyledSubText = styled(Text)`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 10px;
  line-height: 24px;
`;

const HighlightedText = styled(Text)`
  color: ${uiColorToBaseColor('red')};
  font-weight: 600;
`;

const HistoryHeading = styled(Text)`
  font-size: 26px;
  font-weight: 500;
  margin: 40px 0 20px;
`;

const InnerContainer = styled.View`
  padding: 30px;
`;

const CenteredStyledView = styled.View`
  flex: 1;
  align-items: center;
  margin: 50px 0;
`;

const HomePage = ({ navigation }) => {
  const { scanned, getConsumedMetrics, calorieTarget } = React.useContext(ScannedContext);

  const metrics = getConsumedMetrics();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <InnerContainer>
            {scanned.length > 0 ? (
              <>
                <StyledText>Welcome,</StyledText>
                <StyledSubText>
                  Based on your previous scans, you have consumed{' '}
                  <HighlightedText>{metrics.consumed} KCal</HighlightedText> which is
                  <HighlightedText> {metrics.percentage}% </HighlightedText>
                  of your daily target of <HighlightedText>{calorieTarget}</HighlightedText> KCal.
                </StyledSubText>
                <HistoryHeading>Your Previous Scans</HistoryHeading>
                {scanned.map((detail) => (
                  <CalorieCard key={detail.name} detail={detail} />
                ))}
              </>
            ) : (
              <>
                <StyledText>Welcome,</StyledText>
                <StyledSubText>It look like you haven't scanned any food yet !</StyledSubText>
                <CenteredStyledView>
                  <LottieAnimation
                    style={{
                      width: deviceWidth * 0.8,
                      height: deviceWidth * 0.8,
                    }}
                    loop
                    source={ScanFoodAnimation}
                  />
                </CenteredStyledView>
                <Button
                  onPress={() => {
                    navigation.navigate(UploadImage.routeName);
                  }}
                  color="red"
                  textColor="white"
                >
                  Scan Now
                </Button>
              </>
            )}
          </InnerContainer>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

HomePage.routeName = 'Home';

export default HomePage;
