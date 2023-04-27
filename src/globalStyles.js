import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
}
*::-webkit-scrollbar {
  display: none;
}


`;
export default GlobalStyle;
