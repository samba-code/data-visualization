import React from "react";
import styled from "styled-components";
import { rem } from "polished";

const StyledLoading = styled.div`
  font-size: ${rem("18px")};
  color: black;
  margin: 20px;
`;

const Loading = () => <StyledLoading>Loading data...</StyledLoading>;

export default Loading;
