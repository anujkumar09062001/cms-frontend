import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";

import auth from "../../services/authService";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleSubmit = async () => {
    setLoading(true);
    const uv = formRef.current.getFieldsValue();
    await axios
      .post("token-auth/", uv)
      .then((res) => {
        auth.setAuthToken(res.data.token);
        window.location = "/";
        message.success("Logged In successfully");
      })
      .catch((err) => {
        setLoading(false);
        message.error("Invalid Credentials");
      });
  };

  return (
    <div className="container">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="p-4 pb-2 rounded"
          style={{
            backgroundColor: "#fff",
            width: 400,
          }}
        >
          <div
            className="mb-4 fw-bold text-primary text-center"
          >
            AK COLLEGE MANAGEMENT SYSTEM
          </div>
          <div
            className="mb-3 fw-bold"
          >
            PLEASE LOG IN
          </div>
          <div className="">
            <Form ref={formRef} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="Username(admin)"
                name="username"
                rules={[{ required: true, message: "Please enter username" }]}
              >
                <Input placeholder="admin" />
              </Form.Item>
              <Form.Item
                label="Password(admin)"
                name="password"
                rules={[{ required: true, message: "Please enter password" }]}
              >
                <Input type="password" placeholder="admin" />
              </Form.Item>
              <Form.Item className="text-center">
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="text-center fw-bolder" style={{ fontSize: 12 }}>
            Created by Anuj kumar
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
