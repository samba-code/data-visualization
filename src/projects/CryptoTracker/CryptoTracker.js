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

import {
  selectLoading,
  selectData,
  getCryptoData,
  selectError,
} from "./cryptoTrackerSlice";

const CryptoTracker = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const data = useSelector(selectData);
  const error = useSelector(selectError);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getCryptoData());
    }
  }, []);

  return (
    <PageWrapper>
      <NavBar />
      <Header>
        <Heading1>Cryptocurency Tracker</Heading1>
      </Header>
      <MainContent>
        <Heading2>Cryptocurency Tracker Chart</Heading2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && (
          <LoadingSpinner id="loading">Loading weather data...</LoadingSpinner>
        )}
        {data.length > 0 && <div>{data}</div>}
      </MainContent>
      <Footer>
        <Logo />
      </Footer>
    </PageWrapper>
  );
};

export default CryptoTracker;
