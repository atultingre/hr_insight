// ========================
// src/pages/hr/QuestionnaireBuilder.jsx
// ========================
import React, { useState } from "react";
import { storage, STORAGE_KEYS } from "../../services/storage";

const QUESTION_TYPES = [
  "text",
  "textarea",
  "single_choice",
  "multiple_choice",
  "rating",
];

export default function QuestionnaireBuilder() {
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
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const addOption = (id) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, options_json: [...q.options_json, ""] } : q
      )
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
      })
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
    <div style={{ border: "1px solid #ccc", padding: 16, marginTop: 16 }}>
      <h3>Create Questionnaire</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <h4>Questions</h4>
      {questions.map((q, index) => (
        <div key={q.id} style={{ marginBottom: 12 }}>
          <p>Question {index + 1}</p>
          <input
            placeholder="Question text"
            value={q.question_text}
            onChange={(e) =>
              updateQuestion(q.id, "question_text", e.target.value)
            }
          />

          <select
            value={q.question_type}
            onChange={(e) =>
              updateQuestion(q.id, "question_type", e.target.value)
            }
          >
            {QUESTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <label>
            <input
              type="checkbox"
              checked={q.is_required}
              onChange={(e) =>
                updateQuestion(q.id, "is_required", e.target.checked)
              }
            />
            Required
          </label>

          {(q.question_type === "single_choice" ||
            q.question_type === "multiple_choice") && (
            <div>
              <p>Options</p>
              {q.options_json.map((opt, i) => (
                <input
                  key={i}
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(q.id, i, e.target.value)}
                />
              ))}
              <button onClick={() => addOption(q.id)}>Add Option</button>
            </div>
          )}
        </div>
      ))}

      <button onClick={addQuestion}>Add Question</button>
      <br />
      <button onClick={saveQuestionnaire}>Save Questionnaire</button>
    </div>
  );
}
