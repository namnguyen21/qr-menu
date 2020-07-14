import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
      padding: 0;
      margin: 0;
      font-size: 10px;
      font-family: "Lato", sans-serif;
     
      box-sizing: border-box;
    }
    body {
        background-color: #f3f7f9
    }

    #root {
      display: flex;
      flex-direction: column;
    }

    .box-shadow {
        -webkit-box-shadow: 6px 4px 26px -6px rgba(0, 0, 0, 0.66);
  -moz-box-shadow: 6px 4px 26px -6px rgba(0, 0, 0, 0.66);
  box-shadow: 6px 4px 26px -6px rgba(0, 0, 0, 0.66);
    }
`;

export default GlobalStyle;
