// globalStyles.js
import { createGlobalStyle } from "styled-components";
import Theme from "./theme";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Karla, sans-serif;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.grey}
  }
`;

export default GlobalStyle;
