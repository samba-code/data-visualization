import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const PageWrapper = ({ children }) => <StyledDiv>{children}</StyledDiv>;

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PageWrapper;
