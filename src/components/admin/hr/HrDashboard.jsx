import { Button, Card, Divider } from "antd";
import React, { useState } from "react";
import HRAccessScopes from "../../../pages/hr/HRAccessScopes";

const HrDashboard = () => {
  const [showScopes, setShowScopes] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowScopes(!showScopes)}>
        {showScopes ? "Hide HR Access Scopes" : "HR Access Scopes"}
      </Button>

      {showScopes && (
        <>
          <Divider />
          <Card title="HR Access Scopes">
            <HRAccessScopes />
          </Card>
        </>
      )}
    </div>
  );
};

export default HrDashboard;
