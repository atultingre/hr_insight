import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Input,
  Radio,
  Checkbox,
  Rate,
  Button,
  Card,
  Space,
  Typography,
} from "antd";
import { storage, STORAGE_KEYS } from "../../services/storage";
import { useAuth } from "../../state/AuthContext";

const { Text, Title } = Typography;
const { TextArea } = Input;

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
            render={({ field }) => <Input {...field} />}
          />
        );

      case "textarea":
        return (
          <Controller
            name={`q_${q.id}`}
            control={control}
            render={({ field }) => <TextArea rows={4} {...field} />}
          />
        );

      case "single_choice":
        return (
          <Controller
            name={`q_${q.id}`}
            control={control}
            render={({ field }) => (
              <Radio.Group {...field} options={q.options_json} />
            )}
          />
        );

      case "multiple_choice":
        return (
          <Controller
            name={`q_${q.id}`}
            control={control}
            render={({ field }) => (
              <Checkbox.Group {...field} options={q.options_json} />
            )}
          />
        );

      case "rating":
        return (
          <Controller
            name={`q_${q.id}`}
            control={control}
            render={({ field }) => (
              <Rate
                {...field}
                value={field.value || 0}
                onChange={field.onChange}
              />
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title level={4}>{questionnaire.title}</Title>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {questionnaire.questions.map((q) => (
            <div key={q.id}>
              <Text strong>
                {q.question_text}
                {q.is_required && <Text type="danger"> *</Text>}
              </Text>

              <div style={{ marginTop: 8 }}>{renderField(q)}</div>

              {errors[`q_${q.id}`] && (
                <Text type="danger">{errors[`q_${q.id}`].message}</Text>
              )}
            </div>
          ))}

          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={onBack}>Back</Button>
          </Space>
        </Space>
      </form>
    </Card>
  );
}
