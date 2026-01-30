import React, { useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "../../services/storage";

export default function HRAccessScopes() {
  const [scopes, setScopes] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    hr_user_id: "",
    department: "",
    designation: "",
    employee_id: "",
  });

  useEffect(() => {
    setScopes(storage.get("hr_access_scopes", []));
    setUsers(storage.get(STORAGE_KEYS.USERS, []));
  }, []);

  const addScope = () => {
    if (!form.hr_user_id) {
      alert("Select HR Viewer");
      return;
    }

    const newScope = {
      id: Date.now(),
      hr_user_id: Number(form.hr_user_id),
      department: form.department || null,
      designation: form.designation || null,
      employee_id: form.employee_id || null,
    };

    const updated = [...scopes, newScope];
    storage.set("hr_access_scopes", updated);
    setScopes(updated);

    setForm({
      hr_user_id: "",
      department: "",
      designation: "",
      employee_id: "",
    });
  };

  return (
    <div>
      <h3>HR Access Scopes</h3>

      {/* Add Scope */}
      <div style={{ marginBottom: 20 }}>
        <select
          value={form.hr_user_id}
          onChange={(e) => setForm({ ...form, hr_user_id: e.target.value })}
        >
          <option value="">Select HR Viewer</option>
          {users
            .filter((u) => u.role === "hr_viewer")
            .map((u) => (
              <option key={u.id} value={u.id}>
                {u.email}
              </option>
            ))}
        </select>

        <input
          placeholder="Department (optional)"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <input
          placeholder="Designation (optional)"
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
        />

        <input
          placeholder="Employee ID (optional)"
          value={form.employee_id}
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
        />

        <button onClick={addScope}>Add Scope</button>
      </div>

      {/* Existing Scopes */}
      {scopes.length === 0 ? (
        <p>No scopes defined</p>
      ) : (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>HR Viewer</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Employee</th>
            </tr>
          </thead>
          <tbody>
            {scopes.map((s) => (
              <tr key={s.id}>
                <td>{users.find((u) => u.id === s.hr_user_id)?.email}</td>
                <td>{s.department || "All"}</td>
                <td>{s.designation || "All"}</td>
                <td>{s.employee_id || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
