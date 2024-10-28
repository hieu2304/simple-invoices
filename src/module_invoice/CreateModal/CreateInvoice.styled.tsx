import React from "react";
import styled from "styled-components";

import { getCssClass } from "../../design-system/infrastructure/utils/css-class";
import CreateInvoice, { ICreateInvoiceProps } from "./CreateInvoice";

const CreateInvoiceModule: React.ComponentType<ICreateInvoiceProps> = styled(
  CreateInvoice
).attrs(({ className }) => ({
  className: getCssClass("sl-Create-invoice", className),
}))`
  & {
    width: 100%;
    align-items: center;
    .form-field {
      width: 100%;
      max-width: 400px;
    }
  }
`;

export default CreateInvoiceModule;
