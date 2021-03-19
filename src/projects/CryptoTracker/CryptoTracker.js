import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Heading1 from "../../atoms/Heading1/Heading1";
import Heading2 from "../../atoms/Heading2/Heading2";
import PageWrapper from "../../atoms/PageWrapper/PageWrapper";
import MainContent from "../../atoms/MainContent/MainContent";
import Header from "../../atoms/Header/Header";
import Footer from "../../atoms/Footer/Footer";
import NavBar from "../../atoms/NavBar/NavBar";
import Logo from "../../atoms/Logo/Logo";
import ErrorMessage from "../../atoms/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../atoms/LoadingSpinner/LoadingSpinner";
import LineChart from "../../charts/v12s/LineChart/LineChart";

import { DAY_VALUES } from "./constants";
import { currencyFormat } from "./utils";

import {
  selectLoading,
  selectData,
  getCryptoData,
  selectError,
  setTimeRange,
  selectTimeRange,
} from "./cryptoTrackerSlice";

const CryptoTracker = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const data = useSelector(selectData);
  const error = useSelector(selectError);
  const timeRange = useSelector(selectTimeRange);

  const noop = (x) => x;
  const formatX = DAY_VALUES?.[timeRange]?.format ?? noop;
  const ticks = DAY_VALUES?.[timeRange]?.ticks ?? 12;

  useEffect(() => {
    if (!data || data?.[timeRange]?.length === 0) {
      dispatch(getCryptoData(timeRange));
    }
  }, [timeRange]);

  return (
    <PageWrapper>
      <NavBar />
      <Header>
        <Heading1>Cryptocurrency Tracker</Heading1>
      </Header>
      <MainContent>
        <Heading2>Cryptocurrency Tracker Chart</Heading2>
        <div>
          <button
            onClick={() => {
              dispatch(setTimeRange(DAY_VALUES.DAY.id));
            }}
          >
            1 day
          </button>
          <button
            onClick={() => {
              dispatch(setTimeRange(DAY_VALUES.WEEK.id));
            }}
          >
            7 days
          </button>
          <button
            onClick={() => {
              dispatch(setTimeRange(DAY_VALUES.MONTH.id));
            }}
          >
            30 days
          </button>
          <button
            onClick={() => {
              dispatch(setTimeRange(DAY_VALUES.YEAR.id));
            }}
          >
            365 days
          </button>
        </div>
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
            tickFormatX={formatX}
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
