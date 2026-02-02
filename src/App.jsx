import { Routes, Route } from "react-router-dom";
import EmployeeDashboard from "./components/user/EmployeeDashboard";
import HRViewerDashboard from "./pages/hr/HRViewerDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import Login from "./components/auth/Login";

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
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/viewer"
          element={
            <ProtectedRoute role="viewer">
              <HRViewerDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
