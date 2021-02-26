import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Footer = ({ children }) => <StyledFooter>{children}</StyledFooter>;

Footer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};

export default Footer;