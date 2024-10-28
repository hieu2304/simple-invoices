import styled from "styled-components";

import { getCssClass, isNumber } from "../../infrastructure";
import { mixFlexbox } from "./mixins";
import { IFlexProps } from "./models";

export const Flex = styled("div").attrs(({ className }) => ({
  className: getCssClass("sl-Flex", className),
}))<IFlexProps>`
  ${(props) => `
      display: flex;
      ${mixFlexbox(props)}
      gap: ${isNumber(props.gap) ? props.gap + "px" : ""};
    `}
`;
