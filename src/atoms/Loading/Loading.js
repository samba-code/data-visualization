import React from "react";
import PropTypes from "prop-types";
import ScaleLoader from "react-spinners/ScaleLoader";
import styled from "styled-components";
import { rem } from "polished";

const StyledLoading = styled.div`
  font-size: ${rem("18px")};
  color: black;
  margin: 20px;
`;

const Loading = ({ color }) => <StyledLoading><ScaleLoader color={color}/><p>Loading data</p></StyledLoading>;

Loading.propTypes = {
  color: PropTypes.string
}

export default Loading;
