// ========================
// src/pages/employee/SubmissionHistory.jsx
// ========================
import React, { useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "../../services/storage";
import { useAuth } from "../../state/AuthContext";

export default function SubmissionHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const submissions = storage.get(STORAGE_KEYS.SUBMISSIONS, []);
    const questionnaires = storage.get(STORAGE_KEYS.QUESTIONNAIRES, []);

    const mySubs = submissions
      .filter((s) => s.employee_id === user.employee_id)
      .map((s) => {
        const q = questionnaires.find((q) => q.id === s.questionnaire_id);
        return {
          id: s.id,
          questionnaire_title: q?.title || "Unknown Questionnaire",
          submitted_at: new Date(s.submitted_at).toLocaleDateString(),
          status: s.status,
          answers: s.answers || [],
          questions: q?.questions || [],
        };
      });

    setHistory(mySubs);
  }, [user]);

  return (
    <div>
      <h3>My Submission History</h3>

      {history.length === 0 ? (
        <p>No submissions yet</p>
      ) : (
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Questionnaire</th>
              <th>Submitted At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((s) => (
              <React.Fragment key={s.id}>
                <tr>
                  <td>{s.questionnaire_title}</td>
                  <td>{s.submitted_at}</td>
                  <td>{s.status}</td>
                  <td>
                    <button
                      onClick={() => setActive(active === s.id ? null : s.id)}
                    >
                      {active === s.id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {active === s.id && (
                  <tr>
                    <td colSpan={4}>
                      <div style={{ background: "#f9f9f9", padding: 10 }}>
                        {s.questions.map((q) => {
                          const ans = s.answers.find(
                            (a) => a.question_id === q.id,
                          );
                          return (
                            <div key={q.id} style={{ marginBottom: 8 }}>
                              <b>{q.question_text}</b>
                              <div>
                                {Array.isArray(ans?.answer_json)
                                  ? ans.answer_json.join(", ")
                                  : String(ans?.answer_json ?? "-")}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
