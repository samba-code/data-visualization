import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  color: white;
  background: black;
  padding: 10px;
  margin-top: 60px;
`;

const Footer = ({ children }) => <StyledFooter>{children}</StyledFooter>;

Footer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Footer;
