import React, { useEffect, useState } from "react";
import { Card, Select, Input, Button, Space, Typography, message } from "antd";
import { storage, STORAGE_KEYS } from "../../../services/storage";

const { Title, Text } = Typography;

export default function BulkEditEmployees() {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newDesignation, setNewDesignation] = useState("");

  useEffect(() => {
    setEmployees(storage.get(STORAGE_KEYS.EMPLOYEES, []));
  }, []);

  const applyBulkEdit = () => {
    if (!department) {
      message.warning("Select department");
      return;
    }

    const updatedEmployees = employees.map((e) =>
      e.department === department
        ? {
            ...e,
            status: newStatus || e.status,
            designation: newDesignation || e.designation,
          }
        : e,
    );

    // Sync users status
    const updatedUsers = storage.get(STORAGE_KEYS.USERS, []).map((u) => {
      const emp = updatedEmployees.find((e) => e.id === u.employee_id);
      return emp ? { ...u, status: emp.status } : u;
    });

    storage.set(STORAGE_KEYS.EMPLOYEES, updatedEmployees);
    storage.set(STORAGE_KEYS.USERS, updatedUsers);

    setEmployees(updatedEmployees);
    message.success("Bulk update applied");
  };

  const departments = [
    ...new Set(employees.map((e) => e.department).filter(Boolean)),
  ];

  return (
    <Card style={{ maxWidth: 500 }} title="Bulk Edit Employees">
      <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
        {/* Department */}
        <div>
          <Text strong>Department</Text>
          <Select
            style={{ width: "100%" }}
            placeholder="Select department"
            value={department || undefined}
            onChange={setDepartment}
            options={departments.map((d) => ({
              label: d,
              value: d,
            }))}
          />
        </div>

        {/* Status */}
        <div>
          <Text strong>New Status</Text>
          <Select
            style={{ width: "100%" }}
            placeholder="No change"
            value={newStatus || undefined}
            onChange={setNewStatus}
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
            allowClear
          />
        </div>

        {/* Designation */}
        <div>
          <Text strong>New Designation</Text>
          <Input
            placeholder="Optional"
            value={newDesignation}
            onChange={(e) => setNewDesignation(e.target.value)}
          />
        </div>

        {/* Action */}
        <Button type="primary" block onClick={applyBulkEdit}>
          Apply Bulk Edit
        </Button>
      </Space>
    </Card>
  );
}
