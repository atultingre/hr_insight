import React, { useEffect, useState } from "react";
import {
  Select,
  Input,
  Button,
  Table,
  Space,
  Typography,
  message,
  Card,
} from "antd";
import { storage, STORAGE_KEYS } from "../../../services/storage";

const { Title } = Typography;
const { Option } = Select;

export default function HRAccessScopes() {
  const [scopes, setScopes] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    hr_user_id: "",
    department: "",
    designation: "",
    employee_id: "",
  });

  useEffect(() => {
    setScopes(storage.get("hr_access_scopes", []));
    setUsers(storage.get(STORAGE_KEYS.USERS, []));
  }, []);

  const addScope = () => {
    if (!form.hr_user_id) {
      message.warning("Select HR Viewer");
      return;
    }

    const newScope = {
      id: Date.now(),
      hr_user_id: Number(form.hr_user_id),
      department: form.department || null,
      designation: form.designation || null,
      employee_id: form.employee_id || null,
    };

    const updated = [...scopes, newScope];
    storage.set("hr_access_scopes", updated);
    setScopes(updated);

    setForm({
      hr_user_id: "",
      department: "",
      designation: "",
      employee_id: "",
    });
  };

  const columns = [
    {
      title: "HR Viewer",
      dataIndex: "hr_user_id",
      key: "hr_user_id",
      render: (id) => users.find((u) => u.id === id)?.email || "-",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (v) => v || "All",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (v) => v || "All",
    },
    {
      title: "Employee",
      dataIndex: "employee_id",
      key: "employee_id",
      render: (v) => v || "-",
    },
  ];

  return (
    <Card>
      <Title level={4}>HR Access Scopes</Title>

      {/* Add Scope */}
      <Space wrap style={{ marginBottom: 24 }}>
        <Select
          placeholder="Select HR Viewer"
          style={{ width: 220 }}
          value={form.hr_user_id || undefined}
          onChange={(value) => setForm({ ...form, hr_user_id: value })}
        >
          {users
            .filter((u) => u.role === "hr_viewer")
            .map((u) => (
              <Option key={u.id} value={u.id}>
                {u.email}
              </Option>
            ))}
        </Select>

        <Input
          placeholder="Department (optional)"
          style={{ width: 200 }}
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <Input
          placeholder="Designation (optional)"
          style={{ width: 200 }}
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
        />

        <Input
          placeholder="Employee ID (optional)"
          style={{ width: 180 }}
          value={form.employee_id}
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
        />

        <Button type="primary" onClick={addScope}>
          Add Scope
        </Button>
      </Space>

      {/* Existing Scopes */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={scopes}
        locale={{ emptyText: "No scopes defined" }}
        pagination={false}
      />
    </Card>
  );
}
