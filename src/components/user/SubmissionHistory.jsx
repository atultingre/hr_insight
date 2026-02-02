import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Typography, Empty, Space, Card } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import { storage, STORAGE_KEYS } from "../../services/storage";
import { useAuth } from "../../state/AuthContext";

export default function SubmissionHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const submissions = storage.get(STORAGE_KEYS.SUBMISSIONS, []);
    const questionnaires = storage.get(STORAGE_KEYS.QUESTIONNAIRES, []);

    const mySubs = submissions
      .filter((s) => s.employee_id === user.employee_id)
      .map((s) => {
        const q = questionnaires.find((q) => q.id === s.questionnaire_id);
        return {
          id: s.id,
          questionnaire_title: q?.title || "Unknown Questionnaire",
          submitted_at: new Date(s.submitted_at).toLocaleDateString(),
          status: s.status,
          answers: s.answers || [],
          questions: q?.questions || [],
        };
      });

    setHistory(mySubs);
  }, [user]);

  return (
    <div>
      <Typography.Title level={4}>My Submission History</Typography.Title>

      {history.length === 0 ? (
        <Empty description="No submissions yet" />
      ) : (
        <Table
          rowKey="id"
          dataSource={history}
          pagination={false}
          expandable={{
            expandedRowKeys: active ? [active] : [],
            onExpand: (expanded, record) =>
              setActive(expanded ? record.id : null),
            expandedRowRender: (record) => {
              const columns = [
                {
                  title: "Question",
                  dataIndex: "question_text",
                  key: "question",
                  render: (text) => (
                    <Typography.Text strong>{text}</Typography.Text>
                  ),
                },
                {
                  title: "Answer",
                  key: "answer",
                  render: (_, q) => {
                    const ans = record.answers.find(
                      (a) => a.question_id === q.id,
                    );

                    const value = Array.isArray(ans?.answer_json)
                      ? ans.answer_json.join(", ")
                      : String(ans?.answer_json ?? "-");

                    return <span>{value}</span>;
                  },
                },
              ];
              return (
                <Table
                  rowKey="id"
                  size="small"
                  pagination={false}
                  columns={columns}
                  dataSource={record.questions}
                />
              );
            },

            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <Button
                  size="small"
                  icon={<EyeInvisibleOutlined />}
                  onClick={(e) => onExpand(record, e)}
                >
                  Hide
                </Button>
              ) : (
                <Button
                  size="small"
                  icon={<EyeOutlined />}
                  onClick={(e) => onExpand(record, e)}
                >
                  View
                </Button>
              ),
          }}
          columns={[
            {
              title: "Questionnaire",
              dataIndex: "questionnaire_title",
              render: (text) => (
                <Typography.Text strong>{text}</Typography.Text>
              ),
            },
            {
              title: "Submitted At",
              dataIndex: "submitted_at",
            },
            {
              title: "Status",
              dataIndex: "status",
              render: (status) => (
                <Tag color="green">{status.toUpperCase()}</Tag>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
