import { Button, Card, Divider, Space, Typography } from "antd";
import { useEffect, useState } from "react";

import BulkEditEmployees from "../../pages/hr/BulkEditEmployees.jsx";
import BulkImportEmployees from "../../pages/hr/BulkImportEmployees.jsx";
import HRAccessScopes from "../../pages/hr/HRAccessScopes.jsx";
import SubmissionViewer from "../../pages/hr/SubmissionViewer.jsx";

import { storage, STORAGE_KEYS } from "../../services/storage.js";
import EmployeesList from "../employee/EmployeesList.jsx";
import CreateQuestions from "./CreateQuestions.jsx";
import Questions from "./Questions.jsx";

const { Title, Text } = Typography;
const BRAND_COLOR = "#da1f26";

export default function AdminDashboard() {
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
      <EmployeesList
        showEmployees={showEmployees}
        setShowEmployees={setShowEmployees}
      />

      <Space wrap style={{ marginTop: "20px" }}>
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
