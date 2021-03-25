import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Obfuscate from "react-obfuscate";
import styled from "styled-components";
import * as d3 from "d3";

import Heading1 from "../../atoms/Heading1/Heading1";
import Heading2 from "../../atoms/Heading2/Heading2";
import PageWrapper from "../../atoms/PageWrapper/PageWrapper";
import MainContent from "../../atoms/MainContent/MainContent";
import Header from "../../atoms/Header/Header";
import Footer from "../../atoms/Footer/Footer";
import NavBar from "../../atoms/NavBar/NavBar";
import Button from "../../atoms/Button/Button";
import Logo from "../../atoms/Logo/Logo";
import ErrorMessage from "../../atoms/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../atoms/LoadingSpinner/LoadingSpinner";
import LineChart from "../../charts/v12s/LineChart/LineChart";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import {
  IntroductionArea,
  Introduction,
  SelectBox,
  Controls,
  Label,
  InputContainer,
} from "../../styles/styledComponents";

import { DAY_VALUES, CURRENCIES } from "./constants";
import { makeCurrencyFormat } from "./utils";

import {
  selectDataLoading,
  selectData,
  getCryptoData,
  selectError,
  setTimeRange,
  selectTimeRange,
  getCurrencyList,
  selectCurrency,
  setCurrency,
} from "./cryptoTrackerSlice";

const ButtonHolder = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  & button {
    margin-right: 6px;
  }
`;

const CryptoTracker = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectDataLoading);
  const data = useSelector(selectData);
  const error = useSelector(selectError);
  const timeRange = useSelector(selectTimeRange);
  const currency = useSelector(selectCurrency);

  const noop = (x) => x;
  const formatX = DAY_VALUES?.[timeRange]?.format ?? noop;
  const ticks = DAY_VALUES?.[timeRange]?.ticks ?? 12;

  useEffect(() => {
    dispatch(getCurrencyList());
  });

  useEffect(() => {
    // TODO - update caching
    dispatch(getCryptoData(timeRange, currency));
  }, [timeRange, currency]);

  const onCurrencyChange = (e) => {
    console.log(e.currentTarget.value);
    dispatch(setCurrency(e.currentTarget.value));
  };

  const currencyData = Object.values(CURRENCIES).find(
    (c) => c.name === currency
  );
  console.log("currencyData: ", currencyData);
  const currencyFormat = makeCurrencyFormat(currencyData.format);

  return (
    <PageWrapper>
      <NavBar />
      <Header>
        <Heading1>Cryptocurrency</Heading1>
      </Header>
      <IntroductionArea>
        <Introduction>
          <Paragraph>
            This chart displays live cryptocurrency data from{" "}
            <a href="https://www.coingecko.com">CoinGecko</a>. Select time
            range, currency and asset below.
          </Paragraph>
          <Paragraph>
            If you need a custom interactive data visualisation for your project
            contact{" "}
            <Obfuscate
              email="hello@sambacode.net"
              aria-label="Email Samba Code"
            >
              hello@sambacode.net
            </Obfuscate>
            .
          </Paragraph>
        </Introduction>
      </IntroductionArea>
      <MainContent>
        <Heading2>Cryptocurrency Price</Heading2>
        <ButtonHolder>
          <Button
            selected={timeRange === DAY_VALUES.DAY.id}
            onClick={() => {
              dispatch(setTimeRange(DAY_VALUES.DAY.id));
            }}
          >
            1 day
          </Button>
          <Button
            selected={timeRange === DAY_VALUES.WEEK.id}
            onClick={() => {
              dispatch(setTimeRange(DAY_VALUES.WEEK.id));
            }}
          >
            7 days
          </Button>
          <Button
            selected={timeRange === DAY_VALUES.MONTH.id}
            onClick={() => {
              dispatch(setTimeRange(DAY_VALUES.MONTH.id));
            }}
          >
            30 days
          </Button>
          <Button
            selected={timeRange === DAY_VALUES.YEAR.id}
            onClick={() => {
              dispatch(setTimeRange(DAY_VALUES.YEAR.id));
            }}
          >
            365 days
          </Button>
        </ButtonHolder>
        <Controls>
          <InputContainer>
            <Label htmlFor="asset-select">Asset</Label>
            <SelectBox id="asset-select" onChange={() => {}} value={"aaa"}>
              {["Bitcoin", "Ethereum", "Dodgecoin"].map((x) => {
                return <option key={x}>{x}</option>;
              })}
            </SelectBox>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="currency-select">Currency</Label>
            <SelectBox
              id="currency-select"
              onChange={onCurrencyChange}
              value={currency}
            >
              {Object.values(CURRENCIES).map((c) => {
                const currencyName = c.name;
                return <option key={c.code}>{currencyName}</option>;
              })}
            </SelectBox>
          </InputContainer>
        </Controls>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && (
          <LoadingSpinner id="loading">Loading weather data...</LoadingSpinner>
        )}
        {!loading && !error && (
          <LineChart
            data={data[timeRange]}
            xAccessor={(d) => d[0]}
            yAccessor={(d) => d[1]}
            yLabel=""
            xLabel=""
            numberOfTicksX={ticks}
            numberOfTicksY={6}
            tickFormatY={currencyFormat}
            interpolation={d3.curveLinear}
            tickFormatX={formatX}
            lineWidth={2}
          />
        )}
      </MainContent>
      <Footer>
        <Logo />
      </Footer>
    </PageWrapper>
  );
};

export default CryptoTracker;
