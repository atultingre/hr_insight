import { useState } from "react";

import EmployeeAssignedQuestions from "./EmployeeAssignedQuestions";
import QuestionnaireFillForm from "./QuestionnaireFillForm";
import SubmissionHistory from "./SubmissionHistory";

export default function EmployeeDashboard() {
  return (
    <div>
      <EmployeeAssignedQuestions />
      <SubmissionHistory />
    </div>
  );
}
