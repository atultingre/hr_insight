// ========================
// src/pages/hr/TargetingRulesUI.jsx
// ========================
import React, { useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "../../services/storage";

export default function TargetingRulesUI({ questionnaireId }) {
  const [rules, setRules] = useState([]);

  // 🔹 Load existing rules on open
  useEffect(() => {
    if (!questionnaireId) return;

    const all = storage.get(STORAGE_KEYS.TARGETS, []);
    const existing = all.filter((t) => t.questionnaire_id === questionnaireId);

    setRules(
      existing.map((r) => ({
        department: r.department || "",
        designation: r.designation || "",
      })),
    );
  }, [questionnaireId]);

  const addRule = () => {
    setRules([...rules, { department: "", designation: "" }]);
  };

  const updateRule = (i, field, value) => {
    const copy = [...rules];
    copy[i][field] = value;
    setRules(copy);
  };

  const removeRule = (i) => {
    setRules(rules.filter((_, idx) => idx !== i));
  };

  const saveRules = () => {
    if (!questionnaireId) {
      alert("Questionnaire ID missing");
      return;
    }

    if (rules.length === 0) {
      alert("Add at least one rule");
      return;
    }

    const cleaned = rules.filter(
      (r) => r.department.trim() || r.designation.trim(),
    );

    if (cleaned.length === 0) {
      alert("Each rule must have department or designation");
      return;
    }

    const existing = storage.get(STORAGE_KEYS.TARGETS, []);

    // ❗ Remove only this questionnaire's old rules
    const others = existing.filter(
      (t) => t.questionnaire_id !== questionnaireId,
    );

    const newRules = cleaned.map((r) => ({
      id: Date.now() + Math.random(),
      questionnaire_id: questionnaireId,
      department: r.department.trim() || null,
      designation: r.designation.trim() || null,
    }));

    storage.set(STORAGE_KEYS.TARGETS, [...others, ...newRules]);

    setRules(
      newRules.map((r) => ({
        department: r.department || "",
        designation: r.designation || "",
      })),
    );

    alert("Targeting rules saved");
  };

  return (
    <div style={{ marginTop: 10, padding: 10, border: "1px solid #ccc" }}>
      <h4>Targeting Rules</h4>

      {rules.length === 0 && <p>No targeting rules added</p>}

      {rules.map((r, i) => (
        <div key={i} style={{ marginBottom: 6 }}>
          <input
            placeholder="Department"
            value={r.department}
            onChange={(e) => updateRule(i, "department", e.target.value)}
          />
          <input
            placeholder="Designation"
            value={r.designation}
            onChange={(e) => updateRule(i, "designation", e.target.value)}
            style={{ marginLeft: 6 }}
          />
          <button onClick={() => removeRule(i)} style={{ marginLeft: 6 }}>
            ✕
          </button>
        </div>
      ))}

      <button onClick={addRule}>Add Rule</button>
      <button onClick={saveRules} style={{ marginLeft: 8 }}>
        Save Targeting
      </button>
    </div>
  );
}
