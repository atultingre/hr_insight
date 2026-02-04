import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EmployeeDashboard from "./components/user/EmployeeDashboard";
import HRViewerDashboard from "./components/admin/hr/HrDashboard.jsx";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import EmployeesDashboard from "./components/admin/employee/EmployeesDashboard.jsx";
import HrDashboard from "./components/admin/hr/HrDashboard.jsx";
import QuestionsDashboard from "./components/admin/questions/QuestionsDashboard.jsx";
import SubmissionDashboard from "./components/admin/submissions/SubmissionDashboard.jsx";
import ReportsDashboard from "./components/admin/reports/ReportsDashboard.jsx";
import EmployeeAssignedQuestions from "./components/user/EmployeeAssignedQuestions.jsx";
import SubmissionHistory from "./components/user/SubmissionHistory.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Layout Route */}
      <Route element={<AppLayout />}>
        <Route
          path="/employee"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployeeAssignedQuestions />} />
          <Route path="submissions" element={<SubmissionHistory />} />
        </Route>

        <Route
          path="/hr-admin"
          element={
            <ProtectedRoute role="hr_admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<QuestionsDashboard />} />
          <Route path="questionnaires" element={<QuestionsDashboard />} />
          <Route path="employees" element={<EmployeesDashboard />} />
          <Route path="submissions" element={<SubmissionDashboard />} />
          <Route path="hr-access" element={<HrDashboard />} />
          <Route path="reports" element={<ReportsDashboard />} />
        </Route>

        <Route
          path="/hr-viewer"
          element={
            <ProtectedRoute role="hr_viewer">
              <HRViewerDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
