import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { storage, STORAGE_KEYS } from "../../services/storage";
import { useAuth } from "../../state/AuthContext";

const buildSchema = (questions) => {
  const shape = {};

  questions.forEach((q) => {
    let field = z.any();

    if (q.is_required) {
      field = field.refine(
        (v) =>
          v !== undefined &&
          v !== null &&
          !(Array.isArray(v) && v.length === 0),
        "Required",
      );
    }

    shape[`q_${q.id}`] = field;
  });

  return z.object(shape);
};

export default function QuestionnaireFillForm({ questionnaire, onBack }) {
  const { user } = useAuth();
  const schema = buildSchema(questionnaire.questions);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const submissions = storage.get(STORAGE_KEYS.SUBMISSIONS, []);

    const alreadySubmitted = submissions.some(
      (s) =>
        s.employee_id === user.employee_id &&
        s.questionnaire_id === questionnaire.id,
    );

    if (alreadySubmitted) {
      alert("You have already submitted this questionnaire");
      return;
    }

    const newSubmission = {
      id: Date.now(),
      questionnaire_id: questionnaire.id,
      employee_id: user.employee_id,
      submitted_at: new Date().toISOString(),
      status: "submitted",
      answers: questionnaire.questions.map((q) => ({
        question_id: q.id,
        answer_json: data[`q_${q.id}`],
      })),
    };

    storage.set(STORAGE_KEYS.SUBMISSIONS, [...submissions, newSubmission]);

    alert("Submission saved successfully");
    onBack();
  };

  const renderField = (q) => {
    switch (q.question_type) {
      case "text":
        return (
          <Controller
            name={`q_${q.id}`}
            control={control}
            render={({ field }) => <input {...field} />}
          />
        );

      case "textarea":
        return (
          <Controller
            name={`q_${q.id}`}
            control={control}
            render={({ field }) => <textarea {...field} />}
          />
        );

      case "single_choice":
        return q.options_json.map((o, i) => (
          <Controller
            key={i}
            name={`q_${q.id}`}
            control={control}
            render={({ field }) => (
              <label style={{ display: "block" }}>
                <input
                  type="radio"
                  checked={field.value === o}
                  onChange={() => field.onChange(o)}
                />
                {o}
              </label>
            )}
          />
        ));

      case "multiple_choice":
        return q.options_json.map((o, i) => (
          <Controller
            key={i}
            name={`q_${q.id}`}
            control={control}
            render={({ field }) => (
              <label style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={(field.value || []).includes(o)}
                  onChange={(e) => {
                    const val = field.value || [];
                    field.onChange(
                      e.target.checked
                        ? [...val, o]
                        : val.filter((v) => v !== o),
                    );
                  }}
                />
                {o}
              </label>
            )}
          />
        ));

      case "rating":
        return (
          <Controller
            name={`q_${q.id}`}
            control={control}
            render={({ field }) => (
              <input type="number" min="1" max="5" {...field} />
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>{questionnaire.title}</h3>

      {questionnaire.questions.map((q) => (
        <div key={q.id} style={{ marginBottom: 12 }}>
          <p>
            {q.question_text}
            {q.is_required && " *"}
          </p>

          {renderField(q)}

          {errors[`q_${q.id}`] && (
            <div style={{ color: "red" }}>{errors[`q_${q.id}`].message}</div>
          )}
        </div>
      ))}

      <button type="submit">Submit</button>
      <button type="button" onClick={onBack} style={{ marginLeft: 10 }}>
        Back
      </button>
    </form>
  );
}
