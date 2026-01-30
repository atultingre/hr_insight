import { Modal, Input, Select, Checkbox, Button, Space, Card } from "antd";
import { useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "../../services/storage";

const { TextArea } = Input;

const QUESTION_TYPES = [
  "text",
  "textarea",
  "single_choice",
  "multiple_choice",
  "rating",
];

const EditQuestionModal = ({
  open,
  onClose,
  question,
  questionnaireId,
  questionnaires,
  setQuestionnaires,
}) => {
  const [q, setQ] = useState({ ...question });

  // ✅ keep modal in sync
  useEffect(() => {
    setQ({ ...question });
  }, [question]);

  const updateField = (field, value) =>
    setQ((prev) => ({ ...prev, [field]: value }));

  const save = () => {
    const updated = questionnaires.map((qn) =>
      qn.id === questionnaireId
        ? {
            ...qn,
            questions: qn.questions.map((qq) => (qq.id === q.id ? q : qq)),
          }
        : qn,
    );

    storage.set(STORAGE_KEYS.QUESTIONNAIRES, updated);
    setQuestionnaires(updated);
    onClose();
  };

  const updateOption = (index, value) => {
    const opts = [...q.options_json];
    opts[index] = value;
    setQ({ ...q, options_json: opts });
  };

  const addOption = () => setQ({ ...q, options_json: [...q.options_json, ""] });

  const deleteOption = (index) => {
    const opts = q.options_json.filter((_, i) => i !== index);
    setQ({ ...q, options_json: opts });
  };

  return (
    <Modal
      title="Edit Question"
      open={open}
      onCancel={onClose}
      onOk={save}
      width={700}
    >
      <Card>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Checkbox
            checked={q.is_required}
            onChange={(e) => updateField("is_required", e.target.checked)}
          >
            Required
          </Checkbox>

          <Input
            placeholder="Question text"
            value={q.question_text}
            onChange={(e) => updateField("question_text", e.target.value)}
          />

          <Select
            value={q.question_type}
            options={QUESTION_TYPES.map((t) => ({
              label: t,
              value: t,
            }))}
            onChange={(val) => updateField("question_type", val)}
          />

          {(q.question_type === "single_choice" ||
            q.question_type === "multiple_choice") && (
            <>
              <strong>Options</strong>

              {q.options_json.map((opt, i) => (
                <Space key={i}>
                  <Input
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                  />
                  <Button danger onClick={() => deleteOption(i)}>
                    Delete
                  </Button>
                </Space>
              ))}

              <Button type="dashed" onClick={addOption}>
                Add Option
              </Button>
            </>
          )}
        </Space>
      </Card>
    </Modal>
  );
};

export default EditQuestionModal;
