import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import RoleGuard from "../components/RoleGuard";

const Questions = lazy(() => import("../pages/Questions"));
const Employees = lazy(() => import("../pages/Employees"));
const Submissions = lazy(() => import("../pages/Submissions"));
const HrAccess = lazy(() => import("../pages/HrAccess"));
const Reports = lazy(() => import("../pages/Reports"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/questions" element={<Questions />} />

          <Route
            path="/employees"
            element={
              <RoleGuard allowedRoles={["Admin", "HR"]}>
                <Employees />
              </RoleGuard>
            }
          />

          <Route
            path="/hr-access"
            element={
              <RoleGuard allowedRoles={["Admin"]}>
                <HrAccess />
              </RoleGuard>
            }
          />

          <Route path="/submissions" element={<Submissions />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
