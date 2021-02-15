import React from "react";
import { render } from "react-dom";
import { Reset } from "styled-reset";
import { darken, rem } from "polished";

import { sambaThemeOne } from "./theme/theme.js";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.neutral};
    color: ${(props) => darken("0.1", props.theme.primary)};
    box-sizing: border-box;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: ${rem("30px")};
    line-height: ${rem("32px")};
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={sambaThemeOne}>
      <Reset />
      <GlobalStyle />
      <div>TEST 123</div>
    </ThemeProvider>
  );
};

render(<App />, document.getElementById("root"));
