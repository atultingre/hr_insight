import React, { useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "../../../services/storage";
import { SubmissionDetailView } from "../../../pages/hr/SubmissionDetailView";
import { Table, Card, Button, Empty, Typography } from "antd";

const { Title } = Typography;

export default function SubmissionViewer({ scope }) {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const submissions = storage.get(STORAGE_KEYS.SUBMISSIONS, []);
    const employees = storage.get(STORAGE_KEYS.EMPLOYEES, []);
    const questionnaires = storage.get(STORAGE_KEYS.QUESTIONNAIRES, []);
    console.log("submissions", submissions);
    console.log("employees", employees);
    console.log("questionnaires", questionnaires);

    

    const joined = submissions.map((s) => {
      const emp = employees.find((e) => e.id === s.employee_id);
      const q = questionnaires.find((q) => q.id === s.questionnaire_id);

      return {
        id: s.id,
        employee_id: emp?.id,
        employee_name: emp?.full_name || "Unknown",
        department: emp?.department || "-",
        designation: emp?.designation || "-",
        questionnaire: q?.title || "Unknown",
        submitted_at: new Date(s.submitted_at).toLocaleDateString(),
        answers: s.answers,
        questions: q?.questions || [],
      };
    });

    const filtered = joined.filter((r) => {
      if (scope?.employee_id && r.employee_id !== scope.employee_id)
        return false;
      if (scope?.department && r.department !== scope.department) return false;
      if (scope?.designation && r.designation !== scope.designation)
        return false;
      return true;
    });

    setRows(filtered);
  }, [scope]);

  const columns = [
    {
      title: "Employee",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    // {
    //   title: "Designation",
    //   dataIndex: "designation",
    //   key: "designation",
    // },
    {
      title: "Questionnaire",
      dataIndex: "questionnaire",
      key: "questionnaire",
    },
    {
      title: "Submitted At",
      dataIndex: "submitted_at",
      key: "submitted_at",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => setSelected(record)}>
          View
        </Button>
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
