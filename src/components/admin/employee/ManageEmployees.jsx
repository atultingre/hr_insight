import React, { useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "../../../services/storage";

export default function ManageEmployees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    full_name: "",
    employee_code: "",
    email: "",
    department: "",
    designation: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setEmployees(storage.get(STORAGE_KEYS.EMPLOYEES, []));
  }, []);

  const saveEmployees = (list) => {
    setEmployees(list);
    storage.set(STORAGE_KEYS.EMPLOYEES, list);
  };

  const addEmployee = () => {
    if (!form.full_name || !form.employee_code || !form.email) {
      alert("Name, code and email are required");
      return;
    }

    const employees = storage.get(STORAGE_KEYS.EMPLOYEES, []);
    const users = storage.get(STORAGE_KEYS.USERS, []);

    const exists = employees.some(
      (e) => e.employee_code === form.employee_code,
    );
    if (exists) {
      alert("Employee code already exists");
      return;
    }

    // 1️⃣ Create employee
    const employeeId = Date.now();

    const newEmp = {
      id: employeeId,
      full_name: form.full_name,
      employee_code: form.employee_code,
      email: form.email,
      department: form.department,
      designation: form.designation,
      status: "active",
      created_at: new Date().toISOString(),
    };

    // 2️⃣ Auto-create login user
    const newUser = {
      id: users.length + 1,
      email: form.email,
      password: "password123", // dummy password
      role: "employee",
      employee_id: employeeId,
      status: "active",
    };

    storage.set(STORAGE_KEYS.EMPLOYEES, [...employees, newEmp]);
    storage.set(STORAGE_KEYS.USERS, [...users, newUser]);

    setEmployees([...employees, newEmp]);

    alert(
      `Employee created.\nLogin email: ${form.email}\nPassword: password123`,
    );

    setForm({
      full_name: "",
      employee_code: "",
      email: "",
      department: "",
      designation: "",
    });
  };

  const updateEmployee = () => {
    const updatedEmployees = employees.map((e) =>
      e.id === editingId ? { ...e, ...form } : e,
    );

    // Sync user email if changed
    const users = storage
      .get(STORAGE_KEYS.USERS, [])
      .map((u) =>
        u.employee_id === editingId ? { ...u, email: form.email } : u,
      );

    storage.set(STORAGE_KEYS.EMPLOYEES, updatedEmployees);
    storage.set(STORAGE_KEYS.USERS, users);

    setEmployees(updatedEmployees);
    setEditingId(null);
    setForm({
      full_name: "",
      employee_code: "",
      email: "",
      department: "",
      designation: "",
    });
  };

  const deleteEmployee = (id) => {
    if (!window.confirm("Delete employee and user account?")) return;

    const updatedEmployees = employees.filter((e) => e.id !== id);
    const updatedUsers = storage
      .get(STORAGE_KEYS.USERS, [])
      .filter((u) => u.employee_id !== id);

    storage.set(STORAGE_KEYS.EMPLOYEES, updatedEmployees);
    storage.set(STORAGE_KEYS.USERS, updatedUsers);

    setEmployees(updatedEmployees);
  };

const toggleStatus = (id) => {
  const updatedEmployees = employees.map((e) =>
    e.id === id
      ? { ...e, status: e.status === "active" ? "inactive" : "active" }
      : e,
  );

  const updatedUsers = storage
    .get(STORAGE_KEYS.USERS, [])
    .map((u) =>
      u.employee_id === id
        ? { ...u, status: u.status === "active" ? "inactive" : "active" }
        : u,
    );

  storage.set(STORAGE_KEYS.EMPLOYEES, updatedEmployees);
  storage.set(STORAGE_KEYS.USERS, updatedUsers);

  setEmployees(updatedEmployees);
};


  return (
    <div>
      <h3>Manage Employees</h3>

      {/* Add Employee */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Full Name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />
        <input
          placeholder="Employee Code"
          value={form.employee_code}
          onChange={(e) => setForm({ ...form, employee_code: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />
        <input
          placeholder="Designation"
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
        />
        <button onClick={editingId ? updateEmployee : addEmployee}>
          {editingId ? "Update Employee" : "Add Employee"}
        </button>
      </div>

      {/* Employee List */}
      {employees.length === 0 ? (
        <p>No employees</p>
      ) : (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Email</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{e.full_name}</td>
                <td>{e.employee_code}</td>
                <td>{e.email}</td>
                <td>{e.department}</td>
                <td>{e.designation}</td>
                <td>{e.status}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditingId(e.id);
                      setForm(e);
                    }}
                  >
                    Edit
                  </button>

                  <button onClick={() => toggleStatus(e.id)}>
                    {e.status === "active" ? "Deactivate" : "Activate"}
                  </button>

                  <button onClick={() => deleteEmployee(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
