import React from "react";
import { Router } from "@reach/router";
import { render } from "react-dom";
import { Reset } from "styled-reset";
import { darken, rem } from "polished";
import { Provider } from "react-redux";

import { sambaThemeOne } from "./styles/theme/theme.js";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import WeatherHistory from "./projects/WeatherHistory/WeatherHistory";
import HomePage from "./pages/HomePage/HomePage";
import CryptoTracker from "./projects/CryptoTracker/CryptoTracker";
import NotFound from "./pages/NotFound/NotFound";
import store from "./store/store";

const GlobalStyle = createGlobalStyle`
  body {
    background: black;
    color: ${(props) => darken("0.1", props.theme.primary)};
    box-sizing: border-box;
    font-family: "museo-sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 300;
    box-sizing: border-box;
    color: ${(props) => darken("0.1", props.theme.primary)};
    box-sizing: border-box;
    font-size: ${rem("30px")};
    line-height: ${rem("32px")};
    font-style: normal;
    font-variant: normal;
  }
  a {
    color: ${(props) => darken("0.1", props.theme.primaryLight)};
    /* color: ${(props) => darken("0.2", props.theme.highlight)}; */
    text-decoration: none;
  }
  a:link {
    color: ${(props) => darken("0.1", props.theme.primaryLight)};
    /* color: ${(props) => darken("0.2", props.theme.highlight)}; */
  }
  a:visited {
    color: ${(props) => darken("0.1", props.theme.primaryLight)};
    /* color: ${(props) => darken("0.2", props.theme.highlight)}; */
  }
`;

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={sambaThemeOne}>
        <Reset />
        <GlobalStyle />
        <Router>
          <NotFound default />
          <HomePage path="/" />
          <WeatherHistory path="weather-history" />
          <CryptoTracker path="crypto-tracker" />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

render(<App />, document.getElementById("root"));
