import React from "react";
import { Row, Col, Form, Select, Input, Button, message } from "antd";

const { Option } = Select;

const MetricsCreateForm = ({ users }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const { userId, data } = values;
      
      await fetch("http://localhost:8080/metrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          userId: userId,
          data: data,
        }),
      });
      form.resetFields();
      message.success("A new metric entry has been created");
    } catch (e) {
      message.error("Failed to create a new metric entry");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row align="center">
        <Col>
          <h2>Create a metric entry</h2>
          <Form
            form={form}
            layout="vertical"
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item
              label="User"
              name="userId"
              rules={[{ required: true, message: "Please input a user!" }]}
              initialValue={users && users[0] ? users[0].ID : null}
            >
              <Select>
                {users.map((u, idx) => (
                  <Option key={`user-${idx}`} value={u.ID}>
                    {u.username}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Metrics"
              name="data"
              rules={[{ required: true, message: "Please input metrics!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default MetricsCreateForm;
