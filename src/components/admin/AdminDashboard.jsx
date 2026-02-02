import { Button, Divider, Space } from "antd";
import EmployeesDashboard from "./employee/EmployeesDashboard.jsx";
import HrDashboard from "./hr/HrDashboard.jsx";
import QuestionsDashboard from "./questions/QuestionsDashboard.jsx";
import SubmissionDashboard from "./submissions/SubmissionDashboard.jsx";
import ReportsDashboard from "./reports/ReportsDashboard.jsx";

export default function AdminDashboard() {
  return (
    <>
      <QuestionsDashboard />
      <Divider />
      <EmployeesDashboard />
      <Divider />
      <SubmissionDashboard />
      <Divider />
      <HrDashboard />
      <Divider />
      <ReportsDashboard />
    </>
  );
}
