import React, { useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "../../services/storage";
import { useAuth } from "../../state/AuthContext";
import QuestionnaireFillForm from "./QuestionnaireFillForm";
import SubmissionHistory from "./SubmissionHistory";
import { useNavigate } from "react-router-dom";

export default function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const [assigned, setAssigned] = useState([]);
  const [activeQ, setActiveQ] = useState(null);
  const [submittedIds, setSubmittedIds] = useState([]);

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const questionnaires = storage.get(STORAGE_KEYS.QUESTIONNAIRES, []);
    const targets = storage.get(STORAGE_KEYS.TARGETS, []);
    const employees = storage.get(STORAGE_KEYS.EMPLOYEES, []);
    const submissions = storage.get(STORAGE_KEYS.SUBMISSIONS, []);

    // All questionnaires already submitted by this employee
    const mySubmitted = submissions
      .filter((s) => s.employee_id === user.employee_id)
      .map((s) => s.questionnaire_id);

    setSubmittedIds(mySubmitted);

    const me = employees.find((e) => e.id === user.employee_id);
    if (!me) return;

    const eligible = questionnaires.filter((q) => {
      const qTargets = targets.filter((t) => t.questionnaire_id === q.id);

      return qTargets.some((t) => {
        if (t.department && !t.designation)
          return t.department === me.department;
        if (t.designation && !t.department)
          return t.designation === me.designation;
        if (t.department && t.designation)
          return (
            t.department === me.department && t.designation === me.designation
          );
        return false;
      });
    });

    setAssigned(eligible);
  }, [user]);

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
      <button onClick={handleLogout} style={{ float: "right" }}>
        Logout
      </button>
      <h2>Assigned Questionnaires</h2>

      {assigned.length === 0 ? (
        <p>No questionnaires assigned</p>
      ) : (
        <ul>
          {assigned.map((q) => {
            const isSubmitted = submittedIds.includes(q.id);

            return (
              <li key={q.id} style={{ marginBottom: 8 }}>
                <b>{q.title}</b>

                {isSubmitted ? (
                  <span style={{ marginLeft: 10, color: "green" }}>
                    ✔ Submitted
                  </span>
                ) : (
                  <button
                    style={{ marginLeft: 10 }}
                    onClick={() => setActiveQ(q)}
                  >
                    Fill Survey
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <SubmissionHistory />
    </div>
  );
}
