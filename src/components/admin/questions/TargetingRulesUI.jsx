import React, { useEffect, useState } from "react";
import { Modal, Select, Button, Space, Typography, message } from "antd";
import { storage, STORAGE_KEYS } from "../../../services/storage";

const { Text } = Typography;

export default function TargetingRulesUI({ questionnaireId, open, onClose }) {
  const [rules, setRules] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  // 🔹 Load departments & designations from employees
  useEffect(() => {
    const employees = storage.get(STORAGE_KEYS.EMPLOYEES, []);

    setDepartments([
      ...new Set(employees.map((e) => e.department).filter(Boolean)),
    ]);

    setDesignations([
      ...new Set(employees.map((e) => e.designation).filter(Boolean)),
    ]);
  }, []);

  // 🔹 Load existing rules
  useEffect(() => {
    if (!open || !questionnaireId) return;

    const all = storage.get(STORAGE_KEYS.TARGETS, []);
    const existing = all.filter((t) => t.questionnaire_id === questionnaireId);

    setRules(
      existing.map((r) => ({
        departments: r.departments || [],
        designations: r.designations || [],
      })),
    );
  }, [open, questionnaireId]);

  const addRule = () => {
    setRules([...rules, { departments: [], designations: [] }]);
  };

  const updateRule = (index, field, value) => {
    const copy = [...rules];
    copy[index][field] = value;
    setRules(copy);
  };

  const removeRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const saveRules = () => {
    if (!questionnaireId) {
      message.error("Questionnaire ID missing");
      return;
    }

    if (rules.length === 0) {
      message.warning("Add at least one rule");
      return;
    }

    const cleaned = rules.filter(
      (r) => r.departments.length || r.designations.length,
    );

    if (cleaned.length === 0) {
      message.warning("Each rule must have department or designation");
      return;
    }

    const existing = storage.get(STORAGE_KEYS.TARGETS, []);
    const others = existing.filter(
      (t) => t.questionnaire_id !== questionnaireId,
    );

    const newRules = cleaned.map((r) => ({
      id: Date.now() + Math.random(),
      questionnaire_id: questionnaireId,
      departments: r.departments,
      designations: r.designations,
    }));

    storage.set(STORAGE_KEYS.TARGETS, [...others, ...newRules]);
    message.success("Targeting rules saved");
    onClose();
  };

  return (
    <Modal
      title="Targeting Rules"
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      destroyOnHidden
    >
      <Space orientation="vertical" style={{ width: "100%" }}>
        {rules.length === 0 && (
          <Text type="secondary">No targeting rules added</Text>
        )}

        {rules.map((r, i) => (
          <div
            key={i}
            style={{ width: "100%", display: "flex", gap: "10px" }}
            align="start"
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Departments"
              style={{ width: "100%" }}
              value={r.departments}
              options={departments.map((d) => ({
                label: d,
                value: d,
              }))}
              onChange={(val) => updateRule(i, "departments", val)}
            />

            <Select
              mode="multiple"
              allowClear
              placeholder="Designations"
              style={{ width: "100%" }}
              value={r.designations}
              options={designations.map((d) => ({
                label: d,
                value: d,
              }))}
              onChange={(val) => updateRule(i, "designations", val)}
            />

            <Button danger onClick={() => removeRule(i)}>
              ✕
            </Button>
          </div>
        ))}

        <div
          style={{ width: "100%", display: "flex", gap: "10px" }}
          orientation="vertical"
        >
          <Button style={{ width: "50%" }} onClick={addRule}>
            Add Rule
          </Button>
          <Button type="primary" style={{ width: "50%" }} onClick={saveRules}>
            Save Targeting
          </Button>
        </div>
      </Space>
    </Modal>
  );
}
