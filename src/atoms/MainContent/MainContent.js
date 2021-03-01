import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledMain = styled.div`
  width: 90%;
  max-width: 1024px;
`;

const MainContent = ({ children }) => <StyledMain>{children}</StyledMain>;

MainContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainContent;
