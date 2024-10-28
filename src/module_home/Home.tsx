import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import { Flex } from "../design-system/components/Flexbox";
import useAuth from "../hooks/useAuth";
import InvoiceModule from "../module_invoice/Invoice.styled";

export interface IHomeProps {
  className?: string;
}

const Home = (props: IHomeProps) => {
  const { className } = props;
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Flex className={className} column gap={4}>
      <Flex className="header">
        <Button
          className="btn-action"
          type="primary"
          onClick={handleLoginRedirect}
        >
          Go to Login
        </Button>
      </Flex>
      <h1>Welcome to Simple Invoice</h1>
      <p>This is your invoice management application.</p>
      {userProfile && (
        <Flex column className="sl-container">
          <InvoiceModule />
        </Flex>
      )}
    </Flex>
  );
};

export default Home;
