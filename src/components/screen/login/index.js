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
        auth.setAuthToken(res.data.token);
        window.location = "/";
        message.success("Logged In successfully");
      })
      .catch((err) => {
        message.error("Invalid Credentials");
      });
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-3"></div>
        <div
          className="col-lg-6 pt-4 px-4 pb-2"
          style={{ backgroundColor: "#fff", borderRadius: 15 }}
        >
          <div
            className="mb-5 fw-bold text-center text-primary"
            style={{ fontSize: 26 }}
          >
            Login
          </div>
          <div className="">
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
          <div className="text-center fw-bolder mt-2" style={{ fontSize: 12 }}>
            Created by Anuj kumar
          </div>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default Login;
