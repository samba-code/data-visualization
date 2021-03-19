import styled from "styled-components";
import { lighten } from "polished";

export const IntroductionArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: ${(props) => lighten(0.2, props.theme.neutral)};
  width: 100%;
  padding: 10px 0 30px 0;
`;

export const Introduction = styled.div`
  width: 90%;
  max-width: 1024px;
`;
