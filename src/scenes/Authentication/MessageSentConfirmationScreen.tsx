import { useNavigation } from '@react-navigation/native';
import { LottieAnimation, Text } from '@styleguide/components';
import * as React from 'react';
import styled from 'styled-components/native';
import { ButtonOutlined } from '@styleguide/components/Button';
import { uiColorToBaseColor } from '@styleguide/styles/color';
import { Dimensions } from 'react-native';
import * as MessageSentAnimation from './animations/MessageSentAnimation.json';

const OkButton = styled(ButtonOutlined)`
  margin-top: 20px;
  width: 150px;
`;

const CenteredStyledView = styled.View`
  flex: 1;
  align-items: center;
  margin-bottom: 30px;
`;

const Heading = styled(Text)`
  margin: 10px 0;
  align-self: center;
  font-size: 35px;
  font-weight: 600;
  color: ${uiColorToBaseColor('darkPurple')};
`;

const SubHeading = styled(Text)`
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 16px;
  color: ${uiColorToBaseColor('darkerGray')};
`;

interface Props {
  heading: string;
  subHeading: string;
}

const deviceWidth = Dimensions.get('window').width;

const MessageSentConfirmationScreen = ({ heading, subHeading }: Props) => {
  const navigation = useNavigation();

  return (
    <>
      <Heading>{heading}</Heading>
      <CenteredStyledView>
        <LottieAnimation
          style={{
            width: deviceWidth * 0.5,
            height: deviceWidth * 0.5,
          }}
          resizeMode="cover"
          loop={false}
          source={MessageSentAnimation}
        />
        <SubHeading>{subHeading}</SubHeading>
        <OkButton textColor="darkPurple" color="transparent" onPress={() => navigation.goBack()}>
          OK
        </OkButton>
      </CenteredStyledView>
    </>
  );
};

export default MessageSentConfirmationScreen;
