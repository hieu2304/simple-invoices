import styled from "styled-components";

import { getCssClass } from "../../infrastructure";
import { mixFlexbox } from "./mixins";
import { IBoxProps } from "./models";

export const Box = styled("div").attrs(({ className }) => ({
  className: getCssClass("sl-Box", className),
}))<IBoxProps>`
  ${(props) => `
    display: ${props.flex ? "flex" : ""};
    ${mixFlexbox(props)}
  `}
`;
