import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

const StyledNav = styled.nav`
  display: flex;
  box-sizing: border-box;
  color: white;
  justify-content: center;
  width: 100%;
  padding: 12px;
  background: black;
  &:link {
    color: white;
  }
`;

const StyledLink = styled(Link)`
  color: white;
`;

const NavBar = () => (
  <StyledNav>
    <StyledLink to="/">Samba Code Data Visualization</StyledLink>
  </StyledNav>
);

export default NavBar;
