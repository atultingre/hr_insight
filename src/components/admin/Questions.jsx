import { Button, Card, Empty, Space, Typography, Table, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditQuestionModal from "./EditQuestionModal";
import ViewQuestionsModal from "./ViewQuestionsModal.jsx";
import { storage, STORAGE_KEYS } from "../../services/storage";

const { Text } = Typography;

const Questions = ({ questionnaires, setQuestionnaires }) => {
  const [viewQnr, setViewQnr] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingQnrId, setEditingQnrId] = useState(null);

  const deleteQuestion = (questionnaireId, questionId) => {
    const updated = questionnaires.map((q) =>
      q.id === questionnaireId
        ? {
            ...q,
            questions: q.questions.filter((qq) => qq.id !== questionId),
          }
        : q,
    );

    storage.set(STORAGE_KEYS.QUESTIONNAIRES, updated);
    setQuestionnaires(updated);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text) => <Text strong>{text}</Text>,
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   render: (v) => v || "-",
    // },
    {
      title: "Total Questions",
      render: (_, record) => record.questions.length,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Tooltip title="View Questions">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => setViewQnr(record)}
          />
        </Tooltip>
      ),
    },
    {
      title: "Delete",
      render: (_, record) => (
        <Tooltip title="Delete Questionnaire">
          <Button
            type="text"
            danger
            icon={<EyeOutlined />}
            onClick={() => setViewQnr(record)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Card title="Questionnaires">
      {questionnaires.length === 0 ? (
        <Empty />
      ) : (
        <Table
          rowKey="id"
          columns={columns}
          dataSource={questionnaires}
          pagination={false}
        />
      )}

      {/* 👁 View Questions Modal */}
      {viewQnr && (
        <ViewQuestionsModal
          open={!!viewQnr}
          questionnaire={viewQnr}
          onClose={() => setViewQnr(null)}
          onEdit={(q) => {
            setEditingQuestion(q);
            setEditingQnrId(viewQnr.id);
          }}
          onDelete={deleteQuestion}
        />
      )}

      {/* ✏️ Edit Question Modal */}
      {editingQuestion && (
        <EditQuestionModal
          open={!!editingQuestion}
          question={editingQuestion}
          questionnaireId={editingQnrId}
          questionnaires={questionnaires}
          setQuestionnaires={setQuestionnaires}
          onClose={() => setEditingQuestion(null)}
        />
      )}
    </Card>
  );
};

export default Questions;
