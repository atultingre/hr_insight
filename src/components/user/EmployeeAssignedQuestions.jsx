import { useEffect, useState } from "react";
import { Card, List, Button, Tag, Empty, Typography, Space } from "antd";
import { CheckCircleOutlined, FormOutlined } from "@ant-design/icons";
import { storage, STORAGE_KEYS } from "../../services/storage";
import { useAuth } from "../../state/AuthContext";
import QuestionnaireFillForm from "./QuestionnaireFillForm";

const EmployeeAssignedQuestions = () => {
  const [submittedIds, setSubmittedIds] = useState([]);
  const [activeQ, setActiveQ] = useState(null);
  const [assigned, setAssigned] = useState([]);

  const { user, logout } = useAuth();

  useEffect(() => {
    const questionnaires = storage.get(STORAGE_KEYS.QUESTIONNAIRES, []);
    const targets = storage.get(STORAGE_KEYS.TARGETS, []);
    const employees = storage.get(STORAGE_KEYS.EMPLOYEES, []);
    const submissions = storage.get(STORAGE_KEYS.SUBMISSIONS, []);

    const mySubmitted = submissions
      .filter((s) => s.employee_id === user.employee_id)
      .map((s) => s.questionnaire_id);

    setSubmittedIds(mySubmitted);

    const me = employees.find((e) => e.id === user.employee_id);
    if (!me) return;

    const eligible = questionnaires.filter((q) => {
      // 🔹 targets for THIS questionnaire only
      const qTargets = targets.filter((t) => t.questionnaire_id === q.id);

      // ❌ No target at all → don't show
      if (qTargets.length === 0) return false;

      return qTargets.some((t) => {
        const departments = t.departments || [];
        const designations = t.designations || [];

        // ❌ target removed (nothing selected)
        if (departments.length === 0 && designations.length === 0) {
          return false;
        }

        const deptMatch = departments.includes(me.department);
        const desigMatch = designations.includes(me.designation);

        return deptMatch || desigMatch;
      });
    });

    setAssigned(eligible);
  }, [user]);

  const pendingQuestionnaires = assigned.filter(
    (q) => !submittedIds.includes(q.id),
  );

  // If user is filling a questionnaire
  if (activeQ) {
    return (
      <QuestionnaireFillForm
        questionnaire={activeQ}
        onBack={() => setActiveQ(null)}
      />
    );
  }

  return (
    <div>
      <Typography.Title level={3}>Assigned Questionnaires</Typography.Title>

      {pendingQuestionnaires.length === 0 ? (
        <Empty description="No pending questionnaires" />
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={pendingQuestionnaires}
          renderItem={(q) => (
            <List.Item key={q.id}>
              <Card
                title={q.title}
                extra={
                  <Button
                    type="primary"
                    icon={<FormOutlined />}
                    onClick={() => setActiveQ(q)}
                  >
                    Fill Survey
                  </Button>
                }
              >
                {q.description && (
                  <Typography.Text type="secondary">
                    {q.description}
                  </Typography.Text>
                )}
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default EmployeeAssignedQuestions;
