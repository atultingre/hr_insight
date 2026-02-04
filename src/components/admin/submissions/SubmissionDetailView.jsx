import { Descriptions, Modal, Table, Typography } from "antd";

const { Text } = Typography;

export function SubmissionDetailView({ open, onClose, submission }) {
  if (!submission) return null;

  // ✅ Join answers with questions using question_id
  const answerRows = submission.answers.map((ans) => {
    const q = submission.questions.find((q) => q.id === ans.question_id);

    return {
      ...ans,
      question_text: q?.question_text || "Unknown Question",
    };
  });

  const columns = [
    {
      title: "Question",
      dataIndex: "question_text",
      key: "question",
      render: (text, record) => <Text strong>{text}</Text>,
    },
    {
      title: "Answer",
      key: "answer",
      render: (_, record) =>
        Array.isArray(record.answer_json)
          ? record.answer_json.join(", ")
          : String(record.answer_json),
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Submission Details"
      width={800}
    >
      <Descriptions
        bordered
        size="small"
        column={1}
        style={{ marginBottom: 16 }}
      >
        <Descriptions.Item label="Employee">
          {submission.employee_name}
        </Descriptions.Item>
        <Descriptions.Item label="Questionnaire">
          {submission.questionnaire}
        </Descriptions.Item>
        <Descriptions.Item label="Submitted At">
          {submission.submitted_at}
        </Descriptions.Item>
      </Descriptions>

      <Table
        rowKey="question_id"
        columns={columns}
        dataSource={answerRows}
        pagination={false}
      />
    </Modal>
  );
}
