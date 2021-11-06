import React,{ useState } from "react";
import { Table, Space, Button } from "antd";
import { LineChartOutlined, CloseCircleFilled } from "@ant-design/icons";
import dayjs from 'dayjs';
import { Bar } from "react-chartjs-2";

const MetricsTable = ({ metrics }) => {
  const [chartData, setChartData] = useState(null)
  const columns = [
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
      render: (v) => (
        <div>{`[${v.length > 20 ? v.substring(20) + "..." : v}]`}</div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "CreatedAt",
      key: "CreatedAt",
      render: (v) => <div>{dayjs(v).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button
            type="text"
            shape="round"
            icon={<LineChartOutlined />}
            onClick={() => visualizeBarPlot(record.data)}
          />
        </Space>
      ),
    },
  ];

  const visualizeBarPlot = (data) => {
    const dt = data.split(",");
    setChartData({
      labels: dt.map((_, idx) => idx + 1),
      datasets: [
        {
          label: "Metric",
          data: dt.map((v) => v),
          backgroundColor: [
            "#ffbb11",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
        },
      ],
    });
  }
  return (
    <div style={{ padding: "20px" }}>
      <Table
        columns={columns}
        pagination={{ position: ["bottomRight"] }}
        dataSource={metrics}
      />
      {chartData && (
        <div style={{ textAlign: "end" }}>
          <CloseCircleFilled size={50} onClick={() => setChartData(null)} />
        </div>
      )}
      {chartData && (
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Metrics",
              },
              legend: {
                display: false,
                position: "bottom",
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default MetricsTable;
