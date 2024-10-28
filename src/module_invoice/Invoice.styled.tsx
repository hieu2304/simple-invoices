import React from "react";
import styled from "styled-components";

import { getCssClass } from "../design-system/infrastructure/utils/css-class";
import Invoice, { IInvoiceProps } from "./Invoice";

const InvoiceModule: React.ComponentType<IInvoiceProps> = styled(Invoice).attrs(
  ({ className }) => ({
    className: getCssClass("sl-Invoice", className),
  })
)`
  & {
    width: 100%;
    align-items: center;
  }
`;

export default InvoiceModule;
