// ========================
// src/pages/hr/HRAdminDashboard.jsx
// ========================
import React, { useEffect, useState } from "react";
import QuestionnaireBuilder from "./QuestionnaireBuilder";
import TargetingRulesUI from "./TargetingRulesUI";
import { storage, STORAGE_KEYS } from "../../services/storage";
import SubmissionViewer from "./SubmissionViewer";
import HRAccessScopes from "./HRAccessScopes";
import ManageEmployees from "./ManageEmployees";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../state/AuthContext";
import BulkImportEmployees from "./BulkImportEmployees";
import BulkEditEmployees from "./BulkEditEmployees";

export default function HRAdminDashboard() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [activeTargetQ, setActiveTargetQ] = useState(null);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [showScopes, setShowScopes] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [showBulkEdit, setShowBulkEdit] = useState(false);

  // Load questionnaires from localStorage
  useEffect(() => {
    const data = storage.get(STORAGE_KEYS.QUESTIONNAIRES, []);
    setQuestionnaires(data);
  }, [showBuilder]);

  return (
    <div style={{ padding: 20 }}>
      <h2>HR Admin Panel</h2>

      {/* Create Questionnaire */}
      <button onClick={() => setShowBuilder(!showBuilder)}>
        {showBuilder ? "Close Builder" : "Create Questionnaire"}
      </button>

      {showBuilder && <QuestionnaireBuilder />}

      <hr />

      {/* Existing Questionnaires */}
      <h3>Questionnaires</h3>

      {questionnaires.length === 0 ? (
        <p>No questionnaires created yet</p>
      ) : (
        <ul>
          {questionnaires.map((q) => (
            <li key={q.id} style={{ marginBottom: 10 }}>
              <b>{q.title}</b>

              <button
                style={{ marginLeft: 10 }}
                onClick={() =>
                  setActiveTargetQ(activeTargetQ === q.id ? null : q.id)
                }
              >
                Targeting Rules
              </button>

              {activeTargetQ === q.id && (
                <TargetingRulesUI questionnaireId={q.id} />
              )}
            </li>
          ))}
        </ul>
      )}

      <hr />

      {/* Future Admin Links */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <button onClick={() => setShowEmployees(!showEmployees)}>
            {showEmployees ? "Hide Employees" : "Manage Employees"}
          </button>
        </li>
        <li>
          <li>
            <button onClick={() => setShowBulkImport(!showBulkImport)}>
              Bulk Import Employees
            </button>
          </li>

          <li>
            <button onClick={() => setShowBulkEdit(!showBulkEdit)}>
              Bulk Edit Employees
            </button>
          </li>
        </li>
        <li>
          <button onClick={() => setShowSubmissions(!showSubmissions)}>
            {showSubmissions ? "Hide Submissions" : "View All Submissions"}
          </button>
        </li>
        <li>
          <button disabled title="Coming soon">
            Reports & Exports
          </button>
        </li>
        <li>
          <button onClick={() => setShowScopes(!showScopes)}>
            {showScopes ? "Hide HR Access Scopes" : "HR Access Scopes"}
          </button>
        </li>
        <li>
          <button disabled title="Coming soon">
            Notification Routes
          </button>
        </li>
      </ul>
      {showSubmissions && (
        <>
          <hr />
          <SubmissionViewer scope={{}} />
        </>
      )}

      {showScopes && (
        <>
          <hr />
          <HRAccessScopes />
        </>
      )}

      {showEmployees && (
        <>
          <hr />
          <ManageEmployees />
        </>
      )}

      {showBulkImport && (
        <>
          <hr />
          <BulkImportEmployees />
        </>
      )}

      {showBulkEdit && (
        <>
          <hr />
          <BulkEditEmployees />
        </>
      )}
    </div>
  );
}
