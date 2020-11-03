import * as React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';
import { uiColorToBaseColor, UiColor } from '@styleguide/styles/color';
import { Text } from '@styleguide/components/index';

const DefaultTouchableOpacity = styled.TouchableOpacity<{ color: UiColor; isDisabled: boolean }>`
  border-radius: 8px;
  box-shadow: none;
  padding: 13px 10px;
  margin: 5px 0;
  opacity: ${(props) => (props.isDisabled ? '0.4' : '1')};

  ${(props) => (props.color ? `background-color: ${uiColorToBaseColor(props.color)}` : '')}
`;

const DefaultButtonOutlined = styled(DefaultTouchableOpacity)`
  padding: 12px 10px;
  border: 2px solid ${uiColorToBaseColor('purple')};
`;

const DefaultButtonText = styled(Text)<{ color: UiColor }>`
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  ${(props) => (props.color ? `color: ${uiColorToBaseColor(props.color)}` : '')}
`;

interface Props extends TouchableOpacityProps {
  children: React.ReactNode | string;
  color: UiColor;
  textColor?: UiColor;
  isDisabled?: boolean;
}

const CreateButtonWithWrapper = (props: Props, ButtonWrapper: React.FunctionComponent<Props>) => {
  const { children, color, textColor, isDisabled, ...otherProps } = props;

  let childNode = children;

  if (typeof children === 'string') {
    childNode = <DefaultButtonText color={textColor || 'black'}>{children}</DefaultButtonText>;
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ButtonWrapper isDisabled={isDisabled} color={color} {...otherProps}>
      {childNode}
    </ButtonWrapper>
  );
};

export const Button = (props: Props) => CreateButtonWithWrapper(props, DefaultTouchableOpacity);

export const ButtonOutlined = (props: Props) =>
  CreateButtonWithWrapper(props, DefaultButtonOutlined);
