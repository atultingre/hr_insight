import { Button, Space } from "antd";

const ReportsDashboard = () => {
  return (
    <div>
      <Space wrap style={{ marginTop: "20px" }}>
        <Button disabled>Reports & Exports</Button>
        <Button disabled>Notification Routes</Button>
      </Space>
    </div>
  );
};

export default ReportsDashboard;
