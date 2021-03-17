import React from "react";
import Heading1 from "../../atoms/Heading1/Heading1";
import Heading2 from "../../atoms/Heading2/Heading2";
import PageWrapper from "../../atoms/PageWrapper/PageWrapper";
import MainContent from "../../atoms/MainContent/MainContent";
import Header from "../../atoms/Header/Header";
import Footer from "../../atoms/Footer/Footer";
import NavBar from "../../atoms/NavBar/NavBar";
import Logo from "../../atoms/Logo/Logo";

const CryptoTracker = () => {
  return (
    <PageWrapper>
      <NavBar />
      <Header>
        <Heading1>Cryptocurency Tracker</Heading1>
      </Header>
      <MainContent>
        <Heading2>Cryptocurency Tracker Chart</Heading2>
      </MainContent>
      <Footer>
        <Logo />
      </Footer>
    </PageWrapper>
  );
};

export default CryptoTracker;
