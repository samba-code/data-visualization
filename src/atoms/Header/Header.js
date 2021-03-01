import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const StyledHeader = styled.header`
  display: flex;
  box-sizing: border-box;
  color: white;
  justify-content: center;
  width: 100%;
  padding: 12px;
  background: grey;
`;

const Header = ({ children }) => <StyledHeader>{children}</StyledHeader>;

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Header;
