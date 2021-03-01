import React from "react";
import PropTypes from "prop-types";
import ScaleLoader from "react-spinners/ScaleLoader";
import styled from "styled-components";
import { rem } from "polished";

const StyledLoading = styled.div`
  font-size: ${rem("18px")};
  color: black;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LoadingText = styled.p`
  margin-top: 10px;
`;

const Loading = ({ color }) => (
  <StyledLoading>
    <ScaleLoader color={color} />
    <LoadingText>Loading data</LoadingText>
  </StyledLoading>
);

Loading.propTypes = {
  color: PropTypes.string,
};

export default Loading;
