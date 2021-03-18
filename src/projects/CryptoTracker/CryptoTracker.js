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

import {
  selectLoading,
  selectData,
  getCryptoData,
  selectError,
  setDays,
  selectDays,
} from "./cryptoTrackerSlice";

const CryptoTracker = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const data = useSelector(selectData);
  const error = useSelector(selectError);
  const days = useSelector(selectDays);

  useEffect(() => {
    dispatch(getCryptoData(days));
  }, [days]);

  return (
    <PageWrapper>
      <NavBar />
      <Header>
        <Heading1>Cryptocurrency Tracker</Heading1>
      </Header>
      <MainContent>
        <Heading2>Cryptocurrency Tracker Chart</Heading2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && (
          <LoadingSpinner id="loading">Loading weather data...</LoadingSpinner>
        )}
        <div>
          <button
            onClick={() => {
              dispatch(setDays(DAY_VALUES.DAY.id));
            }}
          >
            1 day
          </button>
          <button
            onClick={() => {
              dispatch(setDays(DAY_VALUES.WEEK.id));
            }}
          >
            7 days
          </button>
          <button
            onClick={() => {
              dispatch(setDays(DAY_VALUES.MONTH.id));
            }}
          >
            30 days
          </button>
          <button
            onClick={() => {
              dispatch(setDays(DAY_VALUES.YEAR.id));
            }}
          >
            365 days
          </button>
        </div>
        {!loading && !error && (
          <LineChart
            data={data}
            xAccessor={(d) => d[0]}
            yAccessor={(d) => d[1]}
            yLabel=""
            xLabel=""
            numberOfTicksX={12}
            numberOfTicksY={6}
            tickFormat={(x) => x}
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
