import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';

export default styled.View`
  flex: 1;
  ${Platform.select({
    ios: css`
      padding: 5px 20px;
    `,
    android: css`
      padding: 0;
    `,
  })};
`;
