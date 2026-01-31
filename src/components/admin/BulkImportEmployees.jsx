import React from "react";
import { Card, Upload, Typography, message, Space } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { storage, STORAGE_KEYS } from "../../services/storage";

const { Title, Text } = Typography;
const { Dragger } = Upload;

export default function BulkImportEmployees() {
  const handleFile = (file) => {
    if (!file) return false;

    const reader = new FileReader();
    reader.onload = () => {
      const lines = reader.result
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      const [, ...rows] = lines;

      const employees = storage.get(STORAGE_KEYS.EMPLOYEES, []);
      const users = storage.get(STORAGE_KEYS.USERS, []);

      let added = 0;
      let skipped = 0;

      rows.forEach((row) => {
        const [full_name, employee_code, email, department, designation] =
          row.split(",");

        if (!employee_code || !email) {
          skipped++;
          return;
        }

        if (employees.some((e) => e.employee_code === employee_code)) {
          skipped++;
          return;
        }

        const id = Date.now() + Math.random();

        employees.push({
          id,
          full_name,
          employee_code,
          email,
          department,
          designation,
          status: "active",
          created_at: new Date().toISOString(),
        });

        users.push({
          id: users.length + 1,
          email,
          password: "password123",
          role: "employee",
          employee_id: id,
          status: "active",
        });

        added++;
      });

      storage.set(STORAGE_KEYS.EMPLOYEES, employees);
      storage.set(STORAGE_KEYS.USERS, users);

      message.success(
        `Bulk import completed. Added: ${added}, Skipped: ${skipped}`,
        5,
      );

      message.info("Default password for all users: password123", 5);
    };

    reader.readAsText(file);

    // prevent auto upload
    return false;
  };

  return (
    <Card title="Bulk Import Employees" style={{ maxWidth: 600 }}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Text>
          CSV format:
          <br />
          <Text code>full_name,employee_code,email,department,designation</Text>
        </Text>

        <Dragger
          accept=".csv"
          beforeUpload={handleFile}
          multiple={false}
          maxCount={1}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag CSV file to upload</p>
          <p className="ant-upload-hint">Only .csv files are supported</p>
        </Dragger>
      </Space>
    </Card>
  );
}
