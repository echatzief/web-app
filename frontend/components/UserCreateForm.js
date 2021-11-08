import React from "react";
import { message, Row, Col, Form, Input, Button } from "antd";

const UserCreateForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const { username, firstName, lastName } = values;
      
      await fetch("http://192.168.1.113:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept":"*/*"
        },
        body: JSON.stringify({ "username": username, "firstName": firstName, "lastName": lastName }),
      });

      form.resetFields();
      message.success("A new user has been created");
    } catch (e) {
      message.error("Failed to create a new user");
    }
  };
  
  return (
    <div style={{ padding: "20px" }}>
      <Row align="center">
        <Col>
          <h2>Create a user</h2>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Firstname"
              name="firstName"
              rules={[
                { required: true, message: "Please input your firstname!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Lastname"
              name="lastName"
              rules={[
                { required: true, message: "Please input your lastname!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UserCreateForm;
