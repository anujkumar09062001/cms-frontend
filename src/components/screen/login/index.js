import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React, { useRef } from "react";

import auth from "../../services/authService";

const Login = () => {
  const formRef = useRef();

  const handleSubmit = async () => {
    const uv = formRef.current.getFieldsValue();
    await axios
      .post("token-auth/", uv)
      .then((res) => {
        auth.setAuthToken(res.data.token)
        window.location = "/";
        message.success("Logged In successfully")
      })
      .catch((err) => {
        message.error("Invalid Credentials")
      })
  };

  return (
    <div>
      <Form ref={formRef} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter username" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input type="password" placeholder="Enter password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
