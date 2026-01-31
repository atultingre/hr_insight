import { AimOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Empty,
  Popconfirm,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import { storage, STORAGE_KEYS } from "../../../services/storage.js";
import TargetingRulesUI from "./TargetingRulesUI.jsx";
import EditQuestionModal from "./EditQuestionModal.jsx";
import ViewQuestionsModal from "./ViewQuestionsModal.jsx";
import AddQuestionModal from "./AddQuestionModal.jsx";

const { Text } = Typography;

const Questions = ({ questionnaires, setQuestionnaires }) => {
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingQnrId, setEditingQnrId] = useState(null);
  const [rulesModal, setRulesModal] = useState(null);
  const [addingQnrId, setAddingQnrId] = useState(null);
  const [viewQnrId, setViewQnrId] = useState(null);
  const viewQnr = questionnaires.find((q) => q.id === viewQnrId) || null;

  if (typeof setQuestionnaires !== "function") {
    throw new Error("Questions requires setQuestionnaires prop");
  }

  const deleteQuestionnaire = (questionnaireId) => {
    const updated = questionnaires.filter((q) => q.id !== questionnaireId);

    storage.set(STORAGE_KEYS.QUESTIONNAIRES, updated);
    setQuestionnaires(updated);
  };

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

  const addQuestionToQuestionnaire = (questionnaireId, question) => {
    const updated = questionnaires.map((q) =>
      q.id === questionnaireId
        ? {
            ...q,
            questions: [
              ...q.questions,
              {
                ...question,
                id: Date.now(),
                display_order: q.questions.length + 1,
              },
            ],
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
            onClick={() => setViewQnrId(record.id)}
          />
        </Tooltip>
      ),
    },
    {
      title: "Delete",
      render: (_, record) => (
        <Popconfirm
          title="Delete Questionnaire?"
          description="This will permanently delete the questionnaire and all its questions."
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
          onConfirm={() => deleteQuestionnaire(record.id)}
        >
          <Tooltip title="Delete Questionnaire">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => e.stopPropagation()} // ⛔ prevents row click issues
            />
          </Tooltip>
        </Popconfirm>
      ),
    },
    {
      title: "Target",
      render: (_, record) => (
        <Tooltip title="Targeting Rules">
          <Button
            type="text"
            icon={<AimOutlined />}
            onClick={() => setRulesModal(record.id)}
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
          onClose={() => setViewQnrId(null)}
          onEdit={(q) => {
            setEditingQuestion(q);
            setEditingQnrId(viewQnr.id);
          }}
          onDelete={deleteQuestion}
          onAddQuestion={() => setAddingQnrId(viewQnr.id)}
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
      {rulesModal && (
        <TargetingRulesUI
          questionnaireId={rulesModal}
          open={!!rulesModal}
          onClose={() => setRulesModal(null)}
        />
      )}

      {addingQnrId && (
        <AddQuestionModal
          open={!!addingQnrId}
          onClose={() => setAddingQnrId(null)}
          onSave={(question) => {
            addQuestionToQuestionnaire(addingQnrId, question);
            setAddingQnrId(null);
          }}
        />
      )}
    </Card>
  );
};

export default Questions;
