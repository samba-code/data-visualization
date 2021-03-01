import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import PropTypes from "prop-types";

const StyledPara = styled.p`
  font-size: ${rem("14px")};
  line-height: ${rem("16px")};
  color: ${(props) => props.theme.primary};
  margin: 20px;
  max-width: 500px;
  font-family: "museo-sans", sans-serif;
  font-weight: 300;
`;

const Paragraph = ({ children }) => <StyledPara>{children}</StyledPara>;

Paragraph.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default Paragraph;