import { Navigate } from "react-router-dom";

const RoleGuard = ({ allowedRoles, children }) => {
  const userRole = "HR"; // 🔁 fetch from auth / context

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/questions" replace />;
  }

  return children;
};

export default RoleGuard;
