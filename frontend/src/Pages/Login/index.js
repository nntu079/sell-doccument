import { instance } from "../../utils/axios";
import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

export default function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);

    instance
      .post("/apis/account/login", {
        username: form.getFieldsValue().username,
        password: form.getFieldsValue().password,
      })
      .then((res) => {
        setLoading(false);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/home");
      })
      .catch((e) => {
        setLoading(false);

     
        alert("Wrong username or password");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Spin spinning={loading}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            
          >
            <Input style={{width:"50vh"}}/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password style={{width:"50vh"}} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 10, width: 100 }}
            >
              Đăng nhập
            </Button>

            <Button type="primary" style={{ width: 100 }}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}
