import * as React from 'react';
import Svg, { SvgProps } from 'react-native-svg';
import styled from 'styled-components/native';
import { Size } from '@types/Size';

interface Props extends SvgProps {
  size?: Size;
  children: React.ReactNode;
}

export const sizeToPx = (size: Size) => {
  switch (size) {
    case 'xs':
      return '8px';
    case 'sm':
      return '16px';
    case 'md':
      return '24px';
    case 'lg':
      return '32px';
    case 'xl':
      return '64px';
    case 'xxl':
      return '128px';
    default:
      return '16px';
  }
};

const StyledSvg = styled(Svg)<{ size: Size }>`
  width: ${(props) => sizeToPx(props.size)};
  height: ${(props) => sizeToPx(props.size)};
`;

const SvgIcon = ({ children, size = 'sm' }: Props) => (
  <StyledSvg size={size} viewBox="0 0 16 16">
    {children}
  </StyledSvg>
);

export default SvgIcon;
