import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';

export default styled.ScrollView`
  flex: 1;
  ${Platform.select({
    android: css`
      padding: 5px 20px;
    `,
    ios: css`
      padding: 0px;
    `,
  })};
`;
