import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const StyledDiv = styled.div`
  margin: 0 0 20px 10px;
`;

const ChartWrapper = ({ children }) => <StyledDiv>{children}</StyledDiv>;

ChartWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ChartWrapper;
