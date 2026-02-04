import React, { useEffect, useState } from "react";
import SubmissionViewer from "../../components/admin/submissions/SubmissionViewer";
import { storage } from "../../services/storage";
import { useAuth } from "../../state/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HRViewerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scopes, setScopes] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const allScopes = storage.get("hr_access_scopes", []);
    const myScopes = allScopes.filter((s) => s.hr_user_id === user.id);
    setScopes(myScopes);
  }, [user]);

  if (scopes.length === 0) {
    return (
      <>
        <button onClick={handleLogout} style={{ float: "right" }}>
          Logout
        </button>
        <p>No access scope assigned</p>
      </>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      {scopes.map((scope, i) => (
        <div key={i} style={{ marginBottom: 30 }}>
          {/* <h4>
            Scope: {scope.department || "All Departments"} /{" "}
            {scope.designation || "All Designations"}
          </h4> */}

          <SubmissionViewer scope={scope} />
        </div>
      ))}
    </div>
  );
}
