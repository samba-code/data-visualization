import React from "react";
import styled from "styled-components";
import { lighten } from "polished";

import ProjectCard from "../../molecules/ProjectCard/ProjectCard";
import Header from "../../atoms/Header/Header";

const HomePageText = styled.p`
  max-width: 600px;
  margin-top: 40px;
`;

const Main = styled.main`
  margin: 26px;
`;

// const CTA = styled.p`
//   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
//   font-size: 18px;
//   font-style: normal;
//   font-variant: normal;
//   font-weight: 400;
//   line-height: 22px;
//   max-width: 500px;
//   margin-top: 20px;
// `;

const StyledLink = styled.a`
  font-weight: bold;
  color: ${(props) => props.theme.primary};
  text-decoration: none;
  &:hover {
    color: ${(props) => lighten("0.1", props.theme.primary)};
  }
`;

StyledLink.defaultProps = {
  theme: {
    primary: "black",
  },
};

const CardHolder = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: show;
  margin: 0 -13px 0 -13px;
`;

const HomePage = () => {
  return (
    <>
      <Main>
        <Header>Samba Code: Data Visualization</Header>
        <HomePageText>
          This is a selection of data visualization projects.
        </HomePageText>
        <CardHolder>
          <ProjectCard
            direction="left"
            title="London Weather History"
            description="A chart showing the weather in London from 1980 to 2020."
            linkedPage={"/weather-history"}
          />
          <ProjectCard
            direction="right"
            title="Crypto Currency Tracker"
            description="A Crypto Currency tracker showing data for Bitcoin and Etherium."
            linkedPage={"/crypto-tracker"}
          />
        </CardHolder>
      </Main>
    </>
  );
};

export default HomePage;
