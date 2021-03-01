import React from "react";
import styled from "styled-components";
import { rem, lighten } from "polished";

import PropTypes from "prop-types";

const StyledHeading2 = styled.h2`
  font-size: ${rem("22px")};
  line-height: ${rem("24px")};
  color: ${(props) => lighten(0.1, props.theme.primary)};
  font-weight: bold;
  font-family: "museo-sans", sans-serif;
  font-weight: 700;
  margin-top: 35px;
`;

const Heading2 = ({ children }) => <StyledHeading2>{children}</StyledHeading2>;

Heading2.propTypes = {
  children: PropTypes.string,
};

export default Heading2;
