// ========================
// src/pages/hr/QuestionnaireBuilder.jsx
// ========================
import React, { useState } from "react";
import { storage, STORAGE_KEYS } from "../../../services/storage";
import {
  Modal,
  Input,
  Select,
  Checkbox,
  Button,
  Space,
  Divider,
  Card,
} from "antd";

const { TextArea } = Input;

const QUESTION_TYPES = [
  "text",
  "textarea",
  "single_choice",
  "multiple_choice",
  "rating",
];

export default function QuestionnaireBuilder({ open, setOpen }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        question_text: "",
        question_type: "text",
        is_required: false,
        options_json: [],
      },
    ]);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)),
    );
  };

  const addOption = (id) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, options_json: [...q.options_json, ""] } : q,
      ),
    );
  };

  const updateOption = (qId, index, value) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === qId) {
          const opts = [...q.options_json];
          opts[index] = value;
          return { ...q, options_json: opts };
        }
        return q;
      }),
    );
  };

  const saveQuestionnaire = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const existing = storage.get(STORAGE_KEYS.QUESTIONNAIRES, []);

    const newQuestionnaire = {
      id: Date.now(),
      title,
      description,
      questions: questions.map((q, index) => ({
        ...q,
        display_order: index + 1,
      })),
      is_active: true,
      created_at: new Date().toISOString(),
    };

    storage.set(STORAGE_KEYS.QUESTIONNAIRES, [...existing, newQuestionnaire]);

    console.log("Saved questionnaire:", newQuestionnaire);
    alert("Questionnaire saved to local storage");

    // reset builder
    setTitle("");
    setDescription("");
    setQuestions([]);
  };

  return (
    <Modal
      title="Create Questionnaire"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={900}
      destroyOnHidden
    >
      <Card>
        <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextArea
            placeholder="Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Divider titlePlacement="start">Questions</Divider>

          {questions.map((q, index) => (
            <Card key={q.id} size="small" style={{ width: "100%" }}>
              {/* <Space orientation="vertical" style={{ width: "100%" }}> */}
              <strong>Question {index + 1}</strong>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Checkbox
                  checked={q.is_required}
                  onChange={(e) =>
                    updateQuestion(q.id, "is_required", e.target.checked)
                  }
                ></Checkbox>
                <Input
                  placeholder="Question text"
                  value={q.question_text}
                  onChange={(e) =>
                    updateQuestion(q.id, "question_text", e.target.value)
                  }
                />

                <Select
                  value={q.question_type}
                  onChange={(value) =>
                    updateQuestion(q.id, "question_type", value)
                  }
                  options={QUESTION_TYPES.map((t) => ({
                    label: t,
                    value: t,
                  }))}
                  style={{ width: 180 }}
                />
              </div>
              {(q.question_type === "single_choice" ||
                q.question_type === "multiple_choice") && (
                <Space
                  orientation="vertical"
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  <strong style={{}}>Options</strong>

                  {q.options_json.map((opt, i) => (
                    <Input
                      key={i}
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(q.id, i, e.target.value)}
                    />
                  ))}

                  <Button type="dashed" onClick={() => addOption(q.id)}>
                    Add Option
                  </Button>
                </Space>
              )}

              {/* </Space> */}
            </Card>
          ))}

          <Button type="dashed" block onClick={addQuestion}>
            Add Question
          </Button>

          <Button type="primary" block onClick={saveQuestionnaire}>
            Save Questionnaire
          </Button>
        </Space>
      </Card>
    </Modal>
  );
}
