import { Input } from "antd";

const CurrencyInput = ({ value, onChange, ...props }) => {
  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, "");
    const formattedValue = rawValue
      ? parseFloat(rawValue).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "";
    onChange(formattedValue);
  };

  return <Input value={value} onChange={handleChange} {...props} />;
};

export default CurrencyInput;
