import {createGlobalStyle} from "styled-components";

export type ThemeProps = {
  colors: {
    body: string;
  },
  fontColorMain: string;
};

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; // 1 rem = 10px 
  }
  
  body {
    background-color: ${({colors}: ThemeProps) => colors.body};
    font-family: 'Inter', sans-serif;
    color: ${({fontColorMain}: ThemeProps) => fontColorMain};
  }
`;