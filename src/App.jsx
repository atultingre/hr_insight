import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import HRAdminDashboard from "./pages/hr/HRAdminDashboard";
import HRViewerDashboard from "./pages/hr/HRViewerDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

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
        />

        <Route
          path="/hr-admin"
          element={
            <ProtectedRoute role="hr_admin">
              <HRAdminDashboard />
            </ProtectedRoute>
          }
        />

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
