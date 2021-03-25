import styled from "styled-components";
import { lighten, rem } from "polished";

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

export const SelectBox = styled.select`
  padding: 3px;
  font-size: ${rem("16px")};
  font-family: "museo-sans", sans-serif;
  font-weight: 300;
  border: 1px solid #aaa;
  border-radius: 6px;
  min-height: 20px;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 10px 0 0 0;
`;

export const Label = styled.label`
  display: block;
  font-size: ${rem("14px")};
  margin: 12px 12px 0px 0;
  height: 22px;
  font-family: "museo-sans", sans-serif;
  font-weight: 700;
  min-width: 80px;
`;

export const InputContainer = styled.div`
  margin: 0 25px 6px 0;
`;
