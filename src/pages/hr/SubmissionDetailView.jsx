// ========================
// MUI setup (UI polish)
// ========================
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

// ========================
// src/pages/hr/SubmissionDetailView.jsx
// ========================
import React from "react";

export function SubmissionDetailView({ open, onClose, submission }) {
  if (!submission) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Submission Details</DialogTitle>
      <DialogContent>
        <p>
          <b>Employee:</b> {submission.employee_name}
        </p>
        <p>
          <b>Questionnaire:</b> {submission.questionnaire}
        </p>
        <p>
          <b>Submitted At:</b> {submission.submitted_at}
        </p>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submission.answers.map((a, i) => (
              <TableRow key={i}>
                <TableCell>{a.question_text}</TableCell>
                <TableCell>
                  {Array.isArray(a.answer_json)
                    ? a.answer_json.join(", ")
                    : String(a.answer_json)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
