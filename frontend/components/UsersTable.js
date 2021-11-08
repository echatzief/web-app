import React from "react";
import { Table, Space, Button, message } from 'antd'
import { DeleteOutlined, LineChartOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const UsersTable = ({ users }) => {
  const router = useRouter();
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Firstname",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button
            type="text"
            shape="round"
            icon={<DeleteOutlined />}
            onClick={() => deleteUser(record.ID)}
          />
          <Button
            type="text"
            shape="round"
            icon={<LineChartOutlined />}
            onClick={() => router.push(`/user/${record.ID}/metrics`)}
          />
        </Space>
      ),
    },
  ];

  const deleteUser = async (id) => {
    try {

      await fetch(`http://192.168.1.113:8080/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      });
      message.success("A user has been removed");
      window.location.reload(true);
    } catch (e) {
      message.error("Failed to remove a user");
    }
  };
  
  return (
    <div style={{padding: '20px'}}>
      <Table
        columns={columns}
        pagination={{ position: ["bottomRight"] }}
        dataSource={users}
      />
    </div>
  );
};

export default UsersTable;
