import React, { useState } from "react";
import { Button, Card, Divider } from "antd";
import SubmissionViewer from "../../../pages/hr/SubmissionViewer";

const SubmissionDashboard = () => {
  const [showSubmissions, setShowSubmissions] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowSubmissions(!showSubmissions)}>
        {showSubmissions ? "Hide Submissions" : "View All Submissions"}
      </Button>

      {showSubmissions && (
        <>
          <Divider />
          <Card title="Submissions">
            <SubmissionViewer scope={{}} />
          </Card>
        </>
      )}
    </div>
  );
};

export default SubmissionDashboard;
