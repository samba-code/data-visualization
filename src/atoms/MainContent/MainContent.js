import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const StyledMain = styled.main`
  width: 95%;
  max-width: 1024px;
  background: white;
`;

const MainContent = ({ children }) => <StyledMain>{children}</StyledMain>;

MainContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainContent;
