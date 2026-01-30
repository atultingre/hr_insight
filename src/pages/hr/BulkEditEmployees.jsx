import React, { useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "../../services/storage";

export default function BulkEditEmployees() {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newDesignation, setNewDesignation] = useState("");

  useEffect(() => {
    setEmployees(storage.get(STORAGE_KEYS.EMPLOYEES, []));
  }, []);

  const applyBulkEdit = () => {
    if (!department) {
      alert("Select department");
      return;
    }

    const updatedEmployees = employees.map((e) =>
      e.department === department
        ? {
            ...e,
            status: newStatus || e.status,
            designation: newDesignation || e.designation,
          }
        : e,
    );

    // Sync users status
    const updatedUsers = storage.get(STORAGE_KEYS.USERS, []).map((u) => {
      const emp = updatedEmployees.find((e) => e.id === u.employee_id);
      return emp ? { ...u, status: emp.status } : u;
    });

    storage.set(STORAGE_KEYS.EMPLOYEES, updatedEmployees);
    storage.set(STORAGE_KEYS.USERS, updatedUsers);

    setEmployees(updatedEmployees);

    alert("Bulk update applied");
  };

  const departments = [
    ...new Set(employees.map((e) => e.department).filter(Boolean)),
  ];

  return (
    <div>
      <h3>Bulk Edit Employees</h3>

      <div>
        <label>Department:</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>New Status:</label>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="">No change</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div>
        <label>New Designation:</label>
        <input
          placeholder="Optional"
          value={newDesignation}
          onChange={(e) => setNewDesignation(e.target.value)}
        />
      </div>

      <button onClick={applyBulkEdit}>Apply Bulk Edit</button>
    </div>
  );
}
