import React from "react";
import styled from "styled-components";

import { getCssClass } from "../design-system/infrastructure/utils/css-class";
import Home, { IHomeProps } from "./Home";

const HomeModule: React.ComponentType<IHomeProps> = styled(Home).attrs(
  ({ className }) => ({
    className: getCssClass("sl-Home", className),
  })
)`
  & {
    padding: 16px;
    align-items: center;
    h1 {
      margin: 0;
      font-size: 2em;
    }

    .header {
      width: 100%;
      justify-content: flex-end;
    }
    .btn-action {
      padding: 4px;
      min-width: 200px;
      height: 40px;
      span {
        font-weight: 600;
      }
    }
  }
`;

export default HomeModule;
