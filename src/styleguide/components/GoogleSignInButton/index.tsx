import React from 'react';
import { UserContext, UserProviderInterface } from '@context/UserContext';
import { IconGoogle } from '@styleguide/icons';
import { Text } from '@styleguide/components';
import styled from 'styled-components/native';
import { uiColorToBaseColor } from '@styleguide/styles/color';

const IconAndTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled(Text)`
  margin-left: 20px;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  color: ${uiColorToBaseColor('darkPurple')};
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  border-radius: 8px;
  box-shadow: none;
  padding: 9.5px 10px;
  margin: 5px 0;
  background-color: ${uiColorToBaseColor('white')};
  border: 1px solid ${uiColorToBaseColor('white')};
`;

const GoogleAuthButton = () => {
  const { onGoogleSignIn }: UserProviderInterface = React.useContext(UserContext);

  return (
    <StyledTouchableOpacity
      onPress={() =>
        onGoogleSignIn()
          .then(() => console.log('Signed in with Google!'))
          .catch((e) => {
            console.log(e);
          })
      }
    >
      <IconAndTextContainer>
        <IconGoogle />
        <StyledText>Continue with Google</StyledText>
      </IconAndTextContainer>
    </StyledTouchableOpacity>
  );
};

export default GoogleAuthButton;
