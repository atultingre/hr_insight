
import EmployeeAssignedQuestions from "./EmployeeAssignedQuestions";
import SubmissionHistory from "./SubmissionHistory";

export default function EmployeeDashboard() {
  return (
    <div>
      <EmployeeAssignedQuestions />
      <SubmissionHistory />
    </div>
  );
}
