import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useNotification from "../hooks/useNotification";
import { Box, Flex } from "../design-system/components/Flexbox";

export interface ILoginProps {
  className?: string;
}

type FieldType = {
  username: string;
  password: string;
  remember: string;
};

const Login = (props: ILoginProps) => {
  const { className } = props;
  const { login, loading, userProfile } = useAuth();
  const { notifySuccess, notifyError } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (values: FieldType) => {
    try {
      await login(values.username, values.password);
      notifySuccess("Login Successful", "You have logged in successfully!");
      navigate("/");
    } catch (err) {
      notifyError(
        `Login Failed', 'Please check your credentials. Error: ${err}`
      );
    }
  };

  if (userProfile) {
    return (
      <Flex column className={className}>
        <Typography style={{ fontWeight: 600 }}>
          Welcome {userProfile.lastName}, {userProfile.firstName}
        </Typography>
        <Typography className="text-link" onClick={() => navigate("/")}>
          Back to Home
        </Typography>
      </Flex>
    );
  }

  return (
    <Box className={`${className} bg-white`} p={16}>
      <h2>Login</h2>
      <Form
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <Typography className="text-link" onClick={() => navigate("/")}>
        Continute without login ?
      </Typography>
    </Box>
  );
};

export default Login;
