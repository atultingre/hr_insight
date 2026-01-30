// ========================
// src/pages/hr/HRAdminDashboard.jsx
// ========================
import { Button, Card, Divider, Space, Typography } from "antd";
import { useEffect, useState } from "react";

import BulkEditEmployees from "./BulkEditEmployees";
import BulkImportEmployees from "./BulkImportEmployees";
import HRAccessScopes from "./HRAccessScopes";
import ManageEmployees from "./ManageEmployees";
import SubmissionViewer from "./SubmissionViewer";

import CreateQuestions from "../../components/admin/CreateQuestions";
import Questions from "../../components/admin/Questions";
import { storage, STORAGE_KEYS } from "../../services/storage";

const { Title, Text } = Typography;
const BRAND_COLOR = "#da1f26";

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
    <>
      <CreateQuestions
        showBuilder={showBuilder}
        setShowBuilder={setShowBuilder}
      />
      <Divider />

      {/* Questionnaires */}
      <Questions
        questionnaires={questionnaires}
        activeTargetQ={activeTargetQ}
        setActiveTargetQ={setActiveTargetQ}
      />

      <Divider />

      {/* Admin Actions */}
      <Card title="Admin Actions">
        <Space wrap>
          <Button onClick={() => setShowEmployees(!showEmployees)}>
            {showEmployees ? "Hide Employees" : "Manage Employees"}
          </Button>

          <Button onClick={() => setShowBulkImport(!showBulkImport)}>
            Bulk Import Employees
          </Button>

          <Button onClick={() => setShowBulkEdit(!showBulkEdit)}>
            Bulk Edit Employees
          </Button>

          <Button onClick={() => setShowSubmissions(!showSubmissions)}>
            {showSubmissions ? "Hide Submissions" : "View All Submissions"}
          </Button>

          <Button disabled>Reports & Exports</Button>

          <Button onClick={() => setShowScopes(!showScopes)}>
            {showScopes ? "Hide HR Access Scopes" : "HR Access Scopes"}
          </Button>

          <Button disabled>Notification Routes</Button>
        </Space>
      </Card>

      {/* Conditional Sections */}
      {showSubmissions && (
        <>
          <Divider />
          <Card title="Submissions">
            <SubmissionViewer scope={{}} />
          </Card>
        </>
      )}

      {showScopes && (
        <>
          <Divider />
          <Card title="HR Access Scopes">
            <HRAccessScopes />
          </Card>
        </>
      )}

      {showEmployees && (
        <>
          <Divider />
          <Card title="Manage Employees">
            <ManageEmployees />
          </Card>
        </>
      )}

      {showBulkImport && (
        <>
          <Divider />
          <Card title="Bulk Import Employees">
            <BulkImportEmployees />
          </Card>
        </>
      )}

      {showBulkEdit && (
        <>
          <Divider />
          <Card title="Bulk Edit Employees">
            <BulkEditEmployees />
          </Card>
        </>
      )}
    </>
  );
}
