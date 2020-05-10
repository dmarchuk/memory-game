import { createGlobalStyle } from 'styled-components';
import { Color } from '../../constants';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto Light', sans-serif;
    background: ${Color.AquaHaze};
    color: ${Color.DarkGrey};
  }
`;
