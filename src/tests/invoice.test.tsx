import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import CreateInvoiceModal from "../module_invoice/CreateModal/CreateInvoice.styled"; // Adjust the import path as necessary
import { createInvoice } from "../apis";
import useNotification from "../hooks/useNotification";

// Mock the API and notification hook
jest.mock("../../apis", () => ({
  createInvoice: jest.fn(),
}));

jest.mock("../../hooks/useNotification", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    notifySuccess: jest.fn(),
    notifyError: jest.fn(),
  })),
}));

describe("CreateInvoiceModal", () => {
  const mockOnClose = jest.fn();
  const { notifySuccess, notifyError } = useNotification();

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("renders the modal correctly", () => {
    const { getByText } = render(
      <CreateInvoiceModal visible={true} onClose={mockOnClose} />
    );

    expect(getByText("Create Invoice")).toBeInTheDocument();
    expect(getByText("Account Name")).toBeInTheDocument();
  });

  it("submits the form and calls createInvoice", async () => {
    const { getByLabelText, getByRole } = render(
      <CreateInvoiceModal visible={true} onClose={mockOnClose} />
    );

    // Fill out the form fields using userEvent
    await userEvent.type(getByLabelText("Account Name"), "John Doe");
    await userEvent.type(getByLabelText("Sort Code"), "09-01-01");
    await userEvent.type(getByLabelText("Account Number"), "12345678");
    await userEvent.type(getByLabelText("First Name"), "John");
    await userEvent.type(getByLabelText("Last Name"), "Doe");
    await userEvent.type(getByLabelText("Email"), "john.doe@example.com");
    await userEvent.type(getByLabelText("Mobile Number"), "+123456789");
    await userEvent.type(getByLabelText("Invoice Number"), "INV-001");
    await userEvent.type(getByLabelText("Currency"), "USD");
    await userEvent.type(getByLabelText("Invoice Date"), "2024-01-01");
    await userEvent.type(getByLabelText("Due Date"), "2024-01-15");

    // Submit the form
    await userEvent.click(getByRole("button", { name: /create invoice/i }));

    // Use a short delay to ensure promises resolve
    await new Promise((r) => setTimeout(r, 100));

    expect(createInvoice).toHaveBeenCalled();
    expect(notifySuccess).toHaveBeenCalledWith("Invoice created successfully!");
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("shows error notification on failure", async () => {
    // Mock the createInvoice function to throw an error
    (createInvoice as jest.Mock).mockRejectedValue(new Error("API error"));

    const { getByLabelText, getByRole } = render(
      <CreateInvoiceModal visible={true} onClose={mockOnClose} />
    );

    // Fill out the form fields using userEvent
    await userEvent.type(getByLabelText("Account Name"), "John Doe");
    await userEvent.type(getByLabelText("Sort Code"), "09-01-01");
    await userEvent.type(getByLabelText("Account Number"), "12345678");
    await userEvent.type(getByLabelText("First Name"), "John");
    await userEvent.type(getByLabelText("Last Name"), "Doe");
    await userEvent.type(getByLabelText("Email"), "john.doe@example.com");
    await userEvent.type(getByLabelText("Mobile Number"), "+123456789");
    await userEvent.type(getByLabelText("Invoice Number"), "INV-001");
    await userEvent.type(getByLabelText("Currency"), "USD");
    await userEvent.type(getByLabelText("Invoice Date"), "2024-01-01");
    await userEvent.type(getByLabelText("Due Date"), "2024-01-15");

    // Submit the form
    await userEvent.click(getByRole("button", { name: /create invoice/i }));

    // Use a short delay to ensure promises resolve
    await new Promise((r) => setTimeout(r, 100));

    expect(notifyError).toHaveBeenCalledWith(
      "Error creating invoice: API error"
    );
  });
});
