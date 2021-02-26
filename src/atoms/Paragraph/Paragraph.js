import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import PropTypes from "prop-types";

const StyledPara = styled.p`
  font-size: ${rem("16px")};
  line-height: ${rem("18px")};
  color: ${(props) => props.theme.primary};
  margin: 20px;
  max-width: 600px;
`;

const Paragraph = ({ children }) => <StyledPara>{children}</StyledPara>;

Paragraph.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default Paragraph;
