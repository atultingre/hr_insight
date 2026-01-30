import React from "react";
import { storage, STORAGE_KEYS } from "../../services/storage";

export default function BulkImportEmployees() {
  const handleFile = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const lines = reader.result
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      const [header, ...rows] = lines;

      const employees = storage.get(STORAGE_KEYS.EMPLOYEES, []);
      const users = storage.get(STORAGE_KEYS.USERS, []);

      let added = 0;
      let skipped = 0;

      rows.forEach((row) => {
        const [full_name, employee_code, email, department, designation] =
          row.split(",");

        if (!employee_code || !email) {
          skipped++;
          return;
        }

        if (employees.some((e) => e.employee_code === employee_code)) {
          skipped++;
          return;
        }

        const id = Date.now() + Math.random();

        employees.push({
          id,
          full_name,
          employee_code,
          email,
          department,
          designation,
          status: "active",
          created_at: new Date().toISOString(),
        });

        users.push({
          id: users.length + 1,
          email,
          password: "password123",
          role: "employee",
          employee_id: id,
          status: "active",
        });

        added++;
      });

      storage.set(STORAGE_KEYS.EMPLOYEES, employees);
      storage.set(STORAGE_KEYS.USERS, users);

      alert(
        `Bulk import completed.\nAdded: ${added}\nSkipped: ${skipped}\nDefault password: password123`,
      );
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h3>Bulk Import Employees</h3>

      <p>
        CSV format:
        <br />
        <code>full_name,employee_code,email,department,designation</code>
      </p>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}
