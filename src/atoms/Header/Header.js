import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Header = ({ children }) => <StyledHeader>{children}</StyledHeader>;

Header.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};

export default Header;