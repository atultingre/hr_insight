import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
import { storage, STORAGE_KEYS } from "../../services/storage";
import { SubmissionDetailView } from "./SubmissionDetailView";

export default function SubmissionList() {
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filterDept, setFilterDept] = useState("");

  useEffect(() => {
    const subs = storage.get(STORAGE_KEYS.SUBMISSIONS, []);
    const questionnaires = storage.get(STORAGE_KEYS.QUESTIONNAIRES, []);
    const employees = storage.get(STORAGE_KEYS.EMPLOYEES, []);

    const joined = subs.map((s) => {
      const emp = employees.find((e) => e.id === s.employee_id);
      const q = questionnaires.find((q) => q.id === s.questionnaire_id);

      return {
        id: s.id,
        employee_name: emp?.full_name || "Unknown",
        department: emp?.department || "-",
        questionnaire: q?.title || "Unknown",
        submitted_at: new Date(s.submitted_at).toLocaleDateString(),
        answers: s.answers,
        questions: q?.questions || [],
      };
    });

    setSubmissions(joined);
  }, []);

  const filtered = filterDept
    ? submissions.filter((s) => s.department === filterDept)
    : submissions;

  return (
    <div>
      <h3>All Submissions</h3>

      <Select
        value={filterDept}
        onChange={(e) => setFilterDept(e.target.value)}
        displayEmpty
      >
        <MenuItem value="">All Departments</MenuItem>
        <MenuItem value="Engineering">Engineering</MenuItem>
        <MenuItem value="HR">HR</MenuItem>
      </Select>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Questionnaire</TableCell>
            <TableCell>Submitted At</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filtered.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.employee_name}</TableCell>
              <TableCell>{s.department}</TableCell>
              <TableCell>{s.questionnaire}</TableCell>
              <TableCell>{s.submitted_at}</TableCell>
              <TableCell>
                <Button onClick={() => setSelected(s)}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <SubmissionDetailView
        open={!!selected}
        submission={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
