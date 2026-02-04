import React, { useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "../../../services/storage";
import { SubmissionDetailView } from "../submissions/SubmissionDetailView";
import { Table, Card, Button, Empty, Typography } from "antd";

const { Title } = Typography;

export default function ReportsDashboard({ scope }) {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const submissions = storage.get(STORAGE_KEYS.SUBMISSIONS, []);
    const employees = storage.get(STORAGE_KEYS.EMPLOYEES, []);
    const questionnaires = storage.get(STORAGE_KEYS.QUESTIONNAIRES, []);

    const stats = {};

    questionnaires.forEach((q) => {
      employees.forEach((emp) => {
        const dept = emp.department || "Unknown";
        const key = `${dept}_${q.id}`;

        if (!stats[key]) {
          stats[key] = {
            id: key,
            department: dept,
            questionnaire: q.title,
            totalEmployees: 0,
            filled: 0,
            notFilled: 0,
          };
        }

        stats[key].totalEmployees += 1;

        const hasSubmitted = submissions.some(
          (s) => s.employee_id === emp.id && s.questionnaire_id === q.id,
        );

        if (hasSubmitted) {
          stats[key].filled += 1;
        } else {
          stats[key].notFilled += 1;
        }
      });
    });

    setRows(Object.values(stats));
  }, []);

  const columns = [
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Questionnaire",
      dataIndex: "questionnaire",
      key: "questionnaire",
    },
    {
      title: "Total Employees",
      dataIndex: "totalEmployees",
      key: "totalEmployees",
    },
    {
      title: "Filled",
      dataIndex: "filled",
      key: "filled",
    },
    {
      title: "Not Filled",
      dataIndex: "notFilled",
      key: "notFilled",
      render: (value) => (
        <span style={{ color: value > 0 ? "red" : "green" }}>{value}</span>
      ),
    },
  ];

  return (
    <Card>
      <Title level={4}>Submissions</Title>

      {rows.length === 0 ? (
        <Empty description="No submissions in scope" />
      ) : (
        <Table
          rowKey="id"
          columns={columns}
          dataSource={rows}
          pagination={{ pageSize: 10 }}
        />
      )}

      {/* View Details Modal */}
      <SubmissionDetailView
        open={!!selected}
        submission={selected}
        onClose={() => setSelected(null)}
      />
    </Card>
  );
}
