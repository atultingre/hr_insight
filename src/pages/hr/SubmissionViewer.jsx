// ========================
// src/pages/hr/SubmissionViewer.jsx
// ========================
import React, { useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "../../services/storage";
import { SubmissionDetailView } from "./SubmissionDetailView";

export default function SubmissionViewer({ scope }) {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const submissions = storage.get(STORAGE_KEYS.SUBMISSIONS, []);
    const employees = storage.get(STORAGE_KEYS.EMPLOYEES, []);
    const questionnaires = storage.get(STORAGE_KEYS.QUESTIONNAIRES, []);

    const joined = submissions.map((s) => {
      const emp = employees.find((e) => e.id === s.employee_id);
      const q = questionnaires.find((q) => q.id === s.questionnaire_id);

      return {
        id: s.id,
        employee_id: emp?.id,
        employee_name: emp?.full_name || "Unknown",
        department: emp?.department || "-",
        designation: emp?.designation || "-",
        questionnaire: q?.title || "Unknown",
        submitted_at: new Date(s.submitted_at).toLocaleDateString(),
        answers: s.answers,
        questions: q?.questions || [],
      };
    });

    const filtered = joined.filter((r) => {
      if (scope?.employee_id && r.employee_id !== scope.employee_id)
        return false;
      if (scope?.department && r.department !== scope.department) return false;
      if (scope?.designation && r.designation !== scope.designation)
        return false;
      return true;
    });

    setRows(filtered);
  }, [scope]);

  return (
    <div>
      <h3>Submissions</h3>

      {rows.length === 0 ? (
        <p>No submissions in scope</p>
      ) : (
        <table border="1" cellPadding="6" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Questionnaire</th>
              <th>Submitted At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id}>
                <td>{s.employee_name}</td>
                <td>{s.department}</td>
                <td>{s.designation}</td>
                <td>{s.questionnaire}</td>
                <td>{s.submitted_at}</td>
                <td>
                  <button size="small" onClick={() => setSelected(s)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* View Details Modal */}
      <SubmissionDetailView
        open={!!selected}
        submission={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
