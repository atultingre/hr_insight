// ========================
// src/pages/hr/HRAdminDashboard.jsx
// ========================
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  List,
  Space,
  Typography,
  ConfigProvider,
  Empty,
} from "antd";

import QuestionnaireBuilder from "./QuestionnaireBuilder";
import TargetingRulesUI from "./TargetingRulesUI";
import SubmissionViewer from "./SubmissionViewer";
import HRAccessScopes from "./HRAccessScopes";
import ManageEmployees from "./ManageEmployees";
import BulkImportEmployees from "./BulkImportEmployees";
import BulkEditEmployees from "./BulkEditEmployees";

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
      <Title level={3} style={{ color: BRAND_COLOR }}>
        HR Admin Panel
      </Title>

      {/* Create Questionnaire */}
      <Card>
        <Space orientation="vertical" size="middle">
          <Button type="primary" onClick={() => setShowBuilder(!showBuilder)}>
            {showBuilder ? "Close Builder" : "Create Questionnaire"}
          </Button>

          {showBuilder && <QuestionnaireBuilder />}
        </Space>
      </Card>

      <Divider />

      {/* Questionnaires */}
      <Card title="Questionnaires">
        {questionnaires.length === 0 ? (
          <Empty description="No questionnaires created yet" />
        ) : (
          <List
            dataSource={questionnaires}
            renderItem={(q) => (
              <List.Item key={q.id}>
                <Space orientation="vertical" style={{ width: "100%" }}>
                  <Space>
                    <Text strong>{q.title}</Text>
                    <Button
                      size="small"
                      onClick={() =>
                        setActiveTargetQ(activeTargetQ === q.id ? null : q.id)
                      }
                    >
                      Targeting Rules
                    </Button>
                  </Space>

                  {activeTargetQ === q.id && (
                    <TargetingRulesUI questionnaireId={q.id} />
                  )}
                </Space>
              </List.Item>
            )}
          />
        )}
      </Card>

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
