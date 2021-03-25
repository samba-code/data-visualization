import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  box-sizing: border-box;
  color: black;
  justify-content: center;
  width: 100%;
  padding: 12px;
  background: white;
`;

const NotFound = () => {
  return (
    <StyledDiv>
      <h1>Page Not Found</h1>
      <Link to="/">Return to Home Page</Link>
    </StyledDiv>
  );
};

export default NotFound;
