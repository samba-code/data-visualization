import React from "react";
import { render } from "react-dom";
import { Reset } from "styled-reset";
import { darken } from "polished";

import { sambaThemeOne } from "./styles/theme/theme.js";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import WeatherHistory from "./projects/WeatherHistory/WeatherHistory";

const GlobalStyle = createGlobalStyle`
  body {
    background: black;
    color: ${(props) => darken("0.1", props.theme.primary)};
    box-sizing: border-box;
    font-family: "museo-sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 300;
    box-sizing: border-box;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={sambaThemeOne}>
      <Reset />
      <GlobalStyle />
      <WeatherHistory />
    </ThemeProvider>
  );
};

render(<App />, document.getElementById("root"));
