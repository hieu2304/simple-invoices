import React from "react";
import styled from "styled-components";

import { getCssClass } from "../design-system/infrastructure/utils/css-class";
import COLOR from "../design-system/infrastructure/color/color.token";
import Login, { ILoginProps } from "./Login";

const LoginModule: React.ComponentType<ILoginProps> = styled(Login).attrs(
  ({ className }) => ({
    className: getCssClass("sl-Login", className),
  })
)`
  & {
    border-radius: 4px;
    width: 100%;
    min-width: 240px;
    transition: opacity 0.5s ease;

    .bg-white {
      background: ${COLOR.white};
    }

    .text-link {
      cursor: pointer;
      color: ${COLOR.blue500};
    }
  }
`;

export default LoginModule;
