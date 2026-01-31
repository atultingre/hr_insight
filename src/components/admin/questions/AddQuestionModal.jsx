import { Modal, Input, Select, Checkbox, Button, Space } from "antd";
import { useState } from "react";

const QUESTION_TYPES = [
  "text",
  "textarea",
  "single_choice",
  "multiple_choice",
  "rating",
];

export default function AddQuestionModal({ open, onClose, onSave }) {
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("text");
  const [required, setRequired] = useState(false);

  const handleSave = () => {
    if (!question.trim()) return;

    onSave({
      question_text: question,
      question_type: type,
      is_required: required,
      options_json: [],
    });

    onClose();
    setQuestion("");
    setType("text");
    setRequired(false);
  };

  return (
    <Modal title="Add Question" open={open} onCancel={onClose} footer={null}>
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <Checkbox
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
          <Input
            placeholder="Question text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <Select
            style={{ minWidth: "150px" }}
            value={type}
            options={QUESTION_TYPES.map((t) => ({ label: t, value: t }))}
            onChange={setType}
          />
        </div>

        <Button block type="primary" onClick={handleSave}>
          Add
        </Button>
      </div>
    </Modal>
  );
}
