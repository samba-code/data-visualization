import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import PropTypes from "prop-types";

const StyledHeading1 = styled.h1`
  font-size: ${rem("28px")};
  color: white;
  font-weight: bold;
  font-family: "museo-sans", sans-serif;
  font-weight: 700;
`;

const Heading1 = ({ children }) => <StyledHeading1>{children}</StyledHeading1>;

Heading1.propTypes = {
  children: PropTypes.string,
};

export default Heading1;
