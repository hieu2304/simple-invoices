import { Modal, Form, Input, Button } from "antd";
import { createInvoice } from "../../apis";
import useNotification from "../../hooks/useNotification";

export interface ICreateInvoiceProps {
  className?: string;
  visible: boolean;
  onClose: () => void;
}
const CreateInvoiceModal = (props: ICreateInvoiceProps) => {
  const [form] = Form.useForm();
  const { className, visible, onClose } = props;
  const { notifySuccess, notifyError } = useNotification();

  const handleSubmit = async (values) => {
    try {
      const body = {
        bankAccount: {
          bankId: "",
          sortCode: values.sortCode,
          accountNumber: values.accountNumber,
          accountName: values.accountName,
        },
        customer: {
          firstName: values.firstName,
          lastName: values.lastName,
          contact: {
            email: values.email,
            mobileNumber: values.mobileNumber,
          },
          addresses: [
            {
              premise: values.premise,
              countryCode: values.countryCode,
              postcode: values.postcode,
              county: values.county,
              city: values.city,
              addressType: "BILLING",
            },
          ],
        },
        documents: [],
        invoiceReference: values.invoiceReference,
        invoiceNumber: values.invoiceNumber,
        currency: values.currency,
        invoiceDate: values.invoiceDate,
        dueDate: values.dueDate,
        description: values.description,
        customFields: values.customFields,
        extensions: values.extensions,
        items: values.items,
      };
      const response = await createInvoice(body);
      console.log(response);
      notifySuccess("Invoice created successfully!");
      onClose();
      form.resetFields();
    } catch (error) {
      notifyError(`Error creating invoice: ${error.message}`);
    }
  };

  return (
    <Modal
      className={className}
      title="Create Invoice"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          currency: "LKR",
          currencySymbol: "SLRs",
          invoiceDate: Date.now(),
          description: "",
        }}
      >
        <Form.Item
          name="accountName"
          label="Account Name"
          rules={[{ required: true }]}
        >
          <Input className="form-field" />
        </Form.Item>
        <Form.Item
          name="sortCode"
          label="Sort Code"
          rules={[{ required: true }]}
        >
          <Input className="form-field" />
        </Form.Item>
        <Form.Item
          name="accountNumber"
          label="Account Number"
          rules={[{ required: true }]}
        >
          <Input className="form-field" type={"number"} />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mobileNumber"
          label="Mobile Number"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="invoiceNumber"
          label="Invoice Number"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="currency"
          label="Currency"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="invoiceDate"
          label="Invoice Date"
          rules={[{ required: true }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
          <Input type="date" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Invoice
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateInvoiceModal;
