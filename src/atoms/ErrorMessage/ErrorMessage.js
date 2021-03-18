import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import PropTypes from "prop-types";

const StyledPara = styled.p`
  font-size: ${rem("18px")};
  line-height: ${rem("22px")};
  color: ${(props) => props.theme.warning};
  margin: 20px 0 0 0;
  max-width: 650px;
  font-family: "museo-sans", sans-serif;
  font-weight: 300;
`;

const ErrorMessage = ({ children }) => <StyledPara>{children}</StyledPara>;

ErrorMessage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ErrorMessage;
